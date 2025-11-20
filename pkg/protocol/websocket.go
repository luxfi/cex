package protocol

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"sync/atomic"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

// WSServer handles real-time WebSocket connections for the CEX.
// All order operations go through Engine.SubmitOrder() for compliance.
type WSServer struct {
	engine      *engine.Engine
	matchEngine *engine.MatchEngine

	upgrader  websocket.Upgrader
	clients   map[string]*wsClient
	broadcast chan []byte

	mu     sync.RWMutex
	ctx    context.Context
	cancel context.CancelFunc

	connectionsTotal  atomic.Uint64
	connectionsActive atomic.Int64
	messagesRecv      atomic.Uint64
	messagesSent      atomic.Uint64
}

type wsClient struct {
	id            string
	userID        string
	accountID     string
	orgID         string
	conn          *websocket.Conn
	send          chan []byte
	subscriptions map[string]bool
	authenticated bool
	lastActivity  time.Time
	rateLimiter   *wsRateLimiter
	mu            sync.RWMutex
}

type wsMessage struct {
	Type      string                 `json:"type"`
	Data      map[string]interface{} `json:"data,omitempty"`
	Error     string                 `json:"error,omitempty"`
	RequestID string                 `json:"request_id,omitempty"`
	Timestamp int64                  `json:"timestamp"`
}

type wsRateLimiter struct {
	requests    int
	maxRequests int
	window      time.Duration
	lastReset   time.Time
	mu          sync.Mutex
}

func newWSRateLimiter(max int, window time.Duration) *wsRateLimiter {
	return &wsRateLimiter{maxRequests: max, window: window, lastReset: time.Now()}
}

func (rl *wsRateLimiter) allow() bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	if time.Since(rl.lastReset) > rl.window {
		rl.requests = 0
		rl.lastReset = time.Now()
	}
	if rl.requests >= rl.maxRequests {
		return false
	}
	rl.requests++
	return true
}

var wsAllowedOrigins = []string{
	"https://lux.financial",
	"https://app.lux.financial",
	"https://cex.lux.network",
	"http://localhost:3000",
}

func NewWSServer(eng *engine.Engine, me *engine.MatchEngine) *WSServer {
	ctx, cancel := context.WithCancel(context.Background())
	return &WSServer{
		engine:      eng,
		matchEngine: me,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				origin := r.Header.Get("Origin")
				if origin == "" {
					return true
				}
				for _, o := range wsAllowedOrigins {
					if o == origin {
						return true
					}
				}
				return false
			},
			ReadBufferSize:  4096,
			WriteBufferSize: 4096,
		},
		clients:   make(map[string]*wsClient),
		broadcast: make(chan []byte, 256),
		ctx:       ctx,
		cancel:    cancel,
	}
}

// HandleConnection upgrades HTTP to WebSocket and starts client handlers.
func (s *WSServer) HandleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	id := fmt.Sprintf("ws_%d", time.Now().UnixNano())
	c := &wsClient{
		id:            id,
		conn:          conn,
		send:          make(chan []byte, 256),
		subscriptions: make(map[string]bool),
		lastActivity:  time.Now(),
		rateLimiter:   newWSRateLimiter(200, time.Minute),
	}

	s.mu.Lock()
	s.clients[id] = c
	s.mu.Unlock()
	s.connectionsTotal.Add(1)
	s.connectionsActive.Add(1)

	go c.writePump()
	go s.readPump(c)

	c.sendMsg(wsMessage{
		Type:      "connected",
		Data:      map[string]interface{}{"client_id": id},
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) readPump(c *wsClient) {
	defer func() {
		s.removeClient(c)
		c.conn.Close()
	}()

	c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		var msg map[string]interface{}
		if err := c.conn.ReadJSON(&msg); err != nil {
			break
		}
		if !c.rateLimiter.allow() {
			c.sendErr("rate limit exceeded", "")
			continue
		}
		c.lastActivity = time.Now()
		s.messagesRecv.Add(1)
		s.processMessage(c, msg)
	}
}

