package store

import (
	"context"

	"github.com/luxfi/cex/pkg/types"
)

// Store is the persistence interface for CEX state.
type Store interface {
	SaveOrder(ctx context.Context, order *types.Order) error
	GetOrder(ctx context.Context, id string) (*types.Order, error)
	ListOrders(ctx context.Context, accountID string, limit, offset int) ([]*types.Order, error)
	UpdateOrderStatus(ctx context.Context, id string, status types.OrderStatus) error

	SaveTrade(ctx context.Context, trade *types.Trade) error
	GetTrade(ctx context.Context, id string) (*types.Trade, error)
	ListTrades(ctx context.Context, accountID string, limit, offset int) ([]*types.Trade, error)

	SaveMarket(ctx context.Context, market *types.Market) error
	ListMarkets(ctx context.Context) ([]*types.Market, error)

	Close() error
}
