import { test, expect } from '@playwright/test'

test.describe('Trading Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/trade')
    // Wait for TradingView widget to load
    await page.waitForLoadState('networkidle')
  })

  test('should load trading page with chart and order panel', async ({ page }) => {
    // Check for TradingView chart container
    const chartContainer = page.locator('#tradingview_chart')
    await expect(chartContainer).toBeVisible()

    // Check for trading panel
    const tradingPanel = page.locator('.w-96').filter({ hasText: 'Trade' })
    await expect(tradingPanel).toBeVisible()
  })

  test('should display all three tabs: Trade, Positions, Orders', async ({ page }) => {
    // Check tab buttons
    await expect(page.getByRole('button', { name: 'Trade' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Positions' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Orders' })).toBeVisible()
  })

  test('should display buying power on Trade tab', async ({ page }) => {
    // Verify we're on Trade tab
    const tradeTab = page.getByRole('button', { name: 'Trade' })
    await expect(tradeTab).toHaveClass(/border-b-2/)

    // Check for buying power display
    await expect(page.getByText('Buying Power')).toBeVisible()
    await expect(page.getByText(/\$100,000/)).toBeVisible()
  })

  test('should have Buy/Sell toggle buttons', async ({ page }) => {
    const buyButton = page.getByRole('button', { name: 'Buy', exact: true })
    const sellButton = page.getByRole('button', { name: 'Sell', exact: true })

    await expect(buyButton).toBeVisible()
    await expect(sellButton).toBeVisible()

    // Buy should be selected by default
    await expect(buyButton).toHaveClass(/bg-success/)
  })

  test('should toggle between Buy and Sell', async ({ page }) => {
    const buyButton = page.getByRole('button', { name: 'Buy', exact: true })
    const sellButton = page.getByRole('button', { name: 'Sell', exact: true })

    // Initially Buy is selected
    await expect(buyButton).toHaveClass(/bg-success/)

    // Click Sell
    await sellButton.click()
    await expect(sellButton).toHaveClass(/bg-danger/)
    await expect(buyButton).not.toHaveClass(/bg-success/)

    // Click Buy again
    await buyButton.click()
    await expect(buyButton).toHaveClass(/bg-success/)
    await expect(sellButton).not.toHaveClass(/bg-danger/)
  })

  test('should have Market and Limit order type buttons', async ({ page }) => {
    const marketButton = page.getByRole('button', { name: 'Market' })
    const limitButton = page.getByRole('button', { name: 'Limit' })

    await expect(marketButton).toBeVisible()
    await expect(limitButton).toBeVisible()

    // Market should be selected by default
    await expect(marketButton).toHaveClass(/bg-white\/10/)
  })

  test('should toggle between Market and Limit order types', async ({ page }) => {
    const marketButton = page.getByRole('button', { name: 'Market' })
    const limitButton = page.getByRole('button', { name: 'Limit' })

    // Initially Market is selected
    await expect(marketButton).toHaveClass(/bg-white\/10/)

    // Click Limit
    await limitButton.click()
    await expect(limitButton).toHaveClass(/bg-white\/10/)

    // Limit price input should appear
    const limitPriceInput = page.getByPlaceholder('0.00')
    await expect(limitPriceInput).toBeVisible()

    // Switch back to Market
    await marketButton.click()
    await expect(marketButton).toHaveClass(/bg-white\/10/)

    // Limit price input should be hidden
    await expect(limitPriceInput).not.toBeVisible()
  })

  test('should have shares input field', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')
    await expect(sharesInput).toBeVisible()
    await expect(sharesInput).toHaveValue('1')
  })

  test('should accept numeric input for shares', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')

    await sharesInput.clear()
    await sharesInput.fill('10')
    await expect(sharesInput).toHaveValue('10')
  })

  test('should have a place order button', async ({ page }) => {
    // Button text should include "Buy" and symbol
    const placeOrderButton = page.getByRole('button', { name: /Buy AAPL/i })
    await expect(placeOrderButton).toBeVisible()
  })

  test('should place a market buy order', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Enter shares
    await sharesInput.clear()
    await sharesInput.fill('5')

    // Place order
    await placeOrderButton.click()

    // Switch to Orders tab
    const ordersTab = page.getByRole('button', { name: 'Orders' })
    await ordersTab.click()

    // Verify order appears in history
    await expect(page.getByText('AAPL')).toBeVisible()
    await expect(page.getByText('filled')).toBeVisible()
    await expect(page.getByText('BUY')).toBeVisible()
  })

  test('should place a limit order', async ({ page }) => {
    // Switch to Limit order
    const limitButton = page.getByRole('button', { name: 'Limit' })
    await limitButton.click()

    const sharesInput = page.getByLabel('Shares')
    const limitPriceInput = page.getByLabel('Limit Price')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Enter order details
    await sharesInput.clear()
    await sharesInput.fill('10')
    await limitPriceInput.fill('240.50')

    // Place order
    await placeOrderButton.click()

    // Switch to Orders tab
    const ordersTab = page.getByRole('button', { name: 'Orders' })
    await ordersTab.click()

    // Verify limit order appears with 'open' status
    await expect(page.getByText('AAPL')).toBeVisible()
    await expect(page.getByText('open')).toBeVisible()
    await expect(page.getByText('$240.50')).toBeVisible()
  })

  test('should cancel an open limit order', async ({ page }) => {
    // Place a limit order first
    const limitButton = page.getByRole('button', { name: 'Limit' })
    await limitButton.click()

    const sharesInput = page.getByLabel('Shares')
    const limitPriceInput = page.getByLabel('Limit Price')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    await sharesInput.clear()
    await sharesInput.fill('5')
    await limitPriceInput.fill('240.00')
    await placeOrderButton.click()

    // Switch to Orders tab
    const ordersTab = page.getByRole('button', { name: 'Orders' })
    await ordersTab.click()

    // Cancel the order
    const cancelButton = page.getByRole('button', { name: 'Cancel Order' })
    await cancelButton.click()

    // Verify order status changed to cancelled
    await expect(page.getByText('cancelled')).toBeVisible()
  })

  test('should update positions after market buy order', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Place buy order
    await sharesInput.clear()
    await sharesInput.fill('10')
    await placeOrderButton.click()

    // Switch to Positions tab
    const positionsTab = page.getByRole('button', { name: 'Positions' })
    await positionsTab.click()

    // Verify position appears
    await expect(page.getByText('AAPL')).toBeVisible()
    await expect(page.getByText('10')).toBeVisible() // Shares count
  })

  test('should show empty state when no positions', async ({ page }) => {
    const positionsTab = page.getByRole('button', { name: 'Positions' })
    await positionsTab.click()

    await expect(page.getByText('No open positions')).toBeVisible()
  })

  test('should show empty state when no orders', async ({ page }) => {
    const ordersTab = page.getByRole('button', { name: 'Orders' })
    await ordersTab.click()

    await expect(page.getByText('No orders yet')).toBeVisible()
  })

  test('should display symbol info widget', async ({ page }) => {
    // Symbol info widget container should be present
    const symbolInfoContainer = page.locator('.tradingview-widget-container').nth(1)
    await expect(symbolInfoContainer).toBeVisible()
  })

  test('should reset form after placing order', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Enter shares
    await sharesInput.clear()
    await sharesInput.fill('20')

    // Place order
    await placeOrderButton.click()

    // Shares should reset to 1
    await expect(sharesInput).toHaveValue('1')
  })

  test('should disable place order button when shares is empty', async ({ page }) => {
    const sharesInput = page.getByLabel('Shares')
    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Clear shares
    await sharesInput.clear()

    // Button should be disabled
    await expect(placeOrderButton).toBeDisabled()
  })

  test('should disable place order button when limit price is empty for limit orders', async ({ page }) => {
    // Switch to Limit order
    const limitButton = page.getByRole('button', { name: 'Limit' })
    await limitButton.click()

    const placeOrderButton = page.getByRole('button', { name: /Buy/i }).last()

    // Button should be disabled when limit price is empty
    await expect(placeOrderButton).toBeDisabled()
  })

  test('should change button color based on buy/sell selection', async ({ page }) => {
    const buyButton = page.getByRole('button', { name: 'Buy', exact: true })
    const sellButton = page.getByRole('button', { name: 'Sell', exact: true })
    const placeOrderButton = page.getByRole('button', { name: /Buy|Sell/i }).last()

    // Initially should be green (buy)
    await expect(placeOrderButton).toHaveClass(/bg-success/)

    // Switch to sell
    await sellButton.click()

    // Should change to red
    await expect(placeOrderButton).toHaveClass(/bg-danger/)
  })
})
