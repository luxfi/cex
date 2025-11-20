package protocol

import (
	"context"
	"encoding/binary"
	"fmt"
	"io"
	"math"
	"net"
	"strconv"
	"sync"
	"sync/atomic"
	"time"
	"unsafe"

	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

// ZAP wire message types for the CEX (zero-copy binary protocol).
// Same wire format as the DEX for cross-compatibility.
const (
	ZAPMsgPlaceOrder  uint8 = 1
	ZAPMsgCancelOrder uint8 = 2
	ZAPMsgModifyOrder uint8 = 3
	ZAPMsgGetBestBid  uint8 = 4
	ZAPMsgGetBestAsk  uint8 = 5
	ZAPMsgGetBook     uint8 = 6
	ZAPMsgGetOrder    uint8 = 7
	ZAPMsgAck         uint8 = 10
	ZAPMsgReject      uint8 = 11
	ZAPMsgTrade       uint8 = 12
)

// Wire sizes (cache-line aligned).
const (
	ZAPOrderSize  = 64 // symbol(8) + id(8) + price(8) + qty(8) + side(1) + type(1) + tif(1) + pad(1) + ts(8) + user(16) + acct(4)
	ZAPCancelSize = 32 // order_id(8) + user(16) + pad(8)
	ZAPAckSize    = 24 // order_id(8) + status(1) + seq(8) + pad(7)
	ZAPQuoteSize  = 24 // price(8) + qty(8) + count(4) + pad(4)
)

// ZAPServer provides ultra-low-latency binary order handling for the CEX.
// Orders go through Engine.SubmitOrder() for compliance (not directly to the book).
type ZAPServer struct {
	engine      *engine.Engine
	matchEngine *engine.MatchEngine
	listener    net.Listener
	addr        string

	ordersProcessed atomic.Uint64
	cancelProcessed atomic.Uint64
	sequence        atomic.Uint64

	bufPool sync.Pool
	ctx     context.Context
	cancel  context.CancelFunc
}

func NewZAPServer(eng *engine.Engine, me *engine.MatchEngine, addr string) *ZAPServer {
	ctx, cancel := context.WithCancel(context.Background())
	return &ZAPServer{
		engine:      eng,
		matchEngine: me,
		addr:        addr,
		bufPool:     sync.Pool{New: func() interface{} { return make([]byte, 4096) }},
		ctx:         ctx,
		cancel:      cancel,
	}
}

// Start listens for ZAP binary connections.
func (s *ZAPServer) Start() error {
	ln, err := net.Listen("tcp", s.addr)
	if err != nil {
		return fmt.Errorf("ZAP listen: %w", err)
	}
	s.listener = ln
	log.Info().Str("addr", ln.Addr().String()).Msg("ZAP server started")

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

// Stop shuts down the ZAP server.
func (s *ZAPServer) Stop() error {
	s.cancel()
	if s.listener != nil {
		return s.listener.Close()
	}
	return nil
}

// Addr returns the server's listen address.
func (s *ZAPServer) Addr() string {
	if s.listener != nil {
		return s.listener.Addr().String()
	}
	return s.addr
}

func (s *ZAPServer) handleConn(conn net.Conn) {
	defer conn.Close()

	header := make([]byte, 5) // msgType(1) + payloadLen(4)
	for {
		select {
		case <-s.ctx.Done():
			return
		default:
		}

		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		if _, err := io.ReadFull(conn, header); err != nil {
			return
		}

		msgType := header[0]
		payloadLen := binary.BigEndian.Uint32(header[1:5])
		if payloadLen > 65536 {
			return // protect against oversized messages
		}

		payload := make([]byte, payloadLen)
		if _, err := io.ReadFull(conn, payload); err != nil {
			return
		}

		resp := s.dispatch(msgType, payload)
		if resp != nil {
			conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			conn.Write(resp)
		}
	}
}

func (s *ZAPServer) dispatch(msgType uint8, payload []byte) []byte {
	switch msgType {
	case ZAPMsgPlaceOrder:
		return s.handlePlaceOrder(payload)
	case ZAPMsgCancelOrder:
		return s.handleCancelOrder(payload)
	case ZAPMsgGetBestBid:
		return s.handleGetBestBid(payload)
	case ZAPMsgGetBestAsk:
		return s.handleGetBestAsk(payload)
	case ZAPMsgGetBook:
		return s.handleGetBook(payload)
	default:
		return s.encodeReject(0, "unknown message type")
	}
}

// handlePlaceOrder decodes a 64-byte binary order and submits through the CEX engine.
// Wire format: symbol(8) + id(8) + price(8) + qty(8) + side(1) + type(1) + tif(1) + pad(1) + ts(8) + user(16) + acct(4)
func (s *ZAPServer) handlePlaceOrder(payload []byte) []byte {
	if len(payload) < ZAPOrderSize {
		return s.encodeReject(0, "invalid message size")
	}

	symbol := string(zapTrimNull(payload[0:8]))
	price := zapDecodeFloat64(payload[16:24])
	qty := zapDecodeFloat64(payload[24:32])
	sideByte := payload[32]
	typeByte := payload[33]
	tifByte := payload[34]
	userID := string(zapTrimNull(payload[36:52]))
	accountID := string(zapTrimNull(payload[52:56]))

	if price < 0 || qty <= 0 || symbol == "" {
		return s.encodeReject(0, "invalid order fields")
	}

	var side types.Side
	if sideByte == 0 {
		side = types.SideBuy
	} else {
		side = types.SideSell
	}

	var orderType types.OrderType
	switch typeByte {
	case 0:
		orderType = types.OrderTypeLimit
	case 1:
		orderType = types.OrderTypeMarket
	case 2:
		orderType = types.OrderTypeStop
	case 3:
		orderType = types.OrderTypeStopLimit
	default:
		orderType = types.OrderTypeLimit
	}

	var tif types.TimeInForce
	switch tifByte {
	case 0:
		tif = types.TIFGTC
	case 1:
		tif = types.TIFIOC
	case 2:
		tif = types.TIFFOK
	case 3:
		tif = types.TIFDay
	default:
		tif = types.TIFGTC
	}

	req := &types.SubmitOrderRequest{
		Symbol:      symbol,
		Side:        side,
		Type:        orderType,
		TimeInForce: tif,
		Qty:         strconv.FormatFloat(qty, 'f', -1, 64),
		LimitPrice:  strconv.FormatFloat(price, 'f', -1, 64),
	}

	order, err := s.engine.SubmitOrder(context.Background(), accountID, userID, "", req)
	if err != nil {
		return s.encodeReject(0, err.Error())
	}

	s.ordersProcessed.Add(1)
	return s.encodeAck(order.ID, 0, s.sequence.Add(1))
}

func (s *ZAPServer) handleCancelOrder(payload []byte) []byte {
	if len(payload) < 8 {
		return s.encodeReject(0, "invalid cancel message")
	}

	// For ZAP cancel, the order ID is the first 8 bytes as a string UUID would be too long.
	// In the CEX, order IDs are UUIDs, so we accept a variable-length string here.
	orderID := string(zapTrimNull(payload))

	order, err := s.engine.CancelOrder(context.Background(), orderID)
	if err != nil {
		return s.encodeReject(0, err.Error())
	}

	s.cancelProcessed.Add(1)
	return s.encodeAck(order.ID, 1, s.sequence.Add(1))
}

func (s *ZAPServer) handleGetBestBid(payload []byte) []byte {
	symbol := string(zapTrimNull(payload))
	if s.matchEngine == nil {
		return s.encodeQuote(0, 0, 0)
	}
	snap := s.matchEngine.GetSnapshot(symbol)
	if snap == nil || len(snap.Bids) == 0 {
		return s.encodeQuote(0, 0, 0)
	}
	lvl := snap.Bids[0]
	return s.encodeQuote(float64(lvl.Price), float64(lvl.Qty), lvl.OrderCount)
}

func (s *ZAPServer) handleGetBestAsk(payload []byte) []byte {
	symbol := string(zapTrimNull(payload))
	if s.matchEngine == nil {
		return s.encodeQuote(0, 0, 0)
	}
	snap := s.matchEngine.GetSnapshot(symbol)
	if snap == nil || len(snap.Asks) == 0 {
		return s.encodeQuote(0, 0, 0)
	}
	lvl := snap.Asks[0]
	return s.encodeQuote(float64(lvl.Price), float64(lvl.Qty), lvl.OrderCount)
}

func (s *ZAPServer) handleGetBook(payload []byte) []byte {
	symbol := string(zapTrimNull(payload[:8]))
	levels := 20
	if len(payload) >= 12 {
		levels = int(binary.BigEndian.Uint32(payload[8:12]))
		if levels > 100 {
			levels = 100
		}
	}

	if s.matchEngine == nil {
		return s.encodeQuote(0, 0, 0)
	}
	snap := s.matchEngine.GetSnapshot(symbol)
	if snap == nil {
		return s.encodeQuote(0, 0, 0)
	}

	bids := snap.Bids
	asks := snap.Asks
	if len(bids) > levels {
		bids = bids[:levels]
	}
	if len(asks) > levels {
		asks = asks[:levels]
	}

	// Encode: bidCount(4) + askCount(4) + bids(N*24) + asks(N*24)
	size := 8 + len(bids)*ZAPQuoteSize + len(asks)*ZAPQuoteSize
	resp := make([]byte, size)
	binary.BigEndian.PutUint32(resp[0:4], uint32(len(bids)))
	binary.BigEndian.PutUint32(resp[4:8], uint32(len(asks)))

	off := 8
	for _, lvl := range bids {
		zapEncodeFloat64(resp[off:off+8], float64(lvl.Price))
		zapEncodeFloat64(resp[off+8:off+16], float64(lvl.Qty))
		binary.BigEndian.PutUint32(resp[off+16:off+20], uint32(lvl.OrderCount))
		off += ZAPQuoteSize
	}
	for _, lvl := range asks {
		zapEncodeFloat64(resp[off:off+8], float64(lvl.Price))
		zapEncodeFloat64(resp[off+8:off+16], float64(lvl.Qty))
		binary.BigEndian.PutUint32(resp[off+16:off+20], uint32(lvl.OrderCount))
		off += ZAPQuoteSize
	}

	return resp[:off]
}

// --- Encoding helpers ---

func (s *ZAPServer) encodeAck(orderID string, status uint8, seq uint64) []byte {
	// For CEX, order IDs are UUIDs (36 bytes). Encode: len(2) + orderID(var) + status(1) + seq(8)
	idBytes := []byte(orderID)
	size := 2 + len(idBytes) + 1 + 8
	resp := make([]byte, size)
	binary.BigEndian.PutUint16(resp[0:2], uint16(len(idBytes)))
	copy(resp[2:2+len(idBytes)], idBytes)
	resp[2+len(idBytes)] = status
	binary.BigEndian.PutUint64(resp[3+len(idBytes):], seq)
	return resp
}

func (s *ZAPServer) encodeReject(orderID uint64, reason string) []byte {
	rb := []byte(reason)
	if len(rb) > 256 {
		rb = rb[:256]
	}
	size := 8 + 1 + 2 + len(rb)
	resp := make([]byte, size)
	binary.BigEndian.PutUint64(resp[0:8], orderID)
	resp[8] = 2 // rejected
	binary.BigEndian.PutUint16(resp[9:11], uint16(len(rb)))
	copy(resp[11:], rb)
	return resp
}

func (s *ZAPServer) encodeQuote(price, qty float64, count int) []byte {
	resp := make([]byte, ZAPQuoteSize)
	zapEncodeFloat64(resp[0:8], price)
	zapEncodeFloat64(resp[8:16], qty)
	binary.BigEndian.PutUint32(resp[16:20], uint32(count))
	return resp
}

func zapDecodeFloat64(b []byte) float64 {
	bits := binary.BigEndian.Uint64(b)
	return math.Float64frombits(bits)
}

func zapEncodeFloat64(b []byte, f float64) {
	bits := *(*uint64)(unsafe.Pointer(&f))
	binary.BigEndian.PutUint64(b, bits)
}

func zapTrimNull(b []byte) []byte {
	for i := len(b) - 1; i >= 0; i-- {
		if b[i] != 0 {
			return b[:i+1]
		}
	}
	return b[:0]
}
