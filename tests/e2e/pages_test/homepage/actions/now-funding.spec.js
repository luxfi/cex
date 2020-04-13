import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../../utils/constants'

let page
const url = global.host
const slideClass = '.slick-slide'
const watchTrailerButton = '.watch-trailer-button'

describe('Home page now funding', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
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
