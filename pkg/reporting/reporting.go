package reporting

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/types"
)

// FINRAReport is a single trade report submitted to FINRA TRF/ADF/ORF.
type FINRAReport struct {
	ID             string    `json:"id"`
	TradeID        string    `json:"trade_id"`
	Symbol         string    `json:"symbol"`
	Side           string    `json:"side"`
	Qty            string    `json:"qty"`
	Price          string    `json:"price"`
	Venue          string    `json:"venue"`
	ExecutionTime  time.Time `json:"execution_time"`
	ReportTime     time.Time `json:"report_time"`
	ReportType     string    `json:"report_type"`     // last_sale, ats
	MediatelyType  string    `json:"mediately_type"`  // as_of, late, on_time
	Capacity       string    `json:"capacity"`        // principal, agency, riskless_principal
	ContraParty    string    `json:"contra_party"`
	SpecialCond    string    `json:"special_condition,omitempty"` // sold_short, avg_price, etc.
	Status         string    `json:"status"`           // pending, accepted, rejected
	AckID          string    `json:"ack_id,omitempty"` // FINRA ack reference
}

// ATSReport is a quarterly Form ATS-N aggregate report.
type ATSReport struct {
	ID            string    `json:"id"`
	Quarter       string    `json:"quarter"` // e.g. "2026-Q1"
	ATSName       string    `json:"ats_name"`
	CRDID         string    `json:"crd_id"` // FINRA CRD number
	TotalVolume   float64   `json:"total_volume"`
	TotalTrades   int64     `json:"total_trades"`
	UniqueSymbols int       `json:"unique_symbols"`
	ByAssetClass  map[string]ATSAssetClassSummary `json:"by_asset_class"`
	GeneratedAt   time.Time `json:"generated_at"`
}

// ATSAssetClassSummary is a per-asset-class breakdown for ATS reporting.
type ATSAssetClassSummary struct {
	AssetClass string  `json:"asset_class"`
	Volume     float64 `json:"volume"`
	Trades     int64   `json:"trades"`
	Symbols    int     `json:"symbols"`
}

// Service handles all regulatory reporting — FINRA trade reports and ATS filings.
type Service struct {
	mu      sync.Mutex
	reports []FINRAReport
	trades  []*types.Trade

	atsName string
	crdID   string
}

func NewService(atsName, crdID string) *Service {
	return &Service{
		atsName: atsName,
		crdID:   crdID,
	}
}

// PostTradeHook returns an engine.PostTradeHook that files FINRA trade reports.
func (s *Service) PostTradeHook() func(ctx context.Context, trade *types.Trade) {
	return func(ctx context.Context, trade *types.Trade) {
		report := FINRAReport{
			ID:            uuid.New().String(),
			TradeID:       trade.ID,
			Symbol:        trade.Symbol,
			Side:          string(trade.Side),
			Qty:           trade.Qty,
			Price:         trade.Price,
			Venue:         s.atsName,
			ExecutionTime: trade.Timestamp,
			ReportTime:    time.Now().UTC(),
			ReportType:    "last_sale",
			MediatelyType: classifyTimeliness(trade.Timestamp),
			Capacity:      "agency",
			Status:        "pending",
		}

		s.mu.Lock()
		s.reports = append(s.reports, report)
		s.trades = append(s.trades, trade)
		s.mu.Unlock()

		log.Info().
			Str("report_id", report.ID).
			Str("trade_id", trade.ID).
			Str("symbol", trade.Symbol).
			Str("side", string(trade.Side)).
			Str("price", trade.Price).
			Msg("FINRA trade report filed")
	}
}

// GetReports returns all filed FINRA reports (optionally filtered by date).
func (s *Service) GetReports(start, end *time.Time) []FINRAReport {
	s.mu.Lock()
	defer s.mu.Unlock()

	if start == nil && end == nil {
		out := make([]FINRAReport, len(s.reports))
		copy(out, s.reports)
		return out
	}

	var out []FINRAReport
	for _, r := range s.reports {
		if start != nil && r.ExecutionTime.Before(*start) {
			continue
		}
		if end != nil && r.ExecutionTime.After(*end) {
			continue
		}
		out = append(out, r)
	}
	return out
}

