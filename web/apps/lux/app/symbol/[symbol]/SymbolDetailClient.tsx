'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface SymbolDetailClientProps {
  symbol: string
}

export default function SymbolDetailClient({ symbol }: SymbolDetailClientProps) {
  const router = useRouter()
  const symbolInfoRef = useRef<HTMLDivElement>(null)
  const advancedChartRef = useRef<HTMLDivElement>(null)
  const companyProfileRef = useRef<HTMLDivElement>(null)
  const fundamentalDataRef = useRef<HTMLDivElement>(null)
  const technicalAnalysisRef = useRef<HTMLDivElement>(null)
  const newsRef = useRef<HTMLDivElement>(null)

  // Parse exchange and ticker from symbol (format: "EXCHANGE:TICKER" or just "TICKER")
  const [exchange, ticker] = symbol.includes(':') ? symbol.split(':') : ['', symbol]
  const displayName = ticker || symbol

  useEffect(() => {
    // Symbol Info Widget
    if (symbolInfoRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: '100%',
        locale: 'en',
        colorTheme: 'dark',
        isTransparent: false,
      })
      symbolInfoRef.current.appendChild(script)
    }

    // Advanced Chart Widget
    if (advancedChartRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com',
      })
      advancedChartRef.current.appendChild(script)
    }

    // Company Profile Widget
    if (companyProfileRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: '100%',
        colorTheme: 'dark',
        isTransparent: false,
        symbol: symbol,
        locale: 'en',
      })
      companyProfileRef.current.appendChild(script)
    }

    // Fundamental Data Widget
    if (fundamentalDataRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        colorTheme: 'dark',
        isTransparent: false,
        largeChartUrl: '',
        displayMode: 'adaptive',
        width: '100%',
        height: '100%',
        symbol: symbol,
        locale: 'en',
      })
      fundamentalDataRef.current.appendChild(script)
    }

    // Technical Analysis Widget
    if (technicalAnalysisRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        interval: '15m',
        width: '100%',
        isTransparent: false,
        height: '100%',
        symbol: symbol,
        showIntervalTabs: true,
        displayMode: 'single',
        locale: 'en',
        colorTheme: 'dark',
      })
      technicalAnalysisRef.current.appendChild(script)
    }

    // News/Timeline Widget
    if (newsRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        feedMode: 'symbol',
        symbol: symbol,
        colorTheme: 'dark',
        isTransparent: false,
        displayMode: 'regular',
        width: '100%',
        height: '100%',
        locale: 'en',
      })
      newsRef.current.appendChild(script)
    }
  }, [symbol])

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{displayName}</h1>
              <p className="text-white/60">
                {exchange ? `${exchange} Exchange` : 'Symbol Details'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/trade"
                className="px-6 py-2.5 bg-cta text-cta-text rounded-lg font-semibold hover:bg-white transition-all shadow-lg"
              >
                Trade {ticker}
              </Link>
              <Link
                href="/demo"
                className="px-6 py-2.5 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-all"
              >
                Practice Trading
              </Link>
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Symbol Info - Full Width */}
          <div className="lg:col-span-2 bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={symbolInfoRef}
              className="tradingview-widget-container"
              style={{ height: '140px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>

          {/* Advanced Chart - Full Width */}
          <div className="lg:col-span-2 bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={advancedChartRef}
              className="tradingview-widget-container"
              style={{ height: '500px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
            </div>
          </div>

          {/* Company Profile - Full Width */}
          <div className="lg:col-span-2 bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={companyProfileRef}
              className="tradingview-widget-container"
              style={{ height: '400px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>

          {/* Fundamental Data - Full Width */}
          <div className="lg:col-span-2 bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={fundamentalDataRef}
              className="tradingview-widget-container"
              style={{ height: '500px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>

          {/* Technical Analysis - Half Width */}
          <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={technicalAnalysisRef}
              className="tradingview-widget-container"
              style={{ height: '425px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>

          {/* News/Timeline - Half Width */}
          <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div
              ref={newsRef}
              className="tradingview-widget-container"
              style={{ height: '425px', width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
          <Link
            href="/trade"
            className="glass-effect rounded-lg p-6 text-center hover:border-zinc-600 transition-all group"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-white group-hover:text-success transition-colors">Live Trading</div>
            <div className="text-xs text-white/60 mt-1">Full trading platform</div>
          </Link>
          <Link
            href="/markets/stocks"
            className="glass-effect rounded-lg p-6 text-center hover:border-zinc-600 transition-all group"
          >
            <div className="text-2xl mb-2">📈</div>
            <div className="font-semibold text-white group-hover:text-success transition-colors">Stock Markets</div>
            <div className="text-xs text-white/60 mt-1">Browse all stocks</div>
          </Link>
          <Link
            href="/news"
            className="glass-effect rounded-lg p-6 text-center hover:border-zinc-600 transition-all group"
          >
            <div className="text-2xl mb-2">📰</div>
            <div className="font-semibold text-white group-hover:text-success transition-colors">Market News</div>
            <div className="text-xs text-white/60 mt-1">Latest updates & events</div>
          </Link>
          <Link
            href="/signup"
            className="glass-effect rounded-lg p-6 text-center hover:border-zinc-600 transition-all group"
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold text-white group-hover:text-success transition-colors">Start Trading</div>
            <div className="text-xs text-white/60 mt-1">Create free account</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
