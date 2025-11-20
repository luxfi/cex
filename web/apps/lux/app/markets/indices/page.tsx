'use client'

import { useEffect, useRef } from 'react'
import { MarketSwitcher } from '@/components/MarketSwitcher'

export default function IndicesMarketPage() {
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
            { "name": "FOREXCOM:SPXUSD", "displayName": "S&P 500" },
            { "name": "FOREXCOM:NSXUSD", "displayName": "US 100 Cash CFD" },
            { "name": "FOREXCOM:DJI", "displayName": "Dow 30" },
            { "name": "INDEX:NKY", "displayName": "Nikkei 225" },
            { "name": "INDEX:DEU40", "displayName": "DAX Index" },
            { "name": "FOREXCOM:UKXGBP", "displayName": "FTSE 100" }
          ]
        },
        {
          "name": "America",
          "originalName": "America",
          "symbols": [
            { "name": "FOREXCOM:SPXUSD" },
            { "name": "FOREXCOM:NSXUSD" },
            { "name": "FOREXCOM:DJI" },
            { "name": "INDEX:RUT" },
            { "name": "SP:SPX" },
            { "name": "NASDAQ:NDX" }
          ]
        },
        {
          "name": "Europe",
          "originalName": "Europe",
          "symbols": [
            { "name": "INDEX:DEU40" },
            { "name": "FOREXCOM:UKXGBP" },
            { "name": "INDEX:CAC40" },
            { "name": "INDEX:SX5E" },
            { "name": "INDEX:FTSEMIB" },
            { "name": "INDEX:IBEX35" }
          ]
        },
        {
          "name": "Asia",
          "originalName": "Asia",
          "symbols": [
            { "name": "INDEX:NKY" },
            { "name": "INDEX:HSI" },
            { "name": "INDEX:SSEC" },
            { "name": "INDEX:SHSZ300" },
            { "name": "INDEX:STI" },
            { "name": "INDEX:KOSPI" }
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
          <h1 className="text-3xl font-bold text-white mb-2">Global Indices</h1>
          <p className="text-white/60">Real-time market data for major stock indices worldwide</p>
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
