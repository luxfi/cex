'use client'

import { useEffect, useRef } from 'react'
import { MarketSwitcher } from '@/components/MarketSwitcher'

export default function StocksMarketPage() {
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
          "name": "Technology",
          "originalName": "Technology",
          "symbols": [
            { "name": "NASDAQ:AAPL", "displayName": "Apple" },
            { "name": "NASDAQ:MSFT", "displayName": "Microsoft" },
            { "name": "NASDAQ:GOOGL", "displayName": "Alphabet" },
            { "name": "NASDAQ:NVDA", "displayName": "NVIDIA" },
            { "name": "NASDAQ:META", "displayName": "Meta" },
            { "name": "NASDAQ:TSLA", "displayName": "Tesla" },
            { "name": "NASDAQ:AMZN", "displayName": "Amazon" },
            { "name": "NASDAQ:NFLX", "displayName": "Netflix" }
          ]
        },
        {
          "name": "Financial",
          "originalName": "Financial",
          "symbols": [
            { "name": "NYSE:JPM", "displayName": "JPMorgan Chase" },
            { "name": "NYSE:BAC", "displayName": "Bank of America" },
            { "name": "NYSE:WFC", "displayName": "Wells Fargo" },
            { "name": "NYSE:GS", "displayName": "Goldman Sachs" },
            { "name": "NYSE:MS", "displayName": "Morgan Stanley" },
            { "name": "NYSE:C", "displayName": "Citigroup" },
            { "name": "NYSE:BLK", "displayName": "BlackRock" },
            { "name": "NYSE:V", "displayName": "Visa" }
          ]
        },
        {
          "name": "Healthcare",
          "originalName": "Healthcare",
          "symbols": [
            { "name": "NYSE:JNJ", "displayName": "Johnson & Johnson" },
            { "name": "NYSE:UNH", "displayName": "UnitedHealth" },
            { "name": "NASDAQ:MRNA", "displayName": "Moderna" },
            { "name": "NYSE:PFE", "displayName": "Pfizer" },
            { "name": "NYSE:ABT", "displayName": "Abbott Labs" },
            { "name": "NYSE:TMO", "displayName": "Thermo Fisher" },
            { "name": "NYSE:MRK", "displayName": "Merck" },
            { "name": "NASDAQ:GILD", "displayName": "Gilead Sciences" }
          ]
        },
        {
          "name": "Energy & Materials",
          "originalName": "Energy",
          "symbols": [
            { "name": "NYSE:XOM", "displayName": "Exxon Mobil" },
            { "name": "NYSE:CVX", "displayName": "Chevron" },
            { "name": "NYSE:COP", "displayName": "ConocoPhillips" },
            { "name": "NYSE:SLB", "displayName": "Schlumberger" },
            { "name": "NYSE:NEE", "displayName": "NextEra Energy" },
            { "name": "NASDAQ:ENPH", "displayName": "Enphase Energy" },
            { "name": "NYSE:FCX", "displayName": "Freeport-McMoRan" },
            { "name": "NYSE:NEM", "displayName": "Newmont" }
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
          <h1 className="text-3xl font-bold text-white mb-2">Stock Markets</h1>
          <p className="text-white/60">Real-time quotes, charts, and market data for global equities</p>
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
