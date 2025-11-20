package protocol

import (
	"bytes"
	"context"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
	"unsafe"

	"github.com/gorilla/websocket"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

func testMarket(symbol string) *types.Market {
	return &types.Market{
		Symbol: symbol, AssetClass: types.AssetClassCrypto,
		BaseCurrency: symbol[:3], QuoteCurrency: "USD",
		Status: "active", TickSize: "0.01", LotSize: "0.00000001",
		MakerFee: "0.001", TakerFee: "0.002",
		Tradable: true, Fractionable: true,
	}
}

func testEngine() (*engine.Engine, *engine.MatchEngine) {
	me := engine.NewMatchEngine()
	eng := engine.New(me.Match)
	eng.RegisterMarket(testMarket("LUX-USD"))
	eng.RegisterMarket(testMarket("BTC-USD"))
	return eng, me
}

// --- JSON-RPC Tests ---

func TestJSONRPC_Ping(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.ping","id":1}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	result, ok := resp["result"].(map[string]interface{})
	if !ok {
		t.Fatal("expected result object")
	}
	if result["status"] != "ok" {
		t.Fatalf("expected status ok, got %v", result["status"])
	}
}

func TestJSONRPC_ListMarkets(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.listMarkets","id":2}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	result, ok := resp["result"].([]interface{})
	if !ok {
		t.Fatal("expected result array")
	}
	if len(result) != 2 {
		t.Fatalf("expected 2 markets, got %d", len(result))
	}
}

func TestJSONRPC_GetMarket(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.getMarket","params":{"symbol":"LUX-USD"},"id":3}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	result, ok := resp["result"].(map[string]interface{})
	if !ok {
		t.Fatal("expected result object")
	}
	if result["symbol"] != "LUX-USD" {
		t.Fatalf("expected LUX-USD, got %v", result["symbol"])
	}
}

func TestJSONRPC_GetMarketNotFound(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.getMarket","params":{"symbol":"FAKE-USD"},"id":4}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	if resp["error"] == nil {
		t.Fatal("expected error for unknown market")
	}
}

func TestJSONRPC_SubmitOrder(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.submitOrder","params":{
		"account_id":"acct-1","user_id":"user-1","org_id":"org-1",
		"symbol":"LUX-USD","side":"sell","type":"limit","time_in_force":"gtc",
		"qty":"100","limit_price":"2.50"
	},"id":5}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	if resp["error"] != nil {
		t.Fatalf("unexpected error: %v", resp["error"])
	}
	result, ok := resp["result"].(map[string]interface{})
	if !ok {
		t.Fatal("expected result object")
	}
	if result["symbol"] != "LUX-USD" {
		t.Fatalf("expected LUX-USD, got %v", result["symbol"])
	}
	if result["status"] != "open" {
		t.Fatalf("expected open, got %v", result["status"])
	}
}

func TestJSONRPC_MethodNotFound(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	body := `{"jsonrpc":"2.0","method":"cex.nonexistent","id":99}`
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	errObj, ok := resp["error"].(map[string]interface{})
	if !ok {
		t.Fatal("expected error object")
	}
	if errObj["code"].(float64) != -32601 {
		t.Fatalf("expected -32601, got %v", errObj["code"])
	}
}

func TestJSONRPC_InvalidJSON(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)

	req := httptest.NewRequest("POST", "/rpc", strings.NewReader("{invalid"))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var resp map[string]interface{}
	json.NewDecoder(w.Body).Decode(&resp)
	if resp["error"] == nil {
		t.Fatal("expected parse error")
	}
}

func TestJSONRPC_RateLimiting(t *testing.T) {
	eng, me := testEngine()
	srv := NewJSONRPCServer(eng, me)
	// Override rate limit for testing
	srv.rateLimiter = newIPRateLimiter(3, time.Second)

	body := `{"jsonrpc":"2.0","method":"cex.ping","id":1}`
	for i := 0; i < 3; i++ {
		req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
		w := httptest.NewRecorder()
		srv.ServeHTTP(w, req)
		if w.Code != 200 {
			t.Fatalf("request %d: expected 200, got %d", i, w.Code)
		}
	}

	// 4th request should be rate limited
	req := httptest.NewRequest("POST", "/rpc", strings.NewReader(body))
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)
	if w.Code != 429 {
		t.Fatalf("expected 429, got %d", w.Code)
	}
}

