package protocol

import (
	"bufio"
	"context"
	"fmt"
	"net"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

// FIX 4.4 protocol implementation for institutional trading.
// All order operations go through Engine.SubmitOrder() for compliance.
//
// Supported messages:
//   Logon (A), Logout (5), Heartbeat (0), TestRequest (1),
//   NewOrderSingle (D), OrderCancelRequest (F),
//   ExecutionReport (8), OrderCancelReject (9),
//   MarketDataRequest (V), MarketDataSnapshotFullRefresh (W)

// FIX tag constants
const (
	fixBeginString    = 8
	fixBodyLength     = 9
	fixMsgType        = 35
	fixSenderCompID   = 49
	fixTargetCompID   = 56
	fixMsgSeqNum      = 34
	fixSendingTime    = 52
	fixCheckSum       = 10
	fixEncryptMethod  = 98
	fixHeartBtInt     = 108
	fixText           = 58
	fixTestReqID      = 112
	fixClOrdID        = 11
	fixOrderID        = 37
	fixExecID         = 17
	fixExecType       = 150
	fixOrdStatus      = 39
	fixSymbol         = 55
	fixSide           = 54
	fixOrdType        = 40
	fixTimeInForce    = 59
	fixOrderQty       = 38
	fixPrice          = 44
	fixStopPx         = 99
	fixAvgPx          = 6
	fixCumQty         = 14
	fixLeavesQty      = 151
	fixTransactTime   = 60
	fixAccount        = 1
	fixLastPx         = 31
	fixLastQty        = 32
	fixMDReqID        = 262
	fixSubscriptionReqType = 263
	fixMarketDepth    = 264
	fixNoMDEntryTypes = 267
	fixMDEntryType    = 269
	fixNoMDEntries    = 268
	fixMDEntryPx      = 270
	fixMDEntrySize    = 271
)

const fixVersion = "FIX.4.4"
const fixSOH = "\x01" // Standard FIX delimiter

// FIXServer provides FIX 4.4 protocol support for institutional connectivity.
type FIXServer struct {
	engine      *engine.Engine
	matchEngine *engine.MatchEngine
	listener    net.Listener
	addr        string
	compID      string // our CompID (e.g., "LUX-CEX")

	sessions map[string]*fixSession
	mu       sync.RWMutex
	ctx      context.Context
	cancel   context.CancelFunc

	messagesRecv atomic.Uint64
	messagesSent atomic.Uint64
}

type fixSession struct {
	conn         net.Conn
	senderCompID string
	targetCompID string
	accountID    string
	userID       string
	orgID        string
	seqNumIn     int
	seqNumOut    int
	heartbeatInt int
	loggedIn     bool
	lastRecv     time.Time
	mu           sync.Mutex
}

func NewFIXServer(eng *engine.Engine, me *engine.MatchEngine, addr, compID string) *FIXServer {
	ctx, cancel := context.WithCancel(context.Background())
	return &FIXServer{
		engine:      eng,
		matchEngine: me,
		addr:        addr,
		compID:      compID,
		sessions:    make(map[string]*fixSession),
		ctx:         ctx,
		cancel:      cancel,
	}
}

// Start begins accepting FIX connections.
func (s *FIXServer) Start() error {
	ln, err := net.Listen("tcp", s.addr)
	if err != nil {
		return fmt.Errorf("FIX listen: %w", err)
	}
	s.listener = ln
	log.Info().Str("addr", ln.Addr().String()).Str("compID", s.compID).Msg("FIX 4.4 server started")

	go func() {
		for {
			conn, err := ln.Accept()
			if err != nil {
				select {
				case <-s.ctx.Done():
					return
				default:
					continue
				}
			}
			go s.handleConn(conn)
		}
	}()
	return nil
}

// Stop shuts down the FIX server.
func (s *FIXServer) Stop() error {
	s.cancel()
	s.mu.Lock()
	for _, sess := range s.sessions {
		sess.conn.Close()
	}
	s.mu.Unlock()
	if s.listener != nil {
		return s.listener.Close()
	}
	return nil
}

func (s *FIXServer) handleConn(conn net.Conn) {
	defer conn.Close()

	sess := &fixSession{
		conn:     conn,
		lastRecv: time.Now(),
	}

	scanner := bufio.NewScanner(conn)
	scanner.Split(fixSplitMessage)

	for scanner.Scan() {
		select {
		case <-s.ctx.Done():
			return
		default:
		}

		raw := scanner.Text()
		sess.lastRecv = time.Now()
		s.messagesRecv.Add(1)

		fields := parseFixMessage(raw)
		msgType := fields[fixMsgType]

		switch msgType {
		case "A": // Logon
			s.handleLogon(sess, fields)
		case "5": // Logout
			s.handleLogout(sess, fields)
		case "0": // Heartbeat
			// noop — lastRecv updated above
		case "1": // TestRequest
			s.handleTestRequest(sess, fields)
		case "D": // NewOrderSingle
			s.handleNewOrderSingle(sess, fields)
		case "F": // OrderCancelRequest
			s.handleOrderCancelRequest(sess, fields)
		case "V": // MarketDataRequest
			s.handleMarketDataRequest(sess, fields)
		default:
			s.sendReject(sess, fmt.Sprintf("unsupported message type: %s", msgType))
		}
	}

	// Remove session
	if sess.senderCompID != "" {
		s.mu.Lock()
		delete(s.sessions, sess.senderCompID)
		s.mu.Unlock()
	}
}

func (s *FIXServer) handleLogon(sess *fixSession, fields map[int]string) {
	sess.mu.Lock()
	sess.senderCompID = fields[fixSenderCompID]
	sess.targetCompID = fields[fixTargetCompID]
	sess.heartbeatInt = 30
	if hb, err := strconv.Atoi(fields[fixHeartBtInt]); err == nil && hb > 0 {
		sess.heartbeatInt = hb
	}
	// Extract account/user from FIX Account field or SenderCompID
	sess.accountID = fields[fixAccount]
	if sess.accountID == "" {
		sess.accountID = sess.senderCompID
	}
	sess.userID = sess.senderCompID
	sess.loggedIn = true
	sess.seqNumOut = 0
	sess.mu.Unlock()

	s.mu.Lock()
	s.sessions[sess.senderCompID] = sess
	s.mu.Unlock()

	log.Info().Str("sender", sess.senderCompID).Msg("FIX logon")

	// Send Logon response
	s.sendMessage(sess, "A", map[int]string{
		fixEncryptMethod: "0",
		fixHeartBtInt:    strconv.Itoa(sess.heartbeatInt),
	})

	// Start heartbeat loop
	go s.heartbeatLoop(sess)
}

func (s *FIXServer) handleLogout(sess *fixSession, fields map[int]string) {
	s.sendMessage(sess, "5", map[int]string{
		fixText: "Logout acknowledged",
	})
	sess.mu.Lock()
	sess.loggedIn = false
	sess.mu.Unlock()
	log.Info().Str("sender", sess.senderCompID).Msg("FIX logout")
}

func (s *FIXServer) handleTestRequest(sess *fixSession, fields map[int]string) {
	s.sendMessage(sess, "0", map[int]string{
		fixTestReqID: fields[fixTestReqID],
	})
}

func (s *FIXServer) handleNewOrderSingle(sess *fixSession, fields map[int]string) {
	if !sess.loggedIn {
		s.sendReject(sess, "not logged in")
		return
	}

	clOrdID := fields[fixClOrdID]
	symbol := fields[fixSymbol]

	var side types.Side
	switch fields[fixSide] {
	case "1":
		side = types.SideBuy
	case "2":
		side = types.SideSell
	default:
		s.sendExecutionReport(sess, clOrdID, "", symbol, "8", "8", "invalid side", 0, 0, 0)
		return
	}

	var orderType types.OrderType
	switch fields[fixOrdType] {
	case "1":
		orderType = types.OrderTypeMarket
	case "2":
		orderType = types.OrderTypeLimit
	case "3":
		orderType = types.OrderTypeStop
	case "4":
		orderType = types.OrderTypeStopLimit
	default:
		orderType = types.OrderTypeLimit
	}

	var tif types.TimeInForce
	switch fields[fixTimeInForce] {
	case "0":
		tif = types.TIFDay
	case "1":
		tif = types.TIFGTC
	case "3":
		tif = types.TIFIOC
	case "4":
		tif = types.TIFFOK
	default:
		tif = types.TIFDay
	}

	req := &types.SubmitOrderRequest{
		Symbol:      symbol,
		Side:        side,
		Type:        orderType,
		TimeInForce: tif,
		Qty:         fields[fixOrderQty],
		LimitPrice:  fields[fixPrice],
		StopPrice:   fields[fixStopPx],
		ClientOrdID: clOrdID,
	}

	order, err := s.engine.SubmitOrder(context.Background(), sess.accountID, sess.userID, sess.orgID, req)
	if err != nil {
		s.sendExecutionReport(sess, clOrdID, "", symbol, "8", "8", err.Error(), 0, 0, 0)
		return
	}

	// Determine exec type and status
	execType := "0" // New
	ordStatus := "0"
	var lastPx, lastQty, cumQty float64

	switch order.Status {
	case types.OrderStatusFilled:
		execType = "F" // Fill
		ordStatus = "2"
		lastPx, _ = strconv.ParseFloat(order.FilledAvgPrice, 64)
		cumQty, _ = strconv.ParseFloat(order.Qty, 64)
		lastQty = cumQty
	case types.OrderStatusOpen:
		execType = "0" // New
		ordStatus = "0"
	case types.OrderStatusRejected:
		execType = "8" // Rejected
		ordStatus = "8"
	}

	s.sendExecutionReport(sess, clOrdID, order.ID, symbol, execType, ordStatus, "", lastPx, lastQty, cumQty)
}

func (s *FIXServer) handleOrderCancelRequest(sess *fixSession, fields map[int]string) {
	if !sess.loggedIn {
		s.sendReject(sess, "not logged in")
		return
	}

	orderID := fields[fixOrderID]
	clOrdID := fields[fixClOrdID]

	order, err := s.engine.CancelOrder(context.Background(), orderID)
	if err != nil {
		// Send OrderCancelReject (9)
		s.sendMessage(sess, "9", map[int]string{
			fixOrderID: orderID,
			fixClOrdID: clOrdID,
			fixText:    err.Error(),
		})
		return
	}

	s.sendExecutionReport(sess, clOrdID, order.ID, order.Symbol, "4", "4", "", 0, 0, 0)
}

func (s *FIXServer) handleMarketDataRequest(sess *fixSession, fields map[int]string) {
	if !sess.loggedIn {
		return
	}

	mdReqID := fields[fixMDReqID]
	symbol := fields[fixSymbol]

	if s.matchEngine == nil {
		return
	}

	snap := s.matchEngine.GetSnapshot(symbol)
	if snap == nil {
		return
	}

	// Build MarketDataSnapshotFullRefresh (W)
	extra := map[int]string{
		fixMDReqID: mdReqID,
		fixSymbol:  symbol,
	}

	// Count entries
	entries := len(snap.Bids) + len(snap.Asks)
	extra[fixNoMDEntries] = strconv.Itoa(entries)

	// Build repeating group as concatenated tag-value pairs
	var entryFields string
	for _, bid := range snap.Bids {
		entryFields += fmt.Sprintf("%d=0%s%d=%d%s%d=%d%s",
			fixMDEntryType, fixSOH,
			fixMDEntryPx, bid.Price, fixSOH,
			fixMDEntrySize, bid.Qty, fixSOH)
	}
	for _, ask := range snap.Asks {
		entryFields += fmt.Sprintf("%d=1%s%d=%d%s%d=%d%s",
			fixMDEntryType, fixSOH,
			fixMDEntryPx, ask.Price, fixSOH,
			fixMDEntrySize, ask.Qty, fixSOH)
	}

	s.sendMessageRaw(sess, "W", extra, entryFields)
}

func (s *FIXServer) sendExecutionReport(sess *fixSession, clOrdID, orderID, symbol, execType, ordStatus, text string, lastPx, lastQty, cumQty float64) {
	if orderID == "" {
		orderID = "NONE"
	}
	fields := map[int]string{
		fixOrderID:      orderID,
		fixClOrdID:      clOrdID,
		fixExecID:       uuid.New().String()[:8],
		fixExecType:     execType,
		fixOrdStatus:    ordStatus,
		fixSymbol:       symbol,
		fixTransactTime: time.Now().UTC().Format("20060102-15:04:05.000"),
		fixCumQty:       strconv.FormatFloat(cumQty, 'f', -1, 64),
		fixAvgPx:        strconv.FormatFloat(lastPx, 'f', -1, 64),
		fixLeavesQty:    "0",
	}
	if lastPx > 0 {
		fields[fixLastPx] = strconv.FormatFloat(lastPx, 'f', -1, 64)
		fields[fixLastQty] = strconv.FormatFloat(lastQty, 'f', -1, 64)
	}
	if text != "" {
		fields[fixText] = text
	}
	s.sendMessage(sess, "8", fields)
}

func (s *FIXServer) sendReject(sess *fixSession, text string) {
	s.sendMessage(sess, "3", map[int]string{fixText: text})
}

func (s *FIXServer) sendMessage(sess *fixSession, msgType string, fields map[int]string) {
	s.sendMessageRaw(sess, msgType, fields, "")
}

func (s *FIXServer) sendMessageRaw(sess *fixSession, msgType string, fields map[int]string, extra string) {
	sess.mu.Lock()
	sess.seqNumOut++
	seqNum := sess.seqNumOut
	sess.mu.Unlock()

	// Build body
	body := fmt.Sprintf("%d=%s%s%d=%s%s%d=%s%s%d=%d%s%d=%s%s",
		fixMsgType, msgType, fixSOH,
		fixSenderCompID, s.compID, fixSOH,
		fixTargetCompID, sess.senderCompID, fixSOH,
		fixMsgSeqNum, seqNum, fixSOH,
		fixSendingTime, time.Now().UTC().Format("20060102-15:04:05.000"), fixSOH,
	)

	for tag, val := range fields {
		body += fmt.Sprintf("%d=%s%s", tag, val, fixSOH)
	}
	body += extra

	// Wrap with header and checksum
	header := fmt.Sprintf("%d=%s%s%d=%d%s", fixBeginString, fixVersion, fixSOH, fixBodyLength, len(body), fixSOH)
	raw := header + body
	checksum := fixChecksum(raw)
	raw += fmt.Sprintf("%d=%03d%s", fixCheckSum, checksum, fixSOH)

	sess.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	sess.conn.Write([]byte(raw))
	s.messagesSent.Add(1)
}

func (s *FIXServer) heartbeatLoop(sess *fixSession) {
	interval := time.Duration(sess.heartbeatInt) * time.Second
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			sess.mu.Lock()
			loggedIn := sess.loggedIn
			sess.mu.Unlock()
			if !loggedIn {
				return
			}
			s.sendMessage(sess, "0", nil)
		case <-s.ctx.Done():
			return
		}
	}
}

