package execution

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/rs/zerolog/log"

	brokerprovider "github.com/luxfi/broker/pkg/provider"
	brokerrouter "github.com/luxfi/broker/pkg/router"
	brokertypes "github.com/luxfi/broker/pkg/types"

	"github.com/luxfi/cex/pkg/types"
)

// BrokerExec routes orders through the Lux Broker's Smart Order Router
// to real execution venues (Alpaca, IBKR, BitGo, etc.).
type BrokerExec struct {
	registry *brokerprovider.Registry
	sor      *brokerrouter.Router

	// accountMap maps provider name → default provider account ID.
	// e.g. "alpaca" → "75e9f5d4-..."
	mu         sync.RWMutex
	accountMap map[string]string
}

func New(registry *brokerprovider.Registry) *BrokerExec {
	return &BrokerExec{
		registry:   registry,
		sor:        brokerrouter.New(registry),
		accountMap: make(map[string]string),
	}
}

// SetProviderAccount maps a provider name to a default sub-account ID.
func (b *BrokerExec) SetProviderAccount(provider, accountID string) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.accountMap[provider] = accountID
	log.Info().Str("provider", provider).Str("account", accountID).Msg("Provider account mapped")
}

// AutoDiscoverAccounts queries each provider and caches the first active account.
func (b *BrokerExec) AutoDiscoverAccounts(ctx context.Context) {
	for _, name := range b.registry.List() {
		p, err := b.registry.Get(name)
		if err != nil {
			continue
		}
		accts, err := p.ListAccounts(ctx)
		if err != nil || len(accts) == 0 {
			continue
		}
		for _, a := range accts {
			if strings.EqualFold(a.Status, "active") {
				b.SetProviderAccount(name, a.ProviderID)
				break
			}
		}
	}
}

// Match implements engine.MatchFunc — routes an order through the broker SOR.
func (b *BrokerExec) Match(ctx context.Context, order *types.Order) ([]*types.Trade, error) {
	// Normalize symbol for broker (CEX uses BTC-USD, broker uses BTC/USD)
	brokerSymbol := order.Symbol
	if order.AssetClass == types.AssetClassCrypto {
		brokerSymbol = strings.ReplaceAll(order.Symbol, "-", "/")
	}

	// Find best route
	best, err := b.sor.FindBestProvider(ctx, brokerSymbol, string(order.Side))
	if err != nil {
		return nil, fmt.Errorf("routing failed for %s: %w", order.Symbol, err)
	}

	b.mu.RLock()
	accountID, ok := b.accountMap[best.Provider]
	b.mu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("no account configured for provider %s", best.Provider)
	}

	// Build broker order request
	brokerReq := &brokertypes.CreateOrderRequest{
		Symbol:      brokerSymbol,
		Side:        string(order.Side),
		Type:        string(order.Type),
		TimeInForce: string(order.TimeInForce),
		Qty:         order.Qty,
		Notional:    order.Notional,
		LimitPrice:  order.LimitPrice,
		StopPrice:   order.StopPrice,
	}

	// Execute through broker provider
	p, err := b.registry.Get(best.Provider)
	if err != nil {
		return nil, err
	}

	brokerOrder, err := p.CreateOrder(ctx, accountID, brokerReq)
	if err != nil {
		return nil, fmt.Errorf("execution via %s failed: %w", best.Provider, err)
	}

	log.Info().
		Str("provider", best.Provider).
		Str("symbol", brokerSymbol).
		Str("order_id", brokerOrder.ProviderID).
		Str("status", brokerOrder.Status).
		Msg("Order executed via broker")

	// Map broker response to CEX trade
	trade := &types.Trade{
		Symbol: order.Symbol,
		Side:   order.Side,
		Price:  brokerOrder.FilledAvgPrice,
		Qty:    order.Qty,
		Venue:  best.Provider,
	}

	// If the order was filled, use filled price/qty
	if brokerOrder.FilledQty != "" {
		trade.Qty = brokerOrder.FilledQty
	}

	// Store execution venue on the order for audit trail
	order.ExecutionVenue = best.Provider

	return []*types.Trade{trade}, nil
}

// ListProviders returns available execution venues.
func (b *BrokerExec) ListProviders() []string {
	return b.registry.List()
}

// GetSOR returns the smart order router for direct route queries.
func (b *BrokerExec) GetSOR() *brokerrouter.Router {
	return b.sor
}

// GetRegistry returns the provider registry for direct provider access.
func (b *BrokerExec) GetRegistry() *brokerprovider.Registry {
	return b.registry
}
