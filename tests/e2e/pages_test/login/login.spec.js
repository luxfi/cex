/* global browser */
import { testUser } from '../../testfixtures'
import constants from '../../utils/constants'
import { deleteAllInputContent, getFullFilePath, waitForProperty } from '../../utils/helpers'

const { defaultNavigationTimeout, defaultSelectorTimeout } = constants

let page
let signinButtonElement
const url = 'http://localhost:8080/login'
const emailInput = 'input[name ="email"]'
const passwordInput = 'input[name ="password"]'
const signinButton = '#login-submit-button'
const errorMessageContainer = '.MuiSnackbarContent-message'

describe('Home page now funding', () => {
  beforeAll(async () => {
    page = await browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport({ width: 1280, height: 1024 })
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
    signinButtonElement = await page.waitFor(signinButton, defaultSelectorTimeout)
  })

  afterAll(async () => {
    await page.close()
  })

  xit('should not login user if an incorrect email or password is provided', async () => {
    await page.type(emailInput, testUser.email)
    await page.type(passwordInput, 'jsbdfskdkdsf')
    await signinButtonElement.click()

    // await page.waitForSelector(errorMessageContainer, { visible: true })

    await waitForProperty(page, errorMessageContainer, 'innerText', 'Error: Email or password is incorrect')
  })

  it('should successfully login user if the correct email and password is provided', async () => {
    await deleteAllInputContent(page, emailInput)
    await deleteAllInputContent(page, passwordInput)

    await page.type(emailInput, testUser.email)
    await page.type(passwordInput, testUser.password)
    await signinButtonElement.click()

    await page.waitFor('.MuiTabs-root', defaultSelectorTimeout)
  })
})
