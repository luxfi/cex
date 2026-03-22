package markets

import (
	"context"
	"testing"

	"github.com/luxfi/cex/pkg/engine"
	"github.com/luxfi/cex/pkg/types"
)

func noopMatch(_ context.Context, _ *types.Order) ([]*types.Trade, error) {
	return nil, nil
}

func TestRegisterDefaults_Empty(t *testing.T) {
	eng := engine.New(noopMatch)
	n := RegisterDefaults(eng, nil)
	if n != 0 {
		t.Fatalf("expected 0, got %d", n)
	}
}

func TestRegisterDefaults_RegistersMarkets(t *testing.T) {
	eng := engine.New(noopMatch)
	defaults := []DefaultMarket{
		{
			Symbol:       "USDL-USD",
			Base:         "USDL",
			Quote:        "USD",
			Class:        types.AssetClassCrypto,
			Tick:         "0.0001",
			Lot:          "0.01",
			MakerFee:     "0",
			TakerFee:     "0",
			RequiresKYC:  true,
			Fractionable: true,
		},
		{
			Symbol:       "BTC-USD",
			Base:         "BTC",
			Quote:        "USD",
			Class:        types.AssetClassCrypto,
			Tick:         "0.01",
			Lot:          "0.00000001",
			MakerFee:     "0.001",
			TakerFee:     "0.002",
			RequiresKYC:  false,
			Fractionable: true,
		},
	}

	n := RegisterDefaults(eng, defaults)
	if n != 2 {
		t.Fatalf("expected 2 registered, got %d", n)
	}

	// Verify markets exist with correct fields.
	m, ok := eng.GetMarket("USDL-USD")
	if !ok {
		t.Fatal("USDL-USD not found")
	}
	if m.AssetClass != types.AssetClassCrypto {
		t.Errorf("expected crypto, got %s", m.AssetClass)
	}
	if m.MakerFee != "0" {
		t.Errorf("expected maker fee 0, got %s", m.MakerFee)
	}
	if !m.Fractionable {
		t.Error("expected fractionable")
	}
	if !m.RequiresKYC {
		t.Error("expected requires_kyc")
	}

	btc, ok := eng.GetMarket("BTC-USD")
	if !ok {
		t.Fatal("BTC-USD not found")
	}
	if btc.LotSize != "0.00000001" {
		t.Errorf("expected lot 0.00000001, got %s", btc.LotSize)
	}
}

func TestRegisterDefaults_SkipsDuplicates(t *testing.T) {
	eng := engine.New(noopMatch)
	defaults := []DefaultMarket{
		{Symbol: "ETH-USD", Base: "ETH", Quote: "USD", Class: types.AssetClassCrypto,
			Tick: "0.01", Lot: "0.00000001", MakerFee: "0.001", TakerFee: "0.002"},
	}

	n1 := RegisterDefaults(eng, defaults)
	n2 := RegisterDefaults(eng, defaults)

	if n1 != 1 {
		t.Fatalf("first call: expected 1, got %d", n1)
	}
	if n2 != 0 {
		t.Fatalf("second call: expected 0 (duplicate), got %d", n2)
	}
}
