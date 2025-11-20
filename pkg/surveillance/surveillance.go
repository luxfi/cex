package surveillance

import (
	"context"
	"fmt"
	"strconv"
	"sync"
	"time"

	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/types"
)

// AlertType classifies the market abuse pattern.
type AlertType string

const (
	AlertWashTrading  AlertType = "wash_trading"
	AlertSpoofing     AlertType = "spoofing"
	AlertLayering     AlertType = "layering"
	AlertFrontRun     AlertType = "front_running"
	AlertInsider      AlertType = "insider_trading"
	AlertManipulate   AlertType = "market_manipulation"
	AlertStructuring  AlertType = "structuring"        // KYT: multiple txns just under CTR threshold
	AlertVelocity     AlertType = "velocity"            // KYT: unusual trade frequency
	AlertLargeTrade   AlertType = "large_trade"         // KYT: trade above threshold
	AlertPriceSpike   AlertType = "price_spike"         // abnormal price acceleration (parabolic/exponential)
)

// Alert is a surveillance alert for review.
type Alert struct {
	ID        string    `json:"id"`
	Type      AlertType `json:"type"`
	Severity  string    `json:"severity"` // low, medium, high, critical
	AccountID string    `json:"account_id"`
	Symbol    string    `json:"symbol"`
	Details   string    `json:"details"`
	TradeIDs  []string  `json:"trade_ids"`
	CreatedAt time.Time `json:"created_at"`
	Status    string    `json:"status"` // open, investigating, resolved, escalated
}

// KYTConfig holds thresholds for Know Your Transaction monitoring.
type KYTConfig struct {
	CTRThreshold       float64       // Currency Transaction Report threshold (default: $10,000 USD for US)
	LargeTradeThreshold float64      // Alert for trades above this notional
	VelocityWindow     time.Duration // Window for velocity checks (default: 1 hour)
	VelocityMaxTrades  int           // Max trades per window before alert (default: 50)
	StructuringWindow  time.Duration // Window for structuring detection (default: 24 hours)
	StructuringMinTxns int           // Min transactions to trigger structuring alert (default: 3)
	PriceSpikeWindow   time.Duration // Window for price acceleration checks (default: 5 min)
	PriceSpikeMaxPct   float64       // Max price change % before alert (default: 10%)
	PriceSpikeAccelPct float64       // Trigger if rate of change is accelerating (quadratic) — second derivative threshold (default: 5%)
}

// DefaultKYTConfig returns sensible defaults for transaction monitoring.
func DefaultKYTConfig() KYTConfig {
	return KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 100000,
		VelocityWindow:      1 * time.Hour,
		VelocityMaxTrades:   50,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  3,
		PriceSpikeWindow:    5 * time.Minute,
		PriceSpikeMaxPct:    10.0, // 10% move in window
		PriceSpikeAccelPct:  5.0,  // 5% acceleration (second derivative)
	}
}

// Service monitors trading activity for market abuse patterns.
type Service struct {
	mu     sync.Mutex
	alerts []Alert
	kyt    KYTConfig

	// Tracking windows per account for wash trade + KYT detection
	recentTrades map[string][]*tradeRecord
	// Longer window for structuring detection (24h)
	dailyTrades map[string][]*tradeRecord
	// Per-symbol price history for spike/acceleration detection
	priceHistory map[string][]pricePoint
}

type pricePoint struct {
	price     float64
	timestamp time.Time
}

type tradeRecord struct {
	tradeID   string
	symbol    string
	side      types.Side
	qty       string
	price     string
	timestamp time.Time
}

func NewService() *Service {
	return &Service{
		kyt:          DefaultKYTConfig(),
		recentTrades: make(map[string][]*tradeRecord),
		dailyTrades:  make(map[string][]*tradeRecord),
		priceHistory: make(map[string][]pricePoint),
	}
}

// SetKYTConfig updates the KYT thresholds.
func (s *Service) SetKYTConfig(cfg KYTConfig) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.kyt = cfg
}

