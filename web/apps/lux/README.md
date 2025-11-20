# Lux Exchange (LUX)

Trading platform for stocks, crypto, options, and commodities with $0 commissions.

## Overview

LUX is a modern trading platform that provides:
- Commission-free trading
- 24/5 market access
- Multi-asset support (stocks, crypto, options, commodities)
- Real-time market data
- Portfolio management
- Educational resources

## Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **UI**: React 19.2.0, Tailwind CSS 4.1.14
- **Components**: @hanzo/ui, @luxats/ui
- **State**: Zustand for client state
- **Charts**: Recharts for market visualizations
- **Animations**: Framer Motion 12.23.24
- **Icons**: Lucide React
- **Testing**: Playwright 1.56.1

## Development

```bash
# Install dependencies (from root of monorepo)
pnpm install

# Run development server (on port 3001)
pnpm --filter @luxats/lux dev

# Or from this directory
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## Project Structure

```
apps/lux/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage
│   ├── globals.css   # Global styles
│   ├── markets/      # Markets page
│   ├── trade/        # Trading interface
│   ├── portfolio/    # Portfolio management
│   └── learn/        # Educational content
├── components/       # App-specific components
├── lib/              # Utilities and API clients
│   └── alpaca/       # Alpaca API integration
├── public/           # Static assets
└── package.json      # Dependencies and scripts
```

## Key Features

### Trading

- Real-time market data
- Order placement (market, limit, stop, stop-limit)
- Position management
- Trade history
- Multiple asset classes

### Portfolio

- Real-time portfolio valuation
- Performance tracking
- Asset allocation visualization
- P&L analysis (realized and unrealized)
- Transaction history

### Markets

- Market overview
- Watchlists
- Price alerts
- Market news and analysis
- Economic calendar

### Education

- Trading tutorials
- Crypto trading guide
- Options strategies
- Portfolio optimization
- Risk management

## API Integration

### Alpaca API

LUX integrates with Alpaca for:
- Market data (stocks and crypto)
- Order execution
- Account management
- Portfolio tracking

Configuration:
```env
ALPACA_API_KEY=your_api_key
ALPACA_API_SECRET=your_api_secret
ALPACA_API_URL=https://paper-api.alpaca.markets
```

## Shared Packages

LUX uses shared packages from the monorepo:

- `@luxats/types` - Shared TypeScript types
- `@luxats/ui` - Shared UI components
- `@luxats/portfolio` - Portfolio data utilities

## Deployment

LUX can be deployed as:
- Static site (if using static export)
- Server-side rendered app (using Next.js server)
- Edge functions (using Vercel Edge Runtime)

## Environment Variables

```env
# Alpaca API (for trading and market data)
ALPACA_API_KEY=
ALPACA_API_SECRET=
ALPACA_API_URL=https://paper-api.alpaca.markets

# Database (for user data)
DATABASE_URL=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Analytics
NEXT_PUBLIC_GA_ID=
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Alpaca API Documentation](https://alpaca.markets/docs/)
- [Hanzo UI Documentation](https://github.com/hanzoai/react-sdk)
