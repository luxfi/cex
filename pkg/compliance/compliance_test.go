package compliance

import (
	"context"
	"testing"

	"github.com/luxfi/cex/pkg/types"
)

func validAccount() *AccountStatus {
	return &AccountStatus{
		AccountID:    "acct-1",
		ClientType:   ClientIndividual,
		Jurisdiction: JurisdictionUS,
		Country:      "US",
		KYC:          KYCStandard,
		AMLCleared:   true,
		Sanctioned:   false,
		MaxOrderSize: 100000,
		DailyLimit:   500000,
	}
}

func makeOrderFor(symbol string, class types.AssetClass) *types.Order {
	return &types.Order{
		AccountID:  "acct-1",
		Symbol:     symbol,
		AssetClass: class,
		Side:       types.SideBuy,
		Type:       types.OrderTypeLimit,
		Qty:        "10",
		LimitPrice: "100",
	}
}

// --- Basic pre-trade checks ---

func TestPreTradeCheck_Passes(t *testing.T) {
	svc := NewService()
	svc.SetAccountStatus(validAccount())
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected pass, got: %v", err)
	}
}

func TestPreTradeCheck_UnknownAccount(t *testing.T) {
	svc := NewService()
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err == nil {
		t.Fatal("expected error for unknown account")
	}
}

func TestPreTradeCheck_Sanctioned(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Sanctioned = true
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err == nil {
		t.Fatal("expected sanctions rejection")
	}
}

func TestPreTradeCheck_AMLNotCleared(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.AMLCleared = false
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err == nil {
		t.Fatal("expected AML rejection")
	}
}

func TestPreTradeCheck_KYCTooLowForEquity(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.KYC = KYCBasic // level 1 — needs level 2 for equities
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected KYC rejection for US equity with basic KYC")
	}
}

func TestPreTradeCheck_KYCBasicAllowsCrypto(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err != nil {
		t.Fatalf("expected crypto allowed with basic KYC, got: %v", err)
	}
}

func TestPreTradeCheck_KYCNoneRejectsCrypto(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.KYC = KYCNone
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err == nil {
		t.Fatal("expected rejection for KYC none on crypto")
	}
}

func TestPreTradeCheck_OrderSizeExceeded(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.MaxOrderSize = 500 // $500 max
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	// 10 * 100 = $1000 > $500
	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected order size rejection")
	}
}

func TestPreTradeCheck_DailyLimitExceeded(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.DailyLimit = 1500
	acct.DailyUsed = 1000
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	// 10 * 100 = $1000, used=1000, total=2000 > 1500
	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected daily limit rejection")
	}
}

func TestPreTradeCheck_DailyLimitOK(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.DailyLimit = 5000
	acct.DailyUsed = 1000
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	// 10 * 100 = $1000, used=1000, total=2000 < 5000
	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected pass, got: %v", err)
	}
}

func TestRecordDailyUsage(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.DailyLimit = 2000
	svc.SetAccountStatus(acct)

	svc.RecordDailyUsage("acct-1", 500)
	got, _ := svc.GetAccountStatus("acct-1")
	if got.DailyUsed != 500 {
		t.Fatalf("expected 500, got %f", got.DailyUsed)
	}
}

func TestResetDailyLimits(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.DailyUsed = 10000
	svc.SetAccountStatus(acct)

	svc.ResetDailyLimits()

	got, _ := svc.GetAccountStatus("acct-1")
	if got.DailyUsed != 0 {
		t.Fatalf("expected 0 after reset, got %f", got.DailyUsed)
	}
}

func TestPreTradeCheck_NotionalOrder(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.MaxOrderSize = 500
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	order := makeOrderFor("AAPL", types.AssetClassUSEquity)
	order.Qty = ""
	order.LimitPrice = ""
	order.Notional = "600" // $600 > $500

	err := check(context.Background(), order)
	if err == nil {
		t.Fatal("expected rejection for notional exceeding max")
	}
}

// --- Multi-jurisdiction KYC tests ---

func TestKYC_UKRequiresStandard(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionUK
	acct.Country = "GB"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("VOD.L", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected UK FCA to reject KYC level 1")
	}
}

func TestKYC_UKStandardPasses(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionUK
	acct.Country = "GB"
	acct.KYC = KYCStandard
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("VOD.L", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected UK pass with KYC 2, got: %v", err)
	}
}

func TestKYC_SGCryptoBasicAllowed(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionSG
	acct.Country = "SG"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err != nil {
		t.Fatalf("expected SG crypto with KYC 1 to pass, got: %v", err)
	}
}

