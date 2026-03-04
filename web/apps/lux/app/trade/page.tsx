'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Loader2, Search, X, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'

const NativeChart = dynamic(() => import('../../components/NativeChart'), { ssr: false })

import { CEX_API_URL } from '../../lib/branding'
const CEX_API = CEX_API_URL

function getSandboxAccountId(): string {
  let id = localStorage.getItem('lux_ats_account_id')
  if (!id) {
    id = `sandbox-${crypto.randomUUID().slice(0, 8)}`
    localStorage.setItem('lux_ats_account_id', id)
  }
  return id
}

interface Market {
  symbol: string
  base_currency: string
  quote_currency: string
  asset_class: string
  status: string
  tradable: boolean
}

interface Order {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  type: string
  qty: string
  limit_price?: string
  status: string
  filled_avg_price?: string
  created_at: string
}

interface BookLevel { price: number; qty: number; order_count: number }
interface OrderBook { symbol: string; bids: BookLevel[]; asks: BookLevel[] }

const NATIVE_SYMBOLS = new Set(['LUX-USD', 'ZOO-USD'])

function toTVSymbol(symbol: string, assetClass: string): string {
  const base = symbol.replace('-USD', '')
  const overrides: Record<string, string> = {
    'XAU-USD': 'OANDA:XAUUSD', 'XAG-USD': 'OANDA:XAGUSD',
    'XPT-USD': 'TVC:PLATINUM', 'XPD-USD': 'TVC:PALLADIUM',
    'CL-USD': 'NYMEX:CL1!', 'NG-USD': 'NYMEX:NG1!', 'HG-USD': 'COMEX:HG1!',
    'EUR-USD': 'FX:EURUSD', 'GBP-USD': 'FX:GBPUSD', 'JPY-USD': 'FX_IDC:USDJPY',
    'CHF-USD': 'FX:USDCHF', 'AUD-USD': 'FX:AUDUSD', 'CAD-USD': 'FX:USDCAD',
  }
  if (overrides[symbol]) return overrides[symbol]
  if (assetClass === 'us_equity') return `NASDAQ:${base}`
  if (assetClass === 'crypto') return `COINBASE:${base}USD`
  return `${base}USD`
}

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'us_equity', label: 'Stocks' },
  { key: 'precious_metals', label: 'Metals' },
  { key: 'commodities', label: 'Commodities' },
  { key: 'forex', label: 'Forex' },
]

async function apiCall<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${CEX_API}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...opts?.headers },
  })
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
  return res.json()
}

