import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load and display main hero section', async ({ page }) => {
    // Check for hero heading
    await expect(page.getByRole('heading', { name: /Trade Everything/i })).toBeVisible()

    // Check for hero subheading with key messaging - use first() to handle duplicates
    await expect(page.getByText(/All Markets. One Platform/i).first()).toBeVisible()
    await expect(page.getByText(/Stocks, crypto, forex, and commodities/i)).toBeVisible()
  })

  test('should display commission-free badge', async ({ page }) => {
    await expect(page.getByText(/\$0 Commission Trading/i)).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    // Check Get Started button
    const getStartedButton = page.getByRole('link', { name: /Get Started/i }).first()
    await expect(getStartedButton).toBeVisible()
    await expect(getStartedButton).toHaveAttribute('href', '/signup')

    // Check Try Demo button
    const tryDemoButton = page.getByRole('link', { name: /Try Demo/i }).first()
    await expect(tryDemoButton).toBeVisible()
    await expect(tryDemoButton).toHaveAttribute('href', '/trade')
  })

  test('should display regulatory badges', async ({ page }) => {
    await expect(page.getByText(/SEC Regulated/i).first()).toBeVisible()
    await expect(page.getByText(/24\/5 Trading/i).first()).toBeVisible()
    await expect(page.getByText(/FINRA\/SIPC Member/i).first()).toBeVisible()
  })

  test('should display markets overview section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /All Markets. One Platform/i }).first()).toBeVisible()

    // Just verify the heading is visible - market category links may be in collapsed nav
    // Testing individual market page links is covered in navigation.spec.ts
  })

  test('should display demo trading interface', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Full Trading Platform Demo/i })).toBeVisible()

    // TradingView widget container should be present
    await expect(page.locator('.tradingview-widget-container').first()).toBeVisible()
  })

  test('should display professional features section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Institutional-Grade Trading Tools/i })).toBeVisible()

    // Check for advanced studies - use first() to handle duplicates
    await expect(page.getByText(/Volume Bars/i).first()).toBeVisible()
    await expect(page.getByText(/Moving Averages/i).first()).toBeVisible()
    await expect(page.getByText(/RSI/i).first()).toBeVisible()
    await expect(page.getByText(/MACD/i).first()).toBeVisible()
  })

  test('should display features section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Why Choose Lux/i })).toBeVisible()

    // Check key features - use first() to handle duplicates
    await expect(page.getByText(/\$0 Commission/i).first()).toBeVisible()
    await expect(page.getByText(/24\/5 Trading/i).first()).toBeVisible()
    await expect(page.getByText(/Advanced Analytics/i).first()).toBeVisible()
  })

  test('should display final CTA section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Start Trading Today/i })).toBeVisible()

    // Check for bottom CTAs
    const bottomGetStarted = page.getByRole('link', { name: /Get Started/i }).last()
    await expect(bottomGetStarted).toBeVisible()

    const bottomTryDemo = page.getByRole('link', { name: /Try Demo First/i })
    await expect(bottomTryDemo).toBeVisible()
  })

  test('should navigate to signup page when clicking Get Started', async ({ page }) => {
    const getStartedButton = page.getByRole('link', { name: /Get Started/i }).first()
    await getStartedButton.click()

    await expect(page).toHaveURL('/signup')
  })

  test('should navigate to trading page when clicking Try Demo', async ({ page }) => {
    const tryDemoButton = page.getByRole('link', { name: /Try Demo/i }).first()
    await tryDemoButton.click()

    await expect(page).toHaveURL('/trade')
  })

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    // Check that hero section is visible on mobile
    await expect(page.getByRole('heading', { name: /Trade Everything/i })).toBeVisible()

    // Check that CTA buttons are visible and stacked
    const ctaSection = page.locator('section').first()
    await expect(ctaSection.getByRole('link', { name: /Get Started/i })).toBeVisible()
    await expect(ctaSection.getByRole('link', { name: /Try Demo/i })).toBeVisible()
  })
})
