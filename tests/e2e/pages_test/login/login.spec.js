import { testUser } from '../../testfixtures'
import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  waitForProperty,
} from '../../utils/helpers'

let page
let signinButtonElement
const url = `${global.host}/login`
const emailInput = 'input[name ="email"]'
const passwordInput = 'input[name ="password"]'
const signinButton = '#login-submit-button'
const errorMessageContainer = '.MuiSnackbarContent-message'

describe('Home page now funding', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
    signinButtonElement = await page.waitFor(signinButton, defaultSelectorTimeout)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should not login user if an incorrect email or password is provided', async () => {
    await page.type(emailInput, testUser.email)
    await page.type(passwordInput, 'jsbdfskdkdsf')
    await signinButtonElement.click()

    await waitForProperty(page, errorMessageContainer, 'innerText', 'Error: Email or password is incorrect')
  })

  it('should successfully login user if the correct email and password is provided', async () => {
    await deleteOldContentAndType(page, emailInput, testUser.email)
    await deleteOldContentAndType(page, passwordInput, testUser.password)
    await signinButtonElement.click()

    await page.waitFor('.MuiTabs-root', defaultSelectorTimeout)
    await waitForProperty(page, '.Mui-selected', 'href', `${global.host}/portfolio`)
  })
})
