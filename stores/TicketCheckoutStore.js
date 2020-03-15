import { Commerce, Order } from 'commerce.js'
import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @observable ticketsCount = 0

  @observable ticketTransactions = []

  @observable currentPurchasedTicket = {}

  @observable paymentError = ''

  constructor(initialData = {}, hanzoApi) {
    this.api = hanzoApi
    this.tickets = tickets

    const ticketTransactions = JSON.parse(localStorage.getItem('ticketTransactions'))
    if (ticketTransactions && ticketTransactions.length) {
      this.ticketTransactions = ticketTransactions
    }
  }

  @action addTicket(categoryName) {
    const selectedTicket = this.tickets.find((ticket) => ticket.category === categoryName)
    if (selectedTicket) {
      const currentQuantity = selectedTicket.quantity
      selectedTicket.quantity = currentQuantity + 1
      this.subTotal += selectedTicket.price
      this.ticketsCount += 1
    }
  }

  @action removeTicket(categoryName) {
    const selectedTicket = this.tickets.find((ticket) => ticket.category === categoryName)
    if (selectedTicket) {
      const currentQuantity = selectedTicket.quantity
      selectedTicket.quantity = currentQuantity - 1
      this.subTotal -= selectedTicket.price
      this.ticketsCount -= 1
    }
  }

  @action isValidPurchasedTicket(ticketId) {
    const ticket = this.ticketTransactions.find((ticket) => parseInt(ticket.ticketId, 10) === parseInt(ticketId, 10))
    this.currentPurchasedTicket = ticket
    return ticket
  }

  @action sendTicketEmail(email, url) {
    // Handle sending of email
  }

  @action addTransaction(venueId, showtimeId, transactionId, ticketId, numberOfSeats, movieSlug, refHash) {
    const transaction = {
      venueId,
      showtimeId,
      transactionId,
      ticketId,
      numberOfSeats,
      movieSlug,
      date: new Date(),
      refHash,
    }

    this.ticketTransactions.push(transaction)
    localStorage.setItem('ticketTransactions', JSON.stringify(this.ticketTransactions))
  }

  @action async checkoutOrder(total, user, cardInfo, metadata) {
    this.paymentError = ''
    const commerceOrder = {
      currency: 'usd',
      subtotal: total * 100,
      mode: 'contribution',
      shippingAddress: (Object.keys(user.billingAddress).length) ? user.billingAddress : {
        line1: cardInfo.address1,
        city: cardInfo.city,
        state: cardInfo.state,
        postalCode: cardInfo.postalCode,
        country: cardInfo.country,
      },
      metadata,
    }

    const commerceUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    const payment = {
      account: {
        name: cardInfo.nameOnCard,
        number: cardInfo.creditCard,
        cvc: cardInfo.cvc,
        month: cardInfo.expiryMonth,
        year: cardInfo.expiryYear,
      },
    }

    const newCheckout = new Commerce(this.api, commerceOrder)
    newCheckout.user = Object.assign(newCheckout.user, commerceUser)

    try {
      const userOrder = await newCheckout.checkout(payment)
      return userOrder
    } catch (error) {
      this.paymentError = error.message
    }
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  @computed get numberOfSeats() {
    return this.tickets.length
  }

}
