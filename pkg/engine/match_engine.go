package engine

import (
	"context"
	"fmt"
	"strconv"
	"sync"

	"github.com/rs/zerolog/log"

	"github.com/luxfi/dex/pkg/lx"

	"github.com/luxfi/cex/pkg/types"
)

// MatchEngine is the CEX's high-performance matching engine. It uses per-symbol
// lx.OrderBook instances for lock-free, price-time priority matching internally,
// and routes unfilled orders to external broker-dealer networks (Alpaca, BitGo,
// IBKR, FalconX, etc.) via the BrokerFallback.
//
// Execution flow (single path):
//  1. Order enters via CEX engine (compliance checks already done)
//  2. MatchEngine converts CEX Order → lx.Order
//  3. Order is placed into the per-symbol lx.OrderBook
//  4. Immediate matching produces fills against resting liquidity
//  5. Fills are converted back to CEX trades
//  6. If no internal fill and BrokerFallback is set, route to external venues
type MatchEngine struct {
	mu    sync.RWMutex
	books map[string]*lx.OrderBook

	// BrokerFallback routes orders to external centralized broker-dealer
	// networks and trading venues (Alpaca, BitGo, IBKR, etc.) when the
	// internal book can't fill.
	BrokerFallback MatchFunc
}

// NewMatchEngine creates the CEX matching engine backed by high-performance orderbooks.
func NewMatchEngine() *MatchEngine {
	return &MatchEngine{
		books: make(map[string]*lx.OrderBook),
	}
}

// GetOrCreateBook returns the orderbook for a symbol, creating it if needed.
func (m *MatchEngine) GetOrCreateBook(symbol string) *lx.OrderBook {
	m.mu.RLock()
	book, ok := m.books[symbol]
	m.mu.RUnlock()
	if ok {
		return book
	}

	m.mu.Lock()
	defer m.mu.Unlock()
	if book, ok = m.books[symbol]; ok {
		return book
	}
	book = lx.NewOrderBook(symbol)
	book.EnableImmediateMatching = true
	m.books[symbol] = book
	return book
}

// GetBook returns the orderbook for a symbol (nil if not found).
func (m *MatchEngine) GetBook(symbol string) *lx.OrderBook {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.books[symbol]
}

// Match implements MatchFunc — the single entry point for all order matching.
// It tries internal matching first, then falls back to external broker execution.
func (m *MatchEngine) Match(ctx context.Context, order *types.Order) ([]*types.Trade, error) {
	book := m.GetOrCreateBook(order.Symbol)

	// Convert CEX order → orderbook order
	bookOrder, err := toBookOrder(order)
	if err != nil {
		return nil, fmt.Errorf("order conversion failed: %w", err)
	}

	// Snapshot trade ID before — avoids copying the full trades slice
	tradeIDBefore := book.LastTradeID

	// Place into orderbook (immediate matching enabled)
	orderID := book.AddOrder(bookOrder)
	if orderID == 0 && bookOrder.Status == lx.Rejected {
		// Rejected by matching engine (validation, self-trade, post-only, etc.)
		// For market orders with no liquidity, try broker fallback.
		if m.BrokerFallback != nil {
			log.Debug().Str("symbol", order.Symbol).Msg("No internal match, routing to broker")
			return m.BrokerFallback(ctx, order)
		}
		if order.Type == types.OrderTypeMarket {
			return nil, nil
		}
		return nil, fmt.Errorf("order rejected by matching engine")
	}

	// Check if new trades were generated (fast path via atomic trade ID)
	newTradeCount := int(book.LastTradeID - tradeIDBefore)
	if newTradeCount <= 0 {
		// No internal match. For market orders with no liquidity, route to broker.
		if order.Type == types.OrderTypeMarket && m.BrokerFallback != nil {
			log.Debug().Str("symbol", order.Symbol).Msg("No internal liquidity, routing to broker")
			return m.BrokerFallback(ctx, order)
		}
		// Limit order resting — no trades yet.
		return nil, nil
	}

	// Collect only the new trades (slice from end)
	allTrades := book.GetTrades()
	startIdx := len(allTrades) - newTradeCount
	if startIdx < 0 {
		startIdx = 0
	}
	newTrades := allTrades[startIdx:]

	// Convert orderbook trades → CEX trades
	cexTrades := make([]*types.Trade, 0, len(newTrades))
	for _, bt := range newTrades {
		cexTrades = append(cexTrades, fromBookTrade(bt, order))
	}

	log.Info().
		Str("symbol", order.Symbol).
		Int("fills", len(cexTrades)).
		Str("venue", "internal").
		Msg("Order matched internally")

	return cexTrades, nil
}

