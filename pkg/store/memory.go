package store

import (
	"context"
	"fmt"
	"sync"

	"github.com/luxfi/cex/pkg/types"
)

// MemoryStore is an in-memory Store for development and testing.
type MemoryStore struct {
	mu      sync.RWMutex
	orders  map[string]*types.Order
	trades  map[string]*types.Trade
	markets map[string]*types.Market
}

func NewMemory() *MemoryStore {
	return &MemoryStore{
		orders:  make(map[string]*types.Order),
		trades:  make(map[string]*types.Trade),
		markets: make(map[string]*types.Market),
	}
}

func (m *MemoryStore) SaveOrder(_ context.Context, order *types.Order) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.orders[order.ID] = order
	return nil
}

func (m *MemoryStore) GetOrder(_ context.Context, id string) (*types.Order, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	o, ok := m.orders[id]
	if !ok {
		return nil, fmt.Errorf("order %s not found", id)
	}
	return o, nil
}

func (m *MemoryStore) ListOrders(_ context.Context, accountID string, limit, offset int) ([]*types.Order, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []*types.Order
	for _, o := range m.orders {
		if o.AccountID == accountID {
			out = append(out, o)
		}
	}
	if offset > len(out) {
		return nil, nil
	}
	out = out[offset:]
	if limit > 0 && limit < len(out) {
		out = out[:limit]
	}
	return out, nil
}

func (m *MemoryStore) UpdateOrderStatus(_ context.Context, id string, status types.OrderStatus) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	o, ok := m.orders[id]
	if !ok {
		return fmt.Errorf("order %s not found", id)
	}
	o.Status = status
	return nil
}

func (m *MemoryStore) SaveTrade(_ context.Context, trade *types.Trade) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.trades[trade.ID] = trade
	return nil
}

func (m *MemoryStore) GetTrade(_ context.Context, id string) (*types.Trade, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	t, ok := m.trades[id]
	if !ok {
		return nil, fmt.Errorf("trade %s not found", id)
	}
	return t, nil
}

func (m *MemoryStore) ListTrades(_ context.Context, accountID string, limit, offset int) ([]*types.Trade, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []*types.Trade
	for _, t := range m.trades {
		if t.AccountID == accountID {
			out = append(out, t)
		}
	}
	if offset > len(out) {
		return nil, nil
	}
	out = out[offset:]
	if limit > 0 && limit < len(out) {
		out = out[:limit]
	}
	return out, nil
}

func (m *MemoryStore) SaveMarket(_ context.Context, market *types.Market) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.markets[market.Symbol] = market
	return nil
}

func (m *MemoryStore) ListMarkets(_ context.Context) ([]*types.Market, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]*types.Market, 0, len(m.markets))
	for _, mk := range m.markets {
		out = append(out, mk)
	}
	return out, nil
}

func (m *MemoryStore) Close() error { return nil }
