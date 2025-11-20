/**
 * @beyondequity/analytics
 * Unified analytics tracking for Beyond Equity ecosystem
 */
interface AnalyticsConfig {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    twitterPixelId?: string;
    enabled?: boolean;
}
interface TrackEventParams {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;
}
interface PageViewParams {
    path: string;
    title?: string;
}
interface ConversionEvent {
    type: 'signup' | 'login' | 'trade' | 'deposit' | 'lead';
    value?: number;
    currency?: string;
    metadata?: Record<string, any>;
}
declare class Analytics {
    private config;
    private initialized;
    /**
     * Initialize analytics with configuration
     */
    initialize(config: AnalyticsConfig): void;
    /**
     * Track page view
     */
    pageView(params: PageViewParams): void;
    /**
     * Track custom event
     */
    trackEvent(params: TrackEventParams): void;
    /**
     * Track conversion event
     */
    trackConversion(event: ConversionEvent): void;
    /**
     * Initialize Facebook Pixel
     */
    private initializeFacebookPixel;
    /**
     * Initialize Twitter Pixel
     */
    private initializeTwitterPixel;
}
declare const analytics: Analytics;
declare const initializeAnalytics: (config: AnalyticsConfig) => void;
declare const trackPageView: (params: PageViewParams) => void;
declare const trackEvent: (params: TrackEventParams) => void;
declare const trackConversion: (event: ConversionEvent) => void;

export { type AnalyticsConfig, type ConversionEvent, type PageViewParams, type TrackEventParams, analytics, initializeAnalytics, trackConversion, trackEvent, trackPageView };