// --- FIX parsing helpers ---

func parseFixMessage(raw string) map[int]string {
	fields := make(map[int]string)
	parts := strings.Split(raw, fixSOH)
	for _, part := range parts {
		if part == "" {
			continue
		}
		eqIdx := strings.IndexByte(part, '=')
		if eqIdx < 0 {
			continue
		}
		tag, err := strconv.Atoi(part[:eqIdx])
		if err != nil {
			continue
		}
		fields[tag] = part[eqIdx+1:]
	}
	return fields
}

func fixChecksum(msg string) int {
	sum := 0
	for i := 0; i < len(msg); i++ {
		sum += int(msg[i])
	}
	return sum % 256
}

// fixSplitMessage is a bufio.SplitFunc that splits FIX messages.
// A FIX message ends with 10=NNN\x01 (checksum tag).
func fixSplitMessage(data []byte, atEOF bool) (advance int, token []byte, err error) {
	if atEOF && len(data) == 0 {
		return 0, nil, nil
	}

	// Look for checksum tag: "10=XXX\x01"
	for i := 0; i < len(data)-6; i++ {
		if data[i] == '\x01' && i+7 <= len(data) {
			// Check if next segment is "10="
			rest := data[i+1:]
			if len(rest) >= 6 && rest[0] == '1' && rest[1] == '0' && rest[2] == '=' {
				// Find the SOH after the checksum value
				for j := 3; j < len(rest); j++ {
					if rest[j] == '\x01' {
						end := i + 1 + j + 1
						return end, data[:end], nil
					}
				}
			}
		}
	}

	if atEOF {
		return len(data), data, nil
	}
	return 0, nil, nil
}
