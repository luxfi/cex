import { action, observable, computed } from "mobx"
import _ from "lodash"
import uuid from "uuid"

// import io from 'socket.io-client'
const LimitOrder = require("limit-order-book").LimitOrder
const LimitOrderBook = require("limit-order-book").LimitOrderBook

const bidAsk = () => {
  return Math.floor(Math.random() * 2) == 0 ? "bid" : "ask" // 50/50 chance of "bid" or "ask"
}

const generateOrderSize = () => {
  return parseInt((Math.random() * 100).toFixed(0)) + 1 // random 1 through 100
}

const firstTwentyKeys = (orders, orderType) => {
  // list orders for buys('bid') at highest price first
  // list orders for sells('ask') at lowest price first
  const sortFn =
    orderType === "bid"
      ? function(a, b) {
          return b - a
        }
      : function(a, b) {
          return a - b
        }
  return Object.keys(orders)
    .sort(sortFn)
    .slice(0, 20) // take first 20
}

export default class OrderBook {
  /**
   * unique id of this todo, immutable.
   */
  id = null

  @observable ticker = ""
  @observable price = 13.37
  @observable book = new LimitOrderBook()
  @observable buys = []
  @observable sells = []
  @observable takeResults = []
  @observable connected = false
  @observable currentPrice = 13.37
  @observable high = 13.37
  @observable low = 13.37
  @observable printInterval = 5

  constructor(
    initialData = {
      ticker: "",
      connected: false,
      price: 13.37,
      high: 13.37,
      low: 13.37,
      printInterval: 5
    },
    hanzoApi,
    id = uuid.v4()
  ) {
    // this.orderBookData = initialData.orderBookData
    this.ticker = initialData.ticker
    this.connected = initialData.connected
    this.price = initialData.price || 13.37
    this.high = initialData.high || 13.37
    this.low = initialData.low || 13.37
    this.printInterval = initialData.printInterval || 5
    this.api = hanzoApi
    this.id = id
  }

  @action clearData() {
    this.book.clear()
    this.buys.replace([])
    this.sells.replace([])
    this.takeResults.replace([])
  }

  @action setConnected(bool) {
    this.connected = bool
  }

  @action setTicker(ticker) {
    this.ticker = ticker
  }

  @action setPrice(price) {
    this.price = price
  }

  @action generateBatchOfInitialOrders(
    ticker,
    amount,
    price,
    size = generateOrderSize()
  ) {
    this.generateOrders(ticker, amount, price, size)
  }

  @action initiateGenerator(ticker, price) {
    this.dataGenerator = setInterval(() => {
      this.generateOrders(ticker, 1, price, generateOrderSize()) //TODO fix this so the ticker is pulled correctly
    }, 1000) // Some data generator
  }

  // For DEMO
  @action initiateDataGenerator(ticker = "MDMXFR", price = 13.37) {
    if (this.dataGenerator) {
      this.terminateDataGenerator()
    }
    this.clearData()
    this.setTicker(ticker)
    this.setPrice(price)
    this.generateBatchOfInitialOrders(ticker, 1000, price)
    this.initiateGenerator(ticker, price)
    this.setConnected(true)
  }

  @action terminateDataGenerator() {
    clearInterval(this.dataGenerator)
    this.connected = false
  }

  @action generateOrders(ticker, numberOfOrders, price) {
    let n = 0
    let id
    while (n < numberOfOrders - 1) {
      id = `${ticker}${uuid.v4()}`
      this.generateOrderAndAdd(id, price, generateOrderSize())
      n++
    }
    id = `${ticker}${uuid.v4()}`
    return this.generateOrderAndAdd(id, price, generateOrderSize())
  }

  @action generateOrderAndAdd(id, price, size) {
    let currentOrderID = `order${id}`
    let currentOrderType = bidAsk()
    let currentOrderPrice = this.setNewPrice(price)
    let takeResult = this.placeNewOrder(
      currentOrderID,
      currentOrderType,
      currentOrderPrice,
      size
    )
    this.takeResults.push(takeResult)
    return takeResult
  }

  @action placeNewOrder(
    currentOrderID,
    currentOrderType,
    currentOrderPrice,
    currentOrderSize,
    orderData,
    onExecute
  ) {
    if (onExecute && !onExecute(orderData, currentOrderType)) {
      // The user doesn't own any shares
      return null
    }

    let currentOrder = new LimitOrder(
      currentOrderID,
      currentOrderType,
      parseFloat(currentOrderPrice),
      currentOrderSize
    )
    let takeResult = this.book.add(currentOrder)
    // if (typeof window !== 'undefined') {
    //   console.log("takeResult", takeResult)
    // }
    this.takeResults.push(takeResult)
    if (currentOrderPrice < this.low) {
      this.low = currentOrderPrice
    } //set new low
    if (currentOrderPrice > this.high) {
      this.high = currentOrderPrice
    } //set new high
    this.updateOrders()

    // TODO call onExecute to update the user's portfolio
    return takeResult
  }

  @action setTicker(ticker) {
    this.ticker = ticker
  }

  @action updatePrintInterval(time) {
    this.printInterval = time
  }

  @action updateOrders() {
    //update buyOrders
    const bidMap = this.book.bidLimits.map
    const arrayOfBidPrices = firstTwentyKeys(bidMap, "bid")
    // this.buys = arrayOfBidPrices.map(k => ({ size: bidMap[k].volume, price: bidMap[k].price }))
    this.buys.replace(
      arrayOfBidPrices.map(price => ({
        size: bidMap[price].volume,
        price: bidMap[price].price
      }))
    )

    //update sellOrders
    const askMap = this.book.askLimits.map
    const arrayOfAskPrices = firstTwentyKeys(askMap, "ask")
    // this.sells = arrayOfAskPrices.map(k => ({ size: askMap[k].volume, price: askMap[k].price }))
    this.sells.replace(
      arrayOfAskPrices.map(price => ({
        size: askMap[price].volume,
        price: askMap[price].price
      }))
    )
  }

  @action setNewPrice = () => {
    let rnd = Math.random() // generate number, 0 <= x < 1.0
    let volatility = 0.02 // 1%
    let changePercent = 2 * volatility * rnd
    if (changePercent > volatility) {
      changePercent -= 2 * volatility
    }
    if (Math.abs(changePercent) === changePercent) {
      changePercent = changePercent * 1.1
    }
    let changeAmount = this.price * changePercent
    let newPrice = this.price + changeAmount
    this.price = newPrice // this price is only used to realistic data
    if (newPrice < this.low) {
      this.low = newPrice
    } //set new low
    if (newPrice > this.high) {
      this.high = newPrice
    } //set new high
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

  generatefullMonth(book) {}

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
