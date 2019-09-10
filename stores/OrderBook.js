import { action, observable, computed } from 'mobx'
import _ from 'lodash'
// import io from 'socket.io-client'
const LimitOrder = require('limit-order-book').LimitOrder
const LimitOrderBook = require('limit-order-book').LimitOrderBook

const bidAsk = () => {
  return (Math.floor(Math.random() * 2) == 0) ? 'bid' : 'ask'
}

const newPrice = (x, range) => {
  let r = range || Math.random();
  return (x + Math.random() * 0.2 * r).toFixed(2)
}

const generateOrderSize = () => {
  return (Math.random() * 100).toFixed(2)
}

export default class OrderBook {
  @observable ticker = ''
  @observable connected = false
  @observable takeResults = []

  constructor(initialData = {
    ticker: '',
    connected: false,
    takeResults: []
  }) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.takeResults = initialData.takeResults
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    this.ticker = ticker
    this.connected = true


    let result;
    let book = new LimitOrderBook()
    let id = 0;
    let size = generateOrderSize();

    result = this.generateOrders(ticker, 2000, book, id, price, size)
    console.log(result)

    // this.dataGenerator = setInterval(
    //   () => {
    //     id++;
    //     size = this.generateOrderSize();
    //     // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
    //     result = this.generateOrderAndAdd(book, id, price, size)
    //     console.log(result)
    //   },
    //   2500
    // ) // Some data generator
  }

  @action terminateDataGenerator() {
    clearInterval(this.dataGenerator)
    this.connected = false
  }

  @action setTicker(ticker) {
    this.ticker = ticker;
  }

  @computed get orders() {
    return this.orders
  }

  @computed get buyOrders() {
    return []
  }

  @computed get sellOrders() {
    return []
  }

  @action generateOrderAndAdd(book, id, price, size) {
    const order = new LimitOrder(`order${id}`, bidAsk(), newPrice(price), size)
    let result = book.add(order)
    debugger
    this.takeResults.push(result)
    return result
  }

  @action generateOrders(ticker, numberOfOrders, book, idNumber = 1, price, size) {
    let n = 0;
    let id;
    while (n < numberOfOrders - 1) {
      id = `${ticker}${idNumber}`
      this.generateOrderAndAdd(book, id, price, size)
      idNumber++
      n++
    }
    return this.generateOrderAndAdd(book, id, price, size)
  }

  generatefullDay(book) {
    // estimate between 200 and 2000 trades a day
  }

  generatefullWeek(book) {
    //
  }

  generatefullMonth(book) {

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
