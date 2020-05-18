import { userProfile } from '../../testfixtures'
import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  login,
  selectFromDropDown,
  selectRadioGroupOption,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/account?tab=1`
const address1 = 'input[name ="address1"]'
const address2 = 'input[name ="address2"]'
const city = 'input[name ="city"]'
const state = '#state'
const postalCode = 'input[name ="postalCode"]'
const country = '#country'
const phone = 'input[name ="phone"]'
const dayTradeProtection = '[name="dayTradeProtection"]'
const employment = 'input[name ="employment"]'
const maritalStatus = 'input[name ="maritalStatus"]'
const dependants = 'input[name ="dependants"]'
const liquid = '[name="liquid"]'
const netWorth = '[name="netWorth"]'
const yearlyIncome = '[name="yearlyIncome"]'
const goal = '[name="goal"]'
const timeLine = '[name="timeLine"]'
const experience = '[name="experience"]'
const riskTolerence = '[name="riskTolerence"]'
const liquidity = '[name="liquidity"]'
const submitProfileButton = '#submitProfileButton'
const successMessageContainer = '.MuiSnackbarContent-message'

describe('User Account', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
    await login(page)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should display in red for validated fields with error', async () => {
    await deleteOldContentAndType(page, postalCode, 'sometext')
    await deleteOldContentAndType(page, phone, 'sometext')

    await page.evaluate(() => document.getElementById('postalCode-label').classList.contains('Mui-error'))
    await page.evaluate(() => document.getElementById('phone-label').classList.contains('Mui-error'))
  })

  it('should successfully update profile form', async () => {
    await deleteOldContentAndType(page, address1, userProfile.address1)
    await deleteOldContentAndType(page, address2, userProfile.address2)
    await deleteOldContentAndType(page, city, userProfile.city)
    await page.select(state, userProfile.state)
    await deleteOldContentAndType(page, postalCode, userProfile.postalCode)
    await selectFromDropDown(page, country, '.country', userProfile.country)
    await deleteOldContentAndType(page, phone, userProfile.phone)

    await selectRadioGroupOption(page, employment)
    await selectRadioGroupOption(page, maritalStatus)
    await deleteOldContentAndType(page, dependants, userProfile.dependants)

    await page.select(dayTradeProtection, userProfile.dayTradeProtection)

    await selectRadioGroupOption(page, liquid)
    await selectRadioGroupOption(page, netWorth)
    await selectRadioGroupOption(page, yearlyIncome)

    await selectRadioGroupOption(page, goal)
    await selectRadioGroupOption(page, timeLine)
    await selectRadioGroupOption(page, experience)
    await selectRadioGroupOption(page, riskTolerence)
    await selectRadioGroupOption(page, liquidity)

    await page.waitFor(submitProfileButton, defaultSelectorTimeout)
    await page.click(submitProfileButton)
    await waitForProperty(page, successMessageContainer, 'innerText', 'Profile updated successfully')
  })
})
