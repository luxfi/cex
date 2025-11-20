package engine

import (
	"context"
	"strconv"
	"testing"

	"github.com/luxfi/cex/pkg/types"
)

func limitOrder(id, symbol string, side types.Side, price float64, qty float64) *types.Order {
	return &types.Order{
		ID:          id,
		AccountID:   "acct-1",
		Symbol:      symbol,
		Side:        side,
		Type:        types.OrderTypeLimit,
		TimeInForce: types.TIFGTC,
		Qty:         strconv.FormatFloat(qty, 'f', -1, 64),
		LimitPrice:  strconv.FormatFloat(price, 'f', -1, 64),
	}
}

func marketOrder(id, symbol string, side types.Side, qty float64) *types.Order {
	return &types.Order{
		ID:          id,
		AccountID:   "acct-1",
		Symbol:      symbol,
		Side:        side,
		Type:        types.OrderTypeMarket,
		TimeInForce: types.TIFDay,
		Qty:         strconv.FormatFloat(qty, 'f', -1, 64),
	}
}

func TestMatcher_LimitBuyMatchesAsk(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Place a sell at 100
	sell := limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 1.0)
	trades, err := m.Match(ctx, sell)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 0 {
		t.Fatal("expected no trades — sell rests on empty book")
	}

	// Place a buy at 100 — should match
	buy := limitOrder("b1", "BTC-USD", types.SideBuy, 100.0, 1.0)
	trades, err = m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Price != "100" {
		t.Fatalf("expected price 100, got %s", trades[0].Price)
	}
}

func TestMatcher_MarketBuyMatchesAsk(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("ETH-USD")
	ctx := context.Background()

	// Resting sell
	sell := limitOrder("s1", "ETH-USD", types.SideSell, 3000.0, 2.0)
	m.Match(ctx, sell)

	// Market buy
	buy := marketOrder("b1", "ETH-USD", types.SideBuy, 1.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Price != "3000" {
		t.Fatalf("expected price 3000, got %s", trades[0].Price)
	}
}

func TestMatcher_PartialFill(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Sell 5 BTC at 100
	sell := limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 5.0)
	m.Match(ctx, sell)

	// Buy 3 BTC at 100 — partial fill of the resting sell
	buy := limitOrder("b1", "BTC-USD", types.SideBuy, 100.0, 3.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Qty != "3" {
		t.Fatalf("expected qty 3, got %s", trades[0].Qty)
	}

	// The remaining 2 should still be on the book
	snap, _ := m.GetSnapshot("BTC-USD", 10)
	if len(snap.Asks) != 1 {
		t.Fatalf("expected 1 ask level remaining, got %d", len(snap.Asks))
	}
	// 2 BTC remaining = 2 * 1e8 = 200000000
	if snap.Asks[0].Qty != 200000000 {
		t.Fatalf("expected 200000000 remaining qty, got %d", snap.Asks[0].Qty)
	}
}

func TestMatcher_PriceTimePriority(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("AAPL")
	ctx := context.Background()

	// Two sells at different prices
	m.Match(ctx, limitOrder("s1", "AAPL", types.SideSell, 150.0, 10.0))
	m.Match(ctx, limitOrder("s2", "AAPL", types.SideSell, 149.0, 10.0))

	// Buy should match best ask (149) first
	buy := limitOrder("b1", "AAPL", types.SideBuy, 155.0, 5.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Price != "149" {
		t.Fatalf("expected to match at 149, got %s", trades[0].Price)
	}
}

func TestMatcher_MultipleLevelFill(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Sell 2 at 100, 3 at 101
	m.Match(ctx, limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 2.0))
	m.Match(ctx, limitOrder("s2", "BTC-USD", types.SideSell, 101.0, 3.0))

	// Buy 4 — should sweep both levels
	buy := limitOrder("b1", "BTC-USD", types.SideBuy, 102.0, 4.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 2 {
		t.Fatalf("expected 2 trades across levels, got %d", len(trades))
	}
	if trades[0].Price != "100" || trades[0].Qty != "2" {
		t.Fatalf("trade[0] expected 2@100, got %s@%s", trades[0].Qty, trades[0].Price)
	}
	if trades[1].Price != "101" || trades[1].Qty != "2" {
		t.Fatalf("trade[1] expected 2@101, got %s@%s", trades[1].Qty, trades[1].Price)
	}
}

func TestMatcher_LimitBuyBelowAsk_Rests(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Sell at 100
	m.Match(ctx, limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 1.0))

	// Buy at 99 — no cross, should rest on book
	buy := limitOrder("b1", "BTC-USD", types.SideBuy, 99.0, 1.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 0 {
		t.Fatalf("expected no trades for non-crossing limit, got %d", len(trades))
	}

	snap, _ := m.GetSnapshot("BTC-USD", 10)
	if len(snap.Bids) != 1 {
		t.Fatalf("expected buy to rest on book, got %d bid levels", len(snap.Bids))
	}
}

func TestMatcher_FOK_Rejected(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Sell 1 at 100
	m.Match(ctx, limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 1.0))

	// FOK buy 5 — not enough liquidity
	buy := &types.Order{
		ID:          "b-fok",
		AccountID:   "acct-1",
		Symbol:      "BTC-USD",
		Side:        types.SideBuy,
		Type:        types.OrderTypeLimit,
		TimeInForce: types.TIFFOK,
		Qty:         "5",
		LimitPrice:  "100",
	}
	_, err := m.Match(ctx, buy)
	if err == nil {
		t.Fatal("expected FOK rejection for insufficient liquidity")
	}
}

func TestMatcher_IOC_PartialFillAndCancel(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Sell 2 at 100
	m.Match(ctx, limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 2.0))

	// IOC buy 5 — should fill 2, cancel rest (no resting on book)
	buy := &types.Order{
		ID:          "b-ioc",
		AccountID:   "acct-1",
		Symbol:      "BTC-USD",
		Side:        types.SideBuy,
		Type:        types.OrderTypeLimit,
		TimeInForce: types.TIFIOC,
		Qty:         "5",
		LimitPrice:  "100",
	}
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Qty != "2" {
		t.Fatalf("expected qty 2, got %s", trades[0].Qty)
	}

	// Nothing should rest on the book
	snap, _ := m.GetSnapshot("BTC-USD", 10)
	if len(snap.Bids) != 0 {
		t.Fatal("IOC remainder should not rest on book")
	}
}

