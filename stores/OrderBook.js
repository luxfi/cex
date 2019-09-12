import { action, observable, computed } from 'mobx'
import _ from 'lodash'
// import io from 'socket.io-client'
const LimitOrder = require('limit-order-book').LimitOrder
const LimitOrderBook = require('limit-order-book').LimitOrderBook

const bidAsk = () => {
  return (Math.floor(Math.random() * 2) == 0) ? 'bid' : 'ask' // 50/50 chance of "bid" or "ask"
}

const generateOrderSize = () => {
  return parseInt((Math.random() * 100).toFixed(0)) + 1 // random 1 through 100
}

export default class OrderBook {
  @observable ticker = ''
  @observable connected = false
  @observable takeResults = []
  @observable price = 13.37
  @observable high = 13.37
  @observable low = 13.37
  @observable printInterval = 5
  @observable orderBookHash = {}
  id = 0


  constructor(initialData = {
    ticker: '',
    connected: false,
    takeResults: [],
    price: 13.37,
    high: 13.37,
    low: 13.37,
    printInterval: 5,
    orderBookHash: {},
    id: 0
  }) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.takeResults = initialData.takeResults || []
    this.price = initialData.price || 13.37
    this.high = initialData.high || 13.37
    this.low = initialData.low || 13.37
    this.printInterval = initialData.printInterval || 5
    this.orderBookHash = initialData.orderBookHash || {}
    this.id = initialData.id = 0
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    this.ticker = ticker
    this.connected = true

    let takeResult
    let book = new LimitOrderBook()
    let size = generateOrderSize()
    let id = this.id

    takeResult = this.generateOrders(ticker, 2000, book, id, price, size)
    console.log(takeResult)
    console.log("orderBookHash", this.orderBookHash)

    this.dataGenerator = setInterval(
      () => {
        size = generateOrderSize();
        // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
        // result = this.generateOrderAndAdd(book, id, price, size)
        this.generateOrders(ticker = 'MDMXFR', 1, book, id, price, size) //TODO fix this so the ticker is pulled correctly
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
    this.updateOrderBook(takeResult)
    this.takeResults.push(takeResult)
    return takeResult
  }

  @action updateOrderBook(takeResult) {
    let makers = takeResult.makers
    if (makers.length === 0) return // return if no transactions were made
    let sizeRemainingForCurrentOrder = takeResult.taker.sizeRemaining
    let currentOrderID = takeResult.taker.orderId
    if (sizeRemainingForCurrentOrder === 0) { // remove order if no bids/sells outstanding
      delete this.orderBookHash[currentOrderID]
    } else {
      this.orderBookHash[currentOrderID].size = sizeRemainingForCurrentOrder
    }

    makers.forEach(maker => {
      let updatedSize = maker.sizeRemaining
      let currentOrderID = maker.orderId
      if (updatedSize === 0) { // remove order if no bids/sells outstanding
        delete this.orderBookHash[currentOrderID]
      } else {
        debugger
        this.orderBookHash[currentOrderID].size = updatedSize
      }
    })
  }

  @action placeNewOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize, book) {
    let currentOrder = new LimitOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize)
    this.orderBookHash[currentOrderID] = { type: currentOrderType, price: currentOrderPrice, size: currentOrderSize }
    return book.add(currentOrder) //takeResult
  }

  @action generateOrders(ticker, numberOfOrders, book, idNumber = 1, price, size) {
    let n = 0;
    let id;
    while (n < numberOfOrders - 1) {
      id = `${ticker}${idNumber}`
      this.generateOrderAndAdd(book, id, price, generateOrderSize())
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
    this.price = newPrice; // this price is only used to realistic data
    if (newPrice < this.low) { this.low = newPrice } //set new low
    if (newPrice > this.high) { this.high = newPrice } //set new high
    newPrice = Math.floor(newPrice * 100) / 100
    return newPrice // return a price that is fixed to 2 decimals 
  }

  @computed get buyOrders() {
    let book = this.cleanedOrderBookHash
    console.log('book', book)
    let orders = {}
    let firstTwentyOrders = {}
    Object.keys(book).forEach(m => {
      const { price, size, type } = this.orderBookHash[m]
      if (orders[type] === "bid") orders[price].size = size
    })
    let firstTwentyKeys = Object.keys(firstTwentyOrders).sort(function (a, b) { return a - b }).slice(0, 19)

    const filtered = Object.keys(book)
      .filter(key => firstTwentyKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = book[key]
        return obj
      }, {})
    // orders = book.filter(order => order.type === "bid")
    return "hello"
  }

  @computed get sellOrders() {
    return []
  }

  @computed get cleanedOrderBookHash() {
    let cleanedOrderBookHash = {}
    Object.keys(this.orderBookHash).forEach(m => {
      const { price, size, type } = this.orderBookHash[m]
      debugger
      if (!cleanedOrderBookHash[price]) {
        cleanedOrderBookHash[price].size = size
      } else {
        cleanedOrderBookHash[price].size += size
      }
      cleanedOrderBookHash[price].type = type
    })
    console.log('this.orderBookHash', this.orderBookHash)
    console.log('cleanedOrderBookHash', cleanedOrderBookHash)
    return cleanedOrderBookHash
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
