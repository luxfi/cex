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

const cleanOrderBookHash = (orderBookHash) => {
  let cleanedOrderBookHash = {}
  Object.keys(orderBookHash).forEach(m => {
    const { price, size, type } = orderBookHash[m]
    if (!cleanedOrderBookHash[price]) {
      cleanedOrderBookHash[price] = { size, type }
    } else {
      cleanedOrderBookHash[price].size += size
    }
  })
  console.log('orderBookHash', orderBookHash)
  console.log('cleanedOrderBookHash', cleanedOrderBookHash)
  return cleanedOrderBookHash
}

const getOrderRows = (orderBookHash, orderType) => {
  let book = cleanOrderBookHash(orderBookHash)
  console.log('book', book)
  const orders = {}
  Object.keys(book).forEach(m => {
    const { size, type } = book[m]
    if (type === orderType) orders[m] = { size }
  })

  let sortFn = orderType === "bid" ? function (a, b) { return b - a } : function (a, b) { return a - b }

  const firstTwentyKeys = Object.keys(orders).sort(sortFn).slice(0, 20)
  const filtered = []
  firstTwentyKeys.forEach(k => {
    filtered.push({ price: k, ...book[k] })
  })

  return filtered
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
  book = new LimitOrderBook()


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

    this.book = new LimitOrderBook()
    const size = generateOrderSize()
    this.generateOrders(this.ticker = 'MDMXFR', 2000, this.book, Date.now(), this.price, size)
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    console.log('Initiating data generator!')
    this.ticker = ticker
    this.connected = true

    let size = generateOrderSize()

    // console.log(takeResult)
    // console.log("orderBookHash", this.orderBookHash)

    // this.dataGenerator = setInterval(
    //   () => {
    //     size = generateOrderSize()
    //     // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
    //     // result = this.generateOrderAndAdd(book, id, price, size)
    //     this.generateOrders(ticker = 'MDMXFR', 1, this.book, Date.now(), this.price, size) //TODO fix this so the ticker is pulled correctly
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
    const orderBookCopy = this.orderBookHash
    if (sizeRemainingForCurrentOrder === 0) { // remove order if no bids/sells outstanding
      delete orderBookCopy[currentOrderID]
    } else if (orderBookCopy[currentOrderID]) {
      orderBookCopy[currentOrderID].size = sizeRemainingForCurrentOrder
    }

    makers.forEach(maker => {
      let updatedSize = maker.sizeRemaining
      let currentOrderID = maker.orderId
      if (updatedSize === 0) { // remove order if no bids/sells outstanding
        delete orderBookCopy[currentOrderID]
      } else if (orderBookCopy[currentOrderID]) {
        orderBookCopy[currentOrderID].size = updatedSize
      }
    })

    this.orderBookHash = orderBookCopy
  }

  @action placeNewOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize, book = this.book) {
    let currentOrder = new LimitOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize)
    this.orderBookHash[currentOrderID] = { type: currentOrderType, price: currentOrderPrice, size: currentOrderSize }
    return book.add(currentOrder) //takeResult
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
    return getOrderRows(this.orderBookHash, 'bid')
  }

  @computed get sellOrders() {
    return getOrderRows(this.orderBookHash, 'ask')
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
