/* global browser */
import { defaultNavigationTimeout, defaultSelectorTimeout } from '../../../utils/constants'

let page
const url = 'http://localhost:3000'
const slideClass = '.slick-slide'
const watchTrailerButton = '.watch-trailer-button'

describe('Home page now funding', () => {
  beforeAll(async () => {
    page = await browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport({ width: 1280, height: 1024 })
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
  })

  afterAll(async () => {
    await page.close()
  })

  it('should contain a list of movie cards', async () => {
    const movieCard = await page.waitFor(slideClass, defaultSelectorTimeout)
    await movieCard.click()
    await page.waitFor(watchTrailerButton, defaultSelectorTimeout)
  })
})
