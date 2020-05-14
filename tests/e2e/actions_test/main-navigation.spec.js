import {
  defaultNavigationTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../utils/constants'

import {
  getElementForSelector,
  waitForProperty,
} from '../utils/helpers'

let page
const url = global.host
const searchButton = '.search-button'
const ondemandLoginCloseBtn = '.MuiDialogTitle-root > button'

describe('Main navigation', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should go to rewards page when the earn menu item is clicked', async () => {
    const earnButton = await getElementForSelector(page, '.menu-button:nth-of-type(2)')
    await earnButton.click()
    await page.waitFor('input[name ="email"]')
  })

  it('should go to home page when the discover menu item is clicked', async () => {
    await page.waitForSelector(ondemandLoginCloseBtn)
    await page.click(ondemandLoginCloseBtn)
    const discoverButton = await getElementForSelector(page, '.menu-button:nth-of-type(1)')
    await discoverButton.click()
    await page.waitFor('.watch-trailer-button')
  })

  it('should go to offerings page when the invest menu item is clicked', async () => {
    const investButton = await getElementForSelector(page, '.menu-button:nth-of-type(3)')
    await investButton.click()
    await page.waitFor('.video')
  })

  it('should go to pro trade page when the trade menu item is clicked', async () => {
    const tradeButton = await getElementForSelector(page, '.menu-button:nth-of-type(4)')
    await tradeButton.click()
    await page.waitFor('#orderBookScroll')
  })

  it('should open browse page when the search button is clicked', async () => {
    const searchBtn = await getElementForSelector(page, searchButton)
    await searchBtn.click()
    waitForProperty(page, '.MuiTabs-fixed > .MuiTabs-flexContainer > .Mui-selected > span', 'innerText', 'All Films')
  })
})
