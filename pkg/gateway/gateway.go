package gateway

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/luxfi/cex/pkg/compliance"
	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/reporting"
	"github.com/luxfi/cex/pkg/surveillance"
	"github.com/luxfi/cex/pkg/types"
)

// Gateway is the HTTP API for the CEX.
type Gateway struct {
	engine       *engine.Engine
	matcher      *engine.Matcher
	matchEngine  *engine.MatchEngine
	compliance   *compliance.Service
	reporting    *reporting.Service
	surveillance *surveillance.Service
	router       chi.Router
	server       *http.Server
}

func New(eng *engine.Engine, comp *compliance.Service, rep *reporting.Service, surv *surveillance.Service, addr string) *Gateway {
	g := &Gateway{
		engine:       eng,
		compliance:   comp,
		reporting:    rep,
		surveillance: surv,
	}

	r := chi.NewRouter()
	r.Use(chimw.RequestID)
	r.Use(chimw.RealIP)
	r.Use(chimw.Recoverer)
	r.Use(chimw.Timeout(30 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://lux.financial", "https://app.lux.financial", "https://cex.lux.network", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, map[string]string{"status": "ok", "service": "lux-cex"})
	})

	r.Route("/api/v1", func(r chi.Router) {
		// JWT auth — enabled when CEX_JWT_SECRET is set, otherwise dev mode (open)
		if secret := os.Getenv("CEX_JWT_SECRET"); secret != "" {
			issuer := os.Getenv("CEX_JWT_ISSUER")
			if issuer == "" {
				issuer = "https://hanzo.id"
			}
			r.Use(JWTAuth(secret, issuer))
		}

		// Markets (public read)
		r.Get("/markets", g.listMarkets)
		r.Get("/markets/{symbol}", g.getMarket)
		r.Get("/markets/{symbol}/book", g.getOrderBook)

		// Accounts
		r.Post("/accounts/{accountId}/register", g.registerAccount)
		r.Get("/accounts/{accountId}/status", g.getAccountStatus)

		// Orders
		r.Post("/accounts/{accountId}/orders", g.submitOrder)
		r.Get("/accounts/{accountId}/orders", g.listOrders)
		r.Get("/accounts/{accountId}/orders/{orderId}", g.getOrder)
		r.Delete("/accounts/{accountId}/orders/{orderId}", g.cancelOrder)

		// Trades
		r.Get("/accounts/{accountId}/trades", g.listTrades)

		// Admin (requires admin role when auth is enabled)
		r.Route("/admin", func(r chi.Router) {
			if os.Getenv("CEX_JWT_SECRET") != "" {
				r.Use(AdminOnly)
			}
			r.Get("/reports/finra", g.listFINRAReports)
			r.Get("/reports/ats", g.generateATSReport)
			r.Get("/surveillance/alerts", g.listAlerts)
			r.Post("/markets/{symbol}/halt", g.haltMarket)
			r.Post("/markets/{symbol}/resume", g.resumeMarket)
		})
	})

	g.router = r
	g.server = &http.Server{
		Addr:         addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 60 * time.Second,
		IdleTimeout:  120 * time.Second,
	}
	return g
}

// SetMatcher sets the matcher for orderbook depth queries.
func (g *Gateway) SetMatcher(m *engine.Matcher) {
	g.matcher = m
}

// SetMatchEngine sets the high-performance match engine for orderbook queries.
func (g *Gateway) SetMatchEngine(me *engine.MatchEngine) {
	g.matchEngine = me
}

// MountHandler mounts an http.Handler at a path on the gateway router.
func (g *Gateway) MountHandler(pattern string, handler http.Handler) {
	g.router.Handle(pattern, handler)
}

// MountHandlerFunc mounts an http.HandlerFunc at a path on the gateway router.
func (g *Gateway) MountHandlerFunc(pattern string, handlerFunc http.HandlerFunc) {
	g.router.HandleFunc(pattern, handlerFunc)
}

func (g *Gateway) Start() error  { return g.server.ListenAndServe() }
func (g *Gateway) Shutdown() error { return g.server.Close() }

// --- Market handlers ---

func (g *Gateway) listMarkets(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, 200, g.engine.ListMarkets())
}

func (g *Gateway) getMarket(w http.ResponseWriter, r *http.Request) {
	m, ok := g.engine.GetMarket(chi.URLParam(r, "symbol"))
	if !ok {
		writeError(w, 404, "market not found")
		return
	}
	writeJSON(w, 200, m)
}

func (g *Gateway) getOrderBook(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")

	// Try high-performance match engine first
	if g.matchEngine != nil {
		snap := g.matchEngine.GetSnapshot(symbol)
		if snap != nil {
			writeJSON(w, 200, snap)
			return
		}
	}

	// Fall back to legacy matcher
	if g.matcher != nil {
		depth := 20
		if d := r.URL.Query().Get("depth"); d != "" {
			if v, err := strconv.Atoi(d); err == nil && v > 0 {
				depth = v
			}
		}
		snap, err := g.matcher.GetSnapshot(symbol, depth)
		if err != nil {
			writeError(w, 404, err.Error())
			return
		}
		writeJSON(w, 200, snap)
		return
	}

	writeError(w, 501, "order book not available")
}

// --- Account handlers ---