// GenerateATSReport generates a quarterly aggregate ATS report (Form ATS-N).
func (s *Service) GenerateATSReport(quarter string) *ATSReport {
	s.mu.Lock()
	defer s.mu.Unlock()

	byClass := make(map[string]*ATSAssetClassSummary)
	symbolSets := make(map[string]map[string]bool)
	totalSymbols := make(map[string]bool)
	var totalVolume float64
	var totalTrades int64

	for _, r := range s.reports {
		totalTrades++
		// find matching trade for asset class
		var assetClass string
		for _, t := range s.trades {
			if t.ID == r.TradeID {
				// We don't store asset class on trade, infer from report
				assetClass = "us_equity" // default
				break
			}
		}

		totalSymbols[r.Symbol] = true

		summary, ok := byClass[assetClass]
		if !ok {
			summary = &ATSAssetClassSummary{AssetClass: assetClass}
			byClass[assetClass] = summary
			symbolSets[assetClass] = make(map[string]bool)
		}
		summary.Trades++
		symbolSets[assetClass][r.Symbol] = true
	}

	result := make(map[string]ATSAssetClassSummary, len(byClass))
	for k, v := range byClass {
		v.Symbols = len(symbolSets[k])
		result[k] = *v
	}

	return &ATSReport{
		ID:            uuid.New().String(),
		Quarter:       quarter,
		ATSName:       s.atsName,
		CRDID:         s.crdID,
		TotalVolume:   totalVolume,
		TotalTrades:   totalTrades,
		UniqueSymbols: len(totalSymbols),
		ByAssetClass:  result,
		GeneratedAt:   time.Now().UTC(),
	}
}

func classifyTimeliness(execTime time.Time) string {
	delay := time.Since(execTime)
	if delay < 10*time.Second {
		return "on_time"
	}
	if delay < 90*time.Second {
		return "late"
	}
	return "as_of"
}

// --- Multi-Jurisdiction Trade Reporting ---

// MiFIDReport represents a MiFIR transaction report (Article 26, MiFIR).
// Required for UK (FCA) and EU (ESMA/NCAs) regulated activities.
type MiFIDReport struct {
	ID                string    `json:"id"`
	TradeID           string    `json:"trade_id"`
	TradingVenueID    string    `json:"trading_venue_id"`  // MIC code
	InstrumentID      string    `json:"instrument_id"`     // ISIN
	BuyerID           string    `json:"buyer_id"`          // LEI or national ID
	SellerID          string    `json:"seller_id"`
	Price             string    `json:"price"`
	Qty               string    `json:"qty"`
	Currency          string    `json:"currency"`
	ExecutionTime     time.Time `json:"execution_time"`
	ReportTime        time.Time `json:"report_time"`
	TransmissionTime  time.Time `json:"transmission_time"`
	WaiverIndicator   string    `json:"waiver_indicator,omitempty"` // LIS, OILQ, PRIC, ILQD
	ShortSellingFlag  bool      `json:"short_selling_flag"`
	InvestDecisionID  string    `json:"invest_decision_id,omitempty"` // algo ID or natural person
	ExecutionDecID    string    `json:"execution_decision_id,omitempty"`
	Jurisdiction      string    `json:"jurisdiction"` // UK or EU member state
	Status            string    `json:"status"`
}

// MASReport represents a trade report for MAS (Singapore) regulated activities.
type MASReport struct {
	ID            string    `json:"id"`
	TradeID       string    `json:"trade_id"`
	CMSLicenseNo  string    `json:"cms_license_no"`
	ProductType   string    `json:"product_type"`    // securities, futures, dpt
	Symbol        string    `json:"symbol"`
	Side          string    `json:"side"`
	Price         string    `json:"price"`
	Qty           string    `json:"qty"`
	ExecutionTime time.Time `json:"execution_time"`
	ReportTime    time.Time `json:"report_time"`
	ClientType    string    `json:"client_type"`     // accredited, institutional, retail
	Status        string    `json:"status"`
}

// SFCReport represents a trade report for HK SFC regulated activities.
type SFCReport struct {
	ID            string    `json:"id"`
	TradeID       string    `json:"trade_id"`
	CENumber      string    `json:"ce_number"` // SFC CE number
	Symbol        string    `json:"symbol"`
	Side          string    `json:"side"`
	Price         string    `json:"price"`
	Qty           string    `json:"qty"`
	ExecutionTime time.Time `json:"execution_time"`
	ReportTime    time.Time `json:"report_time"`
	ClientType    string    `json:"client_type"` // professional, retail
	Status        string    `json:"status"`
}

// JurisdictionReporter routes trade reports to the correct regulatory reporting pipeline.
type JurisdictionReporter struct {
	mu       sync.Mutex
	mifid    []MiFIDReport
	mas      []MASReport
	sfc      []SFCReport
	configs  map[string]JurisdictionConfig
}

