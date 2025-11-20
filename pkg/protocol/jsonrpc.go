package protocol

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"sync"
	"time"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

// JSONRPCServer provides a JSON-RPC 2.0 interface for the CEX.
// All trading operations go through Engine.SubmitOrder() for compliance.
//
// Methods:
//   cex.listMarkets       - List all markets
//   cex.getMarket         - Get a single market
//   cex.getOrderBook      - Get orderbook snapshot
//   cex.submitOrder       - Submit an order (compliance pipeline)
//   cex.cancelOrder       - Cancel an open order
//   cex.getOrder          - Get order by ID
//   cex.listOrders        - List orders for an account
//   cex.listTrades        - List trades for an account
//   cex.ping              - Health check
type JSONRPCServer struct {
	engine      *engine.Engine
	matchEngine *engine.MatchEngine
	rateLimiter *ipRateLimiter
}

func NewJSONRPCServer(eng *engine.Engine, me *engine.MatchEngine) *JSONRPCServer {
	return &JSONRPCServer{
		engine:      eng,
		matchEngine: me,
		rateLimiter: newIPRateLimiter(100, time.Second),
	}
}

type rpcRequest struct {
	Jsonrpc string          `json:"jsonrpc"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params"`
	ID      interface{}     `json:"id"`
}

func (s *JSONRPCServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ip := clientIP(r)
	if !s.rateLimiter.allow(ip) {
		w.Header().Set("Retry-After", "1")
		http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req rpcRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		s.writeErr(w, nil, -32700, "parse error")
		return
	}
	if req.Jsonrpc != "2.0" {
		s.writeErr(w, req.ID, -32600, "invalid request")
		return
	}

	switch req.Method {
	case "cex.ping":
		s.writeResult(w, req.ID, map[string]interface{}{
			"status": "ok", "service": "lux-cex", "timestamp": time.Now().Unix(),
		})

	case "cex.listMarkets":
		s.writeResult(w, req.ID, s.engine.ListMarkets())

	case "cex.getMarket":
		var p struct{ Symbol string `json:"symbol"` }
		json.Unmarshal(req.Params, &p)
		m, ok := s.engine.GetMarket(p.Symbol)
		if !ok {
			s.writeErr(w, req.ID, -32001, "market not found")
			return
		}
		s.writeResult(w, req.ID, m)

	case "cex.getOrderBook":
		var p struct{ Symbol string `json:"symbol"` }
		json.Unmarshal(req.Params, &p)
		if s.matchEngine == nil {
			s.writeErr(w, req.ID, -32002, "orderbook not available")
			return
		}
		snap := s.matchEngine.GetSnapshot(p.Symbol)
		if snap == nil {
			s.writeErr(w, req.ID, -32001, "market not found")
			return
		}
		s.writeResult(w, req.ID, snap)

	case "cex.submitOrder":
		var p struct {
			AccountID   string `json:"account_id"`
			UserID      string `json:"user_id"`
			OrgID       string `json:"org_id"`
			Symbol      string `json:"symbol"`
			Side        string `json:"side"`
			Type        string `json:"type"`
			TimeInForce string `json:"time_in_force"`
			Qty         string `json:"qty"`
			Notional    string `json:"notional"`
			LimitPrice  string `json:"limit_price"`
			StopPrice   string `json:"stop_price"`
			ClientOrdID string `json:"client_order_id"`
		}
		if err := json.Unmarshal(req.Params, &p); err != nil {
			s.writeErr(w, req.ID, -32602, "invalid params")
			return
		}
		order, err := s.engine.SubmitOrder(context.Background(), p.AccountID, p.UserID, p.OrgID, &types.SubmitOrderRequest{
			Symbol:      p.Symbol,
			Side:        types.Side(p.Side),
			Type:        types.OrderType(p.Type),
			TimeInForce: types.TimeInForce(p.TimeInForce),
			Qty:         p.Qty,
			Notional:    p.Notional,
			LimitPrice:  p.LimitPrice,
			StopPrice:   p.StopPrice,
			ClientOrdID: p.ClientOrdID,
		})
		if err != nil {
			s.writeErr(w, req.ID, -32003, err.Error())
			return
		}
		s.writeResult(w, req.ID, order)

	case "cex.cancelOrder":
		var p struct{ OrderID string `json:"order_id"` }
		json.Unmarshal(req.Params, &p)
		order, err := s.engine.CancelOrder(context.Background(), p.OrderID)
		if err != nil {
			s.writeErr(w, req.ID, -32003, err.Error())
			return
		}
		s.writeResult(w, req.ID, order)

	case "cex.getOrder":
		var p struct{ OrderID string `json:"order_id"` }
		json.Unmarshal(req.Params, &p)
		order, ok := s.engine.GetOrder(p.OrderID)
		if !ok {
			s.writeErr(w, req.ID, -32001, "order not found")
			return
		}
		s.writeResult(w, req.ID, order)

	case "cex.listOrders":
		var p struct{ AccountID string `json:"account_id"` }
		json.Unmarshal(req.Params, &p)
		s.writeResult(w, req.ID, s.engine.ListOrders(p.AccountID))

	case "cex.listTrades":
		var p struct{ AccountID string `json:"account_id"` }
		json.Unmarshal(req.Params, &p)
		s.writeResult(w, req.ID, s.engine.ListTrades(p.AccountID))

	default:
		s.writeErr(w, req.ID, -32601, "method not found")
	}
}

func (s *JSONRPCServer) writeResult(w http.ResponseWriter, id interface{}, result interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"jsonrpc": "2.0", "result": result, "id": id,
	})
}

func (s *JSONRPCServer) writeErr(w http.ResponseWriter, id interface{}, code int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"jsonrpc": "2.0",
		"error":   map[string]interface{}{"code": code, "message": msg},
		"id":      id,
	})
}

// --- IP Rate Limiter ---

type ipRateLimiter struct {
	entries map[string]*rlEntry
	mu      sync.RWMutex
	limit   int
	window  time.Duration
}

type rlEntry struct {
	count     int
	resetTime time.Time
}

func newIPRateLimiter(limit int, window time.Duration) *ipRateLimiter {
	rl := &ipRateLimiter{
		entries: make(map[string]*rlEntry),
		limit:   limit,
		window:  window,
	}
	go rl.cleanup()
	return rl
}

func (rl *ipRateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	now := time.Now()
	e, ok := rl.entries[ip]
	if !ok || now.After(e.resetTime) {
		rl.entries[ip] = &rlEntry{count: 1, resetTime: now.Add(rl.window)}
		return true
	}
	if e.count >= rl.limit {
		return false
	}
	e.count++
	return true
}

func (rl *ipRateLimiter) cleanup() {
	ticker := time.NewTicker(rl.window)
	defer ticker.Stop()
	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		for ip, e := range rl.entries {
			if now.After(e.resetTime) {
				delete(rl.entries, ip)
			}
		}
		rl.mu.Unlock()
	}
}

func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		for i, c := range xff {
			if c == ',' {
				return xff[:i]
			}
		}
		return xff
	}
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}
