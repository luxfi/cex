package engine

import (
	"github.com/luxfi/cex/pkg/types"
)

// PriceLevel holds all orders at a single price point in FIFO order.
type PriceLevel struct {
	Price  int64
	Orders []*types.Order
	Total  int64 // total remaining qty at this level
}

func (pl *PriceLevel) addOrder(o *types.Order) {
	pl.Orders = append(pl.Orders, o)
	pl.Total += o.RemainingQty
}

func (pl *PriceLevel) removeOrder(orderID string) bool {
	for i, o := range pl.Orders {
		if o.ID == orderID {
			pl.Total -= o.RemainingQty
			pl.Orders = append(pl.Orders[:i], pl.Orders[i+1:]...)
			return true
		}
	}
	return false
}

func (pl *PriceLevel) isEmpty() bool {
	return len(pl.Orders) == 0
}

// orderLocation tracks where an order lives in the book.
type orderLocation struct {
	Side  types.Side
	Price int64
}

// OrderBook manages bid and ask price levels for a single symbol.
// Bids are sorted descending (best/highest first).
// Asks are sorted ascending (best/lowest first).
// Uses sorted slices for cache-friendly access (inspired by CppTrader optimized).
type OrderBook struct {
	Symbol string
	Bids   []*PriceLevel            // sorted descending by price
	Asks   []*PriceLevel            // sorted ascending by price
	index  map[string]orderLocation // orderID -> location
}

func NewOrderBook(symbol string) *OrderBook {
	return &OrderBook{
		Symbol: symbol,
		Bids:   make([]*PriceLevel, 0, 64),
		Asks:   make([]*PriceLevel, 0, 64),
		index:  make(map[string]orderLocation, 1024),
	}
}

// BestBid returns the highest bid price level, or nil if empty.
func (ob *OrderBook) BestBid() *PriceLevel {
	if len(ob.Bids) == 0 {
		return nil
	}
	return ob.Bids[0]
}

// BestAsk returns the lowest ask price level, or nil if empty.
func (ob *OrderBook) BestAsk() *PriceLevel {
	if len(ob.Asks) == 0 {
		return nil
	}
	return ob.Asks[0]
}

// AddOrder inserts a resting order into the book at its price level.
func (ob *OrderBook) AddOrder(o *types.Order) {
	if o.Side == types.Buy {
		ob.addBid(o)
	} else {
		ob.addAsk(o)
	}
	ob.index[o.ID] = orderLocation{Side: o.Side, Price: o.Price}
}

// RemoveOrder removes an order from the book.
func (ob *OrderBook) RemoveOrder(orderID string) bool {
	loc, ok := ob.index[orderID]
	if !ok {
		return false
	}
	delete(ob.index, orderID)

	if loc.Side == types.Buy {
		return ob.removeBid(orderID, loc.Price)
	}
	return ob.removeAsk(orderID, loc.Price)
}

// Snapshot returns a point-in-time view of the order book.
func (ob *OrderBook) Snapshot(depth int) *types.OrderBookSnapshot {
	snap := &types.OrderBookSnapshot{
		Symbol: ob.Symbol,
	}

	bidDepth := len(ob.Bids)
	if depth > 0 && depth < bidDepth {
		bidDepth = depth
	}
	snap.Bids = make([]*types.OrderBookLevel, bidDepth)
	for i := 0; i < bidDepth; i++ {
		snap.Bids[i] = &types.OrderBookLevel{
			Price:      ob.Bids[i].Price,
			Qty:        ob.Bids[i].Total,
			OrderCount: len(ob.Bids[i].Orders),
		}
	}

	askDepth := len(ob.Asks)
	if depth > 0 && depth < askDepth {
		askDepth = depth
	}
	snap.Asks = make([]*types.OrderBookLevel, askDepth)
	for i := 0; i < askDepth; i++ {
		snap.Asks[i] = &types.OrderBookLevel{
			Price:      ob.Asks[i].Price,
			Qty:        ob.Asks[i].Total,
			OrderCount: len(ob.Asks[i].Orders),
		}
	}

	return snap
}

// CanFillFully checks if the full quantity can be matched (for FOK orders).
func (ob *OrderBook) CanFillFully(side types.Side, price int64, qty int64, isMarket bool) bool {
	var levels []*PriceLevel
	if side == types.Buy {
		levels = ob.Asks
	} else {
		levels = ob.Bids
	}

	var available int64
	for _, lvl := range levels {
		if !isMarket {
			if side == types.Buy && lvl.Price > price {
				break
			}
			if side == types.Sell && lvl.Price < price {
				break
			}
		}
		available += lvl.Total
		if available >= qty {
			return true
		}
	}
	return available >= qty
}

