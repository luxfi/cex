import Hanzo from 'hanzo.js'

export default class Api {
  constructor(key, endpoint) {
    this.client = new Hanzo.Api({ key, endpoint })
  }
}

