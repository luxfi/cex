import { action, observable, computed } from 'mobx'
import _ from 'lodash'
// import io from 'socket.io-client'
const LimitOrder = require('limit-order-book').LimitOrder
const LimitOrderBook = require('limit-order-book').LimitOrderBook

const bidAsk = () => {
  return (Math.floor(Math.random() * 2) == 0) ? 'bid' : 'ask' // 50/50 chance of "bid" or "ask"
}

const generateOrderSize = () => {
  return (Math.random() * 100).toFixed(0) // random 1 through 100
}

export default class OrderBook {
  @observable ticker = ''
  @observable connected = false
  @observable takeResults = []
  @observable price = 13.37
  @observable high = 13.37
  @observable low = 13.37
  @observable printInterval = 5

  constructor(initialData = {
    ticker: '',
    connected: false,
    takeResults: [],
    price: 13.37,
    high: 13.37,
    low: 13.37,
    printInterval: 5
  }) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.takeResults = initialData.takeResults || []
    this.price = initialData.price || 13.37
    this.high = initialData.high || 13.37
    this.low = initialData.low || 13.37
    this.printInterval = initialData.printInterval || 5
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    this.ticker = ticker
    this.connected = true

    let takeResult;
    let book = new LimitOrderBook()
    let id = 0;
    let size = generateOrderSize();

    takeResult = this.generateOrders(ticker, 2000, book, id, price, size)
    console.log(takeResult)

    this.dataGenerator = setInterval(
      () => {
        id++;
        // size = this.generateOrderSize();
        // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
        // result = this.generateOrderAndAdd(book, id, price, size)
        this.generateOrderAndAdd(book, id, price, size)
      },
      2500
    ) // Some data generator
  }

  @action terminateDataGenerator() {
    clearInterval(this.dataGenerator)
    this.connected = false
  }

  @action setTicker(ticker) {
    this.ticker = ticker;
  }

  @action updatePrintInterval(time) {
    this.printInterval = time;
  }

  @action generateOrderAndAdd(book, id, price, size) {
    const order = new LimitOrder(`order${id}`, bidAsk(), this.setNewPrice(price), size)
    // console.log(`order`, order)
    // console.log('this.takeresults', this.takeResults)
    let result = book.add(order)
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

  @action setNewPrice = (x, range) => {
    let rnd = Math.random(); // generate number, 0 <= x < 1.0
    let volatility = .01 // 1%
    let changePercent = 2 * volatility * rnd;
    if (changePercent > volatility) {
      changePercent -= (2 * volatility)
    }
    let changeAmount = this.price * changePercent
    let newPrice = (this.price + changeAmount)
    this.price = newPrice;
    if (newPrice < this.low) { this.low = newPrice } //set new low
    if (newPrice > this.high) { this.high = newPrice } //set new high
    return newPrice;
    // let r = range || Math.random();
    // let random_sign = -1 + Math.round(Math.random()) * 2;
    // return (x + Math.random() * 0.2 * r * random_sign).toFixed(2)
  }

  @computed get orders() {
    return this.orders
  }

  @computed get buyOrders() {
    debugger;
    return []
  }

  @computed get sellOrders() {
    return []
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
