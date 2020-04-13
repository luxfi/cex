import {
  defaultNavigationTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'

let page
const url = global.host

describe('Home page', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
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