// PostTradeHook returns an engine.PostTradeHook that monitors for abuse.
func (s *Service) PostTradeHook() func(ctx context.Context, trade *types.Trade) {
	return func(ctx context.Context, trade *types.Trade) {
		s.mu.Lock()
		defer s.mu.Unlock()

		rec := &tradeRecord{
			tradeID:   trade.ID,
			symbol:    trade.Symbol,
			side:      trade.Side,
			qty:       trade.Qty,
			price:     trade.Price,
			timestamp: trade.Timestamp,
		}

		key := trade.AccountID
		s.recentTrades[key] = append(s.recentTrades[key], rec)

		// Prune trades older than 5 minutes
		cutoff := time.Now().Add(-5 * time.Minute)
		recent := s.recentTrades[key]
		pruned := recent[:0]
		for _, r := range recent {
			if r.timestamp.After(cutoff) {
				pruned = append(pruned, r)
			}
		}
		s.recentTrades[key] = pruned

		// Maintain daily trade window for KYT
		s.dailyTrades[key] = append(s.dailyTrades[key], rec)
		dailyCutoff := time.Now().Add(-s.kyt.StructuringWindow)
		daily := s.dailyTrades[key]
		prunedDaily := daily[:0]
		for _, r := range daily {
			if r.timestamp.After(dailyCutoff) {
				prunedDaily = append(prunedDaily, r)
			}
		}
		s.dailyTrades[key] = prunedDaily

		// Market abuse checks
		s.checkWashTrading(trade.AccountID, rec)

		// KYT checks
		s.checkLargeTrade(trade.AccountID, rec)
		s.checkVelocity(trade.AccountID)
		s.checkStructuring(trade.AccountID, rec)

		// Price acceleration detection (parabolic/exponential moves)
		p, _ := strconv.ParseFloat(trade.Price, 64)
		if p > 0 {
			s.priceHistory[trade.Symbol] = append(s.priceHistory[trade.Symbol], pricePoint{
				price:     p,
				timestamp: trade.Timestamp,
			})
			// Prune old price points
			spikeCutoff := time.Now().Add(-s.kyt.PriceSpikeWindow * 2) // keep 2x window
			ph := s.priceHistory[trade.Symbol]
			prunedPH := ph[:0]
			for _, pt := range ph {
				if pt.timestamp.After(spikeCutoff) {
					prunedPH = append(prunedPH, pt)
				}
			}
			s.priceHistory[trade.Symbol] = prunedPH
			s.checkPriceSpike(trade.Symbol, trade.AccountID, rec)
		}
	}
}

func (s *Service) checkWashTrading(accountID string, latest *tradeRecord) {
	recent := s.recentTrades[accountID]
	for _, prev := range recent {
		if prev.tradeID == latest.tradeID {
			continue
		}
		if prev.symbol != latest.symbol {
			continue
		}
		// Same symbol, opposite sides, within window
		if prev.side != latest.side && prev.qty == latest.qty {
			alert := Alert{
				ID:        latest.tradeID + "-wash",
				Type:      AlertWashTrading,
				Severity:  "high",
				AccountID: accountID,
				Symbol:    latest.symbol,
				Details:   "Matching buy/sell of same qty within 5-minute window",
				TradeIDs:  []string{prev.tradeID, latest.tradeID},
				CreatedAt: time.Now().UTC(),
				Status:    "open",
			}
			s.alerts = append(s.alerts, alert)
			log.Warn().
				Str("account", accountID).
				Str("symbol", latest.symbol).
				Str("alert", string(AlertWashTrading)).
				Msg("Surveillance alert: wash trading detected")
		}
	}
}

// --- KYT: Know Your Transaction monitoring ---

func (s *Service) checkLargeTrade(accountID string, rec *tradeRecord) {
	notional := parseNotional(rec.qty, rec.price)
	if notional >= s.kyt.LargeTradeThreshold {
		alert := Alert{
			ID:        rec.tradeID + "-large",
			Type:      AlertLargeTrade,
			Severity:  "medium",
			AccountID: accountID,
			Symbol:    rec.symbol,
			Details:   fmt.Sprintf("Large trade: $%.2f (threshold: $%.2f)", notional, s.kyt.LargeTradeThreshold),
			TradeIDs:  []string{rec.tradeID},
			CreatedAt: time.Now().UTC(),
			Status:    "open",
		}
		s.alerts = append(s.alerts, alert)
		log.Warn().
			Str("account", accountID).
			Float64("notional", notional).
			Str("alert", string(AlertLargeTrade)).
			Msg("KYT alert: large trade")
	}
}

