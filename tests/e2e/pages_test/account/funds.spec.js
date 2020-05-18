import { invalidCreditCard, userProfile, validCreditCard } from '../../testfixtures'
import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  getElementForSelector,
  login,
  selectFromDropDown,
  waitForElementToHide,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/account?tab=2`
const removeAccountButton = '#removeLinkedAccountButton'
const removeLinkedCardButton = '#removeLinkedCardButton'
const addPaymentMethodButton = '#addPaymentMethodButton'
const bankAccountButton = '#bankAccountButton'
const debitCardButton = '#debitCardButton'
const nameOnCard = '#nameOnCard'
const creditCard = '#creditCard'
const expiryMonth = '#expiryMonth'
const expiryYear = '#expiryYear'
const cvc = '#cvc'
const address1 = '#address1'
const address2 = '#address2'
const city = '#city'
const state = '#state'
const postalCode = '#postalCode'
const country = '#country'
const addCreditCardButton = '#credit-card-payment'
const addBankMethodName = '#payment-method-name'
const addBankPaymentMethodButton = '#addBankPaymentMethod'

const amountInput = '#add-new-funds'
const manageFundSubmit = '#manageFundSubmit'
const sendFrom = '#sendFrom'
const sendTo = '#sendTo'

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

  it('should not allow user add an invalid card', async () => {
    // const removeButton = await getElementForSelector(page, removeLinkedCardButton)
    // if (removeButton) {
    //   await removeButton.click()
    // }

    await page.click(addPaymentMethodButton)
    await page.waitForSelector(debitCardButton)
    await page.click(debitCardButton)

    await deleteOldContentAndType(page, nameOnCard, invalidCreditCard.nameOnCard)
    await deleteOldContentAndType(page, creditCard, invalidCreditCard.cardNumber)
    await deleteOldContentAndType(page, expiryMonth, invalidCreditCard.expiryMonth)
    await deleteOldContentAndType(page, expiryYear, invalidCreditCard.expiryYear)
    await deleteOldContentAndType(page, cvc, invalidCreditCard.cvc)
    await deleteOldContentAndType(page, address1, userProfile.address1)
    await deleteOldContentAndType(page, address2, userProfile.address2)
    await deleteOldContentAndType(page, city, userProfile.city)
    await selectFromDropDown(page, state, '', userProfile.state)
    await deleteOldContentAndType(page, postalCode, userProfile.postalCode)
    await selectFromDropDown(page, country, '', userProfile.country)
    await page.waitFor(addCreditCardButton, defaultSelectorTimeout)
    await page.click(addCreditCardButton)
    await waitForProperty(page, '.MuiTypography-colorError', 'innerText', 'Invalid card details, try again')
  })

  it('should allow user successfully add a valid card as a payment method', async () => {
    await deleteOldContentAndType(page, nameOnCard, validCreditCard.nameOnCard)
    await deleteOldContentAndType(page, creditCard, validCreditCard.cardNumber)
    await deleteOldContentAndType(page, expiryMonth, validCreditCard.expiryMonth)
    await deleteOldContentAndType(page, expiryYear, validCreditCard.expiryYear)
    await deleteOldContentAndType(page, cvc, validCreditCard.cvc)
    await deleteOldContentAndType(page, address1, userProfile.address1)
    await deleteOldContentAndType(page, address2, userProfile.address2)
    await deleteOldContentAndType(page, city, userProfile.city)
    await selectFromDropDown(page, state, '', userProfile.state)
    await deleteOldContentAndType(page, postalCode, userProfile.postalCode)
    await selectFromDropDown(page, country, '', userProfile.country)
    await page.waitFor(addCreditCardButton, defaultSelectorTimeout)
    await page.click(addCreditCardButton)
    await waitForElementToHide(page, '.MuiDialogContent-root form')
  })

  it('should allow user make a deposit ', async () => {
    await page.waitFor(2000)
    await deleteOldContentAndType(page, amountInput, '1000')
    await page.waitForSelector(manageFundSubmit)
    await page.click(manageFundSubmit)
  })

  it('should allow user make a withdrawal ', async () => {
    await selectFromDropDown(page, sendFrom, '.sendFromItem', 'esx')
    await selectFromDropDown(page, sendTo, '.sendToItem', '0XxFJPXQ1fAg9O2')
    await deleteOldContentAndType(page, amountInput, '1000')
    await page.waitForSelector(manageFundSubmit)
    await page.click(manageFundSubmit)
  })

  xit('should successfully add a bank payment method', async () => {
    // const removeButton = await getElementForSelector(page, removeAccountButton)
    // if (removeButton) {
    //   await removeButton.click()
    // }

    await page.click(addPaymentMethodButton)
    await page.waitForSelector(bankAccountButton)
    await page.click(bankAccountButton)

    await deleteOldContentAndType(page, addBankMethodName, 'bank method name')
    await page.waitForSelector(addBankPaymentMethodButton)
    page.click(addBankPaymentMethodButton)

    await page.waitForSelector('iframe')
    const elementHandle = await page.$('iframe')
    const plaidFrame = elementHandle[elementHandle.length - 1].contentFrame()
    await plaidFrame.waitForSelector('.Button.Button--is-plaid-color')
    page.click('.Button.Button--is-plaid-color')
  })
})
