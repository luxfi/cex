import { action, observable, computed } from 'mobx'
import _ from 'lodash'
import { arch } from 'os'
// import io from 'socket.io-client'
import uuid from 'node-uuid'
const LimitOrder = require('limit-order-book').LimitOrder
const LimitOrderBook = require('limit-order-book').LimitOrderBook

const bidAsk = () => {
  return (Math.floor(Math.random() * 2) == 0) ? 'bid' : 'ask' // 50/50 chance of "bid" or "ask"
}

const generateOrderSize = () => {
  return parseInt((Math.random() * 100).toFixed(0)) + 1 // random 1 through 100
}

const firstTwentyKeys = (orders, orderType) => {
  // list orders for buys('bid') at highest price first 
  // list orders for sells('ask') at lowest price first 
  const sortFn = orderType === "bid" ? function (a, b) { return b - a } : function (a, b) { return a - b }
  return Object.keys(orders).sort(sortFn).slice(0, 20) // take first 20
}

export default class OrderBook {
  @observable ticker = ''
  @observable connected = false
  takeResults = observable([])
  @observable price = 13.37
  @observable high = 13.37
  @observable low = 13.37
  @observable printInterval = 5
  buys = observable([])
  sells = observable([])
  // @observable buys = []
  // @observable sell = []
  book = new LimitOrderBook()


  constructor(initialData = {
    ticker: '',
    connected: false,
    price: 13.37,
    high: 13.37,
    low: 13.37,
    printInterval: 5,
    id: uuid.v4()
  }, ) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.price = initialData.price || 13.37
    this.high = initialData.high || 13.37
    this.low = initialData.low || 13.37
    this.printInterval = initialData.printInterval || 5
    this.id = initialData.id
    const size = generateOrderSize()
    this.generateOrders(this.ticker = 'MDMXFR', 2000, this.book, Date.now(), this.price, size)
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    this.ticker = ticker
    this.connected = true
    let size = generateOrderSize()

    this.dataGenerator = setInterval(
      () => {
        size = generateOrderSize()
        // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
        // result = this.generateOrderAndAdd(book, id, price, size)
        this.generateOrders(ticker = 'MDMXFR', 1, this.book, Date.now(), this.price, size) //TODO fix this so the ticker is pulled correctly
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
    // const order = new LimitOrder(`order${id}`, bidAsk(), this.setNewPrice(price), size)
    // // console.log(`order`, order)
    // // console.log('this.takeresults', this.takeResults)
    // let result = book.add(order)
    let currentOrderID = `order${id}`
    let currentOrderType = bidAsk()
    let currentOrderPrice = this.setNewPrice(price)
    let currentOrderSize = generateOrderSize()
    let takeResult = this.placeNewOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize, book)
    this.takeResults.push(takeResult)
    return takeResult
  }

  @action placeNewOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize, book = this.book) {
    let currentOrder = new LimitOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize)
    let takeResult = book.add(currentOrder)
    // if (typeof window !== 'undefined') {
    //   console.log("takeResult", takeResult)
    // }
    this.takeResults.push(takeResult)
    if (currentOrderPrice < this.low) { this.low = currentOrderPrice } //set new low
    if (currentOrderPrice > this.high) { this.high = currentOrderPrice } //set new high
    this.updateOrders()
    return takeResult
  }

  @action updateOrders() {
    //update buyOrders
    const bidMap = this.book.bidLimits.map
    const arrayOfBidPrices = firstTwentyKeys(bidMap, "bid")
    // this.buys = arrayOfBidPrices.map(k => ({ size: bidMap[k].volume, price: bidMap[k].price }))
    this.buys.replace(arrayOfBidPrices.map(price => ({ size: bidMap[price].volume, price: bidMap[price].price })))

    //update sellOrders
    const askMap = this.book.askLimits.map
    const arrayOfAskPrices = firstTwentyKeys(askMap, "ask")
    // this.sells = arrayOfAskPrices.map(k => ({ size: askMap[k].volume, price: askMap[k].price }))
    this.sells.replace(arrayOfAskPrices.map(price => ({ size: askMap[price].volume, price: askMap[price].price })))
  }

  @action generateOrders(ticker, numberOfOrders, book, idNumber = Date.now(), price, size) {
    let n = 0;
    let id;
    while (n < numberOfOrders - 1) {
      id = `${ticker}${idNumber}`
      this.generateOrderAndAdd(book, id, price, generateOrderSize())
      idNumber++
      n++
    }
    id = `${ticker}${idNumber}`
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
    this.price = newPrice; // this price is only used to realistic data
    if (newPrice < this.low) { this.low = newPrice } //set new low
    if (newPrice > this.high) { this.high = newPrice } //set new high
    newPrice = Math.floor(newPrice * 100) / 100
    return newPrice // return a price that is fixed to 2 decimals 
  }

  @computed get buyOrders() {
    return this.buys
  }

  @computed get sellOrders() {
    return this.sells
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