func (s *Service) checkVelocity(accountID string) {
	velocityCutoff := time.Now().Add(-s.kyt.VelocityWindow)
	count := 0
	for _, r := range s.recentTrades[accountID] {
		if r.timestamp.After(velocityCutoff) {
			count++
		}
	}
	// Also count from daily window for wider coverage
	for _, r := range s.dailyTrades[accountID] {
		if r.timestamp.After(velocityCutoff) {
			count++
		}
	}
	// Deduplicate (recentTrades is subset of dailyTrades in overlap)
	count = count / 2
	if count < len(s.recentTrades[accountID]) {
		count = len(s.recentTrades[accountID])
	}

	if count >= s.kyt.VelocityMaxTrades {
		// Only alert once per window — check if we already have a velocity alert
		for i := len(s.alerts) - 1; i >= 0; i-- {
			a := s.alerts[i]
			if a.AccountID == accountID && a.Type == AlertVelocity &&
				time.Since(a.CreatedAt) < s.kyt.VelocityWindow {
				return // already alerted
			}
		}
		alert := Alert{
			ID:        fmt.Sprintf("%s-velocity-%d", accountID, time.Now().UnixMilli()),
			Type:      AlertVelocity,
			Severity:  "medium",
			AccountID: accountID,
			Details:   fmt.Sprintf("High trade velocity: %d trades in %v (max: %d)", count, s.kyt.VelocityWindow, s.kyt.VelocityMaxTrades),
			CreatedAt: time.Now().UTC(),
			Status:    "open",
		}
		s.alerts = append(s.alerts, alert)
		log.Warn().
			Str("account", accountID).
			Int("count", count).
			Str("alert", string(AlertVelocity)).
			Msg("KYT alert: high trade velocity")
	}
}

func (s *Service) checkStructuring(accountID string, latest *tradeRecord) {
	// Structuring: multiple transactions just under CTR threshold ($10K)
	// Look for 3+ trades in 24h window where each is between 80%-99% of CTR threshold
	threshold := s.kyt.CTRThreshold
	lowerBound := threshold * 0.80
	upperBound := threshold * 0.99

	var suspiciousTrades []*tradeRecord
	for _, r := range s.dailyTrades[accountID] {
		notional := parseNotional(r.qty, r.price)
		if notional >= lowerBound && notional <= upperBound {
			suspiciousTrades = append(suspiciousTrades, r)
		}
	}

	if len(suspiciousTrades) >= s.kyt.StructuringMinTxns {
		// Check if we already alerted for this account recently
		for i := len(s.alerts) - 1; i >= 0; i-- {
			a := s.alerts[i]
			if a.AccountID == accountID && a.Type == AlertStructuring &&
				time.Since(a.CreatedAt) < s.kyt.StructuringWindow {
				return
			}
		}

		tradeIDs := make([]string, len(suspiciousTrades))
		for i, t := range suspiciousTrades {
			tradeIDs[i] = t.tradeID
		}
		alert := Alert{
			ID:        fmt.Sprintf("%s-struct-%d", accountID, time.Now().UnixMilli()),
			Type:      AlertStructuring,
			Severity:  "high",
			AccountID: accountID,
			Details:   fmt.Sprintf("Potential structuring: %d trades between $%.0f-$%.0f in %v (CTR threshold: $%.0f)", len(suspiciousTrades), lowerBound, upperBound, s.kyt.StructuringWindow, threshold),
			TradeIDs:  tradeIDs,
			CreatedAt: time.Now().UTC(),
			Status:    "open",
		}
		s.alerts = append(s.alerts, alert)
		log.Warn().
			Str("account", accountID).
			Int("suspicious_count", len(suspiciousTrades)).
			Str("alert", string(AlertStructuring)).
			Msg("KYT alert: potential structuring/smurfing")
	}
}