// --- Internal sorted-slice management ---

func (ob *OrderBook) addBid(o *types.Order) {
	// Binary search for price level (descending order)
	idx := ob.findBidIndex(o.Price)
	if idx < len(ob.Bids) && ob.Bids[idx].Price == o.Price {
		ob.Bids[idx].addOrder(o)
		return
	}
	// Insert new level
	lvl := &PriceLevel{Price: o.Price}
	lvl.addOrder(o)
	ob.Bids = append(ob.Bids, nil)
	copy(ob.Bids[idx+1:], ob.Bids[idx:])
	ob.Bids[idx] = lvl
}

func (ob *OrderBook) addAsk(o *types.Order) {
	// Binary search for price level (ascending order)
	idx := ob.findAskIndex(o.Price)
	if idx < len(ob.Asks) && ob.Asks[idx].Price == o.Price {
		ob.Asks[idx].addOrder(o)
		return
	}
	// Insert new level
	lvl := &PriceLevel{Price: o.Price}
	lvl.addOrder(o)
	ob.Asks = append(ob.Asks, nil)
	copy(ob.Asks[idx+1:], ob.Asks[idx:])
	ob.Asks[idx] = lvl
}

func (ob *OrderBook) removeBid(orderID string, price int64) bool {
	idx := ob.findBidIndex(price)
	if idx >= len(ob.Bids) || ob.Bids[idx].Price != price {
		return false
	}
	if !ob.Bids[idx].removeOrder(orderID) {
		return false
	}
	if ob.Bids[idx].isEmpty() {
		ob.Bids = append(ob.Bids[:idx], ob.Bids[idx+1:]...)
	}
	return true
}

func (ob *OrderBook) removeAsk(orderID string, price int64) bool {
	idx := ob.findAskIndex(price)
	if idx >= len(ob.Asks) || ob.Asks[idx].Price != price {
		return false
	}
	if !ob.Asks[idx].removeOrder(orderID) {
		return false
	}
	if ob.Asks[idx].isEmpty() {
		ob.Asks = append(ob.Asks[:idx], ob.Asks[idx+1:]...)
	}
	return true
}

// findBidIndex returns the index where price should be in descending order.
func (ob *OrderBook) findBidIndex(price int64) int {
	lo, hi := 0, len(ob.Bids)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if ob.Bids[mid].Price > price {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

// findAskIndex returns the index where price should be in ascending order.
func (ob *OrderBook) findAskIndex(price int64) int {
	lo, hi := 0, len(ob.Asks)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if ob.Asks[mid].Price < price {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

// reduceLevelQty updates the total after a partial fill on the front order.
func (ob *OrderBook) reduceLevelQty(side types.Side, price int64, qty int64) {
	if side == types.Buy {
		idx := ob.findBidIndex(price)
		if idx < len(ob.Bids) && ob.Bids[idx].Price == price {
			ob.Bids[idx].Total -= qty
		}
	} else {
		idx := ob.findAskIndex(price)
		if idx < len(ob.Asks) && ob.Asks[idx].Price == price {
			ob.Asks[idx].Total -= qty
		}
	}
}

// popFrontOrder removes the first order from the front of a price level.
// Used after fully filling the front order.
func (ob *OrderBook) popFrontOrder(side types.Side, price int64) {
	if side == types.Buy {
		idx := ob.findBidIndex(price)
		if idx < len(ob.Bids) && ob.Bids[idx].Price == price {
			lvl := ob.Bids[idx]
			if len(lvl.Orders) > 0 {
				delete(ob.index, lvl.Orders[0].ID)
				lvl.Orders = lvl.Orders[1:]
			}
			if lvl.isEmpty() {
				ob.Bids = append(ob.Bids[:idx], ob.Bids[idx+1:]...)
			}
		}
	} else {
		idx := ob.findAskIndex(price)
		if idx < len(ob.Asks) && ob.Asks[idx].Price == price {
			lvl := ob.Asks[idx]
			if len(lvl.Orders) > 0 {
				delete(ob.index, lvl.Orders[0].ID)
				lvl.Orders = lvl.Orders[1:]
			}
			if lvl.isEmpty() {
				ob.Asks = append(ob.Asks[:idx], ob.Asks[idx+1:]...)
			}
		}
	}
}
