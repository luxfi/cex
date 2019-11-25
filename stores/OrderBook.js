import { action, observable, computed, extendObservable } from "mobx"
import _ from "lodash"
import uuid from "uuid"
import io from "socket.io-client"
import moment from "moment-timezone"
import { timeParse } from "d3-time-format"

const parseTime = timeParse("%Y-%m-%d")
const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length

// import stock from "../assets/tempData/stocks"

// import io from 'socket.io-client'
// const LimitOrder = require("limit-order-book").LimitOrder
// const MarketOrder = require("limit-order-book").MarketOrder
// const LimitOrderBook = require("limit-order-book").LimitOrderBook

const SOCKET_STRING = "https://exchange.hanzo.ai"
// const SOCKET_STRING = 'localhost:4000'

const bidAsk = () => {
  return Math.floor(Math.random() * 2) == 0 ? "bid" : "ask" // 50/50 chance of "bid" or "ask"
}

const generateOrderSize = () => {
  return parseInt((Math.random() * 100).toFixed(0)) + 1 // random 1 through 100
}

const padBids = (array, length, fill) => {
  return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
}

const padAsks = (array, length, fill) => {
  return length > array.length ? (Array(length - array.length).fill(fill)).concat(array) : array;
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
  @observable book = {} //new LimitOrderBook()
  @observable buys = []
  @observable sells = []
  @observable takeResults = []
  @observable connected = false
  @observable currentPrice = 13.37
  @observable high = 13.37
  @observable low = 13.37
  @observable printInterval = 5
  @observable activeChart = "line-chart"
  @observable marketOrderType = true
  @observable intradayData = []
  @observable dailyData = []
  @observable previousDayClose = []
  @observable order  = {}
  @observable trades = []
  @observable proChartData = []

  tradesBuffer = []
  lastDataMerge = 0

  activeOrders = {}

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

  @action fetchStockData(ticker) {
    this.getIntradayData(ticker)
    this.getDailyData(ticker)
  }

  @action connect(ticker) {
    this.ticker = ticker
    this.socket = io(SOCKET_STRING, {
      transports: ["websocket"]
    })
    // To handle responses:
    this.socket.on("book.subscribe.success", data => {
      this.connected = true
      // console.log("book.subscribe.success", data)
    })
    this.socket.on("book.subscribe.error", err => {
      console.log("book.subscribe.error", err)
    })
    this.socket.on("book.unsubscribe.success", data => {
      // console.log("book.unsubscribe.success", data)
    })
    this.socket.on("book.unsubscribe.error", err => {
      console.log("book.unsubscribe.error", err)
    })
    this.socket.on("trade.subscribe.success", data => {
      console.log("trade.subscribe.success", data)
    })
    this.socket.on("trade.subscribe.error", err => {
      console.log("trade.subscribe.error", err)
    })
    this.socket.on("trade.unsubscribe.success", data => {
      console.log("trade.unsubscribe.success", data)
    })
    this.socket.on("trade.unsubscribe.error", err => {
      console.log("trade.unsubscribe.error", err)
    })
    this.socket.on("order.create.success", data => {
      console.log("order.create.success", data)
    })
    this.socket.on("order.create.error", err => {
      console.log("order.create.error", err)
    })

    this.socket.on("candles.get.success", data => {
      if (isEmpty(data) || isEmpty(data.candles)) {
        return
      }

      let { candles, type } = data
      let formattedData = candles.map(candle => {
        const [
          openTime,
          closeTime,
          open,
          high,
          low,
          close,
          notional,
          volume,
          numberOfTrades
        ] = candle
        const timestamp = moment(closeTime).tz("America/New_York")

        const date = timestamp.format("YYYY-MM-DD")
        const minute = timestamp.format("HH:mm")
        const label = timestamp.format("LT")
        const average = notional / volume
        const id = parseInt(timestamp.format("HHmm"), 10)
        return {
          id,
          date,
          minute,
          label,
          high,
          low,
          open,
          close,
          average,
          volume,
          notional,
          numberOfTrades,
        }
      })

      if (type === "intradayData") {
        let filteredData = []
        let lastData = formattedData
        let targetTime = 930

        for (let data of formattedData) {
          while (targetTime < data.id) {
            let timestamp = moment("" + targetTime, "Hmm")

            lastData.date = timestamp.format("YYYY-MM-DD")
            lastData.minute = timestamp.format("HH:mm")
            lastData.label = timestamp.format("LT")

            filteredData.push(lastData)
            // console.log('push', lastData.id)
            targetTime += 5
            if (targetTime % 100 >= 60) {
              targetTime += 40
            }
          }

          if (targetTime === data.id) {
            filteredData.push(data)
            // console.log('push', data.id)
          }

          lastData = data
        }

        console.log('1m', formattedData)
        this[type] = filteredData
      } else {
        console.log('1d', formattedData)

        this.proChartData = formattedData.map((n) => {
          let {open, high, low, close, volume, date} = n
          return {
            open: parseFloat(open),
            high: parseFloat(high),
            low: parseFloat(low),
            close: parseFloat(close),
            volume: parseFloat(volume),
            date: parseTime(date),
          }
        })

        this[type] = formattedData
        this.previousDayClose =
          formattedData[formattedData.length - 2].close
      }

      // console.log("candles.get.success", this[type], type)
    })
    this.socket.on("candles.get.error", err => {
      console.log("candles.get.error", err)
    })

    this.socket.on("book.data", data => {
      let now = new Date().getTime()

      if (now - this.lastDataMerge > 400) {
        this.book = data
        this.book.orderBook.bids = padBids(this.book.orderBook.bids, 100, undefined)
        this.book.orderBook.asks = padAsks(this.book.orderBook.asks, 100, undefined)
        this.trades = this.tradesBuffer.reverse()
        this.lastDataMerge = now
      }
    })

    this.socket.on("trade.data", data => {
      this.tradesBuffer = this.tradesBuffer.concat(data).slice(-100)

      // let now = new Date().getTime()
      // if (now - this.lastDataMerge > 1000) {
      //   this.trades = this.tradesBuffer.reverse()
      //   this.lastDataMerge = now
      // }
      // console.log('trade.data', this.trades)
    })

    this.socket.on("disconnect", () => {
      this.connected = false
      const reconnect = setInterval(() => {
        if (!this.connected) this.connect(ticker)
        else {
          this.connected = true
          clearInterval(reconnect)
        }
      }, 2500)
    })

    // Initiate the connection to the correct book
    console.log("Subscribing to ", ticker)
    this.socket.emit("book.subscribe", { name: ticker })
    this.socket.emit("trade.subscribe", { name: ticker })
  }

  @action disconnect() {
    this.socket && this.socket.disconnect()
  }

  @action socketOrderCreate(order, updateBalance) {
    // const { externalId, side, type, quantity, price, name } = order
    let externalId = uuid.v4()
    let name = this.ticker
    this.activeOrders[externalId] = true
    console.log("socketOrderCreate", order)
    this.socket.emit(
      "order.create",
      Object.assign({ externalId, name }, order)
    )
    updateBalance(name, order.side)
  }

  @action getIntradayData(ticker) {
    // day is 24 hr based on EST
    const now = moment(/*'2019-11-13'*/).tz("America/New_York")
    // const startTime = now.startOf('day').valueOf()
    // const endTime = now.endOf('day').valueOf()
        // check if between midnight and market open, get previous day
    if (
      now.isBetween(
      now.clone().startOf('day'),
      now
        .clone()
        .endOf('day')
        .subtract(15, 'hours')
        .subtract(30, 'minutes'),
      )
    ) {
      now.subtract(1,'day')
    }
    const startTime = now.clone()
      .startOf("day")
      .add(9, "hours")
      .valueOf()
    const endTime = now.clone()
      .startOf("day")
      .add(16, "hours")
      .add(5, 'minutes')
      .valueOf()
    let opts = {
      startTime: startTime,
      endTime: endTime,
      interval: "1m",
      name: ticker,
      type: "intradayData"
    }
    this.socket.emit("candles.get", opts)
  }

  @action getHistory(ticker) {
    //todo need latest 10 orders...
  }

  @action getDailyData(ticker) {
    // day is 24 hr based on EST
    const now = moment().tz("America/New_York")
    const endTime = moment(now)
      .endOf('day')
      .valueOf()
    const startTime = moment(now)
      .startOf("day")
      .subtract(1, "year")
      .valueOf()
    let opts = {
      startTime: startTime,
      endTime: endTime,
      interval: "1d",
      name: ticker,
      type: "dailyData"
    }
    this.socket.emit("candles.get", opts)
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

  @action placeNewMarketOrder(
    currentOrderID,
    currentOrderType,
    currentOrderSize,
    currentOrderFunds,
    orderData,
    onExecute
  ) {
    if (onExecute && !onExecute(orderData, currentOrderType)) {
      // The user doesn't own any shares
      return null
    }

    let currentOrder = new MarketOrder(
      currentOrderID,
      currentOrderType,
      currentOrderSize,
      currentOrderFunds
    )
    let takeResult = this.book.add(currentOrder)
    // if (typeof window !== 'undefined') {
    //   console.log("takeResult", takeResult)
    // }
    this.takeResults.push(takeResult)
    if (this.price < this.low) {
      this.low = this.price
    } //set new low
    if (this.price > this.high) {
      this.high = this.price
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

  @action setActiveChart(chart) {
    this.activeChart = chart
  }

  @action setMarketOrderType(marketOrderType) {
    this.marketOrderType = marketOrderType
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

  @computed get stock() {
    const intradayData = this.intradayData
    const dailyData = this.dailyData
    const previousDayClose = this.previousDayClose
    const proChartData = this.proChartData
    return { intradayData, dailyData, previousDayClose, proChartData }
  }

  @computed get isReady() {
    return (
      this.connected &&
      this.book.lastPrice &&
      // this.intradayData.length > 0 &&
      this.dailyData.length > 0
    )
    return this.connected && this.book.lastPrice && this.intradayData.length > 0 && this.dailyData.length > 0
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
