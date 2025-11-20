# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lux Exchange (LUX) is a modern commission-free trading platform supporting stocks, crypto, options, and commodities. This is a **pnpm monorepo** using **Turbo** for build orchestration.

**Key Technologies:**
- Next.js 15.5.6 with App Router and React 19.2.0
- Tailwind CSS 4.1.14 for styling
- @hanzo/ui component library (Hanzo AI's UI framework)
- Zustand for state management
- Playwright for E2E testing
- Alpaca API for trading and market data

## Monorepo Structure

```
luxats/web/
├── apps/
│   └── lux/              # Main trading platform app (runs on port 3001)
├── packages/
│   ├── analytics/         # Unified analytics (React GA4)
│   ├── portfolio/         # Portfolio data utilities (tsup build)
│   ├── types/             # Shared TypeScript types (tsup build)
│   └── ui/                # Shared UI components (no build - direct TS export)
```

## Essential Commands

### Development
```bash
# Install dependencies (REQUIRED: use pnpm, NOT npm)
pnpm install

# Run all apps in dev mode
pnpm dev

# Run specific app (lux runs on port 3001)
pnpm --filter @luxats/lux dev

# Run from within app directory
cd apps/lux && pnpm dev
```

### Building
```bash
# Build all packages and apps (respects dependency order)
pnpm build

# Build specific package
pnpm --filter @luxats/types build

# Clean build artifacts
pnpm clean
```

### Testing
```bash
# Run all tests
pnpm test

# Run Playwright tests for lux
pnpm --filter @luxats/lux test

# Run type checking
pnpm lint
```

### Formatting
```bash
# Format all files
pnpm format
```

## Package Build Systems

**Important**: Packages use different build systems:

1. **@luxats/ui**: No build step - exports TypeScript source directly
   - `build` script is a no-op
   - Components imported directly from `.tsx` files
   - Uses `exports` field to map imports

2. **@luxats/types**, **@luxats/portfolio**, **@luxats/analytics**: Use tsup
   - Build to `dist/` with both CJS and ESM outputs
   - Must run `pnpm build` before consuming
   - Turbo handles build order automatically

## Architecture Patterns

### Next.js App Router Structure (apps/lux)

The app uses Next.js 13+ App Router with file-based routing:

```
app/
├── layout.tsx              # Root layout with analytics providers
├── page.tsx                # Homepage
├── (auth)/                 # Route group for auth pages
├── markets/                # Market overview pages
├── trade/                  # Trading interface
│   └── page.tsx            # TradingView Advanced Chart + Robinhood-style order panel
├── symbol/[symbol]/        # Dynamic symbol detail pages
└── [...other routes]/
```

**Key Conventions:**
- All pages are Server Components by default
- Use `'use client'` directive for client components
- Components in `components/` directory are app-specific
- Shared components come from `@luxats/ui`

### Component Imports

**Always prefer @hanzo/ui for base components:**
```typescript
// ✅ CORRECT - Use @hanzo/ui for base components
import { Button, Card } from '@hanzo/ui/primitives'
import { ApplyTypography } from '@hanzo/ui/primitives'

// ✅ CORRECT - Use @hanzo/ui/finance for trading/financial widgets
import { 
  AdvancedChart, 
  MarketOverview, 
  TickerTape,
  OrderEntry,
  PositionsList,
  OrdersHistory 
} from '@hanzo/ui/finance'

// ✅ CORRECT - Use @luxats/ui for app-specific shared components
import { Footer, Logo } from '@luxats/ui/components'

// ✅ CORRECT - App-specific components from local directory
import { MarketSwitcher } from '@/components/MarketSwitcher'
```

### State Management

Uses **Zustand** for client-side state:
```typescript
// Store pattern used in the app
import { create } from 'zustand'

const useStore = create((set) => ({
  // state and actions
}))
```

### Trading Page Architecture

The trading interface (`app/trade/page.tsx`) combines:
- **TradingView Advanced Chart**: Full-featured charting widget with built-in symbol selector
- **Robinhood-style Order Panel**: Fixed right panel for order entry and management
- Layout uses absolute positioning to prevent gaps and ensure full coverage

**Available Trading Widgets** (from `@hanzo/ui/finance`):

**TradingView Chart Widgets:**
- `AdvancedChart` - Full-featured interactive chart with symbol switching
- `MarketOverview` - Multi-asset market overview with tabs (indices, futures, bonds, forex)
- `TickerTape` - Scrolling ticker with major indices and stocks
- `StockScreener`, `CryptoScreener`, `ForexScreener` - Asset screeners
- `NewsTimeline` - Financial news feed widget
- `TradingPanel` - Demo trading panel with buy/sell and portfolio tracking

**Order Management Widgets:**
- `OrderEntry` - Complete order entry form with buy/sell toggle, market/limit orders, shares input, and limit price
- `PositionsList` - Real-time positions display with P&L tracking and percentage changes
- `OrdersHistory` - Order history view with status badges and cancel functionality

All widgets are React 19 compatible, fully typed with TypeScript, and use Tailwind CSS for styling.

### Styling Approach

**Tailwind CSS 4.1.14** with custom color scheme:
```typescript
// Custom colors (from tailwind.config.ts)
primary: '#0A0A0A'      // Dark background
secondary: '#141414'    // Slightly lighter background
accent: '#1E1E1E'       // UI elements
gold: '#D4AF37'         // Brand accent
gold-light: '#F4E4BC'   // Light gold variant
```

**Class naming patterns:**
- Use utility-first approach
- Responsive prefixes: `md:`, `lg:`, etc.
- Dark mode: project uses dark theme by default
- Framer Motion for animations

### API Integration

**Alpaca API** (lib/alpaca/client.ts):
- Paper trading endpoint: `https://paper-api.alpaca.markets`
- Handles market data and order execution
- Environment variables required:
  - `ALPACA_API_KEY`
  - `ALPACA_API_SECRET`
  - `ALPACA_API_URL`

### Analytics

Uses `@luxats/analytics` package with React GA4:
```typescript
// In layout.tsx
import { AnalyticsProvider } from '@luxats/analytics/providers'

// Tracks page views and events
```

## Development Workflow

1. **Always run `pnpm install` from monorepo root** - never use npm
2. **Turborepo handles dependency order** - packages build in correct sequence
3. **Changes to packages require rebuild** - except @luxats/ui (no build step)
4. **Use pnpm workspaces** - changes to one package immediately available to others
5. **Test with Playwright** - E2E tests for critical user flows

## Important Notes

- **Never use npm or yarn** - this is a pnpm monorepo (packageManager: "pnpm@9.15.4")
- **Always use @hanzo/ui** - per user's global CLAUDE.md instructions
- **Port 3001** - lux app runs on this port by default
- **TradingView widgets** - Use Advanced Chart for full trading interface
- **Workspace protocol** - Dependencies use `workspace:*` for local packages
- **React 19** - Uses latest React version, ensure compatibility

## Deployment

LUX can be deployed as:
- Static export: `pnpm export` (builds to `out/` directory)
- Server-side rendered: Standard Next.js deployment
- Edge functions: Vercel Edge Runtime compatible

## Legal Entity and Branding

**CRITICAL**: Maintain clear distinction between brand name and legal entity:

### Legal Entity
**Lux Exchange LLC**
- The Trump Building, 40 Wall Street, Suite 2702, New York, NY 10005
- Used in all copyright notices, legal documents, and regulatory disclosures
- Example: `© 2025 Lux Exchange LLC. All rights reserved.`

### Brand/Marketing Name
**Lux Exchange**
- Shorter, consumer-facing brand name
- Used in marketing copy, documentation, and UI text
- Easier to say and remember than full legal name

### Product Names
**Consistent naming convention:**
- **Lux Markets** - Main trading platform
- **Lux Trader** - Base tier
- **Lux Pro Trader** - Professional tier
- **Lux Elite Pro Trader** - Premium tier

**Avoid:** "LUX" prefix in product names (legacy naming)

### Regulatory Status

**Brokerage Services**: Provided through **Alpaca Securities LLC**
- FINRA/SIPC member
- CRD #: (pending verification)
- Lux Exchange is a client of Alpaca, not a registered broker-dealer

**Cryptocurrency Services**: Provided through **Alpaca Crypto LLC**
- NMLS # 2160858 (FinCEN registered Money Services Business)
- Licensed as money transmitter

### Required Disclosures

All pages with financial services must include:
1. **Service Provider Disclosure**: Clear statement that services are provided through Alpaca
2. **Risk Disclosures**: Links to all applicable risk disclosure documents
3. **Regulatory Attribution**: FINRA/SIPC membership, NMLS registration
4. **Copyright**: Legal entity name (Lux Exchange LLC)

### Disclosure Pages (apps/lux/app/)

**Hub Pages:**
- `/disclosures` - Main disclosure hub linking to all documents
- `/agreements` - Customer agreements and forms hub

**Risk Disclosures:**
- `/crypto-risk-disclosures` - Cryptocurrency investment risks
- `/extended-hours-risk` - Pre-market/after-hours trading risks
- `/margin-disclosure` - Margin trading risks and requirements

**Regulatory Documents:**
- `/customer-relationship-summary` - Form CRS (SEC required)
- `/sec-rule-606` - Order routing quarterly reports
- `/privacy` - Privacy policy
- `/cookies` - Cookie policy
- `/terms` - Terms and conditions

**Critical UI Pattern - Footer Attribution:**
```tsx
<div className="bg-gradient-to-br from-blue-950/30 to-purple-950/20 border-2 border-cyan-500/30 rounded-xl p-6">
  <h3 className="text-cyan-400 font-bold">🏗️ Built on Alpaca</h3>
  <p>Securities Brokerage services are provided by Alpaca Securities LLC 
  (member FINRA/SIPC). Cryptocurrency services are provided by Alpaca 
  Crypto LLC (NMLS # 2160858)...</p>
</div>
```

**Link Styling for Visibility:**
- Use `text-cyan-400 hover:text-cyan-300` for links on dark backgrounds
- Always include `underline` class for accessibility
- Never use `text-success` (green) as it has poor contrast

### PENDING LEGAL ISSUE ⚠️

**BrokerCheck Discovery**: Found existing "BEYOND EQUITY, LLC" (CRD # 335400)
- Registered as Exempt Reporting Adviser
- Located in New York, NY
- Effective date: 5/6/2025
- **STATUS**: Requires attorney consultation before launch
- **ACTION NEEDED**: Determine if same entity, resolve naming conflicts, add CRD # if applicable

## Environment Variables

Required for full functionality:
```env
# Alpaca API
ALPACA_API_KEY=
ALPACA_API_SECRET=
ALPACA_API_URL=https://paper-api.alpaca.markets

# Analytics
NEXT_PUBLIC_GA_ID=

# Authentication (if using NextAuth)
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Database (if using)
DATABASE_URL=
```
