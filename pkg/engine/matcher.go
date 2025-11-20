package engine

import (
	"context"
	"fmt"
	"math"
	"strconv"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/types"
)

// Matcher implements the MatchFunc interface using an in-process order book.
// It manages books for all registered markets and performs price-time priority matching.
type Matcher struct {
	mu    sync.Mutex
	books map[string]*OrderBook // symbol -> order book
}

// NewMatcher creates a matcher with order books for all symbols.
func NewMatcher() *Matcher {
	return &Matcher{
		books: make(map[string]*OrderBook),
	}
}

// EnsureBook creates an order book for a symbol if it doesn't exist.
func (m *Matcher) EnsureBook(symbol string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.books[symbol]; !ok {
		m.books[symbol] = NewOrderBook(symbol)
	}
}

// Match is the MatchFunc implementation. It takes an incoming order,
// converts string prices to int64, matches against the book, and returns trades.
func (m *Matcher) Match(_ context.Context, order *types.Order) ([]*types.Trade, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	book, ok := m.books[order.Symbol]
	if !ok {
		return nil, fmt.Errorf("no order book for symbol %s", order.Symbol)
	}

	// Parse string fields to int64 for matching
	if err := parseOrderPrices(order); err != nil {
		return nil, fmt.Errorf("invalid order prices: %w", err)
	}
	order.RemainingQty = parseQty(order.Qty)

	// FOK pre-check
	if order.TimeInForce == types.TIFFOK {
		isMarket := order.Type == types.OrderTypeMarket
		side := parseSide(order.Side)
		if !book.CanFillFully(side, order.Price, order.RemainingQty, isMarket) {
			return nil, fmt.Errorf("FOK: insufficient liquidity")
		}
	}

	var trades []*types.Trade
	now := time.Now().UTC()

	for order.RemainingQty > 0 {
		var bestLevel *PriceLevel
		if order.Side == types.Buy {
			bestLevel = book.BestAsk()
		} else {
			bestLevel = book.BestBid()
		}

		if bestLevel == nil {
			break
		}

		// Price check for limit orders
		if order.Type == types.OrderTypeLimit || order.Type == types.OrderTypeStopLimit {
			if order.Side == types.Buy && bestLevel.Price > order.Price {
				break
			}
			if order.Side == types.Sell && bestLevel.Price < order.Price {
				break
			}
		}

		// Match against front order (FIFO price-time priority)
		passive := bestLevel.Orders[0]
		execPrice := bestLevel.Price
		execQty := min(order.RemainingQty, passive.RemainingQty)

		trade := &types.Trade{
			ID:        uuid.New().String(),
			Symbol:    order.Symbol,
			Price:     formatPrice(execPrice),
			Qty:       formatQty(execQty),
			Side:      order.Side,
			Venue:     "lux_ats",
			Timestamp: now,
		}

		// Determine buyer/seller
		if order.Side == types.Buy {
			trade.OrderID = order.ID
			trade.AccountID = order.AccountID
		} else {
			trade.OrderID = order.ID
			trade.AccountID = order.AccountID
		}

		// Update aggressor
		order.RemainingQty -= execQty

		// Update passive
		passive.RemainingQty -= execQty
		if passive.RemainingQty == 0 {
			passive.Status = types.OrderStatusFilled
			passiveNow := now
			passive.FilledAt = &passiveNow
			book.popFrontOrder(parseSide(passive.Side), passive.Price)
		} else {
			passive.Status = types.OrderStatusPartialFill
			passive.FilledQty = formatQty(parseQty(passive.Qty) - passive.RemainingQty)
			book.reduceLevelQty(parseSide(passive.Side), passive.Price, execQty)
		}

		trades = append(trades, trade)

		log.Debug().
			Str("trade", truncID(trade.ID)).
			Str("symbol", trade.Symbol).
			Str("price", trade.Price).
			Str("qty", trade.Qty).
			Msg("ATS trade executed")
	}

	// Rest on book if limit order with remaining qty
	if order.RemainingQty > 0 {
		switch order.TimeInForce {
		case types.TIFIOC:
			// Cancel remaining
		case types.TIFFOK:
			// Should not reach here
		default:
			if order.Type == types.OrderTypeLimit || order.Type == types.OrderTypeStopLimit {
				book.AddOrder(order)
				log.Debug().Str("id", truncID(order.ID)).Str("symbol", order.Symbol).
					Int64("remaining", order.RemainingQty).Msg("order resting on book")
			}
		}
	}

	// Update filled qty string
	filledQty := parseQty(order.Qty) - order.RemainingQty
	if filledQty > 0 {
		order.FilledQty = formatQty(filledQty)
	}

	return trades, nil
}

// GetSnapshot returns the current order book for a symbol.
func (m *Matcher) GetSnapshot(symbol string, depth int) (*types.OrderBookSnapshot, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	book, ok := m.books[symbol]
	if !ok {
		return nil, fmt.Errorf("no order book for symbol %s", symbol)
	}
	return book.Snapshot(depth), nil
}

// CancelFromBook removes a resting order from its order book.
func (m *Matcher) CancelFromBook(order *types.Order) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if book, ok := m.books[order.Symbol]; ok {
		book.RemoveOrder(order.ID)
	}
}

// --- Conversion helpers ---

func parseOrderPrices(o *types.Order) error {
	if o.LimitPrice != "" {
		p, err := strconv.ParseFloat(o.LimitPrice, 64)
		if err != nil {
			return fmt.Errorf("invalid limit price: %w", err)
		}
		o.Price = priceToInt(p)
	}
	if o.StopPrice != "" {
		p, err := strconv.ParseFloat(o.StopPrice, 64)
		if err != nil {
			return fmt.Errorf("invalid stop price: %w", err)
		}
		// Store stop price in the Price field for stop market orders
		if o.Type == types.OrderTypeStop {
			o.Price = priceToInt(p)
		}
	}
	// Market orders get max/min price to match anything
	if o.Type == types.OrderTypeMarket {
		if o.Side == types.Buy {
			o.Price = math.MaxInt64
		} else {
			o.Price = 1 // minimum price
		}
	}
	return nil
}

func parseQty(s string) int64 {
	if s == "" {
		return 0
	}
	f, _ := strconv.ParseFloat(s, 64)
	return int64(f * 1e8) // 8 decimal places for qty
}

func parseSide(s types.Side) types.Side {
	return s
}

// priceToInt converts a float price to int64 with 8 decimal precision.
func priceToInt(f float64) int64 {
	return int64(f * 1e8)
}

func formatPrice(p int64) string {
	return strconv.FormatFloat(float64(p)/1e8, 'f', -1, 64)
}

func formatQty(q int64) string {
	return strconv.FormatFloat(float64(q)/1e8, 'f', -1, 64)
}

func truncID(id string) string {
	if len(id) > 8 {
		return id[:8]
	}
	return id
}