func TestKYC_SGSecuritiesRequireStandard(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionSG
	acct.Country = "SG"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("DBS.SI", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected SG securities to reject KYC 1")
	}
}

func TestKYC_HKRequiresStandard(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionHK
	acct.Country = "HK"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("0005.HK", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected HK SFC to reject KYC 1")
	}
}

func TestKYC_IOMHomeJurisdiction(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionIM
	acct.Country = "IM"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected IOM FSA to reject KYC 1")
	}

	acct.KYC = KYCStandard
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected IOM FSA pass with KYC 2, got: %v", err)
	}
}

func TestKYC_SaudiCMA(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionSA
	acct.Country = "SA"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("2222.SR", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected Saudi CMA to reject KYC 1")
	}
}

func TestKYC_BahrainCBB(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionBH
	acct.Country = "BH"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BATELCO", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected Bahrain CBB to reject KYC 1")
	}
}

func TestKYC_CaymanBasicAllowed(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionKY
	acct.Country = "KY"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err != nil {
		t.Fatalf("expected Cayman with KYC 1 to pass, got: %v", err)
	}
}

func TestKYC_CaymanNoneRejects(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionKY
	acct.Country = "KY"
	acct.KYC = KYCNone
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("BTC-USD", types.AssetClassCrypto))
	if err == nil {
		t.Fatal("expected Cayman with KYC 0 to reject")
	}
}

// --- Offering pre-trade checks ---

func TestOffering_RegD506c_AccreditedOnly(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "PRIV-A",
		OfferingType: OfferingRegD506c,
		Jurisdiction: JurisdictionUS,
	})
	check := svc.OfferingPreTradeCheck()

	// Not accredited — should fail
	err := check(context.Background(), makeOrderFor("PRIV-A", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected Reg D 506(c) to reject non-accredited")
	}

	// Accredited — should pass
	acct.Accredited = true
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("PRIV-A", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected Reg D 506(c) to pass for accredited, got: %v", err)
	}
}

func TestOffering_RegS_BlocksUS(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "REG-S-1",
		OfferingType: OfferingRegS,
		Jurisdiction: JurisdictionUS,
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("REG-S-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected Reg S to reject US person")
	}

	// Non-US should pass
	acct.Jurisdiction = JurisdictionUK
	acct.Country = "GB"
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("REG-S-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected Reg S to pass for non-US, got: %v", err)
	}
}

func TestOffering_UKPrivate_ProfessionalOnly(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionUK
	acct.Country = "GB"
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "UK-PP-1",
		OfferingType: OfferingUKPrivate,
		Jurisdiction: JurisdictionUK,
	})
	check := svc.OfferingPreTradeCheck()

	// Retail — should fail
	err := check(context.Background(), makeOrderFor("UK-PP-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected UK private placement to reject retail")
	}

	// Professional — should pass
	acct.Professional = true
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("UK-PP-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected UK private placement to pass for professional, got: %v", err)
	}
}

func TestOffering_SGPrivate_AccreditedOrInstitutional(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionSG
	acct.Country = "SG"
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "SG-PP-1",
		OfferingType: OfferingSGPrivate,
		Jurisdiction: JurisdictionSG,
	})
	check := svc.OfferingPreTradeCheck()

	// Retail — should fail
	err := check(context.Background(), makeOrderFor("SG-PP-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected SG private to reject retail")
	}

	// Institutional — should pass
	acct.ClientType = ClientInstitutional
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("SG-PP-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected SG private to pass for institutional, got: %v", err)
	}
}

func TestOffering_HKProfessional(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionHK
	acct.Country = "HK"
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "HK-PRO-1",
		OfferingType: OfferingHKProfessional,
		Jurisdiction: JurisdictionHK,
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("HK-PRO-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected HK professional to reject retail")
	}

	acct.Professional = true
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("HK-PRO-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected HK professional to pass for professional, got: %v", err)
	}
}

func TestOffering_DFSA(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionAE
	acct.Country = "AE"
	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "DFSA-1",
		OfferingType: OfferingDFSA,
		Jurisdiction: JurisdictionAE,
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("DFSA-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected DFSA to reject KYC 1")
	}

	acct.KYC = KYCStandard
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("DFSA-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected DFSA to pass with KYC 2, got: %v", err)
	}
}

func TestOffering_SaudiCMA_QualifiedOnly(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionSA
	acct.Country = "SA"
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "SA-CMA-1",
		OfferingType: OfferingSACMA,
		Jurisdiction: JurisdictionSA,
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("SA-CMA-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected Saudi CMA to reject non-qualified retail")
	}

	acct.Accredited = true
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("SA-CMA-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected Saudi CMA to pass for accredited, got: %v", err)
	}
}

