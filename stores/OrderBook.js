import { action, observable, computed } from 'mobx'
import _ from 'lodash'
// import io from 'socket.io-client'
const LimitOrder = require('limit-order-book').LimitOrder
const LimitOrderBook = require('limit-order-book').LimitOrderBook

export default class OrderBook {
  @observable ticker = ''
  @observable connected = false

  constructor(initialData = {
    ticker: '',
    connected: false
  }) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
  }

  // For DEMO
  @action initiateDataGenerator (ticker='MDMXFR') {
    this.ticker = ticker
    this.connected = true

    let order1 = new LimitOrder("order01", "bid", 13.37, 10)
    let order2 = new LimitOrder("order02", "ask", 13.38, 10)
    let order3 = new LimitOrder("order03", "bid", 13.38, 5)
    
    let book = new LimitOrderBook()
    
    let result = book.add(order1)
    result = book.add(order2)
    result = book.add(order3)
    
    console.log(result)

    this.dataGenerator = setInterval(
      () => {
        console.log('Generating some data!')
      },
      2500
    ) // Some data generator
  }

  @action terminateDataGenerator () {
    clearInterval(this.dataGenerator)
    this.connected = false
  }

  @action setTicker(ticker) {
    this.ticker = ticker;
  }

  @computed get orders() {
      return this.orders
  }

  @computed get buyOrders () {
    return []
  }

  @computed get sellOrders () {
    return []
  }

  // For later
  // @action setupSocket () {
  //   // Connect socket
  //   console.log('Setting up the socket')
  //   this.io = io('http://localhost:3000/feed')
  //   this.roomId = `feed`

  //   this.io.on('response', (d) => {
  //     console.log(`We have a response!`, d)
  //     this.io.emit('join data feed', { roomId: this.roomId })
  //   })

  //   this.io.on('join success', (d) => {
  //     console.log(`Joined data feed! Let's goooooo`, d)
  //   })
  // }

  // @computed get isConnected () {
  //   return this.connected
  // }

}