// checkPriceSpike detects parabolic/exponential price movements.
// Uses quadratic analysis: if the second derivative of price over time is large,
// the price is accelerating (going parabolic) rather than moving linearly.
func (s *Service) checkPriceSpike(symbol, accountID string, latest *tradeRecord) {
	points := s.priceHistory[symbol]
	if len(points) < 3 {
		return // need at least 3 points for acceleration
	}

	window := s.kyt.PriceSpikeWindow
	cutoff := time.Now().Add(-window)
	var inWindow []pricePoint
	for _, pt := range points {
		if pt.timestamp.After(cutoff) {
			inWindow = append(inWindow, pt)
		}
	}
	if len(inWindow) < 3 {
		return
	}

	first := inWindow[0]
	last := inWindow[len(inWindow)-1]

	// Simple price change check
	if first.price == 0 {
		return
	}
	pctChange := ((last.price - first.price) / first.price) * 100
	absPctChange := pctChange
	if absPctChange < 0 {
		absPctChange = -absPctChange
	}

	// Check for second derivative (acceleration) — quadratic price movement
	// Split window into halves and compare rate of change
	mid := len(inWindow) / 2
	midPoint := inWindow[mid]

	dt1 := midPoint.timestamp.Sub(first.timestamp).Seconds()
	dt2 := last.timestamp.Sub(midPoint.timestamp).Seconds()
	if dt1 < 1 || dt2 < 1 {
		return
	}

	rate1 := (midPoint.price - first.price) / dt1  // price change per second, first half
	rate2 := (last.price - midPoint.price) / dt2    // price change per second, second half

	// Acceleration = change in rate (second derivative proxy)
	accel := rate2 - rate1
	if rate1 != 0 {
		accelPct := (accel / abs(rate1)) * 100
		if accelPct < 0 {
			accelPct = -accelPct
		}

		triggered := false
		details := ""

		if absPctChange >= s.kyt.PriceSpikeMaxPct {
			triggered = true
			details = fmt.Sprintf("Price spike: %.1f%% move in %v (threshold: %.1f%%)", pctChange, window, s.kyt.PriceSpikeMaxPct)
		} else if accelPct >= s.kyt.PriceSpikeAccelPct && absPctChange >= s.kyt.PriceSpikeMaxPct/2 {
			// Acceleration is high even if total move isn't at threshold yet — parabolic
			triggered = true
			details = fmt.Sprintf("Parabolic price acceleration: %.1f%% total move, %.1f%% acceleration (rate: $%.2f/s → $%.2f/s)", pctChange, accelPct, rate1, rate2)
		}

		if triggered {
			// Only one spike alert per symbol per window
			for i := len(s.alerts) - 1; i >= 0; i-- {
				a := s.alerts[i]
				if a.Symbol == symbol && a.Type == AlertPriceSpike && time.Since(a.CreatedAt) < window {
					return
				}
			}

			severity := "medium"
			if absPctChange >= s.kyt.PriceSpikeMaxPct*2 {
				severity = "critical"
			} else if absPctChange >= s.kyt.PriceSpikeMaxPct {
				severity = "high"
			}

			alert := Alert{
				ID:        fmt.Sprintf("%s-spike-%d", symbol, time.Now().UnixMilli()),
				Type:      AlertPriceSpike,
				Severity:  severity,
				AccountID: accountID,
				Symbol:    symbol,
				Details:   details,
				TradeIDs:  []string{latest.tradeID},
				CreatedAt: time.Now().UTC(),
				Status:    "open",
			}
			s.alerts = append(s.alerts, alert)
			log.Warn().
				Str("symbol", symbol).
				Float64("pct_change", pctChange).
				Str("severity", severity).
				Str("alert", string(AlertPriceSpike)).
				Msg("KYT alert: abnormal price acceleration")
		}
	}
}

func abs(f float64) float64 {
	if f < 0 {
		return -f
	}
	return f
}

func parseNotional(qty, price string) float64 {
	q, _ := strconv.ParseFloat(qty, 64)
	p, _ := strconv.ParseFloat(price, 64)
	return q * p
}

// GetAlerts returns all alerts, optionally filtered by status.
func (s *Service) GetAlerts(status string) []Alert {
	s.mu.Lock()
	defer s.mu.Unlock()
	if status == "" {
		out := make([]Alert, len(s.alerts))
		copy(out, s.alerts)
		return out
	}
	var out []Alert
	for _, a := range s.alerts {
		if a.Status == status {
			out = append(out, a)
		}
	}
	return out
}