func TestMatcher_NoBook(t *testing.T) {
	m := NewMatcher()
	ctx := context.Background()

	buy := marketOrder("b1", "NOPE", types.SideBuy, 1.0)
	_, err := m.Match(ctx, buy)
	if err == nil {
		t.Fatal("expected error for missing book")
	}
}

func TestMatcher_CancelFromBook(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Place resting sell
	sell := limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 5.0)
	m.Match(ctx, sell)

	snap, _ := m.GetSnapshot("BTC-USD", 10)
	if len(snap.Asks) != 1 {
		t.Fatal("expected sell resting on book")
	}

	// Cancel it
	m.CancelFromBook(sell)

	snap, _ = m.GetSnapshot("BTC-USD", 10)
	if len(snap.Asks) != 0 {
		t.Fatal("expected empty asks after cancel")
	}
}

func TestMatcher_SellMatchesBid(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Resting buy at 100
	m.Match(ctx, limitOrder("b1", "BTC-USD", types.SideBuy, 100.0, 3.0))

	// Sell at 100 — should match
	sell := limitOrder("s1", "BTC-USD", types.SideSell, 100.0, 2.0)
	trades, err := m.Match(ctx, sell)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Qty != "2" {
		t.Fatalf("expected qty 2, got %s", trades[0].Qty)
	}
}

func TestMatcher_MarketOrderEmptyBook(t *testing.T) {
	m := NewMatcher()
	m.EnsureBook("BTC-USD")
	ctx := context.Background()

	// Market buy on empty book — no trades, no error
	buy := marketOrder("b1", "BTC-USD", types.SideBuy, 1.0)
	trades, err := m.Match(ctx, buy)
	if err != nil {
		t.Fatal(err)
	}
	if len(trades) != 0 {
		t.Fatalf("expected 0 trades on empty book, got %d", len(trades))
	}
}
