package engine

import (
	"context"
	"testing"

	"github.com/luxfi/cex/pkg/types"
)

func TestMatchEngine_LimitOrderMatch(t *testing.T) {
	me := NewMatchEngine()

	// Place a sell limit order (provides liquidity)
	sellOrder := &types.Order{
		ID:         "sell-1",
		Symbol:     "BTC-USD",
		Side:       types.SideSell,
		Type:       types.OrderTypeLimit,
		Qty:        "1.0",
		LimitPrice: "50000",
		UserID:     "maker",
	}
	trades, err := me.Match(context.Background(), sellOrder)
	if err != nil {
		t.Fatalf("unexpected error placing sell: %v", err)
	}
	if len(trades) != 0 {
		t.Fatalf("expected no trades for first order, got %d", len(trades))
	}

	// Place a buy limit order that crosses the spread
	buyOrder := &types.Order{
		ID:         "buy-1",
		Symbol:     "BTC-USD",
		Side:       types.SideBuy,
		Type:       types.OrderTypeLimit,
		Qty:        "0.5",
		LimitPrice: "50000",
		UserID:     "taker",
	}
	trades, err = me.Match(context.Background(), buyOrder)
	if err != nil {
		t.Fatalf("unexpected error placing buy: %v", err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}

	tr := trades[0]
	if tr.Price != "50000" {
		t.Fatalf("expected price 50000, got %s", tr.Price)
	}
	if tr.Qty != "0.5" {
		t.Fatalf("expected qty 0.5, got %s", tr.Qty)
	}
	if tr.Venue != "internal" {
		t.Fatalf("expected venue internal, got %s", tr.Venue)
	}
}

func TestMatchEngine_MarketOrderNoLiquidity(t *testing.T) {
	me := NewMatchEngine()

	order := &types.Order{
		ID:     "mkt-1",
		Symbol: "ETH-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "10",
		UserID: "user1",
	}
	trades, err := me.Match(context.Background(), order)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(trades) != 0 {
		t.Fatalf("expected 0 trades, got %d", len(trades))
	}
}

func TestMatchEngine_MarketOrderFallsToBroker(t *testing.T) {
	me := NewMatchEngine()

	brokerCalled := false
	me.BrokerFallback = func(_ context.Context, o *types.Order) ([]*types.Trade, error) {
		brokerCalled = true
		return []*types.Trade{{
			Symbol: o.Symbol,
			Side:   o.Side,
			Price:  "3000",
			Qty:    o.Qty,
			Venue:  "alpaca",
		}}, nil
	}

	order := &types.Order{
		ID:     "mkt-2",
		Symbol: "ETH-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "5",
		UserID: "user1",
	}
	trades, err := me.Match(context.Background(), order)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !brokerCalled {
		t.Fatal("expected broker fallback to be called")
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade from broker, got %d", len(trades))
	}
	if trades[0].Venue != "alpaca" {
		t.Fatalf("expected venue alpaca, got %s", trades[0].Venue)
	}
}

func TestMatchEngine_FullCEXIntegration(t *testing.T) {
	me := NewMatchEngine()
	eng := New(me.Match)
	eng.RegisterMarket(testMarket("LUX-USD"))

	// Place sell limit to provide liquidity
	sellReq := &types.SubmitOrderRequest{
		Symbol:      "LUX-USD",
		Side:        types.SideSell,
		Type:        types.OrderTypeLimit,
		TimeInForce: types.TIFGTC,
		Qty:         "100",
		LimitPrice:  "2.50",
	}
	sellOrder, err := eng.SubmitOrder(context.Background(), "acct-maker", "maker", "org-1", sellReq)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if sellOrder.Status != types.OrderStatusOpen {
		t.Fatalf("expected open, got %s", sellOrder.Status)
	}

	// Place buy limit that crosses → should fill
	buyReq := &types.SubmitOrderRequest{
		Symbol:      "LUX-USD",
		Side:        types.SideBuy,
		Type:        types.OrderTypeLimit,
		TimeInForce: types.TIFGTC,
		Qty:         "50",
		LimitPrice:  "2.50",
	}
	buyOrder, err := eng.SubmitOrder(context.Background(), "acct-taker", "taker", "org-1", buyReq)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if buyOrder.Status != types.OrderStatusFilled {
		t.Fatalf("expected filled, got %s", buyOrder.Status)
	}

	trades := eng.ListTrades("acct-taker")
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
	if trades[0].Venue != "internal" {
		t.Fatalf("expected venue internal, got %s", trades[0].Venue)
	}
}

func TestMatchEngine_PartialFill(t *testing.T) {
	me := NewMatchEngine()

	me.Match(context.Background(), &types.Order{
		ID: "s1", Symbol: "ZOO-USD", Side: types.SideSell,
		Type: types.OrderTypeLimit, Qty: "5", LimitPrice: "1.00", UserID: "maker",
	})

	trades, err := me.Match(context.Background(), &types.Order{
		ID: "b1", Symbol: "ZOO-USD", Side: types.SideBuy,
		Type: types.OrderTypeLimit, Qty: "10", LimitPrice: "1.00", UserID: "taker",
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade (partial fill), got %d", len(trades))
	}
	if trades[0].Qty != "5" {
		t.Fatalf("expected partial qty 5, got %s", trades[0].Qty)
	}
}

func TestMatchEngine_GetSnapshot(t *testing.T) {
	me := NewMatchEngine()

	me.Match(context.Background(), &types.Order{
		ID: "s1", Symbol: "BTC-USD", Side: types.SideSell,
		Type: types.OrderTypeLimit, Qty: "1", LimitPrice: "51000", UserID: "a",
	})
	me.Match(context.Background(), &types.Order{
		ID: "b1", Symbol: "BTC-USD", Side: types.SideBuy,
		Type: types.OrderTypeLimit, Qty: "1", LimitPrice: "49000", UserID: "b",
	})

	snap := me.GetSnapshot("BTC-USD")
	if snap == nil {
		t.Fatal("expected snapshot")
	}
	if snap.Symbol != "BTC-USD" {
		t.Fatalf("expected BTC-USD, got %s", snap.Symbol)
	}
	if len(snap.Bids) == 0 {
		t.Fatal("expected bids")
	}
	if len(snap.Asks) == 0 {
		t.Fatal("expected asks")
	}
}
