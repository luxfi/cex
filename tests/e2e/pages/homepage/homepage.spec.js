/* global browser */
import { defaultNavigationTimeout, defaultSelectorTimeout } from '../../utils/constants'

let page
const url = 'http://localhost:3000'


describe('Home page', () => {
  beforeAll(async () => {
    page = await browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport({ width: 1280, height: 1024 })
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
  })

  afterAll(async () => {
    await page.close()
  })

  it('should return a 200 status code when visited', async () => {
    await page.on('response', (response) => {
      expect(response.status()).toEqual(200)
    })
  })
  it('should be titled "ESX | Entertainment Stock X"', async () => {
    await expect(page.title()).resolves.toMatch('ESX | Entertainment Stock X')
  })
})
