package engine

import (
	"context"
	"fmt"
	"testing"

	"github.com/luxfi/cex/pkg/types"
)

func testMarket(symbol string) *types.Market {
	return &types.Market{
		Symbol:     symbol,
		AssetClass: types.AssetClassCrypto,
		Status:     "active",
		Tradable:   true,
	}
}

func noopMatch(_ context.Context, o *types.Order) ([]*types.Trade, error) {
	return []*types.Trade{{
		Symbol: o.Symbol,
		Side:   o.Side,
		Price:  "100.00",
		Qty:    o.Qty,
		Venue:  "test",
	}}, nil
}

func failMatch(_ context.Context, _ *types.Order) ([]*types.Trade, error) {
	return nil, fmt.Errorf("no liquidity")
}

func TestRegisterAndGetMarket(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	m, ok := eng.GetMarket("BTC-USD")
	if !ok {
		t.Fatal("expected market to exist")
	}
	if m.Symbol != "BTC-USD" {
		t.Fatalf("expected BTC-USD, got %s", m.Symbol)
	}

	_, ok = eng.GetMarket("NOPE")
	if ok {
		t.Fatal("expected missing market")
	}
}

func TestListMarkets(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))
	eng.RegisterMarket(testMarket("ETH-USD"))

	markets := eng.ListMarkets()
	if len(markets) != 2 {
		t.Fatalf("expected 2 markets, got %d", len(markets))
	}
}

func TestSubmitOrder_Success(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	req := &types.SubmitOrderRequest{
		Symbol:      "BTC-USD",
		Side:        types.SideBuy,
		Type:        types.OrderTypeMarket,
		TimeInForce: types.TIFDay,
		Qty:         "1.5",
	}

	order, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if order.Status != types.OrderStatusFilled {
		t.Fatalf("expected filled, got %s", order.Status)
	}
	if order.FilledAt == nil {
		t.Fatal("expected FilledAt to be set")
	}

	// Verify order is stored
	got, ok := eng.GetOrder(order.ID)
	if !ok {
		t.Fatal("expected order to be retrievable")
	}
	if got.AccountID != "acct-1" {
		t.Fatalf("expected acct-1, got %s", got.AccountID)
	}
}

func TestSubmitOrder_UnknownSymbol(t *testing.T) {
	eng := New(noopMatch)

	req := &types.SubmitOrderRequest{
		Symbol: "NOPE",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	_, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err == nil {
		t.Fatal("expected error for unknown symbol")
	}
}

func TestSubmitOrder_HaltedMarket(t *testing.T) {
	eng := New(noopMatch)
	m := testMarket("BTC-USD")
	m.Status = "halted"
	m.Tradable = false
	eng.RegisterMarket(m)

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	_, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err == nil {
		t.Fatal("expected error for halted market")
	}
}

func TestSubmitOrder_MatchFailure(t *testing.T) {
	eng := New(failMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	order, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err == nil {
		t.Fatal("expected match error")
	}
	if order.Status != types.OrderStatusRejected {
		t.Fatalf("expected rejected, got %s", order.Status)
	}
}

func TestSubmitOrder_PreTradeCheckRejects(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))
	eng.AddPreTradeCheck(func(_ context.Context, _ *types.Order) error {
		return fmt.Errorf("sanctions block")
	})

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	order, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err == nil {
		t.Fatal("expected pre-trade rejection")
	}
	if order.Status != types.OrderStatusRejected {
		t.Fatalf("expected rejected, got %s", order.Status)
	}
}

func TestPostTradeHookCalled(t *testing.T) {
	var hookCalled int
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))
	eng.AddPostTradeHook(func(_ context.Context, trade *types.Trade) {
		hookCalled++
		if trade.Symbol != "BTC-USD" {
			t.Errorf("expected BTC-USD, got %s", trade.Symbol)
		}
	})

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	_, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if hookCalled != 1 {
		t.Fatalf("expected hook called once, got %d", hookCalled)
	}
}

func TestCancelOrder(t *testing.T) {
	// Use a match func that returns no trades so order stays open
	eng := New(func(_ context.Context, _ *types.Order) ([]*types.Trade, error) {
		return nil, nil
	})
	eng.RegisterMarket(testMarket("BTC-USD"))

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeLimit,
		Qty:    "1",
	}

	order, err := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if order.Status != types.OrderStatusOpen {
		t.Fatalf("expected open, got %s", order.Status)
	}

	cancelled, err := eng.CancelOrder(context.Background(), order.ID)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if cancelled.Status != types.OrderStatusCancelled {
		t.Fatalf("expected cancelled, got %s", cancelled.Status)
	}
	if cancelled.CancelledAt == nil {
		t.Fatal("expected CancelledAt to be set")
	}
}

func TestCancelOrder_AlreadyFilled(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	req := &types.SubmitOrderRequest{
		Symbol: "BTC-USD",
		Side:   types.SideBuy,
		Type:   types.OrderTypeMarket,
		Qty:    "1",
	}

	order, _ := eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	_, err := eng.CancelOrder(context.Background(), order.ID)
	if err == nil {
		t.Fatal("expected error cancelling filled order")
	}
}

func TestHaltAndResumeMarket(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	if err := eng.HaltMarket("BTC-USD", "circuit breaker"); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	m, _ := eng.GetMarket("BTC-USD")
	if m.Status != "halted" {
		t.Fatalf("expected halted, got %s", m.Status)
	}
	if m.Tradable {
		t.Fatal("expected tradable=false")
	}

	if err := eng.ResumeMarket("BTC-USD"); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	m, _ = eng.GetMarket("BTC-USD")
	if m.Status != "active" {
		t.Fatalf("expected active, got %s", m.Status)
	}
}

func TestListOrdersAndTrades(t *testing.T) {
	eng := New(noopMatch)
	eng.RegisterMarket(testMarket("BTC-USD"))

	for i := 0; i < 3; i++ {
		req := &types.SubmitOrderRequest{
			Symbol: "BTC-USD",
			Side:   types.SideBuy,
			Type:   types.OrderTypeMarket,
			Qty:    "1",
		}
		eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", req)
	}

	orders := eng.ListOrders("acct-1")
	if len(orders) != 3 {
		t.Fatalf("expected 3 orders, got %d", len(orders))
	}

	trades := eng.ListTrades("acct-1")
	if len(trades) != 3 {
		t.Fatalf("expected 3 trades, got %d", len(trades))
	}

	// Different account should have zero
	if len(eng.ListOrders("acct-2")) != 0 {
		t.Fatal("expected 0 orders for acct-2")
	}
}
