package gateway

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/luxfi/cex/pkg/compliance"
	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/reporting"
	"github.com/luxfi/cex/pkg/surveillance"
	"github.com/luxfi/cex/pkg/types"
)

func noopMatch(_ context.Context, o *types.Order) ([]*types.Trade, error) {
	return []*types.Trade{{
		Symbol: o.Symbol,
		Side:   o.Side,
		Price:  "100.00",
		Qty:    o.Qty,
		Venue:  "test",
	}}, nil
}

func setupGateway() (*Gateway, *engine.Engine, *compliance.Service) {
	eng := engine.New(noopMatch)
	eng.RegisterMarket(&types.Market{
		Symbol:     "BTC-USD",
		AssetClass: types.AssetClassCrypto,
		Status:     "active",
		Tradable:   true,
	})
	eng.RegisterMarket(&types.Market{
		Symbol:     "AAPL",
		AssetClass: types.AssetClassUSEquity,
		Status:     "active",
		Tradable:   true,
	})

	comp := compliance.NewService()
	rep := reporting.NewService("Test ATS", "999999")
	surv := surveillance.NewService()

	gw := New(eng, comp, rep, surv, ":0")
	return gw, eng, comp
}

func doRequest(gw *Gateway, method, path string, body interface{}) *httptest.ResponseRecorder {
	var buf bytes.Buffer
	if body != nil {
		json.NewEncoder(&buf).Encode(body)
	}
	req := httptest.NewRequest(method, path, &buf)
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	gw.server.Handler.ServeHTTP(w, req)
	return w
}

func TestHealthz(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/healthz", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var resp map[string]string
	json.Unmarshal(w.Body.Bytes(), &resp)
	if resp["status"] != "ok" {
		t.Fatalf("expected ok, got %s", resp["status"])
	}
}

func TestListMarkets(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/markets", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var markets []*types.Market
	json.Unmarshal(w.Body.Bytes(), &markets)
	if len(markets) != 2 {
		t.Fatalf("expected 2 markets, got %d", len(markets))
	}
}

func TestGetMarket(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/markets/BTC-USD", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var m types.Market
	json.Unmarshal(w.Body.Bytes(), &m)
	if m.Symbol != "BTC-USD" {
		t.Fatalf("expected BTC-USD, got %s", m.Symbol)
	}
}

func TestGetMarket_NotFound(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/markets/NOPE", nil)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestRegisterAndGetAccount(t *testing.T) {
	gw, _, _ := setupGateway()

	// Register
	body := map[string]interface{}{
		"kyc_level":      2,
		"aml_cleared":    true,
		"max_order_size": 100000,
		"daily_limit":    500000,
	}
	w := doRequest(gw, "POST", "/api/v1/accounts/acct-1/register", body)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d: %s", w.Code, w.Body.String())
	}

	// Get status
	w = doRequest(gw, "GET", "/api/v1/accounts/acct-1/status", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var status compliance.AccountStatus
	json.Unmarshal(w.Body.Bytes(), &status)
	if status.KYC != compliance.KYCStandard {
		t.Fatalf("expected KYC level 2, got %d", status.KYC)
	}
}

func TestGetAccount_NotFound(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/accounts/nope/status", nil)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestSubmitOrder(t *testing.T) {
	gw, _, comp := setupGateway()
	comp.SetAccountStatus(&compliance.AccountStatus{
		AccountID:  "acct-1",
		KYC:        compliance.KYCStandard,
		AMLCleared: true,
		DailyLimit: 1000000,
	})

	// Wire compliance check
	// Note: engine doesn't have the check unless we add it.
	// The setupGateway creates a plain engine without checks,
	// so this order should go through without compliance blocking.

	req := types.SubmitOrderRequest{
		Symbol:      "BTC-USD",
		Side:        types.SideBuy,
		Type:        types.OrderTypeMarket,
		TimeInForce: types.TIFDay,
		Qty:         "1",
	}
	w := doRequest(gw, "POST", "/api/v1/accounts/acct-1/orders", req)
	if w.Code != 201 {
		t.Fatalf("expected 201, got %d: %s", w.Code, w.Body.String())
	}
	var order types.Order
	json.Unmarshal(w.Body.Bytes(), &order)
	if order.Status != types.OrderStatusFilled {
		t.Fatalf("expected filled, got %s", order.Status)
	}
}

func TestSubmitOrder_BadBody(t *testing.T) {
	gw, _, _ := setupGateway()
	req := httptest.NewRequest("POST", "/api/v1/accounts/acct-1/orders", bytes.NewBufferString("not json"))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	gw.server.Handler.ServeHTTP(w, req)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestListOrders(t *testing.T) {
	gw, _, _ := setupGateway()

	// Submit a couple orders
	req := types.SubmitOrderRequest{
		Symbol: "BTC-USD", Side: types.SideBuy, Type: types.OrderTypeMarket, Qty: "1",
	}
	doRequest(gw, "POST", "/api/v1/accounts/acct-1/orders", req)
	doRequest(gw, "POST", "/api/v1/accounts/acct-1/orders", req)

	w := doRequest(gw, "GET", "/api/v1/accounts/acct-1/orders", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var orders []*types.Order
	json.Unmarshal(w.Body.Bytes(), &orders)
	if len(orders) != 2 {
		t.Fatalf("expected 2 orders, got %d", len(orders))
	}
}

func TestListTrades(t *testing.T) {
	gw, _, _ := setupGateway()

	req := types.SubmitOrderRequest{
		Symbol: "BTC-USD", Side: types.SideBuy, Type: types.OrderTypeMarket, Qty: "1",
	}
	doRequest(gw, "POST", "/api/v1/accounts/acct-1/orders", req)

	w := doRequest(gw, "GET", "/api/v1/accounts/acct-1/trades", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var trades []*types.Trade
	json.Unmarshal(w.Body.Bytes(), &trades)
	if len(trades) != 1 {
		t.Fatalf("expected 1 trade, got %d", len(trades))
	}
}

func TestHaltAndResumeMarket(t *testing.T) {
	gw, _, _ := setupGateway()

	// Halt
	body := map[string]string{"reason": "volatility"}
	w := doRequest(gw, "POST", "/api/v1/admin/markets/BTC-USD/halt", body)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}

	// Verify halted
	w = doRequest(gw, "GET", "/api/v1/markets/BTC-USD", nil)
	var m types.Market
	json.Unmarshal(w.Body.Bytes(), &m)
	if m.Status != "halted" {
		t.Fatalf("expected halted, got %s", m.Status)
	}

	// Resume
	w = doRequest(gw, "POST", "/api/v1/admin/markets/BTC-USD/resume", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}

	w = doRequest(gw, "GET", "/api/v1/markets/BTC-USD", nil)
	json.Unmarshal(w.Body.Bytes(), &m)
	if m.Status != "active" {
		t.Fatalf("expected active, got %s", m.Status)
	}
}

func TestAdminFINRAReports(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/admin/reports/finra", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}

func TestAdminATSReport(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/admin/reports/ats?quarter=2026-Q1", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var report reporting.ATSReport
	json.Unmarshal(w.Body.Bytes(), &report)
	if report.Quarter != "2026-Q1" {
		t.Fatalf("expected 2026-Q1, got %s", report.Quarter)
	}
}

func TestAdminAlerts(t *testing.T) {
	gw, _, _ := setupGateway()
	w := doRequest(gw, "GET", "/api/v1/admin/surveillance/alerts", nil)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}
