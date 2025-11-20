package surveillance

import (
	"context"
	"testing"
	"time"

	"github.com/luxfi/cex/pkg/types"
)

func TestPostTradeHook_NoAlertForSingleTrade(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()

	hook(context.Background(), &types.Trade{
		ID:        "t1",
		AccountID: "acct-1",
		Symbol:    "BTC-USD",
		Side:      types.SideBuy,
		Qty:       "1.5",
		Price:     "50000",
		Timestamp: time.Now().UTC(),
	})

	alerts := svc.GetAlerts("")
	if len(alerts) != 0 {
		t.Fatalf("expected 0 alerts for single trade, got %d", len(alerts))
	}
}

func TestPostTradeHook_WashTradingDetected(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// Buy
	hook(context.Background(), &types.Trade{
		ID:        "t1",
		AccountID: "acct-1",
		Symbol:    "BTC-USD",
		Side:      types.SideBuy,
		Qty:       "1.5",
		Price:     "50000",
		Timestamp: now,
	})

	// Sell same symbol, same qty, same account
	hook(context.Background(), &types.Trade{
		ID:        "t2",
		AccountID: "acct-1",
		Symbol:    "BTC-USD",
		Side:      types.SideSell,
		Qty:       "1.5",
		Price:     "50100",
		Timestamp: now.Add(10 * time.Second),
	})

	alerts := svc.GetAlerts("")
	if len(alerts) != 1 {
		t.Fatalf("expected 1 wash trading alert, got %d", len(alerts))
	}
	a := alerts[0]
	if a.Type != AlertWashTrading {
		t.Fatalf("expected wash_trading, got %s", a.Type)
	}
	if a.AccountID != "acct-1" {
		t.Fatalf("expected acct-1, got %s", a.AccountID)
	}
	if a.Severity != "high" {
		t.Fatalf("expected high severity, got %s", a.Severity)
	}
	if len(a.TradeIDs) != 2 {
		t.Fatalf("expected 2 trade IDs, got %d", len(a.TradeIDs))
	}
}

func TestPostTradeHook_NoWashDifferentSymbol(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	hook(context.Background(), &types.Trade{
		ID: "t1", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1.5", Price: "50000", Timestamp: now,
	})
	hook(context.Background(), &types.Trade{
		ID: "t2", AccountID: "acct-1", Symbol: "ETH-USD",
		Side: types.SideSell, Qty: "1.5", Price: "3000", Timestamp: now.Add(5 * time.Second),
	})

	if len(svc.GetAlerts("")) != 0 {
		t.Fatal("expected no alert for different symbols")
	}
}

func TestPostTradeHook_NoWashDifferentQty(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	hook(context.Background(), &types.Trade{
		ID: "t1", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1.5", Price: "50000", Timestamp: now,
	})
	hook(context.Background(), &types.Trade{
		ID: "t2", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideSell, Qty: "2.0", Price: "50000", Timestamp: now.Add(5 * time.Second),
	})

	// Should have no WASH alerts (different qty) — may have KYT alerts
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertWashTrading {
			t.Fatal("expected no wash trading alert for different quantities")
		}
	}
}

func TestPostTradeHook_NoWashDifferentAccount(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	hook(context.Background(), &types.Trade{
		ID: "t1", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1.5", Price: "50000", Timestamp: now,
	})
	hook(context.Background(), &types.Trade{
		ID: "t2", AccountID: "acct-2", Symbol: "BTC-USD",
		Side: types.SideSell, Qty: "1.5", Price: "50000", Timestamp: now.Add(5 * time.Second),
	})

	if len(svc.GetAlerts("")) != 0 {
		t.Fatal("expected no alert for different accounts")
	}
}

func TestGetAlerts_FilterByStatus(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// Trigger 2 wash trades
	for i := 0; i < 2; i++ {
		hook(context.Background(), &types.Trade{
			ID: "buy" + string(rune('0'+i)), AccountID: "acct-1", Symbol: "BTC-USD",
			Side: types.SideBuy, Qty: "1", Price: "50000", Timestamp: now,
		})
		hook(context.Background(), &types.Trade{
			ID: "sell" + string(rune('0'+i)), AccountID: "acct-1", Symbol: "BTC-USD",
			Side: types.SideSell, Qty: "1", Price: "50000", Timestamp: now.Add(time.Duration(i+1) * time.Second),
		})
	}

	all := svc.GetAlerts("")
	if len(all) == 0 {
		t.Fatal("expected alerts")
	}

	open := svc.GetAlerts("open")
	if len(open) != len(all) {
		t.Fatalf("expected all alerts to be open, got %d open of %d total", len(open), len(all))
	}

	resolved := svc.GetAlerts("resolved")
	if len(resolved) != 0 {
		t.Fatalf("expected 0 resolved alerts, got %d", len(resolved))
	}
}

