/* global browser */
import { testUser } from '../../testfixtures'
import { defaultNavigationTimeout, defaultSelectorTimeout } from '../../utils/constants'

let page
const url = 'http://localhost:3000/login'
const emailInput = 'input[name ="email"]'
const passwordInput = 'input[name ="password"]'
const signinButton = '#login-submit-button'


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

  it.only('should contain a list of movie cards', async () => {
    const signinButtonElement = await page.waitFor(signinButton, defaultSelectorTimeout)

    await page.type(emailInput, testUser.email)
    await page.type(passwordInput, testUser.password)
    await signinButtonElement.click()

    await page.waitFor('.MuiTabs-root', defaultSelectorTimeout)
  })
})
