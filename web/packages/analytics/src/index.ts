/**
 * @luxats/analytics
 * Unified analytics tracking for Lux Exchange ecosystem
 */

import ReactGA from 'react-ga4'

// Analytics configuration
export interface AnalyticsConfig {
  googleAnalyticsId?: string
  facebookPixelId?: string
  twitterPixelId?: string
  enabled?: boolean
}

// Event types
export interface TrackEventParams {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
}

export interface PageViewParams {
  path: string
  title?: string
}

export interface ConversionEvent {
  type: 'signup' | 'login' | 'trade' | 'deposit' | 'lead'
  value?: number
  currency?: string
  metadata?: Record<string, any>
}

class Analytics {
  private config: AnalyticsConfig = {}
  private initialized = false

  /**
   * Initialize analytics with configuration
   */
  initialize(config: AnalyticsConfig) {
    this.config = config
    
    if (config.enabled === false) {
      console.log('[Analytics] Analytics disabled')
      return
    }

    // Initialize Google Analytics
    if (config.googleAnalyticsId) {
      ReactGA.initialize(config.googleAnalyticsId, {
        gaOptions: {
          anonymizeIp: true,
        },
      })
      console.log('[Analytics] Google Analytics initialized:', config.googleAnalyticsId)
    }

    // Initialize Facebook Pixel
    if (config.facebookPixelId && typeof window !== 'undefined') {
      this.initializeFacebookPixel(config.facebookPixelId)
    }

    // Initialize Twitter Pixel
    if (config.twitterPixelId && typeof window !== 'undefined') {
      this.initializeTwitterPixel(config.twitterPixelId)
    }

    this.initialized = true
  }

  /**
   * Track page view
   */
  pageView(params: PageViewParams) {
    if (!this.initialized || this.config.enabled === false) return

    // Google Analytics
    if (this.config.googleAnalyticsId) {
      ReactGA.send({ hitType: 'pageview', page: params.path, title: params.title })
    }

    // Facebook Pixel
    if (this.config.facebookPixelId && typeof window !== 'undefined') {
      ;(window as any).fbq?.('track', 'PageView')
    }

    // Twitter Pixel
    if (this.config.twitterPixelId && typeof window !== 'undefined') {
      ;(window as any).twq?.('track', 'PageView')
    }

    console.log('[Analytics] Page view:', params.path)
  }

  /**
   * Track custom event
   */
  trackEvent(params: TrackEventParams) {
    if (!this.initialized || this.config.enabled === false) return

    // Google Analytics
    if (this.config.googleAnalyticsId) {
      ReactGA.event({
        category: params.category,
        action: params.action,
        label: params.label,
        value: params.value,
        nonInteraction: params.nonInteraction,
      })
    }

    // Facebook Pixel
    if (this.config.facebookPixelId && typeof window !== 'undefined') {
      ;(window as any).fbq?.('trackCustom', params.action, {
        category: params.category,
        label: params.label,
        value: params.value,
      })
    }

    console.log('[Analytics] Event:', params)
  }

  /**
   * Track conversion event
   */
  trackConversion(event: ConversionEvent) {
    if (!this.initialized || this.config.enabled === false) return

    const { type, value, currency = 'USD', metadata } = event

    // Google Analytics
    if (this.config.googleAnalyticsId) {
      ReactGA.event({
        category: 'Conversion',
        action: type,
        label: metadata ? JSON.stringify(metadata) : undefined,
        value: value,
      })
    }

    // Facebook Pixel
    if (this.config.facebookPixelId && typeof window !== 'undefined') {
      const fbEventMap: Record<string, string> = {
        signup: 'CompleteRegistration',
        login: 'Login',
        trade: 'Purchase',
        deposit: 'AddPaymentInfo',
        lead: 'Lead',
      }

      const fbEvent = fbEventMap[type] || type
      ;(window as any).fbq?.('track', fbEvent, {
        value: value,
        currency: currency,
        ...metadata,
      })
    }

    // Twitter Pixel
    if (this.config.twitterPixelId && typeof window !== 'undefined') {
      const twEventMap: Record<string, string> = {
        signup: 'tw-signup',
        login: 'tw-login',
        trade: 'tw-purchase',
        deposit: 'tw-deposit',
        lead: 'tw-lead',
      }

      const twEvent = twEventMap[type]
      if (twEvent) {
        ;(window as any).twq?.('event', twEvent, {
          value: value?.toString(),
          currency: currency,
          ...metadata,
        })
      }
    }

    console.log('[Analytics] Conversion:', type, value, metadata)
  }

  /**
   * Initialize Facebook Pixel
   */
  private initializeFacebookPixel(pixelId: string) {
    if (typeof window === 'undefined') return

    // Facebook Pixel Code
    ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    )

    ;(window as any).fbq('init', pixelId)
    ;(window as any).fbq('track', 'PageView')

    console.log('[Analytics] Facebook Pixel initialized:', pixelId)
  }

  /**
   * Initialize Twitter Pixel
   */
  private initializeTwitterPixel(pixelId: string) {
    if (typeof window === 'undefined') return

    // Twitter Pixel Code
    ;(function (e: any, t: any, n: any, s?: any, u?: any, a?: any) {
      e.twq ||
        ((s = e.twq =
          function () {
            s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments)
          }),
        (s.version = '1.1'),
        (s.queue = []),
        (u = t.createElement(n)),
        (u.async = !0),
        (u.src = 'https://static.ads-twitter.com/uwt.js'),
        (a = t.getElementsByTagName(n)[0]),
        a.parentNode.insertBefore(u, a))
    })(window, document, 'script')

    ;(window as any).twq('config', pixelId)

    console.log('[Analytics] Twitter Pixel initialized:', pixelId)
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Convenience functions
export const initializeAnalytics = (config: AnalyticsConfig) => analytics.initialize(config)
export const trackPageView = (params: PageViewParams) => analytics.pageView(params)
export const trackEvent = (params: TrackEventParams) => analytics.trackEvent(params)
export const trackConversion = (event: ConversionEvent) => analytics.trackConversion(event)
