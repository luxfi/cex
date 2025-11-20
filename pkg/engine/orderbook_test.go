package engine

import (
	"testing"

	"github.com/luxfi/cex/pkg/types"
)

func makeOrder(id string, side types.Side, price, qty int64) *types.Order {
	return &types.Order{
		ID:           id,
		Side:         side,
		Price:        price,
		RemainingQty: qty,
	}
}

func TestOrderBook_AddAndBestBidAsk(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 5))
	ob.AddOrder(makeOrder("b2", types.Buy, 10100, 3))
	ob.AddOrder(makeOrder("a1", types.Sell, 10200, 7))
	ob.AddOrder(makeOrder("a2", types.Sell, 10300, 2))

	best := ob.BestBid()
	if best == nil || best.Price != 10100 {
		t.Fatalf("expected best bid 10100, got %v", best)
	}

	bestAsk := ob.BestAsk()
	if bestAsk == nil || bestAsk.Price != 10200 {
		t.Fatalf("expected best ask 10200, got %v", bestAsk)
	}
}

func TestOrderBook_SamePriceFIFO(t *testing.T) {
	ob := NewOrderBook("ETH-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 5000, 10))
	ob.AddOrder(makeOrder("b2", types.Buy, 5000, 20))

	best := ob.BestBid()
	if best.Total != 30 {
		t.Fatalf("expected total 30, got %d", best.Total)
	}
	if len(best.Orders) != 2 {
		t.Fatalf("expected 2 orders at level, got %d", len(best.Orders))
	}
	if best.Orders[0].ID != "b1" {
		t.Fatalf("expected FIFO order b1 first, got %s", best.Orders[0].ID)
	}
}

func TestOrderBook_RemoveOrder(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 5))
	ob.AddOrder(makeOrder("b2", types.Buy, 10100, 3))

	if !ob.RemoveOrder("b2") {
		t.Fatal("expected remove to succeed")
	}

	best := ob.BestBid()
	if best.Price != 10000 {
		t.Fatalf("expected best bid 10000 after removal, got %d", best.Price)
	}

	if ob.RemoveOrder("nonexistent") {
		t.Fatal("expected remove of nonexistent to fail")
	}
}

func TestOrderBook_RemoveLastAtLevel(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 5))
	ob.RemoveOrder("b1")

	if ob.BestBid() != nil {
		t.Fatal("expected empty bids after removing only order")
	}
}

func TestOrderBook_Snapshot(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 5))
	ob.AddOrder(makeOrder("b2", types.Buy, 9900, 10))
	ob.AddOrder(makeOrder("a1", types.Sell, 10100, 3))
	ob.AddOrder(makeOrder("a2", types.Sell, 10200, 7))
	ob.AddOrder(makeOrder("a3", types.Sell, 10300, 1))

	// Full snapshot
	snap := ob.Snapshot(0)
	if len(snap.Bids) != 2 {
		t.Fatalf("expected 2 bid levels, got %d", len(snap.Bids))
	}
	if len(snap.Asks) != 3 {
		t.Fatalf("expected 3 ask levels, got %d", len(snap.Asks))
	}

	// Depth-limited
	snap = ob.Snapshot(1)
	if len(snap.Bids) != 1 {
		t.Fatalf("expected 1 bid level with depth=1, got %d", len(snap.Bids))
	}
	if snap.Bids[0].Price != 10000 {
		t.Fatalf("expected best bid 10000, got %d", snap.Bids[0].Price)
	}
}

func TestOrderBook_CanFillFully(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("a1", types.Sell, 10000, 5))
	ob.AddOrder(makeOrder("a2", types.Sell, 10100, 10))

	// Buy market, 14 qty — should be fillable (5+10 = 15 available)
	if !ob.CanFillFully(types.Buy, 0, 14, true) {
		t.Fatal("expected full fill for 14 qty market order")
	}

	// Buy market, 16 qty — should NOT be fillable
	if ob.CanFillFully(types.Buy, 0, 16, false) {
		t.Fatal("expected no fill for 16 qty")
	}

	// Buy limit at 10000, 4 qty — only 5 available at 10000
	if !ob.CanFillFully(types.Buy, 10000, 4, false) {
		t.Fatal("expected full fill for 4 qty at 10000")
	}

	// Buy limit at 10000, 6 qty — only 5 available at that price
	if ob.CanFillFully(types.Buy, 10000, 6, false) {
		t.Fatal("expected no fill for 6 qty at 10000")
	}
}

func TestOrderBook_ReduceLevelQty(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("a1", types.Sell, 10000, 10))
	ob.reduceLevelQty(types.Sell, 10000, 3)

	if ob.BestAsk().Total != 7 {
		t.Fatalf("expected total 7 after reduction, got %d", ob.BestAsk().Total)
	}
}

func TestOrderBook_PopFrontOrder(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 5))
	ob.AddOrder(makeOrder("b2", types.Buy, 10000, 3))

	ob.popFrontOrder(types.Buy, 10000)

	best := ob.BestBid()
	if len(best.Orders) != 1 {
		t.Fatalf("expected 1 order after pop, got %d", len(best.Orders))
	}
	if best.Orders[0].ID != "b2" {
		t.Fatalf("expected b2 after popping b1, got %s", best.Orders[0].ID)
	}
}

func TestOrderBook_BidsSortedDescending(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	// Insert in random order
	ob.AddOrder(makeOrder("b1", types.Buy, 10000, 1))
	ob.AddOrder(makeOrder("b2", types.Buy, 10300, 1))
	ob.AddOrder(makeOrder("b3", types.Buy, 10100, 1))
	ob.AddOrder(makeOrder("b4", types.Buy, 9900, 1))
	ob.AddOrder(makeOrder("b5", types.Buy, 10200, 1))

	// Should be descending: 10300, 10200, 10100, 10000, 9900
	expected := []int64{10300, 10200, 10100, 10000, 9900}
	for i, lvl := range ob.Bids {
		if lvl.Price != expected[i] {
			t.Fatalf("bid[%d]: expected %d, got %d", i, expected[i], lvl.Price)
		}
	}
}

func TestOrderBook_AsksSortedAscending(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	ob.AddOrder(makeOrder("a1", types.Sell, 10200, 1))
	ob.AddOrder(makeOrder("a2", types.Sell, 10000, 1))
	ob.AddOrder(makeOrder("a3", types.Sell, 10100, 1))
	ob.AddOrder(makeOrder("a4", types.Sell, 10400, 1))
	ob.AddOrder(makeOrder("a5", types.Sell, 10300, 1))

	// Should be ascending: 10000, 10100, 10200, 10300, 10400
	expected := []int64{10000, 10100, 10200, 10300, 10400}
	for i, lvl := range ob.Asks {
		if lvl.Price != expected[i] {
			t.Fatalf("ask[%d]: expected %d, got %d", i, expected[i], lvl.Price)
		}
	}
}

func TestOrderBook_EmptyBook(t *testing.T) {
	ob := NewOrderBook("BTC-USD")

	if ob.BestBid() != nil {
		t.Fatal("expected nil best bid")
	}
	if ob.BestAsk() != nil {
		t.Fatal("expected nil best ask")
	}
	if ob.CanFillFully(types.Buy, 10000, 1, false) {
		t.Fatal("expected no fill on empty book")
	}
	snap := ob.Snapshot(10)
	if len(snap.Bids) != 0 || len(snap.Asks) != 0 {
		t.Fatal("expected empty snapshot")
	}
}
