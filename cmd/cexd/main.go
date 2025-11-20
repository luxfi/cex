package main

import (
	"context"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	brokerprovider "github.com/luxfi/broker/pkg/provider"
	"github.com/luxfi/broker/pkg/provider/alpaca"
	"github.com/luxfi/broker/pkg/provider/binance"
	"github.com/luxfi/broker/pkg/provider/bitgo"
	"github.com/luxfi/broker/pkg/provider/coinbase"
	"github.com/luxfi/broker/pkg/provider/falcon"
	"github.com/luxfi/broker/pkg/provider/finix"
	"github.com/luxfi/broker/pkg/provider/gemini"
	"github.com/luxfi/broker/pkg/provider/ibkr"
	"github.com/luxfi/broker/pkg/provider/kraken"
	"github.com/luxfi/broker/pkg/provider/sfox"

	"github.com/luxfi/cex/pkg/compliance"
	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/execution"
	"github.com/luxfi/cex/pkg/gateway"
	"github.com/luxfi/cex/pkg/protocol"
	"github.com/luxfi/cex/pkg/reporting"
	"github.com/luxfi/cex/pkg/surveillance"
	"github.com/luxfi/cex/pkg/types"
)

func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	listenAddr := envOr("CEX_LISTEN", ":8091")
	wsAddr := envOr("CEX_WS_LISTEN", ":8092")
	zapAddr := envOr("CEX_ZAP_LISTEN", ":8093")
	fixAddr := envOr("CEX_FIX_LISTEN", ":8094")
	fixCompID := envOr("CEX_FIX_COMP_ID", "LUX-CEX")
	atsName := envOr("CEX_ATS_NAME", "Lux ATS")
	crdID := envOr("CEX_CRD_ID", "000000")

	// --- Broker Provider Registry ---
	registry := brokerprovider.NewRegistry()

	if key := os.Getenv("ALPACA_API_KEY"); key != "" {
		secret := os.Getenv("ALPACA_API_SECRET")
		baseURL := envOr("ALPACA_BASE_URL", alpaca.SandboxURL)
		registry.Register(alpaca.New(alpaca.Config{
			BaseURL:   baseURL,
			APIKey:    key,
			APISecret: secret,
		}))
		log.Info().Str("url", baseURL).Msg("Alpaca provider registered")
	}

	if token := os.Getenv("BITGO_ACCESS_TOKEN"); token != "" {
		registry.Register(bitgo.New(bitgo.Config{
			BaseURL:     envOr("BITGO_BASE_URL", bitgo.TestURL),
			AccessToken: token,
			Enterprise:  os.Getenv("BITGO_ENTERPRISE"),
		}))
		log.Info().Msg("BitGo provider registered")
	}

	if token := os.Getenv("IBKR_ACCESS_TOKEN"); token != "" {
		registry.Register(ibkr.New(ibkr.Config{
			GatewayURL:  envOr("IBKR_GATEWAY_URL", ibkr.DefaultGatewayURL),
			AccountID:   os.Getenv("IBKR_ACCOUNT_ID"),
			AccessToken: token,
			ConsumerKey: os.Getenv("IBKR_CONSUMER_KEY"),
		}))
		log.Info().Msg("IBKR provider registered")
	}

	if key := os.Getenv("FALCON_API_KEY"); key != "" {
		registry.Register(falcon.New(falcon.Config{
			BaseURL:    envOr("FALCON_BASE_URL", falcon.SandboxURL),
			APIKey:     key,
			APISecret:  os.Getenv("FALCON_API_SECRET"),
			Passphrase: os.Getenv("FALCON_PASSPHRASE"),
		}))
		log.Info().Msg("FalconX provider registered")
	}

	if user := os.Getenv("FINIX_USERNAME"); user != "" {
		registry.Register(finix.New(finix.Config{
			BaseURL:  envOr("FINIX_BASE_URL", finix.SandboxURL),
			Username: user,
			Password: os.Getenv("FINIX_PASSWORD"),
		}))
		log.Info().Msg("Finix provider registered")
	}

	if key := os.Getenv("SFOX_API_KEY"); key != "" {
		registry.Register(sfox.New(sfox.Config{
			BaseURL: envOr("SFOX_BASE_URL", sfox.ProdURL),
			APIKey:  key,
		}))
		log.Info().Msg("SFOX provider registered")
	}

	if key := os.Getenv("COINBASE_API_KEY"); key != "" {
		registry.Register(coinbase.New(coinbase.Config{
			BaseURL:   envOr("COINBASE_BASE_URL", coinbase.ProdURL),
			APIKey:    key,
			APISecret: os.Getenv("COINBASE_API_SECRET"),
		}))
		log.Info().Msg("Coinbase provider registered")
	}

	if key := os.Getenv("BINANCE_API_KEY"); key != "" {
		registry.Register(binance.New(binance.Config{
			BaseURL:   envOr("BINANCE_BASE_URL", binance.ProdURL),
			APIKey:    key,
			APISecret: os.Getenv("BINANCE_API_SECRET"),
		}))
		log.Info().Msg("Binance provider registered")
	}

	if key := os.Getenv("KRAKEN_API_KEY"); key != "" {
		registry.Register(kraken.New(kraken.Config{
			BaseURL:   envOr("KRAKEN_BASE_URL", kraken.ProdURL),
			APIKey:    key,
			APISecret: os.Getenv("KRAKEN_API_SECRET"),
		}))
		log.Info().Msg("Kraken provider registered")
	}

	if key := os.Getenv("GEMINI_API_KEY"); key != "" {
		registry.Register(gemini.New(gemini.Config{
			BaseURL:   envOr("GEMINI_BASE_URL", gemini.ProdURL),
			APIKey:    key,
			APISecret: os.Getenv("GEMINI_API_SECRET"),
		}))
		log.Info().Msg("Gemini provider registered")
	}

	if len(registry.List()) == 0 {
		log.Fatal().Msg("No execution providers configured. Set provider env vars (ALPACA_API_KEY, etc.).")
	}

	// --- Broker Execution Layer (external venues) ---
	exec := execution.New(registry)

	// Auto-discover sub-accounts from each provider
	ctx := context.Background()
	exec.AutoDiscoverAccounts(ctx)

	// Manual account overrides from env
	if acct := os.Getenv("ALPACA_ACCOUNT_ID"); acct != "" {
		exec.SetProviderAccount("alpaca", acct)
	}
	if acct := os.Getenv("BITGO_WALLET_ID"); acct != "" {
		exec.SetProviderAccount("bitgo", acct)
	}

	// --- CEX Matching Engine (high-perf orderbook + broker routing) ---
	matchEngine := engine.NewMatchEngine()
	matchEngine.BrokerFallback = exec.Match // Unfilled orders route to broker-dealers

	// --- CEX Services ---
	complianceSvc := compliance.NewService()
	reportingSvc := reporting.NewService(atsName, crdID)
	surveillanceSvc := surveillance.NewService()

	// Multi-jurisdiction trade reporting (MiFID II, MAS, SFC)
	jurReporter := reporting.NewJurisdictionReporter()

	// Configure jurisdiction-specific reporting identifiers from env
	if frn := os.Getenv("FCA_FRN"); frn != "" {
		jurReporter.SetConfig(reporting.JurisdictionConfig{
			Jurisdiction: "UK", LicenseID: frn,
			VenueID: envOr("FCA_MIC", "XLON"), LEI: os.Getenv("ENTITY_LEI"),
		})
		log.Info().Str("frn", frn).Msg("UK/FCA reporting configured")
	}
	if cms := os.Getenv("MAS_CMS_LICENSE"); cms != "" {
		jurReporter.SetConfig(reporting.JurisdictionConfig{
			Jurisdiction: "SG", LicenseID: cms,
			VenueID: envOr("MAS_VENUE_ID", ""), LEI: os.Getenv("ENTITY_LEI"),
		})
		log.Info().Str("cms", cms).Msg("SG/MAS reporting configured")
	}
	if ce := os.Getenv("SFC_CE_NUMBER"); ce != "" {
		jurReporter.SetConfig(reporting.JurisdictionConfig{
			Jurisdiction: "HK", LicenseID: ce,
			VenueID: envOr("SFC_VENUE_ID", ""), LEI: os.Getenv("ENTITY_LEI"),
		})
		log.Info().Str("ce", ce).Msg("HK/SFC reporting configured")
	}

	// Single execution path: internal matching → broker fallback
	eng := engine.New(matchEngine.Match)

	// Wire compliance hooks
	eng.AddPreTradeCheck(complianceSvc.PreTradeCheck())
	eng.AddPreTradeCheck(complianceSvc.OfferingPreTradeCheck()) // offering-type checks across jurisdictions
	eng.AddPostTradeHook(reportingSvc.PostTradeHook())          // FINRA (US)
	eng.AddPostTradeHook(jurReporter.PostTradeHook())           // MiFID/MAS/SFC
	eng.AddPostTradeHook(surveillanceSvc.PostTradeHook())

	// Register markets from broker providers
	registerMarketsFromBroker(ctx, exec, eng)

	// Always register default markets as fallback
	registerDefaultMarkets(eng)

	// --- Protocol Servers ---

	// HTTP/REST gateway (primary API)
	gw := gateway.New(eng, complianceSvc, reportingSvc, surveillanceSvc, listenAddr)
	gw.SetMatchEngine(matchEngine)

	// JSON-RPC 2.0 (mounted on the REST gateway at /rpc)
	jsonRPC := protocol.NewJSONRPCServer(eng, matchEngine)
	gw.MountHandler("/rpc", jsonRPC)

	// WebSocket (real-time market data + trading)
	wsServer := protocol.NewWSServer(eng, matchEngine)
	gw.MountHandlerFunc("/ws", wsServer.HandleConnection)

	// ZAP binary protocol (HFT, separate TCP port)
	zapServer := protocol.NewZAPServer(eng, matchEngine, zapAddr)

	// FIX 4.4 (institutional trading, separate TCP port)
	fixServer := protocol.NewFIXServer(eng, matchEngine, fixAddr, fixCompID)

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	// Start all protocol servers
	wsServer.Start()

	if err := zapServer.Start(); err != nil {
		log.Fatal().Err(err).Msg("ZAP server failed to start")
	}
	if err := fixServer.Start(); err != nil {
		log.Fatal().Err(err).Msg("FIX server failed to start")
	}

	errCh := make(chan error, 1)
	go func() {
		log.Info().
			Str("http", listenAddr).
			Str("ws", wsAddr).
			Str("zap", zapAddr).
			Str("fix", fixAddr).
			Str("ats", atsName).
			Strs("providers", registry.List()).
			Msg("Lux CEX starting (REST + JSON-RPC + WebSocket + ZAP + FIX)")
		errCh <- gw.Start()
	}()

	select {
	case <-ctx.Done():
		log.Info().Msg("Shutting down...")
		wsServer.Shutdown()
		zapServer.Stop()
		fixServer.Stop()
		gw.Shutdown()
	case err := <-errCh:
		if err != nil {
			log.Fatal().Err(err).Msg("Server failed")
		}
	}
}