func (c *wsClient) writePump() {
	ticker := time.NewTicker(30 * time.Second)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case data, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, nil)
				return
			}
			c.conn.WriteMessage(websocket.TextMessage, data)
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (s *WSServer) processMessage(c *wsClient, msg map[string]interface{}) {
	msgType, _ := msg["type"].(string)
	reqID, _ := msg["request_id"].(string)

	switch msgType {
	case "auth":
		s.handleAuth(c, msg, reqID)
	case "ping":
		c.sendMsg(wsMessage{Type: "pong", RequestID: reqID, Timestamp: time.Now().Unix()})
	case "subscribe":
		s.handleSubscribe(c, msg, reqID)
	case "unsubscribe":
		s.handleUnsubscribe(c, msg, reqID)
	case "place_order":
		s.handlePlaceOrder(c, msg, reqID)
	case "cancel_order":
		s.handleCancelOrder(c, msg, reqID)
	case "get_orders":
		s.handleGetOrders(c, reqID)
	case "get_trades":
		s.handleGetTrades(c, reqID)
	case "get_markets":
		s.handleGetMarkets(c, reqID)
	case "get_orderbook":
		s.handleGetOrderBook(c, msg, reqID)
	default:
		c.sendErr(fmt.Sprintf("unknown message type: %s", msgType), reqID)
	}
}

