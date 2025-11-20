# @luxats/portfolio

Shared portfolio data and utilities for the Lux Exchange ecosystem.

## Overview

This package contains the centralized portfolio data for Lux Exchange Ventures' investment portfolio. It provides:
- Portfolio company data
- Helper functions for filtering and querying companies
- Portfolio summary statistics

All apps in the monorepo can import this package to access the same portfolio data, ensuring consistency across the marketing site (BAV) and trading platform (LUX).

## Installation

This package is part of the Lux Exchange monorepo and is automatically available to all apps.

```typescript
import { 
  portfolioCompanies, 
  getPortfolioCompany,
  getCompaniesBySector,
  getPortfolioSummary 
} from '@luxats/portfolio'
```

## Usage

### Get all portfolio companies

```typescript
import { portfolioCompanies } from '@luxats/portfolio'

console.log(portfolioCompanies) // Array of all portfolio companies
```

### Get a specific company

```typescript
import { getPortfolioCompany } from '@luxats/portfolio'

const spacex = getPortfolioCompany('spacex')
console.log(spacex.name) // "SpaceX"
```

### Filter by sector

```typescript
import { getCompaniesBySector } from '@luxats/portfolio'

const aiCompanies = getCompaniesBySector('ai')
console.log(aiCompanies.length) // Number of AI companies
```

### Get portfolio summary

```typescript
import { getPortfolioSummary } from '@luxats/portfolio'

const summary = getPortfolioSummary()
console.log(summary.totalCompanies) // Total number of companies
console.log(summary.totalValue) // Total portfolio valuation
console.log(summary.sectorDistribution) // Distribution across sectors
```

## Data Structure

Each portfolio company includes:
- Basic information (id, name, description)
- Investment details (sector, stage, date)
- Metrics and performance data
- Updates and milestones

See `@luxats/types` for the complete `PortfolioCompany` type definition.

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev

# Type checking
pnpm lint
```
