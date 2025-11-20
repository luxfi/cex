# Lux Exchange Testing Guide

This document outlines the comprehensive testing strategy for the Lux Exchange (LUX) monorepo.

## Test Suite Overview

The project uses a multi-tiered testing approach:
- **Unit Tests**: Vitest for packages
- **E2E Tests**: Playwright for the main application
- **Coverage**: Both unit and integration test coverage

## Test Structure

```
luxats/web/
├── apps/
│   └── lux/
│       ├── tests/
│       │   └── e2e/           # Playwright E2E tests
│       │       ├── homepage.spec.ts
│       │       ├── trading.spec.ts
│       │       └── navigation.spec.ts
│       └── playwright.config.ts
├── packages/
│   ├── analytics/
│   │   ├── src/
│   │   │   ├── index.test.ts   # Analytics unit tests
│   │   │   └── test-setup.ts
│   │   └── vitest.config.ts
│   └── portfolio/
│       ├── src/
│       │   └── data.test.ts    # Portfolio unit tests
│       └── vitest.config.ts
```

## Running Tests

### All Tests (Recommended)
```bash
pnpm test
```

### Unit Tests Only

**Analytics Package** (26 tests):
```bash
pnpm --filter @luxats/analytics test
```

**Portfolio Package** (33 tests):
```bash
pnpm --filter @luxats/portfolio test
```

### E2E Tests Only

**All Browsers** (295 tests):
```bash
pnpm --filter @luxats/lux test
```

**Single Browser** (Chromium):
```bash
cd apps/lux && pnpm exec playwright test --project=chromium
```

**Interactive Mode**:
```bash
cd apps/lux && pnpm exec playwright test --ui
```

### Watch Mode

**Unit Tests**:
```bash
pnpm --filter @luxats/analytics test:watch
pnpm --filter @luxats/portfolio test:watch
```

### Coverage Reports

**Unit Test Coverage**:
```bash
pnpm --filter @luxats/analytics test:coverage
pnpm --filter @luxats/portfolio test:coverage
```

## Unit Test Details

### @luxats/analytics (26 tests)

Tests for the unified analytics package covering:
- **Initialization**: Google Analytics, Facebook Pixel, Twitter Pixel
- **Page View Tracking**: Path and title tracking
- **Event Tracking**: Custom events with categories, actions, labels, and values
- **Conversion Tracking**: Signup, login, trade, deposit, and lead conversions
- **Configuration**: All config options and enabled/disabled states
- **Event Parameters**: Required and optional parameters

**Key Test Files**:
- `packages/analytics/src/index.test.ts`

**Run Tests**:
```bash
cd packages/analytics
pnpm test
```

### @luxats/portfolio (33 tests)

Tests for portfolio data and utilities covering:
- **Data Integrity**: Company data structure and validation
- **Query Functions**: Get company by ID, sector, and stage
- **Summary Statistics**: Total companies, valuations, and distributions
- **Business Logic**: Sector and stage distribution calculations

**Key Test Files**:
- `packages/portfolio/src/data.test.ts`

**Run Tests**:
```bash
cd packages/portfolio
pnpm test
```

## E2E Test Details

### Homepage Tests (13 tests)
- Hero section display and CTAs
- Commission-free badge visibility
- Markets overview sections
- Professional features showcase
- Navigation to signup and demo pages
- Responsive design validation

### Trading Page Tests (29 tests)
- TradingView chart widget loading
- Order panel functionality (Buy/Sell toggles)
- Market vs Limit order types
- Shares input and validation
- Order placement and management
- Position tracking
- Order history and cancellation
- Form reset after order submission

### Navigation Tests (41 tests)
- Main navigation pages (pricing, help, learn, invest, news, about)
- Market pages (stocks, crypto, forex, futures, indices)
- Product pages (global marketplace, pro trader, elite pro trader)
- Download pages (Mac, Windows)
- Symbol detail pages
- Footer presence across all pages

### Browser Coverage
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Safari Desktop)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

**Run Specific Browser**:
```bash
cd apps/lux
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
pnpm exec playwright test --project="Mobile Chrome"
```

## Test Configuration

### Vitest Configuration

Both analytics and portfolio packages use Vitest with:
- **Environment**: jsdom for analytics (React components), node for portfolio
- **Coverage**: v8 provider with text, JSON, and HTML reports
- **Globals**: true (for describe, it, expect)

### Playwright Configuration

The E2E test suite uses Playwright with:
- **Base URL**: http://localhost:3001
- **Parallel Execution**: Full parallelization except on CI
- **Retries**: 2 retries on CI, 0 locally
- **Artifacts**: Screenshots and videos on failure
- **Web Server**: Automatically starts Next.js dev server

## Coverage Goals

- **Unit Tests**: Aim for 80%+ coverage on business logic
- **E2E Tests**: Cover critical user journeys
- **Integration**: Test package interactions in the main app

## Best Practices

### Writing Unit Tests
1. Test one thing per test
2. Use descriptive test names
3. Follow AAA pattern (Arrange, Act, Assert)
4. Mock external dependencies
5. Test edge cases and error conditions

### Writing E2E Tests
1. Use data-testid for stable selectors when needed
2. Test user flows, not implementation details
3. Keep tests independent and isolated
4. Use page object model for complex pages
5. Avoid hard-coded waits, use built-in waiting mechanisms

### Test Organization
1. Group related tests in describe blocks
2. Use beforeEach for common setup
3. Clean up after tests (afterEach)
4. Keep test files close to source code

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Manual workflow dispatch

**GitHub Actions Example**:
```yaml
- name: Install dependencies
  run: pnpm install

- name: Run unit tests
  run: pnpm test

- name: Run E2E tests
  run: pnpm --filter @luxats/lux test
```

## Debugging Tests

### Unit Tests
```bash
# Run with verbose output
pnpm --filter @luxats/analytics test -- --reporter=verbose

# Run specific test file
pnpm --filter @luxats/portfolio test data.test.ts

# Debug with VS Code
# Add breakpoints and run "Debug Test" in VS Code
```

### E2E Tests
```bash
# Run in headed mode
cd apps/lux && pnpm exec playwright test --headed

# Debug specific test
cd apps/lux && pnpm exec playwright test --debug trading.spec.ts

# View test report
cd apps/lux && pnpm exec playwright show-report
```

## Test Results Summary

✅ **Unit Tests**: 59/59 passing
- Analytics: 26/26 passing
- Portfolio: 33/33 passing

🔄 **E2E Tests**: Running across 5 browsers (295 total tests)
- Homepage: 13 test scenarios
- Trading: 29 test scenarios
- Navigation: 41 test scenarios

## Known Issues

1. Some homepage E2E tests may fail due to:
   - Text content changes in the actual app
   - TradingView widget loading delays
   - These are expected and tests can be updated to match current content

2. Symbol page tests may show warnings for:
   - Missing `generateStaticParams()` function (required for static export)
   - This doesn't affect test execution

## Future Improvements

- [ ] Add API mocking for trading endpoints
- [ ] Implement visual regression testing
- [ ] Add component-level testing with React Testing Library
- [ ] Increase unit test coverage to 90%+
- [ ] Add performance testing with Lighthouse
- [ ] Implement accessibility testing with axe-core

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://testingjavascript.com/)
- [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