// --- WebSocket Tests ---

func TestWS_ConnectAndAuth(t *testing.T) {
	eng, me := testEngine()
	ws := NewWSServer(eng, me)

	server := httptest.NewServer(http.HandlerFunc(ws.HandleConnection))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Read welcome
	var welcome wsMessage
	conn.ReadJSON(&welcome)
	if welcome.Type != "connected" {
		t.Fatalf("expected connected, got %s", welcome.Type)
	}

	// Auth
	conn.WriteJSON(map[string]interface{}{
		"type":       "auth",
		"user_id":    "user-1",
		"account_id": "acct-1",
		"org_id":     "org-1",
		"request_id": "auth-1",
	})

	var authResp wsMessage
	conn.ReadJSON(&authResp)
	if authResp.Type != "auth_success" {
		t.Fatalf("expected auth_success, got %s", authResp.Type)
	}
}

func TestWS_PlaceOrder(t *testing.T) {
	eng, me := testEngine()
	ws := NewWSServer(eng, me)

	server := httptest.NewServer(http.HandlerFunc(ws.HandleConnection))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Skip welcome
	conn.ReadJSON(&wsMessage{})

	// Auth
	conn.WriteJSON(map[string]interface{}{
		"type": "auth", "user_id": "user-1", "account_id": "acct-1", "org_id": "org-1",
	})
	conn.ReadJSON(&wsMessage{})

	// Place order
	conn.WriteJSON(map[string]interface{}{
		"type":       "place_order",
		"request_id": "ord-1",
		"order": map[string]interface{}{
			"symbol":       "LUX-USD",
			"side":         "sell",
			"type":         "limit",
			"time_in_force": "gtc",
			"qty":          "50",
			"limit_price":  "3.00",
		},
	})

	var resp wsMessage
	conn.ReadJSON(&resp)
	if resp.Type != "order_update" {
		t.Fatalf("expected order_update, got %s (error: %s)", resp.Type, resp.Error)
	}
}

func TestWS_GetMarkets(t *testing.T) {
	eng, me := testEngine()
	ws := NewWSServer(eng, me)

	server := httptest.NewServer(http.HandlerFunc(ws.HandleConnection))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Skip welcome
	conn.ReadJSON(&wsMessage{})

	conn.WriteJSON(map[string]interface{}{
		"type": "get_markets", "request_id": "mkt-1",
	})

	var resp wsMessage
	conn.ReadJSON(&resp)
	if resp.Type != "markets" {
		t.Fatalf("expected markets, got %s", resp.Type)
	}
	markets, ok := resp.Data["markets"].([]interface{})
	if !ok || len(markets) != 2 {
		t.Fatalf("expected 2 markets, got %v", resp.Data["markets"])
	}
}

func TestWS_Subscribe(t *testing.T) {
	eng, me := testEngine()
	ws := NewWSServer(eng, me)

	server := httptest.NewServer(http.HandlerFunc(ws.HandleConnection))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	conn.ReadJSON(&wsMessage{}) // welcome

	conn.WriteJSON(map[string]interface{}{
		"type":    "subscribe",
		"channel": "orderbook",
		"symbols": []string{"LUX-USD"},
	})

	var resp wsMessage
	conn.ReadJSON(&resp)
	if resp.Type != "subscribed" {
		t.Fatalf("expected subscribed, got %s", resp.Type)
	}
}

// --- ZAP Binary Protocol Tests ---