func (s *WSServer) handleAuth(c *wsClient, msg map[string]interface{}, reqID string) {
	userID, _ := msg["user_id"].(string)
	accountID, _ := msg["account_id"].(string)
	orgID, _ := msg["org_id"].(string)

	if userID == "" || accountID == "" {
		c.sendErr("user_id and account_id required", reqID)
		return
	}

	c.mu.Lock()
	c.authenticated = true
	c.userID = userID
	c.accountID = accountID
	c.orgID = orgID
	c.mu.Unlock()

	c.sendMsg(wsMessage{
		Type:      "auth_success",
		Data:      map[string]interface{}{"user_id": userID, "account_id": accountID},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handlePlaceOrder(c *wsClient, msg map[string]interface{}, reqID string) {
	if !c.authenticated {
		c.sendErr("not authenticated", reqID)
		return
	}

	orderData, _ := msg["order"].(map[string]interface{})
	if orderData == nil {
		c.sendErr("missing order data", reqID)
		return
	}

	req := &types.SubmitOrderRequest{
		Symbol:      strVal(orderData, "symbol"),
		Side:        types.Side(strVal(orderData, "side")),
		Type:        types.OrderType(strVal(orderData, "type")),
		TimeInForce: types.TimeInForce(strVal(orderData, "time_in_force")),
		Qty:         strVal(orderData, "qty"),
		Notional:    strVal(orderData, "notional"),
		LimitPrice:  strVal(orderData, "limit_price"),
		StopPrice:   strVal(orderData, "stop_price"),
		ClientOrdID: strVal(orderData, "client_order_id"),
	}

	order, err := s.engine.SubmitOrder(context.Background(), c.accountID, c.userID, c.orgID, req)
	if err != nil {
		c.sendErr(err.Error(), reqID)
		return
	}

	c.sendMsg(wsMessage{
		Type:      "order_update",
		Data:      map[string]interface{}{"order": order},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleCancelOrder(c *wsClient, msg map[string]interface{}, reqID string) {
	if !c.authenticated {
		c.sendErr("not authenticated", reqID)
		return
	}

	orderID, _ := msg["order_id"].(string)
	if orderID == "" {
		c.sendErr("missing order_id", reqID)
		return
	}

	order, err := s.engine.CancelOrder(context.Background(), orderID)
	if err != nil {
		c.sendErr(err.Error(), reqID)
		return
	}

	c.sendMsg(wsMessage{
		Type:      "order_update",
		Data:      map[string]interface{}{"order": order, "status": "cancelled"},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleGetOrders(c *wsClient, reqID string) {
	if !c.authenticated {
		c.sendErr("not authenticated", reqID)
		return
	}
	orders := s.engine.ListOrders(c.accountID)
	c.sendMsg(wsMessage{
		Type:      "orders",
		Data:      map[string]interface{}{"orders": orders},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleGetTrades(c *wsClient, reqID string) {
	if !c.authenticated {
		c.sendErr("not authenticated", reqID)
		return
	}
	trades := s.engine.ListTrades(c.accountID)
	c.sendMsg(wsMessage{
		Type:      "trades",
		Data:      map[string]interface{}{"trades": trades},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleGetMarkets(c *wsClient, reqID string) {
	markets := s.engine.ListMarkets()
	c.sendMsg(wsMessage{
		Type:      "markets",
		Data:      map[string]interface{}{"markets": markets},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleGetOrderBook(c *wsClient, msg map[string]interface{}, reqID string) {
	symbol, _ := msg["symbol"].(string)
	if symbol == "" {
		c.sendErr("missing symbol", reqID)
		return
	}
	if s.matchEngine != nil {
		snap := s.matchEngine.GetSnapshot(symbol)
		if snap != nil {
			c.sendMsg(wsMessage{
				Type:      "orderbook",
				Data:      map[string]interface{}{"orderbook": snap},
				RequestID: reqID,
				Timestamp: time.Now().Unix(),
			})
			return
		}
	}
	c.sendErr("orderbook not available", reqID)
}

func (s *WSServer) handleSubscribe(c *wsClient, msg map[string]interface{}, reqID string) {
	channel, _ := msg["channel"].(string)
	symbols, _ := msg["symbols"].([]interface{})

	c.mu.Lock()
	for _, sym := range symbols {
		if s, ok := sym.(string); ok {
			c.subscriptions[fmt.Sprintf("%s:%s", channel, s)] = true
		}
	}
	c.mu.Unlock()

	c.sendMsg(wsMessage{
		Type:      "subscribed",
		Data:      map[string]interface{}{"channel": channel, "symbols": symbols},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) handleUnsubscribe(c *wsClient, msg map[string]interface{}, reqID string) {
	channel, _ := msg["channel"].(string)
	symbols, _ := msg["symbols"].([]interface{})

	c.mu.Lock()
	for _, sym := range symbols {
		if str, ok := sym.(string); ok {
			delete(c.subscriptions, fmt.Sprintf("%s:%s", channel, str))
		}
	}
	c.mu.Unlock()

	c.sendMsg(wsMessage{
		Type:      "unsubscribed",
		Data:      map[string]interface{}{"channel": channel, "symbols": symbols},
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

// BroadcastOrderBook sends orderbook snapshots to subscribed clients.
func (s *WSServer) BroadcastOrderBook(symbol string, snap *types.OrderBookSnapshot) {
	s.broadcastTo(fmt.Sprintf("orderbook:%s", symbol), wsMessage{
		Type:      "orderbook_update",
		Data:      map[string]interface{}{"symbol": symbol, "snapshot": snap},
		Timestamp: time.Now().Unix(),
	})
}

// BroadcastTrade sends trade updates to subscribed clients.
func (s *WSServer) BroadcastTrade(trade *types.Trade) {
	s.broadcastTo(fmt.Sprintf("trades:%s", trade.Symbol), wsMessage{
		Type:      "trade_update",
		Data:      map[string]interface{}{"trade": trade},
		Timestamp: time.Now().Unix(),
	})
}

func (s *WSServer) broadcastTo(channel string, msg wsMessage) {
	data, _ := json.Marshal(msg)
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, c := range s.clients {
		c.mu.RLock()
		if c.subscriptions[channel] {
			select {
			case c.send <- data:
				s.messagesSent.Add(1)
			default:
			}
		}
		c.mu.RUnlock()
	}
}

// Start begins background market data broadcasting.
func (s *WSServer) Start() {
	go s.marketDataLoop()
	log.Info().Msg("WebSocket server started")
}

func (s *WSServer) marketDataLoop() {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			if s.matchEngine == nil {
				continue
			}
			for _, m := range s.engine.ListMarkets() {
				snap := s.matchEngine.GetSnapshot(m.Symbol)
				if snap != nil {
					s.BroadcastOrderBook(m.Symbol, snap)
				}
			}
		case <-s.ctx.Done():
			return
		}
	}
}

// Shutdown closes all connections.
func (s *WSServer) Shutdown() {
	s.cancel()
	s.mu.Lock()
	for _, c := range s.clients {
		c.conn.Close()
	}
	s.mu.Unlock()
}

func (s *WSServer) removeClient(c *wsClient) {
	s.mu.Lock()
	delete(s.clients, c.id)
	s.mu.Unlock()
	s.connectionsActive.Add(-1)
	close(c.send)
}

func (c *wsClient) sendMsg(msg wsMessage) {
	data, _ := json.Marshal(msg)
	select {
	case c.send <- data:
	default:
	}
}

func (c *wsClient) sendErr(errMsg, reqID string) {
	c.sendMsg(wsMessage{
		Type:      "error",
		Error:     errMsg,
		RequestID: reqID,
		Timestamp: time.Now().Unix(),
	})
}

func strVal(m map[string]interface{}, key string) string {
	v, _ := m[key].(string)
	return v
}
