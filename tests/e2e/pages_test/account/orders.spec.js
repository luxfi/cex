import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  getElementForSelector,
  login,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/account/orders`
const orderLink = '.order-link'
const orderButton = '.orderButton'

describe('User Orders', () => {
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

  it('should go to order details page when the order link is clicked', async () => {
    const order = await getElementForSelector(page, orderLink)
    await order.click()
    await waitForProperty(page, 'h4', 'innerText', "You're all set")
  })

  it('should go to order details page when the see details button is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    const order = await getElementForSelector(page, orderButton)
    await order.click()
    await waitForProperty(page, 'h4', 'innerText', "You're all set")
  })
})
