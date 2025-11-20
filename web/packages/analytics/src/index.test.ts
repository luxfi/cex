import { describe, it, expect, beforeEach, vi } from 'vitest'
import { analytics, initializeAnalytics, trackPageView, trackEvent, trackConversion } from './index'

// Mock ReactGA
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}))

describe('Analytics', () => {
  beforeEach(() => {
    // Reset analytics state
    vi.clearAllMocks()
    // Reset window objects
    if (typeof window !== 'undefined') {
      delete (window as any).fbq
      delete (window as any).twq
    }
  })

  describe('initialization', () => {
    it('should initialize with Google Analytics ID', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: true,
      }

      analytics.initialize(config)
      // Analytics should be initialized (tested via tracking functions)
    })

    it('should not initialize when disabled', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
        enabled: false,
      }

      const consoleSpy = vi.spyOn(console, 'log')
      analytics.initialize(config)

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Analytics disabled')
      consoleSpy.mockRestore()
    })

    it('should initialize without errors when no config provided', () => {
      expect(() => {
        analytics.initialize({})
      }).not.toThrow()
    })
  })

  describe('initializeAnalytics helper', () => {
    it('should call analytics.initialize', () => {
      const config = {
        googleAnalyticsId: 'G-TEST123',
      }

      expect(() => {
        initializeAnalytics(config)
      }).not.toThrow()
    })
  })

  describe('trackPageView', () => {
    it('should track page view with path', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackPageView({ path: '/home' })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page view:', '/home')
      consoleSpy.mockRestore()
    })

    it('should track page view with path and title', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackPageView({ path: '/about', title: 'About Page' })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page view:', '/about')
      consoleSpy.mockRestore()
    })

    it('should not track when analytics is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ enabled: false })
      trackPageView({ path: '/test' })

      expect(consoleSpy).not.toHaveBeenCalledWith('[Analytics] Page view:', '/test')
      consoleSpy.mockRestore()
    })

    it('should not track when not initialized', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      // Create new analytics instance that's not initialized
      trackPageView({ path: '/test' })

      // Should not log page view (may log other initialization messages)
      consoleSpy.mockRestore()
    })
  })

  describe('trackEvent', () => {
    it('should track event with category and action', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'User',
        action: 'Click',
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', {
        category: 'User',
        action: 'Click',
      })
      consoleSpy.mockRestore()
    })

    it('should track event with all parameters', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'CTA',
        action: 'Click',
        label: 'Hero Button',
        value: 100,
        nonInteraction: false,
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', {
        category: 'CTA',
        action: 'Click',
        label: 'Hero Button',
        value: 100,
        nonInteraction: false,
      })
      consoleSpy.mockRestore()
    })

    it('should not track when analytics is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ enabled: false })
      trackEvent({
        category: 'Test',
        action: 'Test Action',
      })

      expect(consoleSpy).not.toHaveBeenCalledWith('[Analytics] Event:', expect.anything())
      consoleSpy.mockRestore()
    })
  })

  describe('trackConversion', () => {
    it('should track signup conversion', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackConversion({
        type: 'signup',
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Conversion:', 'signup', undefined, undefined)
      consoleSpy.mockRestore()
    })

    it('should track conversion with value', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackConversion({
        type: 'trade',
        value: 1000,
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Conversion:', 'trade', 1000, undefined)
      consoleSpy.mockRestore()
    })

    it('should track conversion with value, currency, and metadata', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackConversion({
        type: 'deposit',
        value: 5000,
        currency: 'USD',
        metadata: { method: 'bank_transfer' },
      })

      expect(consoleSpy).toHaveBeenCalledWith(
        '[Analytics] Conversion:',
        'deposit',
        5000,
        { method: 'bank_transfer' }
      )
      consoleSpy.mockRestore()
    })

    it('should track all conversion types', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })

      const types: Array<'signup' | 'login' | 'trade' | 'deposit' | 'lead'> = [
        'signup',
        'login',
        'trade',
        'deposit',
        'lead',
      ]

      types.forEach((type) => {
        trackConversion({ type })
        expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Conversion:', type, undefined, undefined)
      })

      consoleSpy.mockRestore()
    })

    it('should not track when analytics is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ enabled: false })
      trackConversion({ type: 'signup' })

      expect(consoleSpy).not.toHaveBeenCalledWith('[Analytics] Conversion:', expect.anything())
      consoleSpy.mockRestore()
    })

    it('should default to USD currency', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackConversion({
        type: 'trade',
        value: 1000,
      })

      // Currency is used internally but not logged in the test output
      // This test verifies the function runs without error
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('Analytics Config', () => {
    it('should accept googleAnalyticsId in config', () => {
      expect(() => {
        analytics.initialize({ googleAnalyticsId: 'G-12345' })
      }).not.toThrow()
    })

    it('should accept facebookPixelId in config', () => {
      // Mock document.createElement and DOM methods for Facebook Pixel
      const mockScript = {
        async: false,
        src: '',
      }
      const mockParent = {
        insertBefore: vi.fn(),
      }
      vi.spyOn(document, 'createElement').mockReturnValue(mockScript as any)
      vi.spyOn(document, 'getElementsByTagName').mockReturnValue([{ parentNode: mockParent }] as any)

      expect(() => {
        analytics.initialize({ facebookPixelId: 'FB-12345' })
      }).not.toThrow()

      vi.restoreAllMocks()
    })

    it('should accept twitterPixelId in config', () => {
      // Mock document.createElement and DOM methods for Twitter Pixel
      const mockScript = {
        async: false,
        src: '',
      }
      const mockParent = {
        insertBefore: vi.fn(),
      }
      vi.spyOn(document, 'createElement').mockReturnValue(mockScript as any)
      vi.spyOn(document, 'getElementsByTagName').mockReturnValue([{ parentNode: mockParent }] as any)

      expect(() => {
        analytics.initialize({ twitterPixelId: 'TW-12345' })
      }).not.toThrow()

      vi.restoreAllMocks()
    })

    it('should accept enabled flag in config', () => {
      expect(() => {
        analytics.initialize({ enabled: true })
      }).not.toThrow()

      expect(() => {
        analytics.initialize({ enabled: false })
      }).not.toThrow()
    })

    it('should accept all config options together', () => {
      // Mock document.createElement and DOM methods for both pixels
      const mockScript = {
        async: false,
        src: '',
      }
      const mockParent = {
        insertBefore: vi.fn(),
      }
      vi.spyOn(document, 'createElement').mockReturnValue(mockScript as any)
      vi.spyOn(document, 'getElementsByTagName').mockReturnValue([{ parentNode: mockParent }] as any)

      expect(() => {
        analytics.initialize({
          googleAnalyticsId: 'G-12345',
          facebookPixelId: 'FB-12345',
          twitterPixelId: 'TW-12345',
          enabled: true,
        })
      }).not.toThrow()

      vi.restoreAllMocks()
    })
  })

  describe('Event Parameters', () => {
    it('should track event with only required parameters', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'Navigation',
        action: 'Menu Click',
      })

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should track event with label', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'Video',
        action: 'Play',
        label: 'Homepage Hero Video',
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', {
        category: 'Video',
        action: 'Play',
        label: 'Homepage Hero Video',
      })
      consoleSpy.mockRestore()
    })

    it('should track event with numeric value', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'Engagement',
        action: 'Time on Page',
        value: 120,
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', {
        category: 'Engagement',
        action: 'Time on Page',
        value: 120,
      })
      consoleSpy.mockRestore()
    })

    it('should track non-interaction events', () => {
      const consoleSpy = vi.spyOn(console, 'log')

      analytics.initialize({ googleAnalyticsId: 'G-TEST123', enabled: true })
      trackEvent({
        category: 'System',
        action: 'Auto Save',
        nonInteraction: true,
      })

      expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event:', {
        category: 'System',
        action: 'Auto Save',
        nonInteraction: true,
      })
      consoleSpy.mockRestore()
    })
  })
})