export default function TradePage() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [markets, setMarkets] = useState<Market[]>([])
  const [currentSymbol, setCurrentSymbol] = useState('LUX-USD')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [showMarketList, setShowMarketList] = useState(false)

  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit')
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy')
  const [qty, setQty] = useState('1')
  const [limitPrice, setLimitPrice] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null)
  const [showOrders, setShowOrders] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const accountId = useRef('')

  const currentMarket = useMemo(
    () => markets.find((m) => m.symbol === currentSymbol) || null,
    [markets, currentSymbol]
  )
  const isNative = NATIVE_SYMBOLS.has(currentSymbol)

  useEffect(() => {
    apiCall<Market[]>('/v1/markets').then((d) => setMarkets(d || [])).catch(() => {})
  }, [])

  const filteredMarkets = useMemo(() => {
    let list = markets.filter((m) => m.status === 'active')
    if (category !== 'all') list = list.filter((m) => m.asset_class === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((m) => m.symbol.toLowerCase().includes(q) || m.base_currency.toLowerCase().includes(q))
    }
    return list
  }, [markets, category, search])

  const fetchOrders = useCallback(async () => {
    if (!accountId.current) return
    try { setOrders((await apiCall<Order[]>(`/v1/accounts/${accountId.current}/orders`)) || []) } catch {}
  }, [])

  const fetchOrderBook = useCallback(async () => {
    try { setOrderBook(await apiCall<OrderBook>(`/v1/markets/${currentSymbol}/book`)) } catch { setOrderBook(null) }
  }, [currentSymbol])

  useEffect(() => {
    accountId.current = getSandboxAccountId()
    apiCall(`/v1/accounts/${accountId.current}/register`, {
      method: 'POST',
      body: JSON.stringify({ jurisdiction: 'US', country: 'US', client_type: 'individual', kyc_level: 2, aml_cleared: true }),
    }).catch(() => {})
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    fetchOrderBook()
    const iv = setInterval(fetchOrderBook, 2000)
    return () => clearInterval(iv)
  }, [fetchOrderBook])

  // TradingView widget
  useEffect(() => {
    if (isNative || !chartRef.current || !currentMarket) return
    chartRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: toTVSymbol(currentSymbol, currentMarket.asset_class),
      interval: 'D', timezone: 'Etc/UTC', theme: 'dark', style: '1', locale: 'en',
      allow_symbol_change: false, calendar: false,
      hide_top_toolbar: false, hide_legend: false, save_image: true, hide_volume: false,
      support_host: 'https://www.tradingview.com',
      studies: ['STD;SMA', 'STD;EMA', 'STD;RSI', 'STD;Volume'],
      container_id: 'tradingview_chart',
      backgroundColor: 'rgba(0, 0, 0, 1)',
    })
    chartRef.current.appendChild(script)
  }, [currentSymbol, isNative, currentMarket])

  const handlePlaceOrder = async (side: 'buy' | 'sell') => {
    setOrderSide(side)
    setError('')
    setSubmitting(true)
    try {
      const body: Record<string, string> = {
        symbol: currentSymbol, side, type: orderType,
        time_in_force: orderType === 'market' ? 'ioc' : 'gtc', qty,
      }
      if (orderType === 'limit' && limitPrice) body.limit_price = limitPrice
      await apiCall(`/v1/accounts/${accountId.current}/orders`, {
        method: 'POST', body: JSON.stringify(body),
      })
      setQty('1')
      setLimitPrice('')
      fetchOrders()
      fetchOrderBook()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Order failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    try {
      await apiCall(`/v1/accounts/${accountId.current}/orders/${orderId}`, { method: 'DELETE' })
      fetchOrders()
    } catch {}
  }

  const selectMarket = (sym: string) => { setCurrentSymbol(sym); setShowMarketList(false); setSearch('') }
  const fmtPrice = (p: number) => (p / 1e8).toFixed(2)
  const fmtQty = (q: number) => (q / 1e8).toFixed(4)
  const label = currentMarket ? `${currentMarket.base_currency}/${currentMarket.quote_currency}` : currentSymbol
  const hasBook = orderBook && ((orderBook.bids?.length ?? 0) > 0 || (orderBook.asks?.length ?? 0) > 0)
  const openOrders = orders.filter(o => o.status === 'open' || o.status === 'new')

  // border shorthand
  const bdr = 'border-white/[0.06]'

  return (
    <div className="absolute inset-0 top-[6rem] flex flex-col bg-black">
      {/* Market Selector Bar */}
      <div className={`flex items-center px-2 py-1 gap-1 bg-black border-b ${bdr}`}>
        <button
          onClick={() => setShowMarketList(!showMarketList)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/5 transition-colors"
        >
          <span className="text-white font-semibold text-sm">{label}</span>
          <span className="text-white/30 text-[10px]">{currentMarket?.asset_class?.replace(/_/g, ' ')}</span>
          <ChevronDown size={12} className={`text-white/30 transition-transform ${showMarketList ? 'rotate-180' : ''}`} />
        </button>

        <div className="w-px h-4 mx-1 bg-white/[0.06]" />

        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCategory(c.key); setShowMarketList(true) }}
            className={`px-2 py-0.5 rounded text-xs transition-colors ${
              category === c.key && showMarketList ? 'text-white bg-white/10' : 'text-white/30 hover:text-white/60'
            }`}
          >
            {c.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          Sandbox
        </div>
      </div>

      {/* Market List Dropdown */}
      {showMarketList && (
        <div className={`absolute top-[calc(6rem+2.25rem)] left-0 right-0 z-50 max-h-80 overflow-hidden flex flex-col bg-black border-b ${bdr}`}>
          <div className={`px-3 py-2 flex items-center gap-2 border-b ${bdr}`}>
            <Search size={13} className="text-white/30" />
            <input
              autoFocus type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search markets..." className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-white/20"
            />
            <button onClick={() => setShowMarketList(false)} className="text-white/30 hover:text-white/60"><X size={13} /></button>
          </div>
          <div className="overflow-y-auto flex-1">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {filteredMarkets.map((m) => (
                <button
                  key={m.symbol} onClick={() => selectMarket(m.symbol)}
                  className={`px-3 py-2 text-left transition-colors border-b border-r ${bdr} ${
                    m.symbol === currentSymbol ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="text-white text-xs font-medium">{m.base_currency}/{m.quote_currency}</div>
                  <div className="text-white/20 text-[9px]">{m.asset_class.replace(/_/g, ' ')}</div>
                </button>
              ))}
            </div>
            {filteredMarkets.length === 0 && <div className="text-center py-6 text-white/30 text-xs">No markets found</div>}
          </div>
        </div>
      )}

      {/* Main content: chart + right panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chart area */}
        <div className="flex-1 relative bg-black">
          {isNative ? (
            <NativeChart symbol={currentSymbol} cexApiUrl={CEX_API} />
          ) : (
            <div ref={chartRef} className="tradingview-widget-container w-full h-full">
              <div id="tradingview_chart" className="tradingview-widget-container__widget w-full h-full" />
            </div>
          )}
        </div>

        {/* Right Panel: Order Book + Trade Entry */}
        <div className={`w-[280px] flex flex-col overflow-hidden bg-black border-l ${bdr}`}>

          {/* Order Book */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className={`flex items-center justify-between px-3 py-2 border-b ${bdr}`}>
              <span className="text-white/40 text-[11px] font-medium">Order Book</span>
              {openOrders.length > 0 && (
                <button onClick={() => setShowOrders(!showOrders)} className="text-[10px] text-white/50 hover:text-white/80 hover:underline">
                  {openOrders.length} open
                </button>
              )}
            </div>

            {/* Column headers */}
            <div className={`grid grid-cols-3 px-3 py-1 text-[10px] text-white/30 border-b ${bdr}`}>
              <div>Price(USD)</div>
              <div className="text-right">Size</div>
              <div className="text-right">Total</div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!hasBook ? (
                <div className="flex flex-col items-center justify-center h-full text-white/30 text-[11px] gap-1">
                  <span>No orders</span>
                  <span className="text-[10px] text-white/15">Place limit orders to build depth</span>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Asks (reversed - lowest at bottom) */}
                  <div className="flex-1 flex flex-col justify-end">
                    {[...(orderBook?.asks || [])].reverse().slice(0, 12).map((l, i) => {
                      const maxQty = Math.max(...(orderBook?.asks || []).map(a => a.qty), 1)
                      const pct = (l.qty / maxQty) * 100
                      return (
                        <div key={i} className="grid grid-cols-3 px-3 py-[2px] text-[11px] relative">
                          <div className="absolute inset-0 right-0" style={{ background: 'rgba(255,255,255,0.03)', width: `${pct}%`, marginLeft: 'auto' }} />
                          <div className="text-white/40 relative z-10 font-mono">{fmtPrice(l.price)}</div>
                          <div className="text-right text-white/60 relative z-10 font-mono">{fmtQty(l.qty)}</div>
                          <div className="text-right text-white/20 relative z-10 font-mono">{l.order_count}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Spread */}
                  {(orderBook?.asks?.length ?? 0) > 0 && (orderBook?.bids?.length ?? 0) > 0 && (
                    <div className={`px-3 py-1.5 text-center border-y ${bdr}`}>
                      <span className="text-white text-[12px] font-mono font-semibold">${fmtPrice(orderBook!.asks![0].price)}</span>
                      <span className="text-white/30 text-[10px] ml-2">Spread: ${fmtPrice(orderBook!.asks![0].price - orderBook!.bids![0].price)}</span>
                    </div>
                  )}

                  {/* Bids */}
                  <div className="flex-1">
                    {(orderBook?.bids || []).slice(0, 12).map((l, i) => {
                      const maxQty = Math.max(...(orderBook?.bids || []).map(b => b.qty), 1)
                      const pct = (l.qty / maxQty) * 100
                      return (
                        <div key={i} className="grid grid-cols-3 px-3 py-[2px] text-[11px] relative">
                          <div className="absolute inset-0 right-0" style={{ background: 'rgba(255,255,255,0.04)', width: `${pct}%`, marginLeft: 'auto' }} />
                          <div className="text-white/60 relative z-10 font-mono">{fmtPrice(l.price)}</div>
                          <div className="text-right text-white/60 relative z-10 font-mono">{fmtQty(l.qty)}</div>
                          <div className="text-right text-white/20 relative z-10 font-mono">{l.order_count}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Open Orders (collapsible) */}
          {showOrders && openOrders.length > 0 && (
            <div className={`max-h-32 overflow-y-auto border-t ${bdr}`}>
              {openOrders.map((o) => (
                <div key={o.id} className={`flex items-center justify-between px-3 py-1.5 text-[10px] border-b ${bdr}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={o.side === 'buy' ? 'text-white/70' : 'text-white/40'}>{o.side.toUpperCase()}</span>
                    <span className="text-white/60">{o.qty}</span>
                    <span className="text-white/20">@</span>
                    <span className="text-white/60">${o.limit_price || 'MKT'}</span>
                  </div>
                  <button onClick={() => handleCancelOrder(o.id)} className="text-white/20 hover:text-white/60">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Trade Entry — compact, always visible at bottom */}
          <div className={`px-3 py-2.5 space-y-2 border-t ${bdr}`}>
            {/* Type toggle */}
            <div className="flex rounded overflow-hidden border border-white/[0.08]">
              {(['limit', 'market'] as const).map((t) => (
                <button key={t} onClick={() => setOrderType(t)}
                  className={`flex-1 py-1 text-[11px] font-medium transition-colors ${
                    orderType === t ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                  }`}
                >{t.charAt(0).toUpperCase() + t.slice(1)}</button>
              ))}
            </div>

            {/* Price input (limit only) */}
            {orderType === 'limit' && (
              <div>
                <label className="text-[10px] text-white/30 mb-1 block">Price</label>
                <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded text-xs text-white font-mono outline-none bg-white/[0.03] border border-white/[0.08] focus:border-white/20"
                  placeholder="0.00" step="0.01" />
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-[10px] text-white/30 mb-1 block">Amount</label>
              <input type="number" value={qty} onChange={(e) => setQty(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded text-xs text-white font-mono outline-none bg-white/[0.03] border border-white/[0.08] focus:border-white/20"
                placeholder="0" min="0" step="0.01" />
            </div>

            {error && <div className="text-white/60 text-[10px] bg-white/5 rounded px-2 py-1">{error}</div>}

            {/* Buy / Sell buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePlaceOrder('buy')}
                disabled={submitting || !qty || (orderType === 'limit' && !limitPrice)}
                className="py-2 rounded text-xs font-semibold text-black bg-white hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                {submitting && orderSide === 'buy' && <Loader2 size={12} className="animate-spin" />}
                Buy
              </button>
              <button
                onClick={() => handlePlaceOrder('sell')}
                disabled={submitting || !qty || (orderType === 'limit' && !limitPrice)}
                className="py-2 rounded text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 border border-white/[0.08]"
              >
                {submitting && orderSide === 'sell' && <Loader2 size={12} className="animate-spin" />}
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
