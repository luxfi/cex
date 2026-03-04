'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { CHART_WATERMARK } from '../lib/branding'
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
  ColorType,
} from 'lightweight-charts'

const colors = {
  up: '#fff',
  down: '#666',
  vol: 'rgba(255, 255, 255, 0.08)',
  volDown: 'rgba(255, 255, 255, 0.04)',
  sma: '#888',
  ema: '#555',
  grid: 'rgba(255, 255, 255, 0.04)',
  crosshair: 'rgba(255, 255, 255, 0.2)',
  text: 'rgba(255, 255, 255, 0.4)',
  border: 'rgba(255, 255, 255, 0.08)',
  bg: '#000',
  toolbarBg: '#000',
  toolbarBorder: 'rgba(255, 255, 255, 0.08)',
}

interface NativeChartProps {
  symbol: string
  cexApiUrl: string
}

interface OHLCV {
  time: Time
  open: number
  high: number
  low: number
  close: number
  volume: number
}

function generateOHLCV(basePrice: number, count: number, intervalMins: number): OHLCV[] {
  const data: OHLCV[] = []
  let price = basePrice * 0.7
  const now = Math.floor(Date.now() / 1000)
  const step = intervalMins * 60

  for (let i = count; i >= 0; i--) {
    const time = (now - i * step) as Time
    const volatility = 0.015 + Math.random() * 0.025
    const drift = 0.0008 + Math.random() * 0.001

    const open = price
    const change = price * volatility * (Math.random() - 0.48 + drift)
    const close = open + change
    const highExtra = Math.abs(change) * (0.3 + Math.random() * 0.8)
    const lowExtra = Math.abs(change) * (0.3 + Math.random() * 0.8)
    const high = Math.max(open, close) + highExtra
    const low = Math.min(open, close) - lowExtra
    const volume = (500000 + Math.random() * 2000000) * (1 + Math.abs(change / price) * 5)

    data.push({
      time,
      open: +open.toFixed(4),
      high: +high.toFixed(4),
      low: +Math.max(low, 0.001).toFixed(4),
      close: +close.toFixed(4),
      volume: +volume.toFixed(0),
    })
    price = close
  }
  return data
}

function calcSMA(data: OHLCV[], period: number) {
  return data.map((d, i) => {
    if (i < period - 1) return { time: d.time, value: NaN }
    let sum = 0
    for (let j = 0; j < period; j++) sum += data[i - j].close
    return { time: d.time, value: +(sum / period).toFixed(4) }
  }).filter(d => !isNaN(d.value))
}

function calcEMA(data: OHLCV[], period: number) {
  const k = 2 / (period + 1)
  const result: { time: Time; value: number }[] = []
  let ema = 0
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) continue
    if (i === period - 1) {
      let sum = 0
      for (let j = 0; j < period; j++) sum += data[i - j].close
      ema = sum / period
    } else {
      ema = data[i].close * k + ema * (1 - k)
    }
    result.push({ time: data[i].time, value: +ema.toFixed(4) })
  }
  return result
}

const BASE_PRICES: Record<string, number> = {
  'LUX-USD': 8.50,
  'ZOO-USD': 2.25,
}

type Interval = '1m' | '5m' | '30m' | '1h' | '1D' | '1W'

const INTERVALS: { key: Interval; label: string; count: number; mins: number }[] = [
  { key: '1m', label: '1m', count: 500, mins: 1 },
  { key: '5m', label: '5m', count: 500, mins: 5 },
  { key: '30m', label: '30m', count: 400, mins: 30 },
  { key: '1h', label: '1h', count: 365, mins: 60 },
  { key: '1D', label: 'D', count: 365, mins: 1440 },
  { key: '1W', label: 'W', count: 200, mins: 10080 },
]

