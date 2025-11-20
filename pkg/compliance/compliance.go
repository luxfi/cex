package compliance

import (
	"context"
	"fmt"
	"math"
	"strconv"
	"sync"
	"time"

	"github.com/rs/zerolog/log"

	"github.com/luxfi/cex/pkg/types"
)

// KYCLevel determines what the user is allowed to trade.
type KYCLevel int

const (
	KYCNone       KYCLevel = 0
	KYCBasic      KYCLevel = 1 // email + phone verified
	KYCStandard   KYCLevel = 2 // ID verified
	KYCEnhanced   KYCLevel = 3 // accredited investor
)

// Jurisdiction identifies the regulatory regime governing an account.
type Jurisdiction string

const (
	// Americas
	JurisdictionUS Jurisdiction = "US" // SEC / FINRA
	JurisdictionCA Jurisdiction = "CA" // CSA / IIROC
	JurisdictionBR Jurisdiction = "BR" // CVM
	JurisdictionMX Jurisdiction = "MX" // CNBV
	JurisdictionKY Jurisdiction = "KY" // CIMA (Cayman)
	JurisdictionBM Jurisdiction = "BM" // BMA (Bermuda)
	JurisdictionBS Jurisdiction = "BS" // SCB (Bahamas)

	// Europe
	JurisdictionUK Jurisdiction = "UK" // FCA
	JurisdictionEU Jurisdiction = "EU" // ESMA / MiFID II / MiCA
	JurisdictionCH Jurisdiction = "CH" // FINMA
	JurisdictionIM Jurisdiction = "IM" // Isle of Man FSA (IOM FSA) — home jurisdiction
	JurisdictionGI Jurisdiction = "GI" // GFSC (Gibraltar)
	JurisdictionLI Jurisdiction = "LI" // FMA Liechtenstein

	// Asia-Pacific
	JurisdictionSG Jurisdiction = "SG" // MAS
	JurisdictionHK Jurisdiction = "HK" // SFC
	JurisdictionJP Jurisdiction = "JP" // FSA / JFSA
	JurisdictionAU Jurisdiction = "AU" // ASIC
	JurisdictionKR Jurisdiction = "KR" // FSC Korea
	JurisdictionIN Jurisdiction = "IN" // SEBI

	// MENA (Middle East & North Africa)
	JurisdictionAE Jurisdiction = "AE" // DFSA (DIFC) / VARA / SCA
	JurisdictionSA Jurisdiction = "SA" // CMA Saudi Arabia
	JurisdictionBH Jurisdiction = "BH" // CBB (Central Bank of Bahrain)
	JurisdictionQA Jurisdiction = "QA" // QFC / QFCRA
	JurisdictionKW Jurisdiction = "KW" // CMA Kuwait
	JurisdictionOM Jurisdiction = "OM" // CMA Oman
	JurisdictionJO Jurisdiction = "JO" // JSC Jordan

	// Africa
	JurisdictionZA Jurisdiction = "ZA" // FSCA South Africa
	JurisdictionNG Jurisdiction = "NG" // SEC Nigeria
	JurisdictionKE Jurisdiction = "KE" // CMA Kenya
	JurisdictionMU Jurisdiction = "MU" // FSC Mauritius
)

// AccountStatus tracks compliance state.
type AccountStatus struct {
	AccountID    string       `json:"account_id"`
	ClientType   ClientType   `json:"client_type"`
	Jurisdiction Jurisdiction `json:"jurisdiction"`
	Country      string       `json:"country"` // ISO 3166-1 alpha-2
	KYC          KYCLevel     `json:"kyc_level"`
	AMLCleared   bool         `json:"aml_cleared"`
	Sanctioned   bool         `json:"sanctioned"`
	Accredited   bool         `json:"accredited"`    // US: SEC accredited investor
	Professional bool         `json:"professional"`  // UK/EU: MiFID professional client / SG: accredited investor
	MaxOrderSize float64      `json:"max_order_size"`
	DailyLimit   float64      `json:"daily_limit"`
	DailyUsed    float64      `json:"daily_used"`

	// Enhanced Due Diligence (EDD) fields
	PEP             PEPStatus     `json:"pep_status"`         // politically exposed person classification
	PEPReviewedAt   *time.Time    `json:"pep_reviewed_at"`    // when PEP status was last reviewed
	SourceOfFunds   SourceOfFunds `json:"source_of_funds"`    // declared source of funds
	SOFVerified     bool          `json:"sof_verified"`       // source of funds independently verified
	AdverseMedia    bool          `json:"adverse_media"`      // adverse media screening flag
	HighRiskCountry bool          `json:"high_risk_country"`  // FATF high-risk or monitored jurisdiction
	EDDRequired     bool          `json:"edd_required"`       // enhanced due diligence triggered
	TaxResidency    string        `json:"tax_residency"`      // ISO country code for CRS/FATCA
	TIN             string        `json:"tin"`                // Tax ID Number (stored as reference hash, never plaintext)

	// Entity-level (for federated routing)
	EntityID string `json:"entity_id,omitempty"` // which federated entity services this account
}

// PEPStatus classifies Politically Exposed Person risk level.
type PEPStatus string

