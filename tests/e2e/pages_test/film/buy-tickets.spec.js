import { userProfile, validCreditCard } from '../../testfixtures'
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
const url = `${global.host}/film/shazam-2019`
const buyTicketsButton = '#buyTicketsButton'
const watchlistButton = '#watchlist-button'
const dateSelectButton = '#dateSelect'
const dates = '.selectDate'
const openLocationButton = '#openLocationButton'
const currentLocation = '#currentLocation'
const formatsButton = '#formatsButton'
const allFormatsItem = '#allFormats'
const movieTime = '.venue li:first-child > button'
const addTicketButton = 'td > button.add-button'
const pickSeatsButton = '#pickSeatsButton'
const seats = '.seats > button'
const nextButton = '#nextButton'
const addPaymentButton = '#addPaymentButton'
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
const paymentMethod = '.payment-method'
const buyButton = '#buyButton'


describe('Tickets', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultNavigationTimeout)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should be accessible from the film by clicking on the ticket button', async () => {
    await page.waitForSelector(buyTicketsButton)
    await page.click(buyTicketsButton)
    await page.waitForSelector(watchlistButton)
  })

  it('should allow users select by date', async () => {
    await page.waitForSelector(dateSelectButton)
    await page.click(dateSelectButton)
    const movieDate = await getElementForSelector(page, dates)
    await movieDate.click()
  })

  it('should allow users select by location', async () => {
    await page.waitForSelector(openLocationButton)
    await page.click(openLocationButton)
    await page.waitForSelector(currentLocation)
    await page.click(currentLocation)
  })

  it('should allow users select by format', async () => {
    await page.waitForSelector(formatsButton)
    await page.click(formatsButton)
    await page.waitForSelector(allFormatsItem)
    await page.click(allFormatsItem)
  })

  it('should allow users select movie time', async () => {
    const movieShowingTime = await getElementForSelector(page, movieTime)
    await movieShowingTime.click()
    await page.waitForSelector(addTicketButton)
  })

  it('should allow users add ticket', async () => {
    await page.evaluate((addTicketButton) => {
      const seatButton = document.querySelector(addTicketButton)
      seatButton.click()
    }, addTicketButton)
    await page.waitForSelector(pickSeatsButton)
    await page.click(pickSeatsButton)
  })

  it('should allow user select seats', async () => {
    await page.waitForSelector(seats)
    await page.evaluate((movieSeats) => {
      const allSeats = document.querySelector(movieSeats)
      allSeats.click()
    }, seats)

    await page.waitForSelector(nextButton)
    await page.click(nextButton)
    await login(page)
    await page.click(nextButton)
  })

  it('should allow user add a payment method', async () => {
    await page.waitForSelector(addPaymentButton)
    await page.click(addPaymentButton)
    await page.waitForSelector(debitCardButton)
    await page.click(debitCardButton)

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

    await page.waitFor(2000)
    await page.evaluate((selectedPaymentMethod) => {
      const payment = document.querySelector(selectedPaymentMethod)
      payment.click()
    }, paymentMethod)

    await page.waitForSelector(buyButton)
    await page.$eval(buyButton, (el) => el.click())
    await page.waitForFunction(() => document.querySelector('.print-area'))
  })
})
