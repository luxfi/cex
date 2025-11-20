'use client'

import { useEffect, useRef } from 'react'
import { MarketSwitcher } from '@/components/MarketSwitcher'

export default function FuturesMarketPage() {
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
            { "name": "CME_MINI:ES1!", "displayName": "E-mini S&P 500" },
            { "name": "CME_MINI:NQ1!", "displayName": "E-mini NASDAQ-100" },
            { "name": "CBOT:YM1!", "displayName": "E-mini Dow" },
            { "name": "COMEX:GC1!", "displayName": "Gold" },
            { "name": "COMEX:SI1!", "displayName": "Silver" },
            { "name": "NYMEX:CL1!", "displayName": "Crude Oil WTI" }
          ]
        },
        {
          "name": "Indices",
          "originalName": "Indices",
          "symbols": [
            { "name": "CME_MINI:ES1!" },
            { "name": "CME_MINI:NQ1!" },
            { "name": "CBOT:YM1!" },
            { "name": "CME:6E1!" },
            { "name": "CME:6J1!" },
            { "name": "CME:6B1!" }
          ]
        },
        {
          "name": "Commodities",
          "originalName": "Commodities",
          "symbols": [
            { "name": "COMEX:GC1!" },
            { "name": "COMEX:SI1!" },
            { "name": "COMEX:HG1!" },
            { "name": "NYMEX:CL1!" },
            { "name": "NYMEX:NG1!" },
            { "name": "NYMEX:RB1!" }
          ]
        },
        {
          "name": "Agriculture",
          "originalName": "Agriculture",
          "symbols": [
            { "name": "CBOT:ZC1!" },
            { "name": "CBOT:ZS1!" },
            { "name": "CBOT:ZW1!" },
            { "name": "ICEUS:CT1!" },
            { "name": "ICEUS:SB1!" },
            { "name": "ICEUS:KC1!" }
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
          <h1 className="text-3xl font-bold text-white mb-2">Futures Markets</h1>
          <p className="text-white/60">Real-time futures quotes for indices, commodities, and more</p>
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
