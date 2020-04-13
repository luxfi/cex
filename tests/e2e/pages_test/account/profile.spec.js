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
const url = `${global.host}/account`
const address1 = 'input[name ="address1"]'
const address2 = 'input[name ="address2"]'
const city = 'input[name ="city"]'
const state = '#state'
const postalCode = 'input[name ="postalCode"]'
const country = '#country'
const phone = 'input[name ="phone"]'
const dayTradeProtection = '#mui-component-select-dayTradeProtection'
const employment = 'input[name ="employment"]'
const maritalStatus = 'input[name ="maritalStatus"]'
const dependants = 'input[name ="dependants"]'
const liquid = '#mui-component-select-liquid'
const netWorth = '#mui-component-select-netWorth'
const yearlyIncome = '#mui-component-select-yearlyIncome'
const goal = '#mui-component-select-goal'
const timeLine = '#mui-component-select-timeLine'
const experience = '#mui-component-select-experience'
const riskTolerence = '#mui-component-select-riskTolerence'
const liquidity = '#mui-component-select-liquidity'
const submitProfileButton = '.submitProfileButton'
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

  it('should load properly and have the same url with the selected nav item', async () => {
    await waitForProperty(page, '.Mui-selected', 'href', url)
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
    await selectFromDropDown(page, state, '.state', userProfile.state)
    await deleteOldContentAndType(page, postalCode, userProfile.postalCode)
    await selectFromDropDown(page, country, '.country', userProfile.country)
    await deleteOldContentAndType(page, phone, userProfile.phone)
    await selectFromDropDown(page, dayTradeProtection, '.dayTradeProtection', userProfile.dayTradeProtection)
    await selectRadioGroupOption(page, employment)
    await selectRadioGroupOption(page, maritalStatus)
    await deleteOldContentAndType(page, dependants, userProfile.dependants)
    await selectFromDropDown(page, liquid, '.liquid', userProfile.liquid)
    await selectFromDropDown(page, netWorth, '.netWorth', userProfile.netWorth)
    await selectFromDropDown(page, yearlyIncome, '.yearlyIncome', userProfile.yearlyIncome)
    await selectFromDropDown(page, goal, '.goal', userProfile.goal)
    await selectFromDropDown(page, timeLine, '.timeLine', userProfile.timeLine)
    await selectFromDropDown(page, experience, '.experience', userProfile.experience)
    await selectFromDropDown(page, riskTolerence, '.riskTolerence', userProfile.riskTolerence)
    await selectFromDropDown(page, liquidity, '.liquidity', userProfile.liquidity)
    await page.waitFor(submitProfileButton, defaultSelectorTimeout)
    await page.click(submitProfileButton)
    await waitForProperty(page, successMessageContainer, 'innerText', 'Profile updated successfully')
  })
})
