import {
  defaultNavigationTimeout,
  defaultViewport,
} from '../../utils/constants'
import {
  login,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/portfolio/rewards`
const copyButton = '#copyButton'

describe('Portfolio Rewards', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultNavigationTimeout)
    await login(page)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should allow copying of referral link', async () => {
    await page.waitForSelector(copyButton)
    await page.click(copyButton)
    await waitForProperty(page, '.MuiSnackbarContent-message', 'innerText', 'copied')
    const newPage = await global.browser.newPage()
    await newPage.goto(url, defaultNavigationTimeout)
  })
})
