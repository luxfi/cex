# @luxats/types

Shared TypeScript types for the Lux Exchange ecosystem.

## Overview

This package provides common type definitions used across all Lux Exchange applications including:
- Portfolio and investment types
- Trading and market data types
- User and account types

## Installation

This package is part of the Lux Exchange monorepo and is automatically available to all apps and packages within the workspace.

```typescript
import { PortfolioCompany, Asset, User } from '@luxats/types'
```

## Type Categories

### Portfolio Types
- `PortfolioCompany` - Investment portfolio company data
- `PortfolioMetrics` - Company performance metrics
- `InvestmentSector` - Investment sector categories
- `InvestmentStage` - Funding stage types
- `PortfolioSummary` - Aggregated portfolio statistics

### Trading Types
- `Asset` - Tradable asset information
- `Position` - Open position data
- `Order` - Trading order information
- `Trade` - Executed trade data
- `Portfolio` - Trading portfolio
- `MarketData` - Real-time market data
- `OptionContract` - Options contract details
- `LeapPromotion` - Promotional leap options

### User Types
- `User` - User account information
- `Account` - Trading account details
- `UserPreferences` - User settings and preferences
- `Session` - Authentication session data

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev

# Type checking
pnpm lint
```
