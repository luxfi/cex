# @luxats/analytics

Unified analytics tracking for the Lux Exchange ecosystem with support for Google Analytics, Facebook Pixel, and Twitter/X Pixel.

## Features

- **Google Analytics 4** - Track page views, events, and conversions
- **Facebook Pixel** - Track conversions and retargeting
- **Twitter/X Pixel** - Track engagement and conversions
- **Unified API** - Single interface for all analytics providers
- **Type-safe** - Full TypeScript support
- **Next.js optimized** - Built for Next.js App Router
- **Privacy-friendly** - IP anonymization enabled

## Installation

This package is part of the Lux Exchange monorepo and is automatically available to all apps.

```typescript
import { AnalyticsProvider, useAnalytics } from '@luxats/analytics/providers'
import { trackPageView, trackEvent, trackConversion } from '@luxats/analytics'
```

## Usage

### 1. Add Analytics Provider to your Layout

```typescript
// app/layout.tsx
import { AnalyticsProvider } from '@luxats/analytics/providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AnalyticsProvider
          config={{
            googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
            facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
            twitterPixelId: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID,
            enabled: process.env.NODE_ENV === 'production',
          }}
        >
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

### 2. Add Script Tags (Optional - for better tracking)

```typescript
// app/layout.tsx
import { GoogleAnalytics, FacebookPixel, TwitterPixel } from '@luxats/analytics/providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        {process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID && (
          <TwitterPixel pixelId={process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID} />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Track Events

**Using the Hook:**

```typescript
'use client'

import { useAnalytics } from '@luxats/analytics/providers'

export function SignupButton() {
  const { trackEvent, trackConversion } = useAnalytics()

  const handleSignup = () => {
    // Track custom event
    trackEvent({
      category: 'User',
      action: 'Signup',
      label: 'LUX Trading Platform',
    })

    // Track conversion
    trackConversion({
      type: 'signup',
      value: 0,
      metadata: { platform: 'LUX' },
    })
  }

  return <button onClick={handleSignup}>Sign Up</button>
}
```

**Direct API:**

```typescript
import { trackEvent, trackConversion } from '@luxats/analytics'

// Track custom event
trackEvent({
  category: 'Trading',
  action: 'Place Order',
  label: 'BTC',
  value: 1000,
})

// Track conversion
trackConversion({
  type: 'trade',
  value: 1000,
  currency: 'USD',
  metadata: {
    symbol: 'BTC',
    quantity: 0.5,
  },
})
```

## Tracked Events

### Automatic Tracking

- **Page Views** - Automatically tracked on navigation

### Conversion Events

The `trackConversion` function supports the following event types:

- `signup` - User registration
- `login` - User login
- `trade` - Trading action
- `deposit` - Account deposit
- `lead` - Lead generation

```typescript
trackConversion({
  type: 'signup',
  value: 0,
  metadata: { source: 'landing-page' },
})

trackConversion({
  type: 'trade',
  value: 5000,
  currency: 'USD',
  metadata: { symbol: 'AAPL', shares: 100 },
})
```

### Custom Events

```typescript
trackEvent({
  category: 'Engagement',
  action: 'Video Play',
  label: 'Trading Tutorial',
  value: 1,
})

trackEvent({
  category: 'Portfolio',
  action: 'View Details',
  label: 'SpaceX',
  nonInteraction: true,
})
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345

# Twitter/X Pixel
NEXT_PUBLIC_TWITTER_PIXEL_ID=o1234
```

## API Reference

### Analytics Configuration

```typescript
interface AnalyticsConfig {
  googleAnalyticsId?: string
  facebookPixelId?: string
  twitterPixelId?: string
  enabled?: boolean // Default: true in production
}
```

### Track Event

```typescript
interface TrackEventParams {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
}
```

### Track Conversion

```typescript
interface ConversionEvent {
  type: 'signup' | 'login' | 'trade' | 'deposit' | 'lead'
  value?: number
  currency?: string
  metadata?: Record<string, any>
}
```

## Best Practices

1. **Environment-based Tracking**: Only enable in production
```typescript
enabled: process.env.NODE_ENV === 'production'
```

2. **User Privacy**: Analytics includes IP anonymization by default

3. **Meaningful Events**: Use descriptive categories and actions
```typescript
// Good
trackEvent({ category: 'Trading', action: 'Order Placed', label: 'BTC' })

// Avoid
trackEvent({ category: 'Action', action: 'Click', label: 'Button' })
```

4. **Value Tracking**: Include monetary values for conversions
```typescript
trackConversion({ type: 'trade', value: 1000, currency: 'USD' })
```

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev

# Type checking
pnpm lint
```

## Provider Mapping

### Facebook Pixel Events

- `signup` → `CompleteRegistration`
- `login` → `Login`
- `trade` → `Purchase`
- `deposit` → `AddPaymentInfo`
- `lead` → `Lead`

### Twitter Pixel Events

- `signup` → `tw-signup`
- `login` → `tw-login`
- `trade` → `tw-purchase`
- `deposit` → `tw-deposit`
- `lead` → `tw-lead`

## Debugging

The package logs all events to the console in development mode:

```
[Analytics] Google Analytics initialized: G-XXXXXXXXXX
[Analytics] Facebook Pixel initialized: 123456789012345
[Analytics] Page view: /about
[Analytics] Event: { category: 'User', action: 'Signup' }
[Analytics] Conversion: signup 0 { source: 'landing-page' }
```
