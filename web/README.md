# Lux Exchange

Trading platform ecosystem for Lux Exchange.

## Project Structure

```
luxats/
├── apps/
│   └── lux/          # Lux Exchange app
└── packages/
    ├── analytics/     # Analytics tracking
    ├── portfolio/     # Portfolio data and utilities
    ├── types/         # Shared TypeScript types
    └── ui/            # Shared UI components
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build all packages and apps
pnpm build

# Run tests
pnpm test
```

## Development

The lux app runs on port 3001 by default:
```bash
cd apps/lux
pnpm dev
```
