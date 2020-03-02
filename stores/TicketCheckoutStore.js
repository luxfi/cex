import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @observable ticketsCount = 1

  @observable ticketTransactions = []

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
      if (selectedTicket.category === 'Adult' && selectedTicket.quantity === 1) return
      const currentQuantity = selectedTicket.quantity
      selectedTicket.quantity = currentQuantity - 1
      this.subTotal -= selectedTicket.price
      this.ticketsCount -= 1
    }
  }

  @action addTransaction(venueId, showtimeId, transactionId, ticketId, numberOfSeats, movieSlug) {
    const transaction = {
      venueId,
      showtimeId,
      transactionId,
      ticketId,
      numberOfSeats,
      movieSlug,
    }

    if (this.ticketTransactions.length) {
      this.ticketTransactions.push(transaction)
    } else {
      this.ticketTransactions.push(transaction)
    }
    localStorage.setItem('ticketTransactions', JSON.stringify(this.ticketTransactions))
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  @computed get numberOfSeats() {
    return this.tickets.length
  }

  constructor() {
    this.tickets = tickets
    this.subTotal = tickets[0].price

    const ticketTransactions = JSON.parse(localStorage.getItem('ticketTransactions'))
    if (ticketTransactions && ticketTransactions.length) {
      this.ticketTransactions = ticketTransactions
    }
  }
}