export default function NativeChart({ symbol, cexApiUrl }: NativeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [interval, setInterval_] = useState<Interval>('1D')
  const [showIndicators, setShowIndicators] = useState(true)
  const [lastPrice, setLastPrice] = useState<number | null>(null)
  const [ohlc, setOhlc] = useState({ o: 0, h: 0, l: 0, c: 0 })
  const [priceChange, setPriceChange] = useState(0)
  const [volume, setVolume] = useState('')

  const initChart = useCallback(() => {
    if (!containerRef.current) return

    if (chartRef.current) {
      chartRef.current.remove()
      chartRef.current = null
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.bg },
        textColor: colors.text,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: colors.grid },
        horzLines: { color: colors.grid },
      },
      timeScale: {
        borderColor: colors.border,
        timeVisible: interval !== '1D' && interval !== '1W',
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
      },
      rightPriceScale: {
        borderColor: colors.border,
        scaleMargins: { top: 0.1, bottom: 0.25 },
      },
      crosshair: {
        mode: 0,
        vertLine: { color: colors.crosshair, width: 1, style: 3, labelBackgroundColor: '#333' },
        horzLine: { color: colors.crosshair, width: 1, style: 3, labelBackgroundColor: '#333' },
      },
      autoSize: true,
    })

    const iv = INTERVALS.find(i => i.key === interval)!
    const basePrice = BASE_PRICES[symbol] || 5.0
    const data = generateOHLCV(basePrice, iv.count, iv.mins)

    // Candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: colors.up,
      downColor: colors.down,
      borderDownColor: colors.down,
      borderUpColor: colors.up,
      wickDownColor: colors.down,
      wickUpColor: colors.up,
    })
    candleSeries.setData(data.map(d => ({
      time: d.time, open: d.open, high: d.high, low: d.low, close: d.close,
    })))

    // Volume histogram (on same pane, lower area)
    const volSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'vol',
    })
    chart.priceScale('vol').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    })
    volSeries.setData(data.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? colors.vol : colors.volDown,
    })))

    // SMA & EMA overlays
    if (showIndicators) {
      const smaSeries = chart.addSeries(LineSeries, {
        color: colors.sma,
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: false,
      })
      smaSeries.setData(calcSMA(data, 9))

      const emaSeries = chart.addSeries(LineSeries, {
        color: colors.ema,
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: false,
      })
      emaSeries.setData(calcEMA(data, 9))
    }

    // Set header info
    if (data.length > 0) {
      const last = data[data.length - 1]
      const first = data[0]
      setLastPrice(last.close)
      setOhlc({ o: last.open, h: last.high, l: last.low, c: last.close })
      setPriceChange(((last.close - first.close) / first.close) * 100)
      setVolume(fmtVol(last.volume))
    }

    // Crosshair move → update OHLCV header
    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData) return
      const cd = param.seriesData.get(candleSeries) as CandlestickData | undefined
      if (cd) {
        setOhlc({ o: cd.open, h: cd.high, l: cd.low, c: cd.close })
        const vd = param.seriesData.get(volSeries) as { value?: number } | undefined
        if (vd?.value) setVolume(fmtVol(vd.value))
      }
    })

    chart.timeScale().fitContent()
    chartRef.current = chart
  }, [symbol, interval, showIndicators])

  useEffect(() => {
    initChart()
    return () => {
      if (chartRef.current) { chartRef.current.remove(); chartRef.current = null }
    }
  }, [initChart])

  const ticker = symbol.replace('-USD', '')
  const changeColor = priceChange >= 0 ? colors.up : colors.down

  return (
    <div className="w-full h-full flex flex-col" style={{ background: colors.bg }}>
      {/* Toolbar — matches TradingView style */}
      <div className="flex items-center gap-1 px-2 py-1 border-b" style={{ borderColor: colors.toolbarBorder, background: colors.toolbarBg }}>
        {/* Interval buttons */}
        {INTERVALS.map((iv) => (
          <button
            key={iv.key}
            onClick={() => setInterval_(iv.key)}
            className={`px-2 py-0.5 rounded text-xs transition-colors ${
              interval === iv.key
                ? 'text-white bg-white/10'
                : 'text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)]'
            }`}
          >
            {iv.label}
          </button>
        ))}

        <div className="w-px h-4 mx-1" style={{ background: colors.toolbarBorder }} />

        {/* Chart type icon (candle) */}
        <button className="px-1.5 py-0.5 text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)]" title="Candlestick">
          <svg width="16" height="16" viewBox="0 0 28 28" fill="currentColor"><rect x="12" y="2" width="4" height="24" rx="1"/><rect x="4" y="8" width="4" height="14" rx="1"/><rect x="20" y="6" width="4" height="16" rx="1"/></svg>
        </button>

        <div className="w-px h-4 mx-1" style={{ background: colors.toolbarBorder }} />

        {/* Indicators toggle */}
        <button
          onClick={() => setShowIndicators(!showIndicators)}
          className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-colors ${
            showIndicators ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(255,255,255,0.3)]'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
          Indicators
        </button>

        {/* OHLCV display */}
        <div className="ml-auto flex items-center gap-3 text-[11px] font-mono">
          <span className="text-[rgba(255,255,255,0.3)]">O</span>
          <span className="text-[rgba(255,255,255,0.7)]">{ohlc.o.toFixed(2)}</span>
          <span className="text-[rgba(255,255,255,0.3)]">H</span>
          <span className="text-[rgba(255,255,255,0.7)]">{ohlc.h.toFixed(2)}</span>
          <span className="text-[rgba(255,255,255,0.3)]">L</span>
          <span className="text-[rgba(255,255,255,0.7)]">{ohlc.l.toFixed(2)}</span>
          <span className="text-[rgba(255,255,255,0.3)]">C</span>
          <span style={{ color: changeColor }}>{ohlc.c.toFixed(2)}</span>
          <span className="text-[rgba(255,255,255,0.3)]">Vol</span>
          <span className="text-[rgba(255,255,255,0.7)]">{volume}</span>
        </div>
      </div>

      {/* Overlay info: ticker + SMA/EMA legend */}
      <div className="absolute top-[2.25rem] left-2 z-10 flex flex-col gap-0.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[rgba(255,255,255,0.7)] text-xs font-semibold">{ticker}/USD · {CHART_WATERMARK}</span>
          <span className="text-xs font-mono" style={{ color: changeColor }}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </span>
        </div>
        {showIndicators && (
          <div className="flex items-center gap-3 text-[10px]">
            <span><span style={{ color: colors.sma }}>●</span> <span className="text-[rgba(255,255,255,0.3)]">SMA 9</span></span>
            <span><span style={{ color: colors.ema }}>●</span> <span className="text-[rgba(255,255,255,0.3)]">EMA 9</span></span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div ref={containerRef} className="flex-1 relative" />
    </div>
  )
}

function fmtVol(v: number): string {
  if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M'
  if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K'
  return v.toFixed(0)
}
