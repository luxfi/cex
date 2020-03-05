import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @observable ticketsCount = 0

  @observable ticketTransactions = []

  @observable currentPurchasedTicket = {}

  constructor() {
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
      refHash
    }

    this.ticketTransactions.push(transaction)
    localStorage.setItem('ticketTransactions', JSON.stringify(this.ticketTransactions))
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  @computed get numberOfSeats() {
    return this.tickets.length
  }

}