// registerMarketsFromBroker auto-discovers tradable assets from all providers
// and registers them as CEX markets.
func registerMarketsFromBroker(ctx context.Context, exec *execution.BrokerExec, eng *engine.Engine) {
	for _, provName := range exec.ListProviders() {
		p, err := exec.GetRegistry().Get(provName)
		if err != nil {
			continue
		}

		assets, err := p.ListAssets(ctx, "")
		if err != nil {
			log.Warn().Str("provider", provName).Err(err).Msg("Failed to list assets")
			continue
		}

		count := 0
		for _, a := range assets {
			if !a.Tradable {
				continue
			}

			sym := a.Symbol
			assetClass := mapAssetClass(a.Class)

			// Normalize crypto symbols (BTC/USD → BTC-USD)
			if assetClass == types.AssetClassCrypto {
				sym = strings.ReplaceAll(sym, "/", "-")
			}

			if _, exists := eng.GetMarket(sym); exists {
				continue // already registered
			}

			eng.RegisterMarket(&types.Market{
				Symbol:       sym,
				AssetClass:   assetClass,
				BaseCurrency: a.Symbol,
				QuoteCurrency: "USD",
				Status:       "active",
				TickSize:     "0.01",
				LotSize:      lotSizeForClass(assetClass),
				MakerFee:     "0.001",
				TakerFee:     "0.002",
				Tradable:     true,
				Fractionable: a.Fractionable,
				RequiresKYC:  assetClass == types.AssetClassUSEquity,
			})
			count++
		}
		log.Info().Str("provider", provName).Int("markets", count).Msg("Markets registered from broker")
	}
}

