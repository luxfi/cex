'use client'

import React, { useEffect, createContext, useContext, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics, AnalyticsConfig, trackPageView, trackEvent, trackConversion } from './index'

interface AnalyticsContextValue {
  trackPageView: typeof trackPageView
  trackEvent: typeof trackEvent
  trackConversion: typeof trackConversion
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackPageView,
  trackEvent,
  trackConversion,
})

/**
 * Analytics Tracker - Internal component that uses useSearchParams
 */
function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on navigation
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      trackPageView({ path: url })
    }
  }, [pathname, searchParams])

  return null
}

/**
 * Analytics Provider Component
 * Wrap your app with this to enable analytics tracking
 */
export function AnalyticsProvider({
  children,
  config,
}: {
  children: React.ReactNode
  config: AnalyticsConfig
}) {
  // Initialize analytics on mount
  useEffect(() => {
    analytics.initialize(config)
  }, [config])

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackEvent, trackConversion }}>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </AnalyticsContext.Provider>
  )
}

/**
 * Hook to access analytics functions
 */
export function useAnalytics() {
  return useContext(AnalyticsContext)
}

/**
 * Google Analytics Script Component
 * Add this to your layout for Google Analytics
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Facebook Pixel Script Component
 * Add this to your layout for Facebook Pixel
 */
export function FacebookPixel({ pixelId }: { pixelId: string }) {
  return (
    <script
      id="facebook-pixel"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  )
}

/**
 * Twitter Pixel Script Component
 * Add this to your layout for Twitter/X Pixel
 */
export function TwitterPixel({ pixelId }: { pixelId: string }) {
  return (
    <script
      id="twitter-pixel"
      dangerouslySetInnerHTML={{
        __html: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','${pixelId}');
        `,
      }}
    />
  )
}
