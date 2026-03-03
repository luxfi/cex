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
		if os.Getenv("CEX_DEMO_MODE") == "" {
			log.Fatal().Msg("No execution providers configured. Set provider env vars (ALPACA_API_KEY, etc.) or CEX_DEMO_MODE=1.")
		}
		log.Warn().Msg("Demo mode: no execution providers, matching engine only")
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
	type mkt struct {
		sym, base, quote string
		class            types.AssetClass
		tick, lot        string
		maker, taker     string
		kyc, accred      bool
	}

	markets := []mkt{
		// ── Native crypto ──
		{"LUX-USD", "LUX", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"ZOO-USD", "ZOO", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},

		// ── Major crypto ──
		{"BTC-USD", "BTC", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"ETH-USD", "ETH", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"SOL-USD", "SOL", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"AVAX-USD", "AVAX", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"LINK-USD", "LINK", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"DOGE-USD", "DOGE", "USD", types.AssetClassCrypto, "0.0001", "0.00000001", "0.001", "0.002", true, false},
		{"ADA-USD", "ADA", "USD", types.AssetClassCrypto, "0.0001", "0.00000001", "0.001", "0.002", true, false},
		{"DOT-USD", "DOT", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"MATIC-USD", "MATIC", "USD", types.AssetClassCrypto, "0.0001", "0.00000001", "0.001", "0.002", true, false},
		{"UNI-USD", "UNI", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"XRP-USD", "XRP", "USD", types.AssetClassCrypto, "0.0001", "0.00000001", "0.001", "0.002", true, false},
		{"ATOM-USD", "ATOM", "USD", types.AssetClassCrypto, "0.01", "0.00000001", "0.001", "0.002", true, false},
		{"ARB-USD", "ARB", "USD", types.AssetClassCrypto, "0.0001", "0.00000001", "0.001", "0.002", true, false},
		{"OP-USD", "OP", "USD", types.AssetClassCrypto, "0.001", "0.00000001", "0.001", "0.002", true, false},

		// ── Stablecoins ──
		{"USDC-USD", "USDC", "USD", types.AssetClassCrypto, "0.0001", "0.01", "0.0001", "0.0002", true, false},
		{"USDT-USD", "USDT", "USD", types.AssetClassCrypto, "0.0001", "0.01", "0.0001", "0.0002", true, false},

		// ── Precious metals (spot) ──
		{"XAU-USD", "XAU", "USD", types.AssetClassPreciousMetals, "0.01", "0.001", "0.0005", "0.001", true, false},
		{"XAG-USD", "XAG", "USD", types.AssetClassPreciousMetals, "0.01", "0.001", "0.0005", "0.001", true, false},
		{"XPT-USD", "XPT", "USD", types.AssetClassPreciousMetals, "0.01", "0.001", "0.0005", "0.001", true, false},
		{"XPD-USD", "XPD", "USD", types.AssetClassPreciousMetals, "0.01", "0.001", "0.0005", "0.001", true, false},

		// ── Commodities ──
		{"CL-USD", "CL", "USD", types.AssetClassCommodities, "0.01", "0.01", "0.0005", "0.001", true, false},   // Crude Oil
		{"NG-USD", "NG", "USD", types.AssetClassCommodities, "0.001", "0.1", "0.0005", "0.001", true, false},    // Natural Gas
		{"HG-USD", "HG", "USD", types.AssetClassCommodities, "0.0001", "0.01", "0.0005", "0.001", true, false},  // Copper

		// ── US Equities ──
		{"AAPL-USD", "AAPL", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"MSFT-USD", "MSFT", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"GOOG-USD", "GOOG", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"AMZN-USD", "AMZN", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"NVDA-USD", "NVDA", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"TSLA-USD", "TSLA", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"META-USD", "META", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"JPM-USD", "JPM", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"V-USD", "V", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"JNJ-USD", "JNJ", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"WMT-USD", "WMT", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"SPY-USD", "SPY", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"QQQ-USD", "QQQ", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"DIA-USD", "DIA", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"IWM-USD", "IWM", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"AMD-USD", "AMD", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"COIN-USD", "COIN", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},
		{"PLTR-USD", "PLTR", "USD", types.AssetClassUSEquity, "0.01", "0.001", "0.0002", "0.0005", true, false},

		// ── Forex ──
		{"EUR-USD", "EUR", "USD", types.AssetClassForex, "0.00001", "1000", "0.00005", "0.0001", true, false},
		{"GBP-USD", "GBP", "USD", types.AssetClassForex, "0.00001", "1000", "0.00005", "0.0001", true, false},
		{"JPY-USD", "JPY", "USD", types.AssetClassForex, "0.001", "1000", "0.00005", "0.0001", true, false},
		{"CHF-USD", "CHF", "USD", types.AssetClassForex, "0.00001", "1000", "0.00005", "0.0001", true, false},
		{"AUD-USD", "AUD", "USD", types.AssetClassForex, "0.00001", "1000", "0.00005", "0.0001", true, false},
		{"CAD-USD", "CAD", "USD", types.AssetClassForex, "0.00001", "1000", "0.00005", "0.0001", true, false},
	}

	for _, m := range markets {
		if _, exists := eng.GetMarket(m.sym); exists {
			continue
		}
		eng.RegisterMarket(&types.Market{
			Symbol: m.sym, AssetClass: m.class,
			BaseCurrency: m.base, QuoteCurrency: m.quote,
			Status: "active", TickSize: m.tick, LotSize: m.lot,
			MakerFee: m.maker, TakerFee: m.taker,
			Tradable: true, Fractionable: true,
			RequiresKYC: m.kyc, RequiresAccred: m.accred,
		})
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
