import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { AnalyticsConfig, trackPageView, trackEvent, trackConversion } from './index.mjs';

interface AnalyticsContextValue {
    trackPageView: typeof trackPageView;
    trackEvent: typeof trackEvent;
    trackConversion: typeof trackConversion;
}
/**
 * Analytics Provider Component
 * Wrap your app with this to enable analytics tracking
 */
declare function AnalyticsProvider({ children, config, }: {
    children: React.ReactNode;
    config: AnalyticsConfig;
}): react_jsx_runtime.JSX.Element;
/**
 * Hook to access analytics functions
 */
declare function useAnalytics(): AnalyticsContextValue;
/**
 * Google Analytics Script Component
 * Add this to your layout for Google Analytics
 */
declare function GoogleAnalytics({ measurementId }: {
    measurementId: string;
}): react_jsx_runtime.JSX.Element;
/**
 * Facebook Pixel Script Component
 * Add this to your layout for Facebook Pixel
 */
declare function FacebookPixel({ pixelId }: {
    pixelId: string;
}): react_jsx_runtime.JSX.Element;
/**
 * Twitter Pixel Script Component
 * Add this to your layout for Twitter/X Pixel
 */
declare function TwitterPixel({ pixelId }: {
    pixelId: string;
}): react_jsx_runtime.JSX.Element;

export { AnalyticsProvider, FacebookPixel, GoogleAnalytics, TwitterPixel, useAnalytics };
