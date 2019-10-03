import { action, observable, computed } from 'mobx'
import _ from 'lodash'
import uuid from 'uuid'

// import io from 'socket.io-client'
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
  @observable currentPrice = 13.37
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
  }, hanzoApi) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.price = initialData.price || 13.37
    this.high = initialData.high || 13.37
    this.low = initialData.low || 13.37
    this.printInterval = initialData.printInterval || 5
    // const size = generateOrderSize()
    // this.generateOrders(this.ticker = 'MDMXFR', 1000, this.book, Date.now(), this.price, size)

    this.api = hanzoApi
  }

  // For DEMO
  @action initiateDataGenerator(ticker = 'MDMXFR', price = 13.37) {
    this.ticker = ticker
    this.price = price
    this.book = new LimitOrderBook()
    this.buys.replace([])
    this.sells.replace([])
    this.takeResults.replace([])

    if (this.dataGenerator) {
      clearInterval(this.dataGenerator)
    }

    this.generateOrders(this.ticker, 1000, this.book, uuid.v4(), this.price, generateOrderSize())

    this.dataGenerator = setInterval(
      () => {
        // order = new LimitOrder(`order${x}`, this.bidAsk(), this.newPrice(price), this.orderSize())
        // result = this.generateOrderAndAdd(book, id, price, size)
        this.generateOrders(this.ticker, 1, this.book, uuid.v4(), this.price, generateOrderSize()) //TODO fix this so the ticker is pulled correctly
      },
      5000
    ) // Some data generator

    this.connected = true
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

  @action placeNewOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize, book = this.book, orderData, onExecute) {
    if (onExecute && !onExecute(orderData, currentOrderType)) {
      // The user doesn't own any shares
      return null
    }

    let currentOrder = new LimitOrder(currentOrderID, currentOrderType, currentOrderPrice, currentOrderSize)
    let takeResult = book.add(currentOrder)
    // if (typeof window !== 'undefined') {
    //   console.log("takeResult", takeResult)
    // }
    this.takeResults.push(takeResult)
    if (currentOrderPrice < this.low) { this.low = currentOrderPrice } //set new low
    if (currentOrderPrice > this.high) { this.high = currentOrderPrice } //set new high
    this.updateOrders()

    // TODO call onExecute to update the user's portfolio
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

  @action setNewPrice = () => {
    let rnd = Math.random(); // generate number, 0 <= x < 1.0
    let volatility = .02 // 1%
    let changePercent = 2 * volatility * rnd;
    if (changePercent > volatility) {
      changePercent -= (2 * volatility)
    }
    if (Math.abs(changePercent) === changePercent) {
      changePercent = changePercent * 1.10
    }
    let changeAmount = this.price * changePercent
    let newPrice = (this.price + changeAmount)
    this.price = newPrice // this price is only used to realistic data
    if (newPrice < this.low) { this.low = newPrice } //set new low
    if (newPrice > this.high) { this.high = newPrice } //set new high
    // newPrice = Math.floor(newPrice * 100) / 100
    return newPrice.toFixed(2) // return a price that is fixed to 2 decimals 
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