func mapAssetClass(class string) types.AssetClass {
	switch strings.ToLower(class) {
	case "us_equity":
		return types.AssetClassUSEquity
	case "intl_equity":
		return types.AssetClassIntlEquity
	case "crypto":
		return types.AssetClassCrypto
	case "forex", "fx":
		return types.AssetClassForex
	case "options":
		return types.AssetClassOptions
	case "futures":
		return types.AssetClassFutures
	case "fixed_income", "bond", "bonds", "treasury", "treasuries":
		return types.AssetClassFixedIncome
	case "municipal", "muni":
		return types.AssetClassMunicipal
	case "structured", "abs", "mbs", "cdo", "clo":
		return types.AssetClassStructured
	case "corporate_debt", "corporate_loan":
		return types.AssetClassCorporateDebt
	case "consumer_debt", "personal_loan":
		return types.AssetClassConsumerDebt
	case "real_estate", "reit":
		return types.AssetClassRealEstate
	case "commodities", "commodity":
		return types.AssetClassCommodities
	case "precious_metals", "gold", "silver", "platinum", "palladium":
		return types.AssetClassPreciousMetals
	case "private_equity", "pe":
		return types.AssetClassPrivateEquity
	case "venture", "vc":
		return types.AssetClassVenture
	case "private_credit":
		return types.AssetClassPrivateCredit
	case "cdp":
		return types.AssetClassCDP
	case "lp":
		return types.AssetClassLP
	default:
		return types.AssetClassUSEquity
	}
}

