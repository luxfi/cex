'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, X, AlertCircle } from 'lucide-react'

interface Order {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  shares: number
  price: number
  status: 'open' | 'filled' | 'cancelled'
  timestamp: number
}

interface Position {
  symbol: string
  shares: number
  avgPrice: number
  currentPrice: number
}

export default function TradePage() {
  const chartRef = useRef<HTMLDivElement>(null)
  const symbolInfoRef = useRef<HTMLDivElement>(null)
  const [currentSymbol, setCurrentSymbol] = useState('NASDAQ:AAPL')
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy')
  const [shares, setShares] = useState('1')
  const [limitPrice, setLimitPrice] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [accountBalance] = useState(100000)
  const [activeTab, setActiveTab] = useState<'order' | 'positions' | 'history'>('order')
  const [showDemoBanner, setShowDemoBanner] = useState(true)

  // Listen for symbol changes from TradingView
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.name === 'tv-widget-symbol-changed') {
        const newSymbol = event.data.data
        setCurrentSymbol(newSymbol)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    // Load TradingView Advanced Chart
    if (chartRef.current) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: currentSymbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        allow_symbol_change: true,
        calendar: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: true,
        hide_volume: false,
        support_host: 'https://www.tradingview.com',
        studies: ['STD;SMA', 'STD;EMA', 'STD;MACD', 'STD;RSI', 'STD;Volume'],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
        container_id: 'tradingview_chart'
      })
      chartRef.current.appendChild(script)
    }
  }, [])

  useEffect(() => {
    // Load Symbol Info Widget for real-time price
    if (symbolInfoRef.current) {
      // Clear previous widget
      symbolInfoRef.current.innerHTML = ''

      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbol: currentSymbol,
        width: '100%',
        locale: 'en',
        colorTheme: 'dark',
        isTransparent: true,
      })
      symbolInfoRef.current.appendChild(script)
    }
  }, [currentSymbol])

  const handlePlaceOrder = () => {
    // Get estimated price (in production, this would come from real-time data)
    const estimatedPrice = orderType === 'limit' ? parseFloat(limitPrice) : 100 + Math.random() * 50
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      symbol: currentSymbol,
      type: orderSide,
      shares: parseInt(shares) || 0,
      price: estimatedPrice,
      status: orderType === 'market' ? 'filled' : 'open',
      timestamp: Date.now()
    }

    setOrders([newOrder, ...orders])

    // Save order to localStorage
    const storedOrders = JSON.parse(localStorage.getItem('lux_orders') || '[]')
    storedOrders.push({
      id: newOrder.id,
      symbol: currentSymbol,
      type: orderSide,
      quantity: newOrder.shares,
      price: newOrder.price,
      total: newOrder.shares * newOrder.price,
      timestamp: new Date().toISOString(),
      status: 'completed'
    })
    localStorage.setItem('lux_orders', JSON.stringify(storedOrders))

    // If market order, update positions and portfolio immediately
    if (orderType === 'market') {
      updatePositions(newOrder)
      updatePortfolio(newOrder, estimatedPrice)
    }

    // Reset form
    setShares('1')
    setLimitPrice('')
  }

  const updatePortfolio = (order: Order, price: number) => {
    const portfolio = JSON.parse(localStorage.getItem('lux_portfolio') || '{"cash": 100000, "holdings": []}')
    const total = order.shares * price

    if (order.type === 'buy') {
      // Deduct cash
      portfolio.cash -= total

      // Update holdings
      const existingHolding = portfolio.holdings.find((h: any) => h.symbol === order.symbol)
      if (existingHolding) {
        const newQuantity = existingHolding.quantity + order.shares
        const newAveragePrice = ((existingHolding.averagePrice * existingHolding.quantity) + (price * order.shares)) / newQuantity
        existingHolding.quantity = newQuantity
        existingHolding.averagePrice = newAveragePrice
        existingHolding.currentPrice = price
      } else {
        portfolio.holdings.push({
          symbol: order.symbol,
          quantity: order.shares,
          averagePrice: price,
          currentPrice: price
        })
      }
    } else {
      // Add cash
      portfolio.cash += total

      // Update holdings
      const existingHolding = portfolio.holdings.find((h: any) => h.symbol === order.symbol)
      if (existingHolding) {
        existingHolding.quantity -= order.shares
        existingHolding.currentPrice = price
        
        // Remove holding if quantity is 0
        if (existingHolding.quantity === 0) {
          portfolio.holdings = portfolio.holdings.filter((h: any) => h.symbol !== order.symbol)
        }
      }
    }

    localStorage.setItem('lux_portfolio', JSON.stringify(portfolio))
  }

  const updatePositions = (order: Order) => {
    const existingPos = positions.find(p => p.symbol === order.symbol)

    if (existingPos) {
      const newShares = order.type === 'buy'
        ? existingPos.shares + order.shares
        : existingPos.shares - order.shares

      if (newShares === 0) {
        setPositions(positions.filter(p => p.symbol !== order.symbol))
      } else {
        setPositions(positions.map(p =>
          p.symbol === order.symbol
            ? { ...p, shares: newShares }
            : p
        ))
      }
    } else if (order.type === 'buy') {
      setPositions([...positions, {
        symbol: order.symbol,
        shares: order.shares,
        avgPrice: order.price,
        currentPrice: order.price
      }])
    }
  }

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    ))
  }

  const getTickerFromSymbol = (symbol: string) => {
    return symbol.split(':')[1] || symbol
  }

  return (
    <div className="bg-primary absolute inset-0 top-[7rem] flex flex-col">
      {/* Demo Account Banner */}
      {showDemoBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-500 relative z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 flex-1">
              <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  Demo Trading Account - No real money at risk
                </p>
                <p className="text-blue-100 text-xs">
                  Contact us to enable real trading and access live markets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:support@lux.exchange?subject=Enable Real Trading Account&body=Hi, I'd like to enable real trading on my Lux Exchange account."
                className="px-4 py-1.5 bg-white text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Enable Real Trading
              </a>
              <button
                onClick={() => setShowDemoBanner(false)}
                className="text-white hover:text-blue-200 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trading Interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chart - Left Side */}
        <div className="flex-1 relative">
          <div
            ref={chartRef}
            className="tradingview-widget-container w-full h-full"
          >
            <div
              id="tradingview_chart"
              className="tradingview-widget-container__widget w-full h-full"
            />
          </div>
        </div>

        {/* Trading Panel - Right Side */}
        <div className="w-96 bg-black/50 border-l border-white/10 flex flex-col overflow-hidden">
          {/* Symbol Info */}
          <div className="p-4 border-b border-white/10">
            <div
              ref={symbolInfoRef}
              className="tradingview-widget-container"
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('order')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'order'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Trade
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'positions'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Positions
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Orders
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'order' && (
              <div className="p-4 space-y-4">
                {/* Account Balance */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Buying Power (Demo)</div>
                  <div className="text-lg font-semibold text-white">
                    ${accountBalance.toLocaleString()}
                  </div>
                </div>

                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderSide('buy')}
                    className={`py-2.5 rounded-lg font-semibold transition-all ${
                      orderSide === 'buy'
                        ? 'bg-buy text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderSide('sell')}
                    className={`py-2.5 rounded-lg font-semibold transition-all ${
                      orderSide === 'sell'
                        ? 'bg-sell text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                {/* Order Type */}
                <div>
                  <label className="text-xs text-white/60 mb-2 block">Order Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrderType('market')}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        orderType === 'market'
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType('limit')}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        orderType === 'limit'
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {/* Shares */}
                <div>
                  <label className="text-xs text-white/60 mb-2 block">Shares</label>
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                    placeholder="0"
                  />
                </div>

                {/* Limit Price */}
                {orderType === 'limit' && (
                  <div>
                    <label className="text-xs text-white/60 mb-2 block">Limit Price</label>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!shares || (orderType === 'limit' && !limitPrice)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    orderSide === 'buy'
                      ? 'bg-buy hover:bg-buy/90 text-white'
                      : 'bg-sell hover:bg-sell/90 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {orderSide === 'buy' ? 'Buy' : 'Sell'} {getTickerFromSymbol(currentSymbol)}
                </button>
              </div>
            )}

            {activeTab === 'positions' && (
              <div className="p-4">
                {positions.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <p className="text-sm">No open positions</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {positions.map((position) => {
                      const pl = (position.currentPrice - position.avgPrice) * position.shares
                      const plPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100

                      return (
                        <div key={position.symbol} className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-white">
                              {getTickerFromSymbol(position.symbol)}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${pl >= 0 ? 'text-buy' : 'text-sell'}`}>
                              {pl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-white/60">Shares</div>
                              <div className="text-white font-medium">{position.shares}</div>
                            </div>
                            <div>
                              <div className="text-white/60">Avg Price</div>
                              <div className="text-white font-medium">${position.avgPrice.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <p className="text-sm">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-white">
                              {getTickerFromSymbol(order.symbol)}
                            </div>
                            <div className="text-xs text-white/60">
                              {new Date(order.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            order.status === 'filled'
                              ? 'bg-zinc-800 text-buy'
                              : order.status === 'cancelled'
                              ? 'bg-white/10 text-white/60'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-white/60">Side</div>
                            <div className={`font-medium ${order.type === 'buy' ? 'text-buy' : 'text-sell'}`}>
                              {order.type.toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <div className="text-white/60">Shares</div>
                            <div className="text-white font-medium">{order.shares}</div>
                          </div>
                          <div>
                            <div className="text-white/60">Price</div>
                            <div className="text-white font-medium">
                              {order.price > 0 ? `$${order.price.toFixed(2)}` : 'Market'}
                            </div>
                          </div>
                        </div>
                        {order.status === 'open' && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="w-full mt-2 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-white/80 rounded transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
