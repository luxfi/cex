import {
  defaultNavigationTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'

import {
  login,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/offering/saw-9`
const investInput = '#investInput'
const investmentSubmit = '#investmentSubmit'
const notificationContainer = '#client-snackbar'

describe('Offering', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should allow user make an investment', async () => {
    await page.waitForSelector(investInput)
    await page.type(investInput, '10000')
    await page.waitForSelector(investmentSubmit)
    await page.click(investmentSubmit)
    await login(page)
    await page.click(investmentSubmit)
    await waitForProperty(page, notificationContainer, 'innerText', 'Your investment was successful')
  })
})
