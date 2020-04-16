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
const url = `${global.host}/account/orders`
const orderLink = 'order-link'
const orderButton = 'orderButton'

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

  it('should load properly and have the same url with the selected nav item', async () => {
    await waitForProperty(page, '.Mui-selected', 'href', url)
  })

  it('should go to order details page when the order link is clicked', async () => {
    await page.waitFor(orderLink, defaultSelectorTimeout)
    await page.click(orderLink)
    await waitForProperty(page, 'h4', 'innerText', "You're all set")
  })

  it('should go to order details page when the see details button is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitFor(orderButton, defaultSelectorTimeout)
    await page.click(orderButton)
  })
})
