package types

import "time"

// Side of a trade.
type Side string

const (
	SideBuy  Side = "buy"
	SideSell Side = "sell"
	Buy           = SideBuy
	Sell          = SideSell
)

// OrderType determines matching behavior.
type OrderType string

const (
	OrderTypeMarket    OrderType = "market"
	OrderTypeLimit     OrderType = "limit"
	OrderTypeStop      OrderType = "stop"
	OrderTypeStopLimit OrderType = "stop_limit"
)

// TimeInForce determines order lifetime.
type TimeInForce string

const (
	TIFDay TimeInForce = "day"
	TIFGTC TimeInForce = "gtc"
	TIFIOC TimeInForce = "ioc"
	TIFFOK TimeInForce = "fok"
)

// OrderStatus tracks the lifecycle of an order.
type OrderStatus string

const (
	OrderStatusNew             OrderStatus = "new"
	OrderStatusPendingApproval OrderStatus = "pending_approval" // compliance gate
	OrderStatusOpen            OrderStatus = "open"
	OrderStatusPartialFill     OrderStatus = "partial_fill"
	OrderStatusFilled          OrderStatus = "filled"
	OrderStatusCancelled       OrderStatus = "cancelled"
	OrderStatusRejected        OrderStatus = "rejected"
	OrderStatusExpired         OrderStatus = "expired"
	OrderStatusSuspended       OrderStatus = "suspended" // halted by surveillance
)

// AssetClass determines routing and compliance rules.
type AssetClass string

const (
	// Equities
	AssetClassUSEquity    AssetClass = "us_equity"
	AssetClassIntlEquity  AssetClass = "intl_equity"

	// Digital assets
	AssetClassCrypto AssetClass = "crypto"

	// FX
	AssetClassForex AssetClass = "forex"

	// Derivatives
	AssetClassOptions AssetClass = "options"
	AssetClassFutures AssetClass = "futures"

	// Fixed income / credit
	AssetClassFixedIncome   AssetClass = "fixed_income"   // bonds, notes, treasuries
	AssetClassMunicipal     AssetClass = "municipal"       // muni bonds
	AssetClassStructured    AssetClass = "structured"      // ABS, MBS, CDO, CLO
	AssetClassCorporateDebt AssetClass = "corporate_debt"  // corporate loans, credit facilities
	AssetClassConsumerDebt  AssetClass = "consumer_debt"   // personal loans, credit card ABS

	// Real assets
	AssetClassRealEstate  AssetClass = "real_estate"  // REIT, fractional RE, real estate tokens
	AssetClassCommodities AssetClass = "commodities"  // gold, silver, oil, agricultural

	// Precious metals (spot)
	AssetClassPreciousMetals AssetClass = "precious_metals" // XAU, XAG, XPT, XPD

	// Alternative investments
	AssetClassPrivateEquity AssetClass = "private_equity"  // PE fund tokens, SPV shares
	AssetClassVenture       AssetClass = "venture"          // VC fund shares, SAFE tokens
	AssetClassPrivateCredit AssetClass = "private_credit"   // direct lending, mezzanine

	// DeFi-native (bridged to CEX)
	AssetClassCDP AssetClass = "cdp" // collateralized debt positions
	AssetClassLP  AssetClass = "lp"  // liquidity pool tokens
)


// Order is the canonical order representation.
type Order struct {
	ID             string      `json:"id"`
	AccountID      string      `json:"account_id"`
	UserID         string      `json:"user_id"`
	OrgID          string      `json:"org_id"`
	Symbol         string      `json:"symbol"`
	AssetClass     AssetClass  `json:"asset_class"`
	Side           Side        `json:"side"`
	Type           OrderType   `json:"type"`
	TimeInForce    TimeInForce `json:"time_in_force"`
	Qty            string      `json:"qty,omitempty"`
	Notional       string      `json:"notional,omitempty"`
	LimitPrice     string      `json:"limit_price,omitempty"`
	StopPrice      string      `json:"stop_price,omitempty"`
	Status         OrderStatus `json:"status"`
	FilledQty      string      `json:"filled_qty,omitempty"`
	FilledAvgPrice string      `json:"filled_avg_price,omitempty"`

	// Compliance fields
	ComplianceID   string `json:"compliance_id,omitempty"`   // pre-trade check ID
	ExecutionVenue string `json:"execution_venue,omitempty"` // where it was filled
	ReportedToATS  bool   `json:"reported_to_ats"`
	ReportedFINRA  bool   `json:"reported_finra"`

	// Orderbook internal fields (int64 for performance)
	Price        int64 `json:"-"`
	RemainingQty int64 `json:"-"`

	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
	FilledAt   *time.Time `json:"filled_at,omitempty"`
	CancelledAt *time.Time `json:"cancelled_at,omitempty"`
}

// Trade is a filled execution (one order may produce multiple trades).
type Trade struct {
	ID         string    `json:"id"`
	OrderID    string    `json:"order_id"`
	AccountID  string    `json:"account_id"`
	Symbol     string    `json:"symbol"`
	Side       Side      `json:"side"`
	Price      string    `json:"price"`
	Qty        string    `json:"qty"`
	Fee        string    `json:"fee"`
	Venue      string    `json:"venue"`
	Timestamp  time.Time `json:"timestamp"`
	SettledAt  *time.Time `json:"settled_at,omitempty"`

	// Regulatory
	TradeReportID string `json:"trade_report_id,omitempty"` // FINRA TRF/ADF/ORF ID
	ATSReportID   string `json:"ats_report_id,omitempty"`

	// CounterUserID is the user id of the matched counterparty (the maker /
	// resting side; AccountID above is the aggressor). Surfaced so on-chain
	// settlement can move funds directly between the two real parties (peer
	// settlement) rather than minting. The order book carries user ids (not
	// account ids), so consumers resolve user→wallet themselves. Empty when
	// the match had no identifiable counterparty (e.g. broker-fallback fills).
	CounterUserID string `json:"counter_user_id,omitempty"`
}

