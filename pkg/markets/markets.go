package markets

import (
	"context"
	"log/slog"
	"strings"

	"github.com/luxfi/broker/pkg/provider"
	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

// DefaultMarket defines a market to register on the engine with explicit
// parameters. Use RegisterDefaults to batch-register these.
type DefaultMarket struct {
	Symbol, Base, Quote string
	Class               types.AssetClass
	Tick, Lot           string
	MakerFee, TakerFee string
	RequiresKYC         bool
	Fractionable        bool
}

// RegisterFromProviders queries every provider in the registry for tradable
// assets and registers them as CEX markets on the engine. Returns the total
// number of new markets registered.
func RegisterFromProviders(ctx context.Context, registry *provider.Registry, eng *engine.Engine) int {
	total := 0
	for _, provName := range registry.List() {
		p, err := registry.Get(provName)
		if err != nil {
			continue
		}
		assets, err := p.ListAssets(ctx, "")
		if err != nil {
			slog.Warn("failed to list assets", "provider", provName, "error", err)
			continue
		}
		count := 0
		for _, a := range assets {
			if !a.Tradable {
				continue
			}
			sym := a.Symbol
			assetClass := types.MapAssetClass(a.Class)
			if assetClass == types.AssetClassCrypto {
				sym = strings.ReplaceAll(sym, "/", "-")
			}
			if _, exists := eng.GetMarket(sym); exists {
				continue
			}
			eng.RegisterMarket(&types.Market{
				Symbol:        sym,
				AssetClass:    assetClass,
				BaseCurrency:  a.Symbol,
				QuoteCurrency: "USD",
				Status:        "active",
				TickSize:      "0.01",
				LotSize:       types.LotSizeForClass(assetClass),
				MakerFee:      "0.001",
				TakerFee:      "0.002",
				Tradable:      true,
				Fractionable:  a.Fractionable,
				RequiresKYC:   assetClass == types.AssetClassUSEquity,
			})
			count++
		}
		slog.Info("markets registered from provider", "provider", provName, "markets", count)
		total += count
	}
	return total
}

// RegisterDefaults registers a list of explicit default markets on the engine.
// Markets that already exist are skipped. Returns the number registered.
func RegisterDefaults(eng *engine.Engine, defaults []DefaultMarket) int {
	n := 0
	for _, m := range defaults {
		if _, exists := eng.GetMarket(m.Symbol); exists {
			continue
		}
		eng.RegisterMarket(&types.Market{
			Symbol:        m.Symbol,
			AssetClass:    m.Class,
			BaseCurrency:  m.Base,
			QuoteCurrency: m.Quote,
			Status:        "active",
			TickSize:      m.Tick,
			LotSize:       m.Lot,
			MakerFee:      m.MakerFee,
			TakerFee:      m.TakerFee,
			Tradable:      true,
			Fractionable:  m.Fractionable,
			RequiresKYC:   m.RequiresKYC,
		})
		n++
	}
	return n
}