func TestOffering_IMFSA(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.Jurisdiction = JurisdictionIM
	acct.Country = "IM"
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:       "IM-FSA-1",
		OfferingType: OfferingIMFSA,
		Jurisdiction: JurisdictionIM,
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("IM-FSA-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected IOM FSA pass with KYC 2, got: %v", err)
	}

	acct.KYC = KYCBasic
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("IM-FSA-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected IOM FSA to reject KYC 1")
	}
}

func TestOffering_JurisdictionBlocking(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:               "BLOCKED-1",
		OfferingType:         OfferingPublic,
		BlockedJurisdictions: []string{"US"},
	})
	check := svc.OfferingPreTradeCheck()

	err := check(context.Background(), makeOrderFor("BLOCKED-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected blocked jurisdiction rejection")
	}
}

func TestOffering_JurisdictionAllowList(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	svc.SetAccountStatus(acct)
	svc.RegisterOffering(&Offering{
		Symbol:               "ALLOW-1",
		OfferingType:         OfferingPublic,
		AllowedJurisdictions: []string{"UK", "EU"},
	})
	check := svc.OfferingPreTradeCheck()

	// US account — not in allow list
	err := check(context.Background(), makeOrderFor("ALLOW-1", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected US account rejected from UK/EU-only offering")
	}

	// UK account — allowed
	acct.Jurisdiction = JurisdictionUK
	acct.Country = "GB"
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("ALLOW-1", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected UK account allowed, got: %v", err)
	}
}

func TestOffering_NoOfferingPassesThrough(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	svc.SetAccountStatus(acct)
	check := svc.OfferingPreTradeCheck()

	// No offering registered for symbol — should pass
	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected pass-through for unregistered offering, got: %v", err)
	}
}

// --- Federated entity tests ---

func TestFederatedRegistry_Basic(t *testing.T) {
	fr := NewFederatedRegistry()
	fr.Register(&FederatedEntity{
		EntityID:     "lux-iom",
		Name:         "Lux IOM Ltd",
		Jurisdiction: JurisdictionIM,
		LicenseType:  "class_8",
		Status:       "active",
		Capabilities: []string{"trading", "custody"},
	})

	e, ok := fr.Get("lux-iom")
	if !ok {
		t.Fatal("expected to find entity")
	}
	if e.Jurisdiction != JurisdictionIM {
		t.Fatalf("expected IM, got %s", e.Jurisdiction)
	}
}

func TestFederatedRegistry_FindRouteEntity(t *testing.T) {
	fr := NewFederatedRegistry()
	fr.Register(&FederatedEntity{
		EntityID:     "lux-us",
		Name:         "Lux US LLC",
		Jurisdiction: JurisdictionUS,
		Status:       "active",
		Capabilities: []string{"trading"},
	})
	fr.Register(&FederatedEntity{
		EntityID:     "lux-uk",
		Name:         "Lux UK Ltd",
		Jurisdiction: JurisdictionUK,
		Status:       "active",
		Capabilities: []string{"trading", "custody"},
	})

	e, ok := fr.FindRouteEntity(JurisdictionUK, "custody")
	if !ok {
		t.Fatal("expected to find UK custody entity")
	}
	if e.EntityID != "lux-uk" {
		t.Fatalf("expected lux-uk, got %s", e.EntityID)
	}

	_, ok = fr.FindRouteEntity(JurisdictionUS, "custody")
	if ok {
		t.Fatal("expected no US custody entity")
	}
}