const (
	PEPNone    PEPStatus = ""        // not a PEP
	PEPDirect  PEPStatus = "direct"  // current or former senior political figure
	PEPRelated PEPStatus = "related" // close family member or associate of a PEP
	PEPFormer  PEPStatus = "former"  // formerly PEP, cooled off period may apply
)

// SourceOfFunds classification for AML.
type SourceOfFunds string

const (
	SOFEmployment  SourceOfFunds = "employment"
	SOFInvestments SourceOfFunds = "investments"
	SOFInheritance SourceOfFunds = "inheritance"
	SOFBusiness    SourceOfFunds = "business"
	SOFPension     SourceOfFunds = "pension"
	SOFOther       SourceOfFunds = "other"
)

// Service provides pre-trade compliance checks for the CEX engine.
type Service struct {
	mu       sync.RWMutex
	accounts map[string]*AccountStatus
}

func NewService() *Service {
	return &Service{
		accounts: make(map[string]*AccountStatus),
	}
}

// SetAccountStatus sets or updates compliance status for an account.
func (s *Service) SetAccountStatus(status *AccountStatus) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.accounts[status.AccountID] = status
}

// GetAccountStatus returns the compliance status for an account.
func (s *Service) GetAccountStatus(accountID string) (*AccountStatus, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	a, ok := s.accounts[accountID]
	return a, ok
}

// PreTradeCheck returns an engine.PreTradeCheck that enforces compliance rules.
func (s *Service) PreTradeCheck() func(ctx context.Context, order *types.Order) error {
	return func(ctx context.Context, order *types.Order) error {
		s.mu.RLock()
		acct, ok := s.accounts[order.AccountID]
		s.mu.RUnlock()

		if !ok {
			return fmt.Errorf("account %s not found in compliance registry", order.AccountID)
		}

		// Sanctions check
		if acct.Sanctioned {
			log.Warn().Str("account", order.AccountID).Msg("Order rejected: sanctioned account")
			return fmt.Errorf("account is sanctioned — trading prohibited")
		}

		// AML check
		if !acct.AMLCleared {
			return fmt.Errorf("account has not passed AML screening")
		}

		// PEP enhanced due diligence check
		if acct.PEP == PEPDirect || acct.PEP == PEPRelated {
			if !acct.EDDRequired {
				// PEP detected but EDD not yet completed
				return fmt.Errorf("PEP account requires enhanced due diligence review before trading")
			}
			if !acct.SOFVerified {
				return fmt.Errorf("PEP account requires verified source of funds before trading")
			}
		}

		// Adverse media check
		if acct.AdverseMedia && !acct.EDDRequired {
			return fmt.Errorf("adverse media flag requires enhanced due diligence review")
		}

		// FATF high-risk country check
		if acct.HighRiskCountry && acct.KYC < KYCEnhanced {
			return fmt.Errorf("FATF high-risk jurisdiction requires enhanced KYC (level 3)")
		}

		// KYC level check — jurisdiction-aware minimums
		if err := checkKYCForJurisdiction(acct, order.AssetClass); err != nil {
			return err
		}

		// Structured product / accredited-investor-only checks
		if err := checkStructuredProductEligibility(acct, order.AssetClass); err != nil {
			return err
		}

		// Order size check
		orderSize := parseFloat(order.Qty) * parseFloat(order.LimitPrice)
		if order.Notional != "" {
			orderSize = parseFloat(order.Notional)
		}
		if acct.MaxOrderSize > 0 && orderSize > acct.MaxOrderSize {
			return fmt.Errorf("order size %.2f exceeds max %.2f", orderSize, acct.MaxOrderSize)
		}

		// Daily limit check
		if acct.DailyLimit > 0 && (acct.DailyUsed+orderSize) > acct.DailyLimit {
			return fmt.Errorf("order would exceed daily limit (used: %.2f, limit: %.2f)", acct.DailyUsed, acct.DailyLimit)
		}

		log.Debug().
			Str("account", order.AccountID).
			Str("symbol", order.Symbol).
			Str("side", string(order.Side)).
			Msg("Pre-trade compliance check passed")
		return nil
	}
}

