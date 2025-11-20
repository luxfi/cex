package engine

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/types"
)

// MatchFunc is called when two orders match. Implementations can delegate
// to lx/dex's orderbook, a simple in-process book, or an external engine.
type MatchFunc func(ctx context.Context, order *types.Order) ([]*types.Trade, error)

// PreTradeCheck is called before an order enters the book.
// Return non-nil error to reject.
type PreTradeCheck func(ctx context.Context, order *types.Order) error

// PostTradeHook is called after a trade is executed.
type PostTradeHook func(ctx context.Context, trade *types.Trade)

// Engine is the CEX matching engine with compliance hooks.
type Engine struct {
	mu sync.RWMutex

	markets   map[string]*types.Market
	orders    map[string]*types.Order
	trades    map[string]*types.Trade

	matchFn        MatchFunc
	preTradeChecks []PreTradeCheck
	postTradeHooks []PostTradeHook
}

func New(matchFn MatchFunc) *Engine {
	return &Engine{
		markets: make(map[string]*types.Market),
		orders:  make(map[string]*types.Order),
		trades:  make(map[string]*types.Trade),
		matchFn: matchFn,
	}
}

// AddPreTradeCheck registers a compliance check that runs before matching.
func (e *Engine) AddPreTradeCheck(check PreTradeCheck) {
	e.preTradeChecks = append(e.preTradeChecks, check)
}

// AddPostTradeHook registers a hook that runs after execution (reporting, etc).
func (e *Engine) AddPostTradeHook(hook PostTradeHook) {
	e.postTradeHooks = append(e.postTradeHooks, hook)
}

// RegisterMarket adds a tradable market.
func (e *Engine) RegisterMarket(m *types.Market) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.markets[m.Symbol] = m
	log.Info().Str("symbol", m.Symbol).Str("class", string(m.AssetClass)).Msg("Market registered")
}

// GetMarket returns a market by symbol.
func (e *Engine) GetMarket(symbol string) (*types.Market, bool) {
	e.mu.RLock()
	defer e.mu.RUnlock()
	m, ok := e.markets[symbol]
	return m, ok
}

// ListMarkets returns all registered markets.
func (e *Engine) ListMarkets() []*types.Market {
	e.mu.RLock()
	defer e.mu.RUnlock()
	out := make([]*types.Market, 0, len(e.markets))
	for _, m := range e.markets {
		out = append(out, m)
	}
	return out
}

// SubmitOrder validates, runs compliance checks, matches, and reports.
func (e *Engine) SubmitOrder(ctx context.Context, accountID, userID, orgID string, req *types.SubmitOrderRequest) (*types.Order, error) {
	// Validate market exists and is tradable
	market, ok := e.GetMarket(req.Symbol)
	if !ok {
		return nil, fmt.Errorf("unknown symbol: %s", req.Symbol)
	}
	if !market.Tradable {
		return nil, fmt.Errorf("market %s is not tradable (status: %s)", req.Symbol, market.Status)
	}
	if market.Status == "halted" {
		return nil, fmt.Errorf("market %s is halted", req.Symbol)
	}

	now := time.Now().UTC()
	order := &types.Order{
		ID:          uuid.New().String(),
		AccountID:   accountID,
		UserID:      userID,
		OrgID:       orgID,
		Symbol:      req.Symbol,
		AssetClass:  market.AssetClass,
		Side:        req.Side,
		Type:        req.Type,
		TimeInForce: req.TimeInForce,
		Qty:         req.Qty,
		Notional:    req.Notional,
		LimitPrice:  req.LimitPrice,
		StopPrice:   req.StopPrice,
		Status:      types.OrderStatusNew,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	// Run pre-trade compliance checks
	for _, check := range e.preTradeChecks {
		if err := check(ctx, order); err != nil {
			order.Status = types.OrderStatusRejected
			e.storeOrder(order)
			return order, fmt.Errorf("pre-trade check failed: %w", err)
		}
	}

	order.Status = types.OrderStatusOpen
	e.storeOrder(order)

	// Match
	trades, err := e.matchFn(ctx, order)
	if err != nil {
		order.Status = types.OrderStatusRejected
		order.UpdatedAt = time.Now().UTC()
		e.storeOrder(order)
		return order, fmt.Errorf("matching failed: %w", err)
	}

	// Process fills
	for _, trade := range trades {
		trade.ID = uuid.New().String()
		trade.OrderID = order.ID
		trade.AccountID = accountID
		trade.Timestamp = time.Now().UTC()

		e.mu.Lock()
		e.trades[trade.ID] = trade
		e.mu.Unlock()

		// Run post-trade hooks (FINRA reporting, ATS, surveillance)
		for _, hook := range e.postTradeHooks {
			hook(ctx, trade)
		}
	}

	// Update order status based on fills
	if len(trades) > 0 {
		order.Status = types.OrderStatusFilled
		now := time.Now().UTC()
		order.FilledAt = &now
	}
	order.UpdatedAt = time.Now().UTC()
	e.storeOrder(order)

	return order, nil
}

// CancelOrder cancels an open order.
func (e *Engine) CancelOrder(ctx context.Context, orderID string) (*types.Order, error) {
	e.mu.Lock()
	defer e.mu.Unlock()

	order, ok := e.orders[orderID]
	if !ok {
		return nil, fmt.Errorf("order %s not found", orderID)
	}
	if order.Status != types.OrderStatusOpen && order.Status != types.OrderStatusPartialFill {
		return nil, fmt.Errorf("order %s cannot be cancelled (status: %s)", orderID, order.Status)
	}

	now := time.Now().UTC()
	order.Status = types.OrderStatusCancelled
	order.CancelledAt = &now
	order.UpdatedAt = now
	return order, nil
}

// GetOrder returns an order by ID.
func (e *Engine) GetOrder(orderID string) (*types.Order, bool) {
	e.mu.RLock()
	defer e.mu.RUnlock()
	o, ok := e.orders[orderID]
	return o, ok
}

// ListOrders returns orders for an account.
func (e *Engine) ListOrders(accountID string) []*types.Order {
	e.mu.RLock()
	defer e.mu.RUnlock()
	var out []*types.Order
	for _, o := range e.orders {
		if o.AccountID == accountID {
			out = append(out, o)
		}
	}
	return out
}

// ListTrades returns trades for an account.
func (e *Engine) ListTrades(accountID string) []*types.Trade {
	e.mu.RLock()
	defer e.mu.RUnlock()
	var out []*types.Trade
	for _, t := range e.trades {
		if t.AccountID == accountID {
			out = append(out, t)
		}
	}
	return out
}

// HaltMarket suspends trading for a symbol (circuit breaker / regulatory halt).
func (e *Engine) HaltMarket(symbol, reason string) error {
	e.mu.Lock()
	defer e.mu.Unlock()
	m, ok := e.markets[symbol]
	if !ok {
		return fmt.Errorf("unknown symbol: %s", symbol)
	}
	m.Status = "halted"
	m.Tradable = false
	log.Warn().Str("symbol", symbol).Str("reason", reason).Msg("Market halted")
	return nil
}

// ResumeMarket resumes trading for a symbol.
func (e *Engine) ResumeMarket(symbol string) error {
	e.mu.Lock()
	defer e.mu.Unlock()
	m, ok := e.markets[symbol]
	if !ok {
		return fmt.Errorf("unknown symbol: %s", symbol)
	}
	m.Status = "active"
	m.Tradable = true
	log.Info().Str("symbol", symbol).Msg("Market resumed")
	return nil
}

func (e *Engine) storeOrder(o *types.Order) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.orders[o.ID] = o
}