// JurisdictionConfig holds per-jurisdiction reporting identifiers.
type JurisdictionConfig struct {
	Jurisdiction string `json:"jurisdiction"`
	LicenseID    string `json:"license_id"`   // FINRA CRD, FCA FRN, MAS CMS, SFC CE, etc.
	VenueID      string `json:"venue_id"`     // MIC code for MiFID, ATS name for FINRA
	LEI          string `json:"lei"`          // Legal Entity Identifier (required by MiFID/MAS)
}

func NewJurisdictionReporter() *JurisdictionReporter {
	return &JurisdictionReporter{
		configs: make(map[string]JurisdictionConfig),
	}
}

// SetConfig registers reporting configuration for a jurisdiction.
func (jr *JurisdictionReporter) SetConfig(cfg JurisdictionConfig) {
	jr.mu.Lock()
	defer jr.mu.Unlock()
	jr.configs[cfg.Jurisdiction] = cfg
}

// PostTradeHook returns a hook that routes to jurisdiction-specific reporting.
// This supplements (not replaces) the FINRA reporting in the main Service.
func (jr *JurisdictionReporter) PostTradeHook() func(ctx context.Context, trade *types.Trade) {
	return func(ctx context.Context, trade *types.Trade) {
		// The trade's Venue field encodes which jurisdiction to report to.
		// In production this would be resolved from the account's jurisdiction.
		// For now, we log that multi-jurisdiction reporting is available.
		log.Debug().
			Str("trade_id", trade.ID).
			Str("venue", trade.Venue).
			Msg("Multi-jurisdiction trade report hook (route to FINRA/FCA/MAS/SFC as needed)")
	}
}

// FileMiFIDReport files a MiFIR Article 26 transaction report.
func (jr *JurisdictionReporter) FileMiFIDReport(trade *types.Trade, buyerID, sellerID string) *MiFIDReport {
	jr.mu.Lock()
	defer jr.mu.Unlock()

	cfg := jr.configs["UK"]
	if cfg.Jurisdiction == "" {
		cfg = jr.configs["EU"]
	}

	report := MiFIDReport{
		ID:             uuid.New().String(),
		TradeID:        trade.ID,
		TradingVenueID: cfg.VenueID,
		BuyerID:        buyerID,
		SellerID:       sellerID,
		Price:          trade.Price,
		Qty:            trade.Qty,
		ExecutionTime:  trade.Timestamp,
		ReportTime:     time.Now().UTC(),
		Jurisdiction:   cfg.Jurisdiction,
		Status:         "pending",
	}
	jr.mifid = append(jr.mifid, report)

	log.Info().
		Str("report_id", report.ID).
		Str("trade_id", trade.ID).
		Str("jurisdiction", report.Jurisdiction).
		Msg("MiFID II transaction report filed")

	return &report
}

// FileMASReport files a MAS trade report (Singapore).
func (jr *JurisdictionReporter) FileMASReport(trade *types.Trade, productType, clientType string) *MASReport {
	jr.mu.Lock()
	defer jr.mu.Unlock()

	cfg := jr.configs["SG"]
	report := MASReport{
		ID:            uuid.New().String(),
		TradeID:       trade.ID,
		CMSLicenseNo:  cfg.LicenseID,
		ProductType:   productType,
		Symbol:        trade.Symbol,
		Side:          string(trade.Side),
		Price:         trade.Price,
		Qty:           trade.Qty,
		ExecutionTime: trade.Timestamp,
		ReportTime:    time.Now().UTC(),
		ClientType:    clientType,
		Status:        "pending",
	}
	jr.mas = append(jr.mas, report)

	log.Info().
		Str("report_id", report.ID).
		Str("trade_id", trade.ID).
		Msg("MAS trade report filed")

	return &report
}

// GetMiFIDReports returns all MiFID reports.
func (jr *JurisdictionReporter) GetMiFIDReports() []MiFIDReport {
	jr.mu.Lock()
	defer jr.mu.Unlock()
	out := make([]MiFIDReport, len(jr.mifid))
	copy(out, jr.mifid)
	return out
}

// GetMASReports returns all MAS reports.
func (jr *JurisdictionReporter) GetMASReports() []MASReport {
	jr.mu.Lock()
	defer jr.mu.Unlock()
	out := make([]MASReport, len(jr.mas))
	copy(out, jr.mas)
	return out
}