func TestFederatedRegistry_Passporting(t *testing.T) {
	fr := NewFederatedRegistry()
	fr.Register(&FederatedEntity{
		EntityID:       "lux-iom",
		Jurisdiction:   JurisdictionIM,
		Status:         "active",
		ParentEntityID: "lux-holdings",
	})
	fr.Register(&FederatedEntity{
		EntityID:       "lux-uk",
		Jurisdiction:   JurisdictionUK,
		Status:         "active",
		ParentEntityID: "lux-holdings",
	})
	fr.Register(&FederatedEntity{
		EntityID:     "lux-eu",
		Jurisdiction: JurisdictionEU,
		Status:       "active",
	})
	fr.Register(&FederatedEntity{
		EntityID:     "partner-eu",
		Jurisdiction: JurisdictionEU,
		Status:       "active",
	})

	// Same parent — always allowed
	if !fr.CanPassport("lux-iom", "lux-uk") {
		t.Fatal("expected IOM↔UK passporting within same holding company")
	}

	// IOM ↔ UK Crown Dependency equivalence
	fr2 := NewFederatedRegistry()
	fr2.Register(&FederatedEntity{EntityID: "iom-a", Jurisdiction: JurisdictionIM, Status: "active"})
	fr2.Register(&FederatedEntity{EntityID: "uk-a", Jurisdiction: JurisdictionUK, Status: "active"})
	if !fr2.CanPassport("iom-a", "uk-a") {
		t.Fatal("expected IOM↔UK Crown Dependency passporting")
	}

	// EU↔EU passporting
	if !fr.CanPassport("lux-eu", "partner-eu") {
		t.Fatal("expected EU↔EU passporting")
	}

	// No passporting between unrelated entities in different jurisdictions
	if fr.CanPassport("lux-eu", "lux-iom") {
		t.Fatal("expected no passporting between unrelated EU and IOM entities")
	}
}

func TestFederatedRegistry_ListByJurisdiction(t *testing.T) {
	fr := NewFederatedRegistry()
	fr.Register(&FederatedEntity{EntityID: "a", Jurisdiction: JurisdictionUS, Status: "active"})
	fr.Register(&FederatedEntity{EntityID: "b", Jurisdiction: JurisdictionUS, Status: "active"})
	fr.Register(&FederatedEntity{EntityID: "c", Jurisdiction: JurisdictionUK, Status: "active"})
	fr.Register(&FederatedEntity{EntityID: "d", Jurisdiction: JurisdictionUS, Status: "suspended"})

	result := fr.ListByJurisdiction(JurisdictionUS)
	if len(result) != 2 {
		t.Fatalf("expected 2 active US entities, got %d", len(result))
	}
}

// --- Reg CF limit tests ---

func TestRegCFLimit_LowIncome(t *testing.T) {
	profile := &RegCFProfile{AnnualIncome: 50000, NetWorth: 30000}
	limit := regCFAnnualLimit(profile)
	// lesser = 30000, 5% = 1500, floor = 2500
	if limit != 2500 {
		t.Fatalf("expected $2500 floor, got %.2f", limit)
	}
}

func TestRegCFLimit_HighIncome(t *testing.T) {
	profile := &RegCFProfile{AnnualIncome: 200000, NetWorth: 200000}
	limit := regCFAnnualLimit(profile)
	// both >= 124K, lesser = 200K, 10% = 20K, cap = 124K → 20K
	if limit != 20000 {
		t.Fatalf("expected $20000, got %.2f", limit)
	}
}

// --- PEP / EDD tests ---

func TestPEP_DirectBlocksWithoutEDD(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.PEP = PEPDirect
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected PEP direct to be blocked without EDD")
	}
}

func TestPEP_DirectPassesWithEDDAndSOF(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.PEP = PEPDirect
	acct.EDDRequired = true
	acct.SOFVerified = true
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected PEP with EDD+SOF to pass, got: %v", err)
	}
}

func TestPEP_DirectBlocksWithoutSOF(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.PEP = PEPDirect
	acct.EDDRequired = true
	acct.SOFVerified = false
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected PEP without SOF verification to be blocked")
	}
}

func TestPEP_RelatedBlocksWithoutEDD(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.PEP = PEPRelated
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected PEP related to be blocked without EDD")
	}
}

func TestPEP_FormerAllowed(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.PEP = PEPFormer
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected former PEP to pass (cooled off), got: %v", err)
	}
}

func TestAdverseMedia_BlocksWithoutEDD(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.AdverseMedia = true
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected adverse media to block without EDD")
	}
}

func TestAdverseMedia_PassesWithEDD(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.AdverseMedia = true
	acct.EDDRequired = true
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected adverse media with EDD to pass, got: %v", err)
	}
}

func TestHighRiskCountry_RequiresEnhancedKYC(t *testing.T) {
	svc := NewService()
	acct := validAccount()
	acct.HighRiskCountry = true
	acct.KYC = KYCStandard // level 2 — need level 3
	svc.SetAccountStatus(acct)
	check := svc.PreTradeCheck()

	err := check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err == nil {
		t.Fatal("expected high-risk country to require enhanced KYC")
	}

	acct.KYC = KYCEnhanced
	svc.SetAccountStatus(acct)
	err = check(context.Background(), makeOrderFor("AAPL", types.AssetClassUSEquity))
	if err != nil {
		t.Fatalf("expected high-risk country with enhanced KYC to pass, got: %v", err)
	}
}