func TestPostTradeHook_PrunesOldTrades(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()

	// Old trade (6 minutes ago — should be pruned)
	hook(context.Background(), &types.Trade{
		ID: "old", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1", Price: "50000",
		Timestamp: time.Now().UTC().Add(-6 * time.Minute),
	})

	// New trade — opposite side, same qty
	hook(context.Background(), &types.Trade{
		ID: "new", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideSell, Qty: "1", Price: "50000",
		Timestamp: time.Now().UTC(),
	})

	// The old trade should have been pruned, so no wash alert
	if len(svc.GetAlerts("")) != 0 {
		t.Fatal("expected no alert — old trade should be pruned outside 5-minute window")
	}
}

func TestNoWashSameSide(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	hook(context.Background(), &types.Trade{
		ID: "t1", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1", Price: "50000", Timestamp: now,
	})
	hook(context.Background(), &types.Trade{
		ID: "t2", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "1", Price: "50100", Timestamp: now.Add(time.Second),
	})

	if len(svc.GetAlerts("")) != 0 {
		t.Fatal("expected no alert for same-side trades")
	}
}

// --- KYT: Know Your Transaction tests ---

func TestKYT_LargeTradeAlert(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 50000,
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   100,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  3,
	})
	hook := svc.PostTradeHook()

	// Trade worth $60K (2 * $30000) — above $50K threshold
	hook(context.Background(), &types.Trade{
		ID: "big1", AccountID: "acct-1", Symbol: "BTC-USD",
		Side: types.SideBuy, Qty: "2", Price: "30000",
		Timestamp: time.Now().UTC(),
	})

	var largeAlerts []Alert
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertLargeTrade {
			largeAlerts = append(largeAlerts, a)
		}
	}
	if len(largeAlerts) != 1 {
		t.Fatalf("expected 1 large trade alert, got %d", len(largeAlerts))
	}
	if largeAlerts[0].Severity != "medium" {
		t.Fatalf("expected medium severity, got %s", largeAlerts[0].Severity)
	}
}

func TestKYT_NoLargeTradeUnderThreshold(t *testing.T) {
	svc := NewService()
	hook := svc.PostTradeHook()

	// Trade worth $5K — under default $100K threshold
	hook(context.Background(), &types.Trade{
		ID: "small1", AccountID: "acct-1", Symbol: "AAPL",
		Side: types.SideBuy, Qty: "50", Price: "100",
		Timestamp: time.Now().UTC(),
	})

	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertLargeTrade {
			t.Fatal("expected no large trade alert for $5K trade")
		}
	}
}

func TestKYT_StructuringDetection(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 1000000, // high so it doesn't trigger
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   100,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  3,
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// 3 trades each at $9,500 — between 80% ($8K) and 99% ($9.9K) of $10K CTR threshold
	for i := 0; i < 3; i++ {
		hook(context.Background(), &types.Trade{
			ID:        "struct" + string(rune('0'+i)),
			AccountID: "acct-smurf",
			Symbol:    "BTC-USD",
			Side:      types.SideBuy,
			Qty:       "1",
			Price:     "9500",
			Timestamp: now.Add(time.Duration(i) * time.Minute),
		})
	}

	var structAlerts []Alert
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertStructuring {
			structAlerts = append(structAlerts, a)
		}
	}
	if len(structAlerts) != 1 {
		t.Fatalf("expected 1 structuring alert, got %d", len(structAlerts))
	}
	if structAlerts[0].Severity != "high" {
		t.Fatalf("expected high severity, got %s", structAlerts[0].Severity)
	}
}

func TestKYT_NoStructuringAboveThreshold(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 1000000,
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   100,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  3,
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// 3 trades at $15K — above CTR threshold, not structuring
	for i := 0; i < 3; i++ {
		hook(context.Background(), &types.Trade{
			ID:        "legit" + string(rune('0'+i)),
			AccountID: "acct-legit",
			Symbol:    "BTC-USD",
			Side:      types.SideBuy,
			Qty:       "1",
			Price:     "15000",
			Timestamp: now.Add(time.Duration(i) * time.Minute),
		})
	}

	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertStructuring && a.AccountID == "acct-legit" {
			t.Fatal("expected no structuring alert for trades above CTR threshold")
		}
	}
}

