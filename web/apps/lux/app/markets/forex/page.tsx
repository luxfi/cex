'use client'

import { useEffect, useRef } from 'react'
import { MarketSwitcher } from '@/components/MarketSwitcher'

export default function ForexMarketPage() {
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
            { "name": "FX:EURUSD", "displayName": "EUR/USD" },
            { "name": "FX:GBPUSD", "displayName": "GBP/USD" },
            { "name": "FX:USDJPY", "displayName": "USD/JPY" },
            { "name": "FX:USDCHF", "displayName": "USD/CHF" },
            { "name": "FX:AUDUSD", "displayName": "AUD/USD" },
            { "name": "FX:USDCAD", "displayName": "USD/CAD" }
          ]
        },
        {
          "name": "Majors",
          "originalName": "Majors",
          "symbols": [
            { "name": "FX:EURUSD" },
            { "name": "FX:USDJPY" },
            { "name": "FX:GBPUSD" },
            { "name": "FX:USDCHF" },
            { "name": "FX:USDCAD" },
            { "name": "FX:AUDUSD" },
            { "name": "FX:NZDUSD" }
          ]
        },
        {
          "name": "Crosses",
          "originalName": "Crosses",
          "symbols": [
            { "name": "FX:EURGBP" },
            { "name": "FX:EURJPY" },
            { "name": "FX:GBPJPY" },
            { "name": "FX:EURCHF" },
            { "name": "FX:EURCAD" },
            { "name": "FX:EURAUD" }
          ]
        },
        {
          "name": "Exotic",
          "originalName": "Exotic",
          "symbols": [
            { "name": "FX:USDMXN" },
            { "name": "FX:USDZAR" },
            { "name": "FX:USDTRY" },
            { "name": "FX:USDBRL" },
            { "name": "FX:USDINR" },
            { "name": "FX:USDCNY" }
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
          <h1 className="text-3xl font-bold text-white mb-2">Forex Markets</h1>
          <p className="text-white/60">Real-time currency exchange rates and forex trading data</p>
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