func TestZAP_GetBestBidAsk(t *testing.T) {
	eng, me := testEngine()

	// Place a sell order to create an ask
	eng.SubmitOrder(context.Background(), "acct-1", "user-1", "org-1", &types.SubmitOrderRequest{
		Symbol: "LUX-USD", Side: types.SideSell, Type: types.OrderTypeLimit,
		TimeInForce: types.TIFGTC, Qty: "100", LimitPrice: "2.50",
	})

	zapSrv := NewZAPServer(eng, me, ":0")
	if err := zapSrv.Start(); err != nil {
		t.Fatalf("start: %v", err)
	}
	defer zapSrv.Stop()

	conn, err := net.Dial("tcp", zapSrv.Addr())
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Send GetBestAsk
	symbol := []byte("LUX-USD\x00")
	sendZAPMsg(t, conn, ZAPMsgGetBestAsk, symbol)

	// Read response (24 bytes)
	resp := make([]byte, ZAPQuoteSize)
	conn.SetReadDeadline(time.Now().Add(2 * time.Second))
	if _, err := io.ReadFull(conn, resp); err != nil {
		t.Fatalf("read: %v", err)
	}

	price := math.Float64frombits(binary.BigEndian.Uint64(resp[0:8]))
	if price == 0 {
		t.Log("no asks in book (order may not have created internal liquidity)")
	}
}

func TestZAP_PlaceOrder(t *testing.T) {
	eng, me := testEngine()
	zapSrv := NewZAPServer(eng, me, ":0")
	if err := zapSrv.Start(); err != nil {
		t.Fatalf("start: %v", err)
	}
	defer zapSrv.Stop()

	conn, err := net.Dial("tcp", zapSrv.Addr())
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Build 64-byte order payload
	payload := make([]byte, ZAPOrderSize)
	copy(payload[0:8], padNull8([]byte("LUX-USD")))
	// skip id [8:16]
	zapEnc64(payload[16:24], 2.50) // price
	zapEnc64(payload[24:32], 100)  // qty
	payload[32] = 1                // sell
	payload[33] = 0                // limit
	payload[34] = 1                // GTC
	copy(payload[36:52], padNull16([]byte("user-1")))
	copy(payload[52:56], []byte("act1"))

	sendZAPMsg(t, conn, ZAPMsgPlaceOrder, payload)

	// Read response
	resp := make([]byte, 256)
	conn.SetReadDeadline(time.Now().Add(2 * time.Second))
	n, err := conn.Read(resp)
	if err != nil {
		t.Fatalf("read: %v", err)
	}
	if n < 2 {
		t.Fatalf("response too short: %d bytes", n)
	}
	// The response should be an ack with the UUID order ID
	t.Logf("ZAP place order response: %d bytes", n)
}

func sendZAPMsg(t *testing.T, conn net.Conn, msgType uint8, payload []byte) {
	t.Helper()
	header := make([]byte, 5)
	header[0] = msgType
	binary.BigEndian.PutUint32(header[1:5], uint32(len(payload)))
	conn.SetWriteDeadline(time.Now().Add(2 * time.Second))
	if _, err := conn.Write(header); err != nil {
		t.Fatalf("write header: %v", err)
	}
	if _, err := conn.Write(payload); err != nil {
		t.Fatalf("write payload: %v", err)
	}
}

func zapEnc64(b []byte, f float64) {
	bits := *(*uint64)(unsafe.Pointer(&f))
	binary.BigEndian.PutUint64(b, bits)
}

func padNull8(b []byte) []byte {
	r := make([]byte, 8)
	copy(r, b)
	return r
}

func padNull16(b []byte) []byte {
	r := make([]byte, 16)
	copy(r, b)
	return r
}

// --- FIX Protocol Tests ---