func TestKYT_VelocityAlert(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 1000000,
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   5, // low threshold for testing
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  100, // high so structuring doesn't trigger
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	for i := 0; i < 6; i++ {
		hook(context.Background(), &types.Trade{
			ID:        "vel" + string(rune('0'+i)),
			AccountID: "acct-fast",
			Symbol:    "AAPL",
			Side:      types.SideBuy,
			Qty:       "10",
			Price:     "150",
			Timestamp: now.Add(time.Duration(i) * time.Second),
		})
	}

	var velAlerts []Alert
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertVelocity && a.AccountID == "acct-fast" {
			velAlerts = append(velAlerts, a)
		}
	}
	if len(velAlerts) == 0 {
		t.Fatal("expected velocity alert for 6 trades with max 5")
	}
}

// --- Price spike / parabolic detection tests ---

func TestKYT_PriceSpikeDetection(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 10000000, // very high so it doesn't interfere
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   1000,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  100,
		PriceSpikeWindow:    5 * time.Minute,
		PriceSpikeMaxPct:    10.0,
		PriceSpikeAccelPct:  5.0,
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// Simulate a parabolic pump: $100 → $105 → $115 (accelerating)
	prices := []string{"100", "105", "115"}
	for i, p := range prices {
		hook(context.Background(), &types.Trade{
			ID:        "spike" + string(rune('0'+i)),
			AccountID: "acct-pump",
			Symbol:    "PUMP-USD",
			Side:      types.SideBuy,
			Qty:       "1",
			Price:     p,
			Timestamp: now.Add(time.Duration(i) * 30 * time.Second),
		})
	}

	var spikeAlerts []Alert
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertPriceSpike && a.Symbol == "PUMP-USD" {
			spikeAlerts = append(spikeAlerts, a)
		}
	}
	if len(spikeAlerts) != 1 {
		t.Fatalf("expected 1 price spike alert, got %d", len(spikeAlerts))
	}
}

func TestKYT_NoPriceSpikeForStablePrice(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 10000000,
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   1000,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  100,
		PriceSpikeWindow:    5 * time.Minute,
		PriceSpikeMaxPct:    10.0,
		PriceSpikeAccelPct:  5.0,
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// Stable prices: $100.00, $100.50, $101.00 (< 10% move)
	prices := []string{"100.00", "100.50", "101.00"}
	for i, p := range prices {
		hook(context.Background(), &types.Trade{
			ID:        "stable" + string(rune('0'+i)),
			AccountID: "acct-stable",
			Symbol:    "STABLE-USD",
			Side:      types.SideBuy,
			Qty:       "1",
			Price:     p,
			Timestamp: now.Add(time.Duration(i) * 30 * time.Second),
		})
	}

	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertPriceSpike && a.Symbol == "STABLE-USD" {
			t.Fatal("expected no spike alert for stable prices")
		}
	}
}

func TestKYT_ParabolicCrashDetection(t *testing.T) {
	svc := NewService()
	svc.SetKYTConfig(KYTConfig{
		CTRThreshold:        10000,
		LargeTradeThreshold: 10000000,
		VelocityWindow:      time.Hour,
		VelocityMaxTrades:   1000,
		StructuringWindow:   24 * time.Hour,
		StructuringMinTxns:  100,
		PriceSpikeWindow:    5 * time.Minute,
		PriceSpikeMaxPct:    10.0,
		PriceSpikeAccelPct:  5.0,
	})
	hook := svc.PostTradeHook()
	now := time.Now().UTC()

	// Flash crash: $100 → $95 → $80 (accelerating downward)
	prices := []string{"100", "95", "80"}
	for i, p := range prices {
		hook(context.Background(), &types.Trade{
			ID:        "crash" + string(rune('0'+i)),
			AccountID: "acct-crash",
			Symbol:    "CRASH-USD",
			Side:      types.SideSell,
			Qty:       "1",
			Price:     p,
			Timestamp: now.Add(time.Duration(i) * 30 * time.Second),
		})
	}

	var spikeAlerts []Alert
	for _, a := range svc.GetAlerts("") {
		if a.Type == AlertPriceSpike && a.Symbol == "CRASH-USD" {
			spikeAlerts = append(spikeAlerts, a)
		}
	}
	if len(spikeAlerts) != 1 {
		t.Fatalf("expected 1 crash spike alert, got %d", len(spikeAlerts))
	}
}
