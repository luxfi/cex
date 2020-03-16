import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @observable ticketsCount = 0

  @observable ticketTransactions = []

  @observable currentPurchasedTicket = {}

  constructor(initialData = {}, hanzoApi) {
    this.api = hanzoApi
    this.tickets = tickets

    this.getTicketOrders()
  }

  @action async getTicketOrders() {
    const account = await this.api.account.get()
    if (account.orders && account.orders.length) {
      this.ticketTransactions = account.orders
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
    const orderedTicket = this.ticketTransactions.find((ticketOrder) => parseInt(ticketOrder.metadata.ticketId, 10) === parseInt(ticketId, 10))
    const ticket = orderedTicket || {}
    this.currentPurchasedTicket = ticket.metadata
    return ticket.metadata
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
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  @computed get numberOfSeats() {
    return this.tickets.length
  }

}