func lotSizeForClass(class types.AssetClass) string {
	switch class {
	case types.AssetClassCrypto, types.AssetClassCDP, types.AssetClassLP:
		return "0.00000001"
	case types.AssetClassForex:
		return "0.01"
	case types.AssetClassRealEstate:
		return "0.01" // fractional shares
	case types.AssetClassPreciousMetals:
		return "0.001" // fractional oz (gold, silver)
	case types.AssetClassFixedIncome, types.AssetClassMunicipal, types.AssetClassStructured,
		types.AssetClassCorporateDebt, types.AssetClassConsumerDebt:
		return "1000" // bonds trade in 1000 face value increments
	case types.AssetClassPrivateEquity, types.AssetClassVenture, types.AssetClassPrivateCredit:
		return "0.01" // fractional fund units
	default:
		return "1"
	}
}

func registerDefaultMarkets(eng *engine.Engine) {
	// LUX and ZOO tokens — always available as native markets
	for _, sym := range []string{"LUX-USD", "ZOO-USD"} {
		if _, exists := eng.GetMarket(sym); exists {
			continue
		}
		eng.RegisterMarket(&types.Market{
			Symbol: sym, AssetClass: types.AssetClassCrypto,
			BaseCurrency: sym[:3], QuoteCurrency: "USD",
			Status: "active", TickSize: "0.01", LotSize: "0.00000001",
			MakerFee: "0.001", TakerFee: "0.002",
			Tradable: true, Fractionable: true, RequiresKYC: true,
		})
	}

	// Precious metals (spot)
	preciousMetals := []struct{ sym, base string }{
		{"XAU-USD", "XAU"}, // Gold
		{"XAG-USD", "XAG"}, // Silver
		{"XPT-USD", "XPT"}, // Platinum
		{"XPD-USD", "XPD"}, // Palladium
	}
	for _, m := range preciousMetals {
		if _, exists := eng.GetMarket(m.sym); exists {
			continue
		}
		eng.RegisterMarket(&types.Market{
			Symbol: m.sym, AssetClass: types.AssetClassPreciousMetals,
			BaseCurrency: m.base, QuoteCurrency: "USD",
			Status: "active", TickSize: "0.01", LotSize: "0.001",
			MakerFee: "0.0005", TakerFee: "0.001",
			Tradable: true, Fractionable: true, RequiresKYC: true,
		})
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
