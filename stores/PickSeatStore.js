import { action, observable } from 'mobx'

import seats from '../assets/tempData/seats'

export default class PickSeatStore {
  @observable seats = []

  @observable selectedSeats = []

  @observable totalSeatsCount

  constructor() {
    this.seats = seats
    this.totalSeatsCount = 0
  }

  @action toggleSeatSelection(seatName, index) {
    this.seats[index].forEach((seat) => {
      if (seat.name === seatName) {
        seat.selected = !seat.selected
        if (seat.selected) {
          this.totalSeatsCount += 1
          this.selectedSeats.push(seat)
        }

        if (!seat.selected) {
          this.totalSeatsCount -= 1
          this.selectedSeats = this.selectedSeats.filter((selectedSeat) => selectedSeat.name !== seat.name)
        }
      }
    })
  }
}
