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
const url = `${global.host}/film/shazam-2019`
const movieTitle = 'h1'
const watchTrailerButton = '.watch-trailer-button'
const investButton = '#tradeButton'
const watchlistButton = '#watchlistButton'
const buyTicketsButton = '#buyTicketsButton'
const ondemandLoginCloseBtn = '.MuiDialogTitle-root > button'

describe('Films', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultNavigationTimeout)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should contain trailer, trade, add to watchlist and buy movie ticket', async () => {
    await page.waitForSelector(watchTrailerButton)
    await page.waitForSelector(buyTicketsButton)
    await page.waitForSelector(investButton)
    await page.waitForSelector(watchlistButton)
  })

  it('should open the onDemand login modal when unauthenticated user tries to add to watchlist', async () => {
    await page.waitForSelector(watchlistButton)
    await page.click(watchlistButton)
    await page.waitForSelector(ondemandLoginCloseBtn)
  })

  xit('should add and remove movie to and from watchlist', async () => {
    await login(page)
    await waitForProperty(page, `${watchlistButton} > span.MuiButton-label`, 'innerText', 'ADD TO WATCHLIST')
    await page.click(investButton)
    await waitForProperty(page, `${watchlistButton} > span.MuiButton-label`, 'innerText', 'REMOVE FROM WATCHLIST')
  })
})