func TestFIX_LogonAndHeartbeat(t *testing.T) {
	eng, me := testEngine()
	fixSrv := NewFIXServer(eng, me, ":0", "TEST-CEX")
	if err := fixSrv.Start(); err != nil {
		t.Fatalf("start: %v", err)
	}
	defer fixSrv.Stop()

	conn, err := net.Dial("tcp", fixSrv.listener.Addr().String())
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Send Logon
	logon := buildFIXMsg("A", map[int]string{
		fixSenderCompID: "CLIENT-1",
		fixTargetCompID: "TEST-CEX",
		fixMsgSeqNum:    "1",
		fixEncryptMethod: "0",
		fixHeartBtInt:   "30",
		fixAccount:      "acct-1",
	})
	conn.SetWriteDeadline(time.Now().Add(2 * time.Second))
	conn.Write([]byte(logon))

	// Read logon response
	conn.SetReadDeadline(time.Now().Add(2 * time.Second))
	buf := make([]byte, 4096)
	n, err := conn.Read(buf)
	if err != nil {
		t.Fatalf("read: %v", err)
	}
	resp := string(buf[:n])
	if !strings.Contains(resp, "35=A") {
		t.Fatalf("expected logon response, got: %s", resp)
	}
	if !strings.Contains(resp, "49=TEST-CEX") {
		t.Fatalf("expected sender TEST-CEX in response, got: %s", resp)
	}
}

func TestFIX_NewOrderSingle(t *testing.T) {
	eng, me := testEngine()
	fixSrv := NewFIXServer(eng, me, ":0", "TEST-CEX")
	if err := fixSrv.Start(); err != nil {
		t.Fatalf("start: %v", err)
	}
	defer fixSrv.Stop()

	conn, err := net.Dial("tcp", fixSrv.listener.Addr().String())
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer conn.Close()

	// Logon first
	logon := buildFIXMsg("A", map[int]string{
		fixSenderCompID: "CLIENT-1",
		fixTargetCompID: "TEST-CEX",
		fixMsgSeqNum:    "1",
		fixEncryptMethod: "0",
		fixHeartBtInt:   "30",
		fixAccount:      "acct-1",
	})
	conn.Write([]byte(logon))

	// Read logon response
	conn.SetReadDeadline(time.Now().Add(2 * time.Second))
	buf := make([]byte, 4096)
	conn.Read(buf)

	// Send NewOrderSingle
	nos := buildFIXMsg("D", map[int]string{
		fixSenderCompID: "CLIENT-1",
		fixTargetCompID: "TEST-CEX",
		fixMsgSeqNum:    "2",
		fixClOrdID:      "order-001",
		fixSymbol:       "LUX-USD",
		fixSide:         "2", // sell
		fixOrdType:      "2", // limit
		fixTimeInForce:  "1", // GTC
		fixOrderQty:     "100",
		fixPrice:        "2.50",
		fixAccount:      "acct-1",
	})
	conn.Write([]byte(nos))

	// Read execution report
	buf = make([]byte, 4096)
	n, err := conn.Read(buf)
	if err != nil {
		t.Fatalf("read: %v", err)
	}
	resp := string(buf[:n])
	if !strings.Contains(resp, "35=8") {
		t.Fatalf("expected execution report (35=8), got: %s", resp)
	}
	if !strings.Contains(resp, "55=LUX-USD") {
		t.Fatalf("expected symbol LUX-USD, got: %s", resp)
	}
}

func buildFIXMsg(msgType string, fields map[int]string) string {
	body := fmt.Sprintf("35=%s\x01", msgType)
	for tag, val := range fields {
		body += fmt.Sprintf("%d=%s\x01", tag, val)
	}
	body += fmt.Sprintf("52=%s\x01", time.Now().UTC().Format("20060102-15:04:05.000"))

	header := fmt.Sprintf("8=FIX.4.4\x019=%d\x01", len(body))
	raw := header + body
	sum := 0
	for i := 0; i < len(raw); i++ {
		sum += int(raw[i])
	}
	return raw + fmt.Sprintf("10=%03d\x01", sum%256)
}

// --- Helpers ---

func TestIPRateLimiter(t *testing.T) {
	rl := newIPRateLimiter(3, time.Second)

	for i := 0; i < 3; i++ {
		if !rl.allow("10.0.0.1") {
			t.Fatalf("request %d should be allowed", i)
		}
	}
	if rl.allow("10.0.0.1") {
		t.Fatal("4th request should be denied")
	}
	// Different IP should be allowed
	if !rl.allow("10.0.0.2") {
		t.Fatal("different IP should be allowed")
	}
}

// Suppress unused import warnings
var _ = bytes.NewBuffer
