'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const markets = [
  { id: 'stocks', name: 'Stocks', icon: '📈', path: '/markets/stocks' },
  { id: 'crypto', name: 'Crypto', icon: '₿', path: '/markets/crypto' },
  { id: 'forex', name: 'Forex', icon: '💱', path: '/markets/forex' },
  { id: 'futures', name: 'Futures', icon: '📊', path: '/markets/futures' },
  { id: 'indices', name: 'Indices', icon: '📉', path: '/markets/indices' },
]

export function MarketSwitcher() {
  const pathname = usePathname()

  return (
    <div className="bg-primary/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60 font-medium">Markets:</span>
            <div className="flex items-center gap-2">
              {markets.map((market) => {
                const isActive = pathname === market.path
                return (
                  <Link
                    key={market.id}
                    href={market.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-success text-white shadow-lg shadow-success/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="mr-1.5">{market.icon}</span>
                    {market.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="text-xs text-white/50">
            Real-time market data powered by TradingView
          </div>
        </div>
      </div>
    </div>
  )
}
