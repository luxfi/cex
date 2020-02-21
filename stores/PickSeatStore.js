import { action, computed, observable } from 'mobx'

import seats from '../assets/tempData/seats'

export default class PickSeatStore {
  seats = []

  constructor() {
    this.seats = seats
  }
}
