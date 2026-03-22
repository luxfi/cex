package types

import "testing"

func TestMapAssetClass(t *testing.T) {
	tests := []struct {
		input string
		want  AssetClass
	}{
		{"us_equity", AssetClassUSEquity},
		{"US_EQUITY", AssetClassUSEquity},
		{"intl_equity", AssetClassIntlEquity},
		{"crypto", AssetClassCrypto},
		{"forex", AssetClassForex},
		{"fx", AssetClassForex},
		{"options", AssetClassOptions},
		{"futures", AssetClassFutures},
		{"fixed_income", AssetClassFixedIncome},
		{"bond", AssetClassFixedIncome},
		{"bonds", AssetClassFixedIncome},
		{"treasury", AssetClassFixedIncome},
		{"treasuries", AssetClassFixedIncome},
		{"municipal", AssetClassMunicipal},
		{"muni", AssetClassMunicipal},
		{"structured", AssetClassStructured},
		{"abs", AssetClassStructured},
		{"mbs", AssetClassStructured},
		{"cdo", AssetClassStructured},
		{"clo", AssetClassStructured},
		{"corporate_debt", AssetClassCorporateDebt},
		{"corporate_loan", AssetClassCorporateDebt},
		{"consumer_debt", AssetClassConsumerDebt},
		{"personal_loan", AssetClassConsumerDebt},
		{"real_estate", AssetClassRealEstate},
		{"reit", AssetClassRealEstate},
		{"commodities", AssetClassCommodities},
		{"commodity", AssetClassCommodities},
		{"precious_metals", AssetClassPreciousMetals},
		{"gold", AssetClassPreciousMetals},
		{"silver", AssetClassPreciousMetals},
		{"platinum", AssetClassPreciousMetals},
		{"palladium", AssetClassPreciousMetals},
		{"private_equity", AssetClassPrivateEquity},
		{"pe", AssetClassPrivateEquity},
		{"venture", AssetClassVenture},
		{"vc", AssetClassVenture},
		{"private_credit", AssetClassPrivateCredit},
		{"cdp", AssetClassCDP},
		{"lp", AssetClassLP},
		// Unknown defaults to US equity
		{"unknown", AssetClassUSEquity},
		{"", AssetClassUSEquity},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			got := MapAssetClass(tt.input)
			if got != tt.want {
				t.Errorf("MapAssetClass(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}

func TestLotSizeForClass(t *testing.T) {
	tests := []struct {
		class AssetClass
		want  string
	}{
		{AssetClassCrypto, "0.00000001"},
		{AssetClassCDP, "0.00000001"},
		{AssetClassLP, "0.00000001"},
		{AssetClassForex, "0.01"},
		{AssetClassRealEstate, "0.01"},
		{AssetClassPreciousMetals, "0.001"},
		{AssetClassFixedIncome, "1000"},
		{AssetClassMunicipal, "1000"},
		{AssetClassStructured, "1000"},
		{AssetClassCorporateDebt, "1000"},
		{AssetClassConsumerDebt, "1000"},
		{AssetClassPrivateEquity, "0.01"},
		{AssetClassVenture, "0.01"},
		{AssetClassPrivateCredit, "0.01"},
		{AssetClassUSEquity, "1"},
		{AssetClassIntlEquity, "1"},
		{AssetClassOptions, "1"},
		{AssetClassFutures, "1"},
		{AssetClassCommodities, "1"},
	}
	for _, tt := range tests {
		t.Run(string(tt.class), func(t *testing.T) {
			got := LotSizeForClass(tt.class)
			if got != tt.want {
				t.Errorf("LotSizeForClass(%q) = %q, want %q", tt.class, got, tt.want)
			}
		})
	}
}

func TestAssetClassToFrontendType(t *testing.T) {
	tests := []struct {
		class AssetClass
		want  string
	}{
		{AssetClassUSEquity, "stocks"},
		{AssetClassIntlEquity, "stocks"},
		{AssetClassCrypto, "crypto"},
		{AssetClassPrivateEquity, "private_equity"},
		{AssetClassVenture, "private_equity"},
		{AssetClassPrivateCredit, "private_credit"},
		{AssetClassRealEstate, "real_estate"},
		{AssetClassFixedIncome, "bonds"},
		{AssetClassMunicipal, "bonds"},
		{AssetClassForex, "forex"},
		{AssetClassCommodities, "commodity"},
		{AssetClassPreciousMetals, "commodity"},
		{AssetClassLP, "fund"},
		// Default
		{AssetClassOptions, "stocks"},
		{AssetClassFutures, "stocks"},
	}
	for _, tt := range tests {
		t.Run(string(tt.class), func(t *testing.T) {
			got := AssetClassToFrontendType(tt.class)
			if got != tt.want {
				t.Errorf("AssetClassToFrontendType(%q) = %q, want %q", tt.class, got, tt.want)
			}
		})
	}
}

func TestIsCryptoSymbol(t *testing.T) {
	tests := []struct {
		sym  string
		want bool
	}{
		{"BTC", true},
		{"BTC-USD", true},
		{"BTC/USD", true},
		{"ETH-USD", true},
		{"eth", true},
		{"SOL", true},
		{"AVAX", true},
		{"LUX", true},
		{"ZOO", true},
		{"USDC", true},
		{"USDT", true},
		{"XRP-USD", true},
		{"AAPL", false},
		{"MSFT", false},
		{"GOOGL", false},
		{"", false},
		{"SPY", false},
	}
	for _, tt := range tests {
		t.Run(tt.sym, func(t *testing.T) {
			got := IsCryptoSymbol(tt.sym)
			if got != tt.want {
				t.Errorf("IsCryptoSymbol(%q) = %v, want %v", tt.sym, got, tt.want)
			}
		})
	}
}