// GetSnapshot returns an orderbook snapshot for a symbol.
func (m *MatchEngine) GetSnapshot(symbol string) *types.OrderBookSnapshot {
	book := m.GetBook(symbol)
	if book == nil {
		return nil
	}

	depth := book.GetDepth(20)
	snap := &types.OrderBookSnapshot{
		Symbol: symbol,
	}

	for _, lvl := range depth.Bids {
		snap.Bids = append(snap.Bids, &types.OrderBookLevel{
			Price:      int64(lvl.Price * lx.PriceMultiplier),
			Qty:        int64(lvl.Size * lx.PriceMultiplier),
			OrderCount: lvl.Count,
		})
	}
	for _, lvl := range depth.Asks {
		snap.Asks = append(snap.Asks, &types.OrderBookLevel{
			Price:      int64(lvl.Price * lx.PriceMultiplier),
			Qty:        int64(lvl.Size * lx.PriceMultiplier),
			OrderCount: lvl.Count,
		})
	}

	return snap
}

// --- Type Conversion Helpers ---

func toBookOrder(o *types.Order) (*lx.Order, error) {
	var side lx.Side
	switch o.Side {
	case types.SideBuy:
		side = lx.Buy
	case types.SideSell:
		side = lx.Sell
	default:
		return nil, fmt.Errorf("unknown side: %s", o.Side)
	}

	var orderType lx.OrderType
	switch o.Type {
	case types.OrderTypeMarket:
		orderType = lx.Market
	case types.OrderTypeLimit:
		orderType = lx.Limit
	case types.OrderTypeStop:
		orderType = lx.Stop
	case types.OrderTypeStopLimit:
		orderType = lx.StopLimit
	default:
		orderType = lx.Limit
	}

	var tif string
	switch o.TimeInForce {
	case types.TIFIOC:
		tif = lx.ImmediateOrCancel
	case types.TIFFOK:
		tif = lx.FillOrKill
	default:
		tif = "" // GTC / DAY — default behavior
	}

	price, _ := strconv.ParseFloat(o.LimitPrice, 64)
	size, _ := strconv.ParseFloat(o.Qty, 64)
	stopPrice, _ := strconv.ParseFloat(o.StopPrice, 64)

	// For market orders, notional may be set instead of qty.
	if size == 0 && o.Notional != "" {
		size, _ = strconv.ParseFloat(o.Notional, 64)
	}

	return &lx.Order{
		Symbol:      o.Symbol,
		Side:        side,
		Type:        orderType,
		Price:       price,
		Size:        size,
		StopPrice:   stopPrice,
		UserID:      o.UserID,
		User:        o.UserID,
		ClientID:    o.ID,
		TimeInForce: tif,
	}, nil
}

func fromBookTrade(bt lx.Trade, order *types.Order) *types.Trade {
	t := &types.Trade{
		Symbol: order.Symbol,
		Side:   order.Side,
		Price:  strconv.FormatFloat(bt.Price, 'f', -1, 64),
		Qty:    strconv.FormatFloat(bt.Size, 'f', -1, 64),
		Venue:  "internal",
	}
	// Surface the matched counterparty's user id. `order` is the aggressor;
	// the counterparty is the resting (maker) side. The lx order book only
	// carries user ids (toBookOrder maps UserID), so this is the counterparty
	// USER id — downstream resolves user→wallet for peer settlement.
	if order.Side == types.Buy {
		t.CounterUserID = bt.SellUserID
	} else {
		t.CounterUserID = bt.BuyUserID
	}
	return t
}
