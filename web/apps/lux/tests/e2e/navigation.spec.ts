import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page).toHaveURL('/pricing')
  })

  test('should navigate to help page', async ({ page }) => {
    await page.goto('/help')
    await expect(page).toHaveURL('/help')
  })

  test('should navigate to learn page', async ({ page }) => {
    await page.goto('/learn')
    await expect(page).toHaveURL('/learn')
  })

  test('should navigate to invest page', async ({ page }) => {
    await page.goto('/invest')
    await expect(page).toHaveURL('/invest')
  })

  test('should navigate to news page', async ({ page }) => {
    await page.goto('/news')
    await expect(page).toHaveURL('/news')
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL('/about')
  })

  test('should navigate to institutional page', async ({ page }) => {
    await page.goto('/institutional')
    await expect(page).toHaveURL('/institutional')
  })

  test('should navigate to web trading page', async ({ page }) => {
    await page.goto('/web-trading')
    await expect(page).toHaveURL('/web-trading')
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL('/login')
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/signup')
    await expect(page).toHaveURL('/signup')
  })

  test('should navigate to terms page', async ({ page }) => {
    await page.goto('/terms')
    await expect(page).toHaveURL('/terms')
  })

  test('should navigate to privacy page', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page).toHaveURL('/privacy')
  })
})

test.describe('Market Pages', () => {
  test('should navigate to stocks market page', async ({ page }) => {
    await page.goto('/markets/stocks')
    await expect(page).toHaveURL('/markets/stocks')
  })

  test('should navigate to crypto market page', async ({ page }) => {
    await page.goto('/markets/crypto')
    await expect(page).toHaveURL('/markets/crypto')
  })

  test('should navigate to forex market page', async ({ page }) => {
    await page.goto('/markets/forex')
    await expect(page).toHaveURL('/markets/forex')
  })

  test('should navigate to futures market page', async ({ page }) => {
    await page.goto('/markets/futures')
    await expect(page).toHaveURL('/markets/futures')
  })

  test('should navigate to indices market page', async ({ page }) => {
    await page.goto('/markets/indices')
    await expect(page).toHaveURL('/markets/indices')
  })
})

test.describe('Product Pages', () => {
  test('should navigate to global marketplace product page', async ({ page }) => {
    await page.goto('/products/global-marketplace')
    await expect(page).toHaveURL('/products/global-marketplace')
  })

  test('should navigate to pro trader product page', async ({ page }) => {
    await page.goto('/products/pro-trader')
    await expect(page).toHaveURL('/products/pro-trader')
  })

  test('should navigate to elite pro trader product page', async ({ page }) => {
    await page.goto('/products/elite-pro-trader')
    await expect(page).toHaveURL('/products/elite-pro-trader')
  })
})

test.describe('Download Pages', () => {
  test('should navigate to download page', async ({ page }) => {
    await page.goto('/download')
    await expect(page).toHaveURL('/download')
  })

  test('should navigate to Mac download page', async ({ page }) => {
    await page.goto('/download/mac')
    await expect(page).toHaveURL('/download/mac')
  })

  test('should navigate to Windows download page', async ({ page }) => {
    await page.goto('/download/windows')
    await expect(page).toHaveURL('/download/windows')
  })
})

test.describe('Symbol Pages', () => {
  test('should navigate to symbol detail page', async ({ page }) => {
    await page.goto('/symbol/AAPL')
    await expect(page).toHaveURL('/symbol/AAPL')
  })

  test('should navigate to different symbol pages', async ({ page }) => {
    const symbols = ['TSLA', 'GOOGL', 'MSFT', 'AMZN']

    for (const symbol of symbols) {
      await page.goto(`/symbol/${symbol}`)
      await expect(page).toHaveURL(`/symbol/${symbol}`)
    }
  })
})

test.describe('Footer Navigation', () => {
  test('should have footer on all pages', async ({ page }) => {
    const pages = [
      '/',
      '/trade',
      '/pricing',
      '/help',
      '/about',
    ]

    for (const pagePath of pages) {
      await page.goto(pagePath)
      // Footer component from @luxats/ui should be present
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    }
  })
})