func (g *Gateway) registerAccount(w http.ResponseWriter, r *http.Request) {
	accountID := chi.URLParam(r, "accountId")
	var req struct {
		Jurisdiction string  `json:"jurisdiction"`
		Country      string  `json:"country"`
		ClientType   string  `json:"client_type"`
		KYCLevel     int     `json:"kyc_level"`
		AMLCleared   bool    `json:"aml_cleared"`
		Accredited   bool    `json:"accredited"`
		Professional bool    `json:"professional"`
		Sanctioned      bool    `json:"sanctioned"`
		MaxOrderSize    float64 `json:"max_order_size"`
		DailyLimit      float64 `json:"daily_limit"`
		PEP             string  `json:"pep_status"`
		SourceOfFunds   string  `json:"source_of_funds"`
		SOFVerified     bool    `json:"sof_verified"`
		AdverseMedia    bool    `json:"adverse_media"`
		HighRiskCountry bool    `json:"high_risk_country"`
		EDDRequired     bool    `json:"edd_required"`
		TaxResidency    string  `json:"tax_residency"`
		EntityID        string  `json:"entity_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, 400, "invalid request body")
		return
	}

	jur := compliance.Jurisdiction(req.Jurisdiction)
	if jur == "" {
		jur = compliance.JurisdictionUS
	}
	ct := compliance.ClientType(req.ClientType)
	if ct == "" {
		ct = compliance.ClientIndividual
	}

	status := &compliance.AccountStatus{
		AccountID:       accountID,
		ClientType:      ct,
		Jurisdiction:    jur,
		Country:         req.Country,
		KYC:             compliance.KYCLevel(req.KYCLevel),
		AMLCleared:      req.AMLCleared,
		Accredited:      req.Accredited,
		Professional:    req.Professional,
		Sanctioned:      req.Sanctioned,
		MaxOrderSize:    req.MaxOrderSize,
		DailyLimit:      req.DailyLimit,
		PEP:             compliance.PEPStatus(req.PEP),
		SourceOfFunds:   compliance.SourceOfFunds(req.SourceOfFunds),
		SOFVerified:     req.SOFVerified,
		AdverseMedia:    req.AdverseMedia,
		HighRiskCountry: req.HighRiskCountry,
		EDDRequired:     req.EDDRequired,
		TaxResidency:    req.TaxResidency,
		EntityID:        req.EntityID,
	}
	g.compliance.SetAccountStatus(status)
	writeJSON(w, 200, status)
}

func (g *Gateway) getAccountStatus(w http.ResponseWriter, r *http.Request) {
	status, ok := g.compliance.GetAccountStatus(chi.URLParam(r, "accountId"))
	if !ok {
		writeError(w, 404, "account not registered")
		return
	}
	writeJSON(w, 200, status)
}

// --- Order handlers ---

func (g *Gateway) submitOrder(w http.ResponseWriter, r *http.Request) {
	accountID := chi.URLParam(r, "accountId")

	var req types.SubmitOrderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, 400, "invalid request body")
		return
	}

	// Prefer JWT claims, fall back to headers (dev mode)
	userID := UserIDFromContext(r.Context())
	if userID == "" {
		userID = r.Header.Get("X-User-ID")
	}
	orgID := OrgIDFromContext(r.Context())
	if orgID == "" {
		orgID = r.Header.Get("X-Org-ID")
	}

	order, err := g.engine.SubmitOrder(r.Context(), accountID, userID, orgID, &req)
	if err != nil {
		writeError(w, 422, err.Error())
		return
	}
	writeJSON(w, 201, order)
}

func (g *Gateway) listOrders(w http.ResponseWriter, r *http.Request) {
	orders := g.engine.ListOrders(chi.URLParam(r, "accountId"))
	writeJSON(w, 200, orders)
}

func (g *Gateway) getOrder(w http.ResponseWriter, r *http.Request) {
	order, ok := g.engine.GetOrder(chi.URLParam(r, "orderId"))
	if !ok {
		writeError(w, 404, "order not found")
		return
	}
	writeJSON(w, 200, order)
}

func (g *Gateway) cancelOrder(w http.ResponseWriter, r *http.Request) {
	order, err := g.engine.CancelOrder(r.Context(), chi.URLParam(r, "orderId"))
	if err != nil {
		writeError(w, 422, err.Error())
		return
	}
	writeJSON(w, 200, order)
}

// --- Trade handlers ---

func (g *Gateway) listTrades(w http.ResponseWriter, r *http.Request) {
	trades := g.engine.ListTrades(chi.URLParam(r, "accountId"))
	writeJSON(w, 200, trades)
}

// --- Admin handlers ---

func (g *Gateway) listFINRAReports(w http.ResponseWriter, r *http.Request) {
	reports := g.reporting.GetReports(nil, nil)
	writeJSON(w, 200, reports)
}

func (g *Gateway) generateATSReport(w http.ResponseWriter, r *http.Request) {
	quarter := r.URL.Query().Get("quarter")
	if quarter == "" {
		quarter = currentQuarter()
	}
	report := g.reporting.GenerateATSReport(quarter)
	writeJSON(w, 200, report)
}

func (g *Gateway) listAlerts(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	alerts := g.surveillance.GetAlerts(status)
	writeJSON(w, 200, alerts)
}

func (g *Gateway) haltMarket(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")
	var body struct {
		Reason string `json:"reason"`
	}
	json.NewDecoder(r.Body).Decode(&body)
	if err := g.engine.HaltMarket(symbol, body.Reason); err != nil {
		writeError(w, 404, err.Error())
		return
	}
	writeJSON(w, 200, map[string]string{"status": "halted", "symbol": symbol})
}

func (g *Gateway) resumeMarket(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")
	if err := g.engine.ResumeMarket(symbol); err != nil {
		writeError(w, 404, err.Error())
		return
	}
	writeJSON(w, 200, map[string]string{"status": "active", "symbol": symbol})
}

// --- Helpers ---

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

func currentQuarter() string {
	now := time.Now()
	q := (int(now.Month())-1)/3 + 1
	return now.Format("2006") + "-Q" + string(rune('0'+q))
}
