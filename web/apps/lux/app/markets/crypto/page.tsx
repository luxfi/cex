'use client'

import { useEffect, useRef } from 'react'
import { MarketSwitcher } from '@/components/MarketSwitcher'

export default function CryptoMarketPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "symbolsGroups": [
        {
          "name": "Overview",
          "originalName": "Overview",
          "symbols": [
            { "name": "CRYPTO:BTCUSD", "displayName": "Bitcoin" },
            { "name": "CRYPTO:ETHUSD", "displayName": "Ethereum" },
            { "name": "BINANCE:BNBUSD", "displayName": "BNB" },
            { "name": "COINBASE:SOLUSD", "displayName": "Solana" },
            { "name": "COINBASE:XRPUSD", "displayName": "XRP" },
            { "name": "COINBASE:ADAUSD", "displayName": "Cardano" }
          ]
        },
        {
          "name": "Top Gainers",
          "originalName": "Top Gainers",
          "symbols": [
            { "name": "BINANCE:AVAXUSD", "displayName": "Avalanche" },
            { "name": "COINBASE:DOGEUSD", "displayName": "Dogecoin" },
            { "name": "BINANCE:MATICUSD", "displayName": "Polygon" },
            { "name": "COINBASE:LINKUSD", "displayName": "Chainlink" },
            { "name": "BINANCE:DOTUSD", "displayName": "Polkadot" },
            { "name": "COINBASE:SHIBUSD", "displayName": "Shiba Inu" }
          ]
        },
        {
          "name": "DeFi",
          "originalName": "DeFi",
          "symbols": [
            { "name": "COINBASE:UNIUSD", "displayName": "Uniswap" },
            { "name": "COINBASE:AAVEUSD", "displayName": "Aave" },
            { "name": "BINANCE:CAKEUSD", "displayName": "PancakeSwap" },
            { "name": "COINBASE:COMPUSD", "displayName": "Compound" },
            { "name": "COINBASE:MKRUSD", "displayName": "Maker" },
            { "name": "BINANCE:SNXUSD", "displayName": "Synthetix" }
          ]
        },
        {
          "name": "Layer 1",
          "originalName": "Layer 1",
          "symbols": [
            { "name": "BINANCE:NEARUSD", "displayName": "NEAR Protocol" },
            { "name": "BINANCE:ATOMUSD", "displayName": "Cosmos" },
            { "name": "BINANCE:ALGOUSD", "displayName": "Algorand" },
            { "name": "COINBASE:APTUSD", "displayName": "Aptos" },
            { "name": "BINANCE:FTUSD", "displayName": "Fantom" },
            { "name": "BINANCE:ICPUSD", "displayName": "Internet Computer" }
          ]
        }
      ],
      "showSymbolLogo": true,
      "isTransparent": false,
      "colorTheme": "dark",
      "locale": "en",
      "backgroundColor": "#0a0f14"
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      <MarketSwitcher />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Cryptocurrency Markets</h1>
          <p className="text-white/60">Real-time crypto prices and market data for Bitcoin, Ethereum, and altcoins</p>
        </div>

        <div className="glass-effect rounded-xl overflow-hidden border border-white/10" style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}>
          <div
            ref={containerRef}
            className="tradingview-widget-container h-full"
            style={{ height: '100%', width: '100%' }}
          >
            <div className="tradingview-widget-container__widget h-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
