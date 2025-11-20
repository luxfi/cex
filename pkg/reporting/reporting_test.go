package reporting

import (
	"context"
	"testing"
	"time"

	"github.com/luxfi/cex/pkg/types"
)

func TestPostTradeHook_FilesReport(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	trade := &types.Trade{
		ID:        "trade-1",
		Symbol:    "AAPL",
		Side:      types.SideBuy,
		Price:     "150.25",
		Qty:       "100",
		Timestamp: time.Now().UTC(),
	}

	hook(context.Background(), trade)

	reports := svc.GetReports(nil, nil)
	if len(reports) != 1 {
		t.Fatalf("expected 1 report, got %d", len(reports))
	}
	r := reports[0]
	if r.TradeID != "trade-1" {
		t.Fatalf("expected trade-1, got %s", r.TradeID)
	}
	if r.Symbol != "AAPL" {
		t.Fatalf("expected AAPL, got %s", r.Symbol)
	}
	if r.ReportType != "last_sale" {
		t.Fatalf("expected last_sale, got %s", r.ReportType)
	}
	if r.Capacity != "agency" {
		t.Fatalf("expected agency, got %s", r.Capacity)
	}
	if r.Venue != "Lux ATS" {
		t.Fatalf("expected Lux ATS venue, got %s", r.Venue)
	}
}

func TestPostTradeHook_Timeliness(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	// Recent trade = on_time
	trade := &types.Trade{
		ID:        "trade-ontime",
		Symbol:    "AAPL",
		Side:      types.SideBuy,
		Price:     "150",
		Qty:       "10",
		Timestamp: time.Now().UTC(),
	}
	hook(context.Background(), trade)

	reports := svc.GetReports(nil, nil)
	if reports[0].MediatelyType != "on_time" {
		t.Fatalf("expected on_time, got %s", reports[0].MediatelyType)
	}
}

func TestPostTradeHook_LateTimeliness(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	// Trade from 30 seconds ago = late
	trade := &types.Trade{
		ID:        "trade-late",
		Symbol:    "MSFT",
		Side:      types.SideSell,
		Price:     "300",
		Qty:       "50",
		Timestamp: time.Now().UTC().Add(-30 * time.Second),
	}
	hook(context.Background(), trade)

	reports := svc.GetReports(nil, nil)
	if reports[0].MediatelyType != "late" {
		t.Fatalf("expected late, got %s", reports[0].MediatelyType)
	}
}

func TestPostTradeHook_AsOfTimeliness(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	// Trade from 2 minutes ago = as_of
	trade := &types.Trade{
		ID:        "trade-asof",
		Symbol:    "GOOGL",
		Side:      types.SideBuy,
		Price:     "140",
		Qty:       "20",
		Timestamp: time.Now().UTC().Add(-2 * time.Minute),
	}
	hook(context.Background(), trade)

	reports := svc.GetReports(nil, nil)
	if reports[0].MediatelyType != "as_of" {
		t.Fatalf("expected as_of, got %s", reports[0].MediatelyType)
	}
}

func TestGetReports_DateFilter(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	now := time.Now().UTC()

	for i, ts := range []time.Time{
		now.Add(-2 * time.Hour),
		now.Add(-1 * time.Hour),
		now,
	} {
		hook(context.Background(), &types.Trade{
			ID:        "trade-" + string(rune('0'+i)),
			Symbol:    "AAPL",
			Side:      types.SideBuy,
			Price:     "150",
			Qty:       "10",
			Timestamp: ts,
		})
	}

	// Filter: only last 90 minutes
	start := now.Add(-90 * time.Minute)
	filtered := svc.GetReports(&start, nil)
	if len(filtered) != 2 {
		t.Fatalf("expected 2 reports after start filter, got %d", len(filtered))
	}
}

func TestGenerateATSReport(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	for i := 0; i < 5; i++ {
		hook(context.Background(), &types.Trade{
			ID:        "t" + string(rune('0'+i)),
			Symbol:    "AAPL",
			Side:      types.SideBuy,
			Price:     "150",
			Qty:       "100",
			Timestamp: time.Now().UTC(),
		})
	}

	report := svc.GenerateATSReport("2026-Q1")
	if report.Quarter != "2026-Q1" {
		t.Fatalf("expected 2026-Q1, got %s", report.Quarter)
	}
	if report.ATSName != "Lux ATS" {
		t.Fatalf("expected Lux ATS, got %s", report.ATSName)
	}
	if report.TotalTrades != 5 {
		t.Fatalf("expected 5 trades, got %d", report.TotalTrades)
	}
	if report.UniqueSymbols != 1 {
		t.Fatalf("expected 1 unique symbol, got %d", report.UniqueSymbols)
	}
}

func TestMultipleReportsAccumulate(t *testing.T) {
	svc := NewService("Lux ATS", "123456")
	hook := svc.PostTradeHook()

	hook(context.Background(), &types.Trade{ID: "t1", Symbol: "AAPL", Side: types.SideBuy, Price: "150", Qty: "10", Timestamp: time.Now().UTC()})
	hook(context.Background(), &types.Trade{ID: "t2", Symbol: "MSFT", Side: types.SideSell, Price: "300", Qty: "5", Timestamp: time.Now().UTC()})

	reports := svc.GetReports(nil, nil)
	if len(reports) != 2 {
		t.Fatalf("expected 2 reports, got %d", len(reports))
	}

	ats := svc.GenerateATSReport("2026-Q1")
	if ats.UniqueSymbols != 2 {
		t.Fatalf("expected 2 unique symbols, got %d", ats.UniqueSymbols)
	}
}
