import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  login,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/film/terminator-dark-fate`
const movieTitle = 'h1'
const watchTrailerButton = '.watch-trailer-button'
const investButton = '#tradeButton'
const watchlistButton = '#watchlistButton'
const buyTicketsButton = '#buyTicketsButton'

describe('Films', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultNavigationTimeout)
    // await login(page)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should add and remove movie to and from watchlist', async () => {
    await page.waitForSelector(watchlistButton)
    await page.click(watchlistButton)
    await waitForProperty(page, `${watchlistButton} > span.MuiButton-label`, 'innerText', 'Remove from watchlist')
    await page.click(watchlistButton)
    await waitForProperty(page, `${watchlistButton} > span.MuiButton-label`, 'innerText', 'Add to watchlist')
  })
})
