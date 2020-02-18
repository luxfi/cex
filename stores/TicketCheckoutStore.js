import { action, computed, observable } from 'mobx'

import tickets from '../assets/tempData/tickets'

export default class TicketCheckoutStore {
  serviceFee = 1.7

  @observable subTotal = 0

  @observable tickets = []

  @action addTicket(categoryName) {
    const selectedTicket = this.tickets.find((ticket) => ticket.category === categoryName)
    if (selectedTicket) {
      const currentQuantity = selectedTicket.quantity
      selectedTicket.quantity = currentQuantity + 1
      this.subTotal += selectedTicket.price
    }
  }

  @action removeTicket(categoryName) {
    const selectedTicket = this.tickets.find((ticket) => ticket.category === categoryName)
    if (selectedTicket) {
      if (selectedTicket.category === 'Adult' && selectedTicket.quantity === 1) return
      const currentQuantity = selectedTicket.quantity
      selectedTicket.quantity = currentQuantity - 1
      this.subTotal -= selectedTicket.price
    }
  }

  @computed get total() {
    return this.subTotal + this.serviceFee
  }

  constructor() {
    this.tickets = tickets
    this.subTotal = tickets[0].price
  }
}
