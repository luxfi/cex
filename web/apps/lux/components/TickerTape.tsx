'use client'

import { useEffect, useState, useRef } from 'react'

const CEX_API = process.env.NEXT_PUBLIC_CEX_API_URL || 'http://localhost:8091'

interface Market {
  symbol: string
  base_currency: string
  asset_class: string
}

// Simulated prices for display (will be replaced by real WebSocket feed)
function useTickerPrices(markets: Market[]) {
  const [prices, setPrices] = useState<Record<string, { price: number; change: number }>>({})
  const pricesRef = useRef<Record<string, { price: number; change: number }>>({})

  useEffect(() => {
    if (markets.length === 0) return

    // Initialize with base prices
    const basePrices: Record<string, number> = {
      'LUX': 8.42, 'ZOO': 2.31, 'BTC': 98420, 'ETH': 3842, 'SOL': 187.5,
      'DOGE': 0.342, 'XRP': 2.18, 'ADA': 0.98, 'AVAX': 42.8, 'DOT': 9.42,
      'LINK': 18.7, 'MATIC': 1.12, 'UNI': 14.3, 'AAVE': 285, 'ATOM': 12.4,
      'NEAR': 7.8, 'FTM': 0.85, 'COIN': 205, 'AAPL': 228, 'MSFT': 415,
      'GOOGL': 172, 'AMZN': 198, 'NVDA': 138, 'TSLA': 342, 'META': 585,
      'XAU': 2930, 'XAG': 32.8, 'CL': 67.4, 'EUR': 1.084, 'GBP': 1.267,
    }

    const init: Record<string, { price: number; change: number }> = {}
    for (const m of markets) {
      const base = basePrices[m.base_currency] || 10
      const change = (Math.random() - 0.45) * 4 // -1.8% to +2.2%
      init[m.symbol] = { price: base * (1 + change / 100), change }
    }
    pricesRef.current = init
    setPrices({ ...init })

    // Simulate ticks
    const iv = setInterval(() => {
      const updated = { ...pricesRef.current }
      const keys = Object.keys(updated)
      // Update 3-5 random tickers each tick
      const count = 3 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count && i < keys.length; i++) {
        const key = keys[Math.floor(Math.random() * keys.length)]
        const entry = updated[key]
        const tick = entry.price * (Math.random() - 0.5) * 0.002
        entry.price += tick
        entry.change += tick / entry.price * 100
      }
      pricesRef.current = updated
      setPrices({ ...updated })
    }, 1500)

    return () => clearInterval(iv)
  }, [markets])

  return prices
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toFixed(0)
  if (price >= 10) return price.toFixed(2)
  if (price >= 1) return price.toFixed(3)
  return price.toFixed(4)
}

export function TickerTape() {
  const [markets, setMarkets] = useState<Market[]>([])
  const prices = useTickerPrices(markets)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${CEX_API}/v1/markets`)
      .then(r => r.json())
      .then((data: Market[]) => {
        // Pick a representative subset for the ticker
        const priority = ['LUX-USD', 'ZOO-USD', 'BTC-USD', 'ETH-USD', 'SOL-USD', 'XRP-USD', 'AAPL-USD', 'NVDA-USD', 'TSLA-USD', 'XAU-USD', 'EUR-USD']
        const sorted = data.sort((a, b) => {
          const ai = priority.indexOf(a.symbol)
          const bi = priority.indexOf(b.symbol)
          if (ai !== -1 && bi !== -1) return ai - bi
          if (ai !== -1) return -1
          if (bi !== -1) return 1
          return 0
        })
        setMarkets(sorted)
      })
      .catch(() => {})
  }, [])

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let animId: number
    let pos = 0
    const speed = 0.5

    const scroll = () => {
      pos += speed
      if (pos >= el.scrollWidth / 2) pos = 0
      el.scrollLeft = pos
      animId = requestAnimationFrame(scroll)
    }
    animId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animId)
  }, [markets])

  if (markets.length === 0) return null

  const items = markets.map(m => {
    const p = prices[m.symbol]
    if (!p) return null
    const up = p.change >= 0
    return (
      <div key={m.symbol} className="flex items-center gap-2 px-4 whitespace-nowrap">
        <span className="text-[#d1d4dc] text-xs font-medium">{m.base_currency}</span>
        <span className="text-[#d1d4dc] text-xs font-mono">{formatPrice(p.price)}</span>
        <span className={`text-[10px] font-mono ${up ? 'text-[#26a69a]' : 'text-[#ef5350]'}`}>
          {up ? '+' : ''}{p.change.toFixed(2)}%
        </span>
      </div>
    )
  })

  return (
    <div className="h-8 overflow-hidden" style={{ background: '#1e222d', borderBottom: '1px solid #2a2e39' }}>
      <div ref={scrollRef} className="flex items-center h-full overflow-hidden" style={{ scrollbarWidth: 'none' }}>
        {/* Duplicate for seamless scroll */}
        <div className="flex items-center shrink-0">{items}</div>
        <div className="flex items-center shrink-0">{items}</div>
      </div>
    </div>
  )
}
