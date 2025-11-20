'use client'

import { useEffect, useRef } from 'react'

export default function NewsPage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Timeline widget
    if (timelineRef.current) {
      const timelineScript = document.createElement('script')
      timelineScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
      timelineScript.type = 'text/javascript'
      timelineScript.async = true
      timelineScript.innerHTML = JSON.stringify({
        feedMode: 'all_symbols',
        isTransparent: false,
        displayMode: 'regular',
        colorTheme: 'dark',
        locale: 'en',
      })
      timelineRef.current.appendChild(timelineScript)
    }

    // Economic Calendar widget
    if (calendarRef.current) {
      const calendarScript = document.createElement('script')
      calendarScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
      calendarScript.type = 'text/javascript'
      calendarScript.async = true
      calendarScript.innerHTML = JSON.stringify({
        colorTheme: 'dark',
        isTransparent: false,
        locale: 'en',
        countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
        importanceFilter: '-1,0,1',
        width: '100%',
        height: '100%',
      })
      calendarRef.current.appendChild(calendarScript)
    }
  }, [])

  return (
    <div className="bg-primary" style={{ height: 'calc(100vh - 7rem)' }}>
      {/* Page Header */}
      <div className="border-b border-white/10 px-4 py-3">
        <h1 className="text-xl font-bold text-white mb-1">Market News & Events</h1>
        <p className="text-xs text-white/70">
          Stay updated with latest news, analysis, and economic calendar
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex" style={{ height: 'calc(100% - 5rem)' }}>
        {/* Left - News Timeline */}
        <div className="flex-1 border-r border-white/10">
          <div
            ref={timelineRef}
            className="tradingview-widget-container"
            style={{ height: '100%', width: '100%' }}
          >
            <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
          </div>
        </div>

        {/* Right - Economic Calendar */}
        <div className="w-96 bg-primary/50">
          <div className="p-3 border-b border-white/10">
            <h2 className="text-sm font-semibold text-white">Economic Calendar</h2>
            <p className="text-xs text-white/60 mt-0.5">Upcoming events & data releases</p>
          </div>
          <div
            ref={calendarRef}
            className="tradingview-widget-container"
            style={{ height: 'calc(100% - 4rem)' }}
          >
            <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
