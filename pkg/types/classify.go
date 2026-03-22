package types

import "strings"

// MapAssetClass maps a provider-reported asset class string to the
// canonical AssetClass type. Unknown classes default to US equity.
func MapAssetClass(class string) AssetClass {
	switch strings.ToLower(class) {
	case "us_equity":
		return AssetClassUSEquity
	case "intl_equity":
		return AssetClassIntlEquity
	case "crypto":
		return AssetClassCrypto
	case "forex", "fx":
		return AssetClassForex
	case "options":
		return AssetClassOptions
	case "futures":
		return AssetClassFutures
	case "fixed_income", "bond", "bonds", "treasury", "treasuries":
		return AssetClassFixedIncome
	case "municipal", "muni":
		return AssetClassMunicipal
	case "structured", "abs", "mbs", "cdo", "clo":
		return AssetClassStructured
	case "corporate_debt", "corporate_loan":
		return AssetClassCorporateDebt
	case "consumer_debt", "personal_loan":
		return AssetClassConsumerDebt
	case "real_estate", "reit":
		return AssetClassRealEstate
	case "commodities", "commodity":
		return AssetClassCommodities
	case "precious_metals", "gold", "silver", "platinum", "palladium":
		return AssetClassPreciousMetals
	case "private_equity", "pe":
		return AssetClassPrivateEquity
	case "venture", "vc":
		return AssetClassVenture
	case "private_credit":
		return AssetClassPrivateCredit
	case "cdp":
		return AssetClassCDP
	case "lp":
		return AssetClassLP
	default:
		return AssetClassUSEquity
	}
}

// LotSizeForClass returns the standard minimum lot size for an asset class.
func LotSizeForClass(class AssetClass) string {
	switch class {
	case AssetClassCrypto, AssetClassCDP, AssetClassLP:
		return "0.00000001"
	case AssetClassForex:
		return "0.01"
	case AssetClassRealEstate:
		return "0.01"
	case AssetClassPreciousMetals:
		return "0.001"
	case AssetClassFixedIncome, AssetClassMunicipal, AssetClassStructured,
		AssetClassCorporateDebt, AssetClassConsumerDebt:
		return "1000"
	case AssetClassPrivateEquity, AssetClassVenture, AssetClassPrivateCredit:
		return "0.01"
	default:
		return "1"
	}
}

// AssetClassToFrontendType maps an AssetClass to the frontend's expected
// type string (stocks, crypto, private_equity, bonds, etc.).
func AssetClassToFrontendType(class AssetClass) string {
	switch class {
	case AssetClassUSEquity, AssetClassIntlEquity:
		return "stocks"
	case AssetClassCrypto:
		return "crypto"
	case AssetClassPrivateEquity, AssetClassVenture:
		return "private_equity"
	case AssetClassPrivateCredit:
		return "private_credit"
	case AssetClassRealEstate:
		return "real_estate"
	case AssetClassFixedIncome, AssetClassMunicipal:
		return "bonds"
	case AssetClassForex:
		return "forex"
	case AssetClassCommodities, AssetClassPreciousMetals:
		return "commodity"
	case AssetClassLP:
		return "fund"
	default:
		return "stocks"
	}
}

// IsCryptoSymbol returns true if the symbol looks like a crypto pair
// (e.g., "BTC-USD", "ETH/USD", "BTC").
func IsCryptoSymbol(sym string) bool {
	cryptoBases := map[string]bool{
		"BTC": true, "ETH": true, "SOL": true, "AVAX": true, "LUX": true,
		"ZOO": true, "USDC": true, "USDT": true, "DOGE": true, "ADA": true,
		"DOT": true, "MATIC": true, "LINK": true, "UNI": true, "AAVE": true,
		"XRP": true, "LTC": true, "BCH": true, "ATOM": true, "ALGO": true,
	}
	base := strings.ToUpper(sym)
	if i := strings.IndexAny(base, "-/"); i > 0 {
		base = base[:i]
	}
	return cryptoBases[base]
}
