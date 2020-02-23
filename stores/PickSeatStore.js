import { action, computed, observable } from 'mobx'

import seats from '../assets/tempData/seats'

export default class PickSeatStore {
  @observable seats = []

  @observable selectedSeats = []

  constructor() {
    this.seats = seats
  }

  @action toggleSeatSelection(seatName, index) {
    this.seats[index].forEach((seat) => {
      if (seat.name === seatName) {
        seat.selected = !seat.selected
      }
    })
  }
}