// Market represents a tradable instrument on the CEX.
type Market struct {
	Symbol         string     `json:"symbol"`
	AssetClass     AssetClass `json:"asset_class"`
	BaseCurrency   string     `json:"base_currency"`
	QuoteCurrency  string     `json:"quote_currency"`
	Status         string     `json:"status"` // active, halted, delisted
	MinOrderSize   string     `json:"min_order_size"`
	MaxOrderSize   string     `json:"max_order_size"`
	TickSize       string     `json:"tick_size"`
	LotSize        string     `json:"lot_size"`
	MakerFee       string     `json:"maker_fee"`
	TakerFee       string     `json:"taker_fee"`
	Tradable       bool       `json:"tradable"`
	Fractionable   bool       `json:"fractionable"`
	RequiresKYC    bool       `json:"requires_kyc"`
	RequiresAccred bool       `json:"requires_accreditation"` // per offering type

	// Extended hours / overnight trading fields (from broker asset data)
	OvernightTradable   bool   `json:"overnight_tradable,omitempty"`
	OvernightHalted     bool   `json:"overnight_halted,omitempty"`
	FractionalEHEnabled bool   `json:"fractional_eh_enabled,omitempty"`
	PriceIncrement      string `json:"price_increment,omitempty"`
	MinTradeIncrement   string `json:"min_trade_increment,omitempty"`

	// Offering / Issuer metadata — populated for exempt securities
	OfferingType string `json:"offering_type,omitempty"` // reg_cf, reg_d_506c, reg_a, reg_s, public
	IssuerID     string `json:"issuer_id,omitempty"`
	IssuerName   string `json:"issuer_name,omitempty"`

	// Structured product metadata — credit, real estate, private offerings
	ProductType       string `json:"product_type,omitempty"`       // abs, mbs, cdo, clo, reit, cdp, pe_fund, vc_fund
	CreditRating      string `json:"credit_rating,omitempty"`      // AAA, AA, A, BBB, BB, B, CCC, NR
	CollateralType    string `json:"collateral_type,omitempty"`    // residential, commercial, auto, student, mixed
	MaturityDate      string `json:"maturity_date,omitempty"`      // ISO 8601 date
	CouponRate        string `json:"coupon_rate,omitempty"`        // annual rate as decimal
	YieldToMaturity   string `json:"yield_to_maturity,omitempty"`  // current YTM
	Leverage          string `json:"leverage,omitempty"`           // max leverage for the product
	CollateralRatio   string `json:"collateral_ratio,omitempty"`   // min collateral ratio (e.g. "1.50" = 150%)
	LiquidationRatio  string `json:"liquidation_ratio,omitempty"`  // ratio below which liquidation triggers
	MinInvestment     string `json:"min_investment,omitempty"`     // minimum investment amount
	LockupPeriod      string `json:"lockup_period,omitempty"`      // e.g. "180d", "1y"
	AccreditedOnly    bool   `json:"accredited_only,omitempty"`    // requires accredited/professional investor
	InstitutionalOnly bool   `json:"institutional_only,omitempty"` // institutions only (QIB, etc.)

	// Fixed income identifiers and metadata (from broker FI endpoints)
	CUSIP           string `json:"cusip,omitempty"`
	ISIN            string `json:"isin,omitempty"`
	Ticker          string `json:"ticker,omitempty"`           // corporate bond ticker (e.g. "AFL")
	Subtype         string `json:"subtype,omitempty"`          // bill, note, bond, senior, subordinated
	CouponType      string `json:"coupon_type,omitempty"`      // fixed, floating, zero
	CouponFrequency string `json:"coupon_frequency,omitempty"` // semi_annual, quarterly, zero
	IssueDate       string `json:"issue_date,omitempty"`       // ISO 8601 date

	// Admin listing control — set via admin endpoints, persisted in trading_controls
	ListingStatus string `json:"listing_status,omitempty"` // listed (default), delisted, hidden
}


// OrderBookSnapshot is a point-in-time view of an order book.
type OrderBookSnapshot struct {
	Symbol string           `json:"symbol"`
	Bids   []*OrderBookLevel `json:"bids"`
	Asks   []*OrderBookLevel `json:"asks"`
}

// OrderBookLevel is a single price level in the order book.
type OrderBookLevel struct {
	Price      int64 `json:"price"`
	Qty        int64 `json:"qty"`
	OrderCount int   `json:"order_count"`
}

// SubmitOrderRequest is the inbound order request from clients.
type SubmitOrderRequest struct {
	Symbol      string      `json:"symbol"`
	Side        Side        `json:"side"`
	Type        OrderType   `json:"type"`
	TimeInForce TimeInForce `json:"time_in_force"`
	Qty         string      `json:"qty,omitempty"`
	Notional    string      `json:"notional,omitempty"`
	LimitPrice  string      `json:"limit_price,omitempty"`
	StopPrice   string      `json:"stop_price,omitempty"`
	ClientOrdID string      `json:"client_order_id,omitempty"` // idempotency
}
