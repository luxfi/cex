import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @observable ticketsCount = 1

  @observable ticketTransactions = []

  @observable currentPurchasedTicket = {}

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

  @action isValidPurchasedTicket(ticketId) {
    const ticket = this.ticketTransactions.find((ticket) => ticket.ticketId === ticketId)
    this.currentPurchasedTicket = ticket
    return ticket
  }

  @action sendTicketEmail(email, url) {
    // Handle sending of email
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  constructor() {
    this.tickets = tickets
    this.subTotal = tickets[0].price
  }
}