// checkKYCForJurisdiction enforces the minimum KYC level per jurisdiction and asset class.
func checkKYCForJurisdiction(acct *AccountStatus, assetClass types.AssetClass) error {
	switch acct.Jurisdiction {

	case JurisdictionUS:
		switch assetClass {
		case types.AssetClassUSEquity, types.AssetClassOptions, types.AssetClassFutures:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("US securities require KYC level 2+ (current: %d)", acct.KYC)
			}
		case types.AssetClassCrypto:
			if acct.KYC < KYCBasic {
				return fmt.Errorf("US crypto trading requires KYC level 1+ (current: %d)", acct.KYC)
			}
		}

	case JurisdictionUK:
		// FCA requires KYC for all regulated activities
		if acct.KYC < KYCStandard {
			return fmt.Errorf("FCA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionEU:
		// MiFID II — investment firms must verify suitability/appropriateness
		if acct.KYC < KYCStandard {
			return fmt.Errorf("MiFID II requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionSG:
		// MAS — different thresholds for CIS vs DPT
		switch assetClass {
		case types.AssetClassCrypto:
			if acct.KYC < KYCBasic {
				return fmt.Errorf("MAS DPT trading requires KYC level 1+ (current: %d)", acct.KYC)
			}
		default:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("MAS SFA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
			}
		}

	case JurisdictionHK:
		// SFC — KYC mandatory for all Type 1/7 activities
		if acct.KYC < KYCStandard {
			return fmt.Errorf("SFC-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionAE:
		// DFSA (DIFC), VARA (Dubai), SCA — all require full KYC
		if acct.KYC < KYCStandard {
			return fmt.Errorf("DFSA/VARA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionIM:
		// IOM FSA — home jurisdiction; KYC aligned with UK FCA standards
		if acct.KYC < KYCStandard {
			return fmt.Errorf("IOM FSA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionCH:
		// FINMA — Swiss financial services licensing
		if acct.KYC < KYCStandard {
			return fmt.Errorf("FINMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionJP:
		// JFSA — stringent KYC under FIEA
		if acct.KYC < KYCStandard {
			return fmt.Errorf("JFSA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionAU:
		// ASIC — Australian financial services license
		if acct.KYC < KYCStandard {
			return fmt.Errorf("ASIC-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionCA:
		// CSA/IIROC — securities require full KYC; crypto via restricted dealer
		switch assetClass {
		case types.AssetClassCrypto:
			if acct.KYC < KYCBasic {
				return fmt.Errorf("Canadian crypto trading requires KYC level 1+ (current: %d)", acct.KYC)
			}
		default:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("CSA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
			}
		}

	case JurisdictionKR:
		// FSC Korea — full KYC and real-name verification required
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Korea FSC requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionIN:
		// SEBI — KYC mandatory for all exchange trading
		if acct.KYC < KYCStandard {
			return fmt.Errorf("SEBI-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	// --- MENA ---
	case JurisdictionSA:
		// Saudi CMA — Capital Market Authority
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Saudi CMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionBH:
		// CBB — Central Bank of Bahrain
		if acct.KYC < KYCStandard {
			return fmt.Errorf("CBB-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionQA:
		// QFC/QFCRA
		if acct.KYC < KYCStandard {
			return fmt.Errorf("QFCRA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionKW:
		// CMA Kuwait
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Kuwait CMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionOM:
		// CMA Oman
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Oman CMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionJO:
		// JSC Jordan
		if acct.KYC < KYCStandard {
			return fmt.Errorf("JSC-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	// --- Offshore financial centres ---
	case JurisdictionGI:
		// GFSC Gibraltar — DLT framework
		if acct.KYC < KYCStandard {
			return fmt.Errorf("GFSC-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionLI:
		// FMA Liechtenstein — TVTG (blockchain act)
		if acct.KYC < KYCStandard {
			return fmt.Errorf("FMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionKY, JurisdictionBM, JurisdictionBS:
		// Caribbean OFCs — CIMA / BMA / SCB
		if acct.KYC < KYCBasic {
			return fmt.Errorf("offshore jurisdiction trading requires KYC level 1+ (current: %d)", acct.KYC)
		}

	// --- Africa ---
	case JurisdictionZA:
		// FSCA South Africa
		if acct.KYC < KYCStandard {
			return fmt.Errorf("FSCA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionNG:
		// SEC Nigeria
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Nigeria SEC-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionKE:
		// CMA Kenya
		if acct.KYC < KYCStandard {
			return fmt.Errorf("Kenya CMA-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionMU:
		// FSC Mauritius
		if acct.KYC < KYCBasic {
			return fmt.Errorf("Mauritius FSC-regulated trading requires KYC level 1+ (current: %d)", acct.KYC)
		}

	case JurisdictionBR:
		// CVM Brazil
		if acct.KYC < KYCStandard {
			return fmt.Errorf("CVM-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	case JurisdictionMX:
		// CNBV Mexico
		if acct.KYC < KYCStandard {
			return fmt.Errorf("CNBV-regulated trading requires KYC level 2+ (current: %d)", acct.KYC)
		}

	default:
		// No jurisdiction set — crypto requires basic KYC, everything else requires standard
		if assetClass == types.AssetClassCrypto {
			if acct.KYC < KYCBasic {
				return fmt.Errorf("crypto trading requires KYC level 1+ (current: %d)", acct.KYC)
			}
		} else if acct.KYC < KYCStandard {
			return fmt.Errorf("trading requires KYC level 2+ for jurisdiction %q (current: %d)", acct.Jurisdiction, acct.KYC)
		}
	}
	return nil
}

// checkStructuredProductEligibility enforces investor eligibility for complex products.
// Structured credit, private equity/credit, real estate, and CDPs each have specific
// suitability requirements under SEC, MiFID II, MAS, and other frameworks.
func checkStructuredProductEligibility(acct *AccountStatus, assetClass types.AssetClass) error {
	switch assetClass {
	case types.AssetClassStructured, types.AssetClassCorporateDebt, types.AssetClassConsumerDebt:
		// ABS/MBS/CDO/CLO and loan products: require accredited or professional investor
		// US: SEC Rule 144A (QIBs), EU: MiFID II suitability, SG: AI/EI status
		if !acct.Accredited && !acct.Professional {
			return fmt.Errorf("structured credit products require accredited/professional investor status")
		}
		if acct.KYC < KYCEnhanced {
			return fmt.Errorf("structured credit products require enhanced KYC (level 3)")
		}

	case types.AssetClassPrivateEquity, types.AssetClassVenture:
		// PE/VC fund shares: accredited investors only (SEC Reg D), QP for 3(c)(7) funds
		if !acct.Accredited {
			return fmt.Errorf("private equity/venture fund shares require accredited investor status")
		}
		if acct.KYC < KYCEnhanced {
			return fmt.Errorf("private fund investments require enhanced KYC (level 3)")
		}

	case types.AssetClassPrivateCredit:
		// Direct lending, mezzanine: accredited/institutional
		if !acct.Accredited && !acct.Professional {
			return fmt.Errorf("private credit investments require accredited/professional investor status")
		}
		if acct.KYC < KYCEnhanced {
			return fmt.Errorf("private credit investments require enhanced KYC (level 3)")
		}

	case types.AssetClassRealEstate:
		// Fractional RE / REIT tokens: standard KYC sufficient, but some offerings are Reg D
		if acct.KYC < KYCStandard {
			return fmt.Errorf("real estate investments require KYC level 2+")
		}

	case types.AssetClassPreciousMetals:
		// Gold, silver spot: standard KYC
		if acct.KYC < KYCStandard {
			return fmt.Errorf("precious metals trading requires KYC level 2+")
		}

	case types.AssetClassMunicipal:
		// Muni bonds: standard KYC, MSRB suitability
		if acct.KYC < KYCStandard {
			return fmt.Errorf("municipal bond trading requires KYC level 2+")
		}

	case types.AssetClassCDP:
		// Collateralized debt positions: basic KYC (DeFi-native)
		if acct.KYC < KYCBasic {
			return fmt.Errorf("CDP operations require KYC level 1+")
		}

	case types.AssetClassLP:
		// LP tokens: basic KYC (DeFi-native)
		if acct.KYC < KYCBasic {
			return fmt.Errorf("LP token trading requires KYC level 1+")
		}
	}
	return nil
}

// RecordDailyUsage updates the daily volume used for an account.
func (s *Service) RecordDailyUsage(accountID string, amount float64) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if acct, ok := s.accounts[accountID]; ok {
		acct.DailyUsed += amount
	}
}

// ResetDailyLimits resets all daily counters (call at market open).
func (s *Service) ResetDailyLimits() {
	s.mu.Lock()
	defer s.mu.Unlock()
	for _, acct := range s.accounts {
		acct.DailyUsed = 0
	}
	log.Info().Int("accounts", len(s.accounts)).Msg("Daily limits reset")
}

// --- Reg CF Investment Limit Tracking ---
// SEC Rule 227.100(a)(2) — Regulation Crowdfunding (Title III)

// RegCFProfile holds investor data for Reg CF annual limit calculation.
type RegCFProfile struct {
	AnnualIncome float64 `json:"annual_income"` // USD
	NetWorth     float64 `json:"net_worth"`     // USD
	Accredited   bool    `json:"accredited"`
}

type regCFInvestment struct {
	Amount    float64
	Timestamp time.Time
}

// regCFLog tracks rolling 12-month investments per account.
var (
	regCFMu  sync.Mutex
	regCFLog = make(map[string][]regCFInvestment)
	regCFProfiles = make(map[string]*RegCFProfile)
)

// SetRegCFProfile registers an investor's income/net worth for Reg CF limits.
func (s *Service) SetRegCFProfile(accountID string, profile *RegCFProfile) {
	regCFMu.Lock()
	defer regCFMu.Unlock()
	regCFProfiles[accountID] = profile
}

// RecordRegCFInvestment logs a Reg CF investment for rolling limit tracking.
func (s *Service) RecordRegCFInvestment(accountID string, amount float64) {
	regCFMu.Lock()
	defer regCFMu.Unlock()
	regCFLog[accountID] = append(regCFLog[accountID], regCFInvestment{
		Amount:    amount,
		Timestamp: time.Now(),
	})
}

// InvestorProfile holds investor financial data for offering-specific limit calculations.
// Renamed from RegCFProfile — used across offering types, not just Reg CF.
type InvestorProfile = RegCFProfile

// regCFAnnualLimit computes the SEC Reg CF investment limit.
//
//	If annual income OR net worth < $124,000:
//	  greater of $2,500 or 5% of lesser of (income, net worth)
//	If both >= $124,000:
//	  10% of lesser of (income, net worth), capped at $124,000
func regCFAnnualLimit(profile *RegCFProfile) float64 {
	income := profile.AnnualIncome
	netWorth := profile.NetWorth
	threshold := 124000.0

	if income < threshold || netWorth < threshold {
		lesser := math.Min(income, netWorth)
		fivePercent := lesser * 0.05
		if fivePercent < 2500 {
			return 2500
		}
		return fivePercent
	}

	lesser := math.Min(income, netWorth)
	tenPercent := lesser * 0.10
	if tenPercent > threshold {
		return threshold
	}
	return tenPercent
}

func regCFRolling12MonthSpend(accountID string) float64 {
	regCFMu.Lock()
	defer regCFMu.Unlock()
	cutoff := time.Now().AddDate(-1, 0, 0)
	var total float64
	for _, inv := range regCFLog[accountID] {
		if inv.Timestamp.After(cutoff) {
			total += inv.Amount
		}
	}
	return total
}

// --- Client Type Classification ---

// ClientType classifies the account holder for regulatory purposes.
// These are mutually exclusive categories of who the client IS.
type ClientType string

const (
	ClientIndividual    ClientType = "individual"    // retail investor
	ClientInstitutional ClientType = "institutional" // QIB, fund, etc.
	ClientBrokerDealer  ClientType = "broker_dealer" // registered B/D subscriber
)

// SetClientType sets the regulatory classification for an account.
func (s *Service) SetClientType(accountID string, ct ClientType) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if acct, ok := s.accounts[accountID]; ok {
		acct.ClientType = ct
	}
}

// --- Offering Type Classification ---
// Securities are issued under specific SEC exemptions. The offering type
// is a property of the SECURITY (issuer's choice), not the investor.

// OfferingType identifies the registration exemption under which a security is offered.
// Covers US (SEC), UK (FCA), EU (ESMA), SG (MAS), and other jurisdictions.
type OfferingType string

const (
	// --- US (SEC) ---
	OfferingPublic   OfferingType = "public"      // registered / exchange-listed
	OfferingRegCF    OfferingType = "reg_cf"       // Regulation Crowdfunding (Title III, §227)
	OfferingRegD     OfferingType = "reg_d"        // Reg D private placement (§506(b) or §506(c))
	OfferingRegD506b OfferingType = "reg_d_506b"   // Reg D §506(b) — up to 35 non-accredited
	OfferingRegD506c OfferingType = "reg_d_506c"   // Reg D §506(c) — accredited only, general solicitation OK
	OfferingRegA     OfferingType = "reg_a"        // Reg A+ (Tier 1: $20M / Tier 2: $75M cap)
	OfferingRegS     OfferingType = "reg_s"        // Reg S — offshore, non-US persons

	// --- UK (FCA / Prospectus Regulation) ---
	OfferingUKPublic       OfferingType = "uk_public"        // FCA-approved prospectus
	OfferingUKPrivate      OfferingType = "uk_private"       // s.86 exemption — qualified investors only
	OfferingUKCrowdfunding OfferingType = "uk_crowdfunding"  // FCA-authorized crowdfunding platform

	// --- EU (ESMA / MiFID II / MiCA) ---
	OfferingEUProspectus OfferingType = "eu_prospectus" // approved EU prospectus (passportable)
	OfferingEUExempt     OfferingType = "eu_exempt"     // qualified investor exemption / <8M EUR
	OfferingMiCA         OfferingType = "mica"          // MiCA-regulated crypto-asset offering

	// --- Singapore (MAS / SFA) ---
	OfferingSGPublic     OfferingType = "sg_public"     // MAS-registered prospectus
	OfferingSGPrivate    OfferingType = "sg_private"    // s.272B SFA — accredited/institutional only
	OfferingSGSmall      OfferingType = "sg_small"      // s.272A SFA — small offering (<S$5M / 12mo)
	OfferingSGDPT        OfferingType = "sg_dpt"        // Digital Payment Token (PS Act)

	// --- Hong Kong (SFC) ---
	OfferingHKPublic     OfferingType = "hk_public"     // SFC-authorized
	OfferingHKProfessional OfferingType = "hk_professional" // professional investors only (s.103 SFO)

	// --- UAE (DFSA / VARA) ---
	OfferingDFSA OfferingType = "dfsa" // DIFC regulated
	OfferingVARA OfferingType = "vara" // Dubai virtual asset

	// --- MENA ---
	OfferingSACMA  OfferingType = "sa_cma"  // Saudi CMA authorized
	OfferingBHCBB  OfferingType = "bh_cbb"  // Bahrain CBB licensed
	OfferingQAQFC  OfferingType = "qa_qfc"  // Qatar QFC regulated
	OfferingKWCMA  OfferingType = "kw_cma"  // Kuwait CMA authorized
	OfferingOMCMA  OfferingType = "om_cma"  // Oman CMA authorized

	// --- Isle of Man (home jurisdiction) ---
	OfferingIMFSA OfferingType = "im_fsa" // IOM FSA regulated (Class 8 / DBA)

	// --- Other ---
	OfferingCHFINMA OfferingType = "ch_finma" // FINMA authorized
	OfferingAUASIC  OfferingType = "au_asic"  // ASIC regulated
	OfferingJPJFSA  OfferingType = "jp_jfsa"  // JFSA registered
	OfferingGIDLT   OfferingType = "gi_dlt"   // Gibraltar DLT framework
	OfferingLITVTG  OfferingType = "li_tvtg"  // Liechtenstein blockchain act
)

// Offering describes a security's issuance and the rules that govern who can trade it.
type Offering struct {
	Symbol       string       `json:"symbol"`
	OfferingType OfferingType `json:"offering_type"`
	IssuerID     string       `json:"issuer_id"`
	IssuerName   string       `json:"issuer_name"`
	Jurisdiction Jurisdiction `json:"jurisdiction"` // which regime this offering was registered under

	// Investor eligibility
	RequiresAccredited   bool     `json:"requires_accredited"`    // US: SEC accredited / SG: MAS accredited
	RequiresProfessional bool     `json:"requires_professional"`  // UK/EU: MiFID professional / HK: SFC professional
	MaxNonAccredited     int      `json:"max_non_accredited"`     // Reg D 506(b): 35
	AllowedJurisdictions []string `json:"allowed_jurisdictions"`  // empty = all; ["US"] = US only; ["UK","EU"] = EEA
	BlockedJurisdictions []string `json:"blocked_jurisdictions"`  // e.g., ["US"] for Reg S

	// Aggregate caps (issuer-level, per regulatory rule)
	MaxRaise    float64 `json:"max_raise"`    // e.g., $5M Reg CF, S$5M SG small, EUR 8M EU exempt
	RaisedSoFar float64 `json:"raised_so_far"` // track against cap
}

// offeringRegistry tracks offering metadata per symbol.
var (
	offeringMu  sync.RWMutex
	offerings   = make(map[string]*Offering)
)

// RegisterOffering registers a security's offering type and issuer.
func (s *Service) RegisterOffering(o *Offering) {
	offeringMu.Lock()
	defer offeringMu.Unlock()
	offerings[o.Symbol] = o
}

// GetOffering returns offering metadata for a symbol.
func (s *Service) GetOffering(symbol string) (*Offering, bool) {
	offeringMu.RLock()
	defer offeringMu.RUnlock()
	o, ok := offerings[symbol]
	return o, ok
}

// OfferingPreTradeCheck enforces offering-type-specific rules across jurisdictions.
// This checks whether this investor can trade THIS security given the
// offering's exemption type and the investor's jurisdiction.
func (s *Service) OfferingPreTradeCheck() func(ctx context.Context, order *types.Order) error {
	return func(ctx context.Context, order *types.Order) error {
		offeringMu.RLock()
		offering, hasOffering := offerings[order.Symbol]
		offeringMu.RUnlock()

		if !hasOffering {
			return nil // public / exchange-listed — no offering restriction
		}

		s.mu.RLock()
		acct, ok := s.accounts[order.AccountID]
		s.mu.RUnlock()
		if !ok {
			return fmt.Errorf("account %s not found", order.AccountID)
		}

		// --- Jurisdiction gating ---
		if err := checkJurisdictionAccess(offering, acct); err != nil {
			return err
		}

		// --- Offering-type-specific rules ---
		switch offering.OfferingType {

		// ===== US (SEC) =====
		case OfferingRegD506c:
			if !acct.Accredited {
				return fmt.Errorf("Reg D §506(c) securities require accredited investor status")
			}

		case OfferingRegD, OfferingRegD506b:
			if !acct.Accredited && acct.KYC < KYCStandard {
				return fmt.Errorf("Reg D §506(b) non-accredited investors require KYC level 2+")
			}

		case OfferingRegCF:
			return s.checkRegCFLimits(order, acct)

		case OfferingRegA:
			if !acct.Accredited {
				orderAmount := orderNotional(order)
				if acct.MaxOrderSize > 0 && orderAmount > acct.MaxOrderSize {
					return fmt.Errorf("Reg A+ Tier 2 non-accredited investment limit exceeded")
				}
			}

		case OfferingRegS:
			if acct.Jurisdiction == JurisdictionUS || acct.Country == "US" {
				return fmt.Errorf("Reg S securities not available to US persons")
			}

		// ===== UK (FCA) =====
		case OfferingUKPrivate:
			// FCA s.86 exemption — qualified (professional) investors only
			if !acct.Professional && !acct.Accredited {
				return fmt.Errorf("UK private placement restricted to professional/qualified investors")
			}

		case OfferingUKCrowdfunding:
			// FCA crowdfunding: retail allowed but with appropriateness assessment
			// Non-sophisticated investors limited to 10% of net assets
			if !acct.Professional && acct.KYC < KYCBasic {
				return fmt.Errorf("FCA crowdfunding requires KYC level 1+")
			}

		// ===== EU (MiFID II / MiCA) =====
		case OfferingEUExempt:
			// Qualified investor exemption under EU Prospectus Regulation
			if !acct.Professional {
				return fmt.Errorf("EU exempt offering restricted to MiFID II professional clients")
			}

		case OfferingMiCA:
			// MiCA crypto-asset offering — retail allowed with white paper
			if acct.KYC < KYCBasic {
				return fmt.Errorf("MiCA crypto-asset trading requires KYC level 1+")
			}

		// ===== Singapore (MAS / SFA) =====
		case OfferingSGPrivate:
			// s.272B SFA — accredited investors (net personal assets > S$2M) or institutional
			if !acct.Accredited && acct.ClientType != ClientInstitutional {
				return fmt.Errorf("SG private placement restricted to MAS accredited/institutional investors")
			}

		case OfferingSGSmall:
			// s.272A SFA — small offering (< S$5M in 12 months, ≤ 50 investors)
			if acct.KYC < KYCBasic {
				return fmt.Errorf("SG small offering requires KYC level 1+")
			}

		case OfferingSGDPT:
			// Digital Payment Token — MAS PS Act licensing
			if acct.KYC < KYCBasic {
				return fmt.Errorf("DPT services require KYC level 1+")
			}

		// ===== Hong Kong (SFC) =====
		case OfferingHKProfessional:
			// s.103 SFO — professional investors only (HK$8M portfolio)
			if !acct.Professional && acct.ClientType != ClientInstitutional {
				return fmt.Errorf("HK professional offering restricted to SFC professional investors")
			}

		// ===== UAE =====
		case OfferingDFSA, OfferingVARA:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("DFSA/VARA offerings require KYC level 2+")
			}

		// ===== MENA =====
		case OfferingSACMA:
			// Saudi CMA — qualified client or institutional
			if !acct.Accredited && acct.ClientType != ClientInstitutional {
				return fmt.Errorf("Saudi CMA offerings restricted to qualified/institutional investors")
			}

		case OfferingBHCBB, OfferingQAQFC, OfferingKWCMA, OfferingOMCMA:
			// Gulf state regulators — standard KYC required
			if acct.KYC < KYCStandard {
				return fmt.Errorf("%s offerings require KYC level 2+", offering.OfferingType)
			}

		// ===== Isle of Man (home jurisdiction) =====
		case OfferingIMFSA:
			// IOM FSA — Class 8 (investment business) or DBA (designated business act)
			if acct.KYC < KYCStandard {
				return fmt.Errorf("IOM FSA offerings require KYC level 2+")
			}

		// ===== Other jurisdictions =====
		case OfferingCHFINMA:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("FINMA offerings require KYC level 2+")
			}

		case OfferingAUASIC:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("ASIC offerings require KYC level 2+")
			}

		case OfferingJPJFSA:
			if acct.KYC < KYCStandard {
				return fmt.Errorf("JFSA offerings require KYC level 2+")
			}

		case OfferingGIDLT, OfferingLITVTG:
			// Gibraltar DLT / Liechtenstein TVTG — standard KYC
			if acct.KYC < KYCBasic {
				return fmt.Errorf("%s offerings require KYC level 1+", offering.OfferingType)
			}
		}

		return nil
	}
}

// checkJurisdictionAccess enforces allowed/blocked jurisdiction lists on an offering.
func checkJurisdictionAccess(offering *Offering, acct *AccountStatus) error {
	country := acct.Country
	jur := string(acct.Jurisdiction)

	if len(offering.AllowedJurisdictions) > 0 {
		allowed := false
		for _, j := range offering.AllowedJurisdictions {
			if j == country || j == jur {
				allowed = true
				break
			}
		}
		if !allowed {
			return fmt.Errorf("offering restricted to jurisdictions %v (account: %s)", offering.AllowedJurisdictions, country)
		}
	}

	for _, j := range offering.BlockedJurisdictions {
		if j == country || j == jur {
			return fmt.Errorf("offering not available in jurisdiction %s", country)
		}
	}

	return nil
}

func orderNotional(order *types.Order) float64 {
	if order.Notional != "" {
		return parseFloat(order.Notional)
	}
	return parseFloat(order.Qty) * parseFloat(order.LimitPrice)
}

// checkRegCFLimits enforces SEC Reg CF per-investor annual limits.
func (s *Service) checkRegCFLimits(order *types.Order, acct *AccountStatus) error {
	regCFMu.Lock()
	profile, ok := regCFProfiles[order.AccountID]
	regCFMu.Unlock()

	if !ok {
		return fmt.Errorf("account %s has no investor profile — required for Reg CF securities", order.AccountID)
	}

	if profile.Accredited {
		return nil // no limit for accredited investors
	}

	limit := regCFAnnualLimit(profile)
	spent := regCFRolling12MonthSpend(order.AccountID)
	orderAmount := parseFloat(order.Notional)
	if orderAmount == 0 {
		orderAmount = parseFloat(order.Qty) * parseFloat(order.LimitPrice)
	}

	if spent+orderAmount > limit {
		return fmt.Errorf(
			"Reg CF annual limit exceeded: order $%.2f + prior $%.2f = $%.2f > limit $%.2f",
			orderAmount, spent, spent+orderAmount, limit,
		)
	}

	log.Debug().
		Str("account", order.AccountID).
		Float64("limit", limit).
		Float64("spent", spent).
		Float64("order", orderAmount).
		Msg("Reg CF investment limit check passed")
	return nil
}

// ExecutionQuality tracks best execution metrics for SEC Reg NMS.
type ExecutionQuality struct {
	TradeID        string    `json:"trade_id"`
	OrderID        string    `json:"order_id"`
	Symbol         string    `json:"symbol"`
	OrderPrice     float64   `json:"order_price"`
	ExecPrice      float64   `json:"exec_price"`
	MarketRefPrice float64   `json:"market_ref_price"` // NBBO midpoint
	Improvement    float64   `json:"price_improvement"`
	FillRate       float64   `json:"fill_rate"`
	LatencyMs      int64     `json:"latency_ms"`
	Venue          string    `json:"venue"`
	Timestamp      time.Time `json:"timestamp"`
}

func parseFloat(s string) float64 {
	if s == "" {
		return 0
	}
	v, _ := strconv.ParseFloat(s, 64)
	return v
}

// Round to basis points for regulatory precision.
func bps(price, ref float64) float64 {
	if ref == 0 {
		return 0
	}
	return math.Round((price-ref)/ref*10000) / 100 // percent
}

// --- Federated Entity Model ---
// Supports a global network of regulated entities operating under different
// jurisdictions with flexible cross-entity routing, KYC/AML passporting, and
// unified compliance enforcement.

// FederatedEntity represents a regulated entity in the network.
type FederatedEntity struct {
	EntityID     string       `json:"entity_id"`
	Name         string       `json:"name"`
	Jurisdiction Jurisdiction `json:"jurisdiction"`   // primary regulatory jurisdiction
	LicenseType  string       `json:"license_type"`   // e.g., "broker_dealer", "ats", "emi", "dba", "class_8"
	LicenseID    string       `json:"license_id"`     // CRD, FRN, CMS number, CE number, etc.
	LEI          string       `json:"lei"`            // Legal Entity Identifier (ISO 17442)
	Status       string       `json:"status"`         // active, suspended, revoked
	Capabilities []string     `json:"capabilities"`   // ["trading", "custody", "clearing", "payments", "tokenization"]
	AssetClasses []string     `json:"asset_classes"`  // asset classes this entity can handle

	// Cross-entity relationships
	ParentEntityID    string   `json:"parent_entity_id,omitempty"`    // parent holding company
	PassportedFrom    []string `json:"passported_from,omitempty"`     // EU passporting: origin entity IDs
	AllowedCounterparties []string `json:"allowed_counterparties,omitempty"` // entity IDs we can route to
}

// FederatedRegistry manages the network of regulated entities.
type FederatedRegistry struct {
	mu       sync.RWMutex
	entities map[string]*FederatedEntity
}

// NewFederatedRegistry creates a new federated entity registry.
func NewFederatedRegistry() *FederatedRegistry {
	return &FederatedRegistry{
		entities: make(map[string]*FederatedEntity),
	}
}

// Register adds or updates a federated entity.
func (fr *FederatedRegistry) Register(entity *FederatedEntity) {
	fr.mu.Lock()
	defer fr.mu.Unlock()
	fr.entities[entity.EntityID] = entity
}

// Get returns a federated entity by ID.
func (fr *FederatedRegistry) Get(entityID string) (*FederatedEntity, bool) {
	fr.mu.RLock()
	defer fr.mu.RUnlock()
	e, ok := fr.entities[entityID]
	return e, ok
}

// ListByJurisdiction returns all entities licensed in a given jurisdiction.
func (fr *FederatedRegistry) ListByJurisdiction(j Jurisdiction) []*FederatedEntity {
	fr.mu.RLock()
	defer fr.mu.RUnlock()
	var result []*FederatedEntity
	for _, e := range fr.entities {
		if e.Jurisdiction == j && e.Status == "active" {
			result = append(result, e)
		}
	}
	return result
}

// FindRouteEntity finds the best entity to handle a trade in a given jurisdiction
// with the required capability.
func (fr *FederatedRegistry) FindRouteEntity(j Jurisdiction, capability string) (*FederatedEntity, bool) {
	fr.mu.RLock()
	defer fr.mu.RUnlock()
	for _, e := range fr.entities {
		if e.Jurisdiction != j || e.Status != "active" {
			continue
		}
		for _, cap := range e.Capabilities {
			if cap == capability {
				return e, true
			}
		}
	}
	return nil, false
}

// CanPassport checks if two entities can share KYC/AML data under regulatory passporting.
// EU passporting, IOM/UK equivalence, and explicit counterparty agreements are supported.
func (fr *FederatedRegistry) CanPassport(fromID, toID string) bool {
	fr.mu.RLock()
	defer fr.mu.RUnlock()

	from, ok1 := fr.entities[fromID]
	to, ok2 := fr.entities[toID]
	if !ok1 || !ok2 {
		return false
	}

	// Same parent company — internal passporting always allowed
	if from.ParentEntityID != "" && from.ParentEntityID == to.ParentEntityID {
		return true
	}

	// EU/EEA passporting (MiFID II)
	euJurisdictions := map[Jurisdiction]bool{
		JurisdictionEU: true, JurisdictionLI: true,
	}
	if euJurisdictions[from.Jurisdiction] && euJurisdictions[to.Jurisdiction] {
		return true
	}

	// IOM ↔ UK equivalence (Crown Dependency arrangements)
	if (from.Jurisdiction == JurisdictionIM && to.Jurisdiction == JurisdictionUK) ||
		(from.Jurisdiction == JurisdictionUK && to.Jurisdiction == JurisdictionIM) {
		return true
	}

	// Explicit passporting relationship
	for _, pid := range to.PassportedFrom {
		if pid == fromID {
			return true
		}
	}

	// Explicit counterparty agreement
	for _, cid := range from.AllowedCounterparties {
		if cid == toID {
			return true
		}
	}

	return false
}
