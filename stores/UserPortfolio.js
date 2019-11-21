// Generic Libraries
import { action, observable, computed, toJS } from "mobx"
import _ from "lodash"
import moment from 'moment-timezone'

import { padDollarAmount } from "../util/generic"
/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
 */

const removeElement = (array, elem) => {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export default class UserPortfolio {
  // ** GENERIC HELPERS **
  // use for wait states in UI
  @observable updating = false
  // any errors returned by APIs
  // (not sure of type)
  @observable errors = undefined

  // ** Portfolio Info **
  @observable holdings = 0.0
  @observable weeklyChange = 0.0
  @observable rank = 0
  @observable rankPercent = 0
  @observable benefits = 0
  @observable benefitsThisMonth = 0

  // ** Watchlist **
  @observable watchlist = []
  /*
  Each watchlist item looks like:
  {
    ticker: string,
    dateAdded: epoch
  }
  */

  // ** Investments  **
  // What the user owns
  @observable investments = []
  /*
  Each invetment looks like:
  {
    ticker: string,
    amount: number,
    price: number,
    categories: array[string]
  }
  */

  // ... Etc

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  @action async getWatchlist(onSuccess, onError) {
    // ONLY CALL ON CLIENT

    this.updating = true

    try {
      // Using localStorage for now
      const _watchlist = localStorage.getItem("watchlist")
      if (_watchlist !== null) {
        this.watchlist = JSON.parse(_watchlist)
      }
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action async addToWatchlist(ticker, onSuccess, onError) {
    // ticker is temp while we don't have an API
    this.updating = true
    try {
      // Using localStorage for now
      const _watchlist = localStorage.getItem("watchlist")
      if (_watchlist !== null) {
        this.watchlist = JSON.parse(_watchlist)
        if (this.watchlist.indexOf(ticker) === -1) {
          this.watchlist.push(ticker)
          // add to watchlist both local storage and mobx store observable
          localStorage.setItem("watchlist", JSON.stringify(toJS(this.watchlist)))
        }
      } else {
        this.watchlist.push(ticker)
        localStorage.setItem("watchlist", JSON.stringify(toJS(this.watchlist)))
      }
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action async removeFromWatchlist(ticker, onSuccess, onError) {
    // ticker are temp while we don't have an API
    this.updating = true

    try {
      // Using localStorage for now
    const _watchlist = localStorage.getItem("watchlist")
    if (_watchlist !== null) {
      this.watchlist = JSON.parse(_watchlist)
      if (this.watchlist.indexOf(ticker) > -1) {
        this.watchlist.remove(ticker)
        // add to watchlist both local storage and mobx store observable
        localStorage.setItem("watchlist", JSON.stringify(toJS(this.watchlist)))
      }
    }
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  updateHoldings() {
    let holdings = 0.0
    this.investments.map(h => {
      const price = parseFloat(h.price)
      if (!isNaN(price))
        holdings += h.amount * parseFloat(h.price).toFixed(2)
    })
    this.holdings = holdings
  }

  @action async getInvestments(onSuccess, onError) {
    // ONLY CALL ON CLIENT

    this.updating = true

    try {
      // Using localStorage for now
      const _investments = localStorage.getItem("investments")

      if (_investments !== null) {
        this.investments = JSON.parse(_investments)
        this.updateHoldings()
      }

      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action onOrderExecute(order, ticker, orderType, updateBalance) {
    // order is the thing movie that was bought or sold
    // orderType is buy/sell

    // order = {
    //   ticker: string,
    //   quantity: number,
    //   price: number,
    //   categories: array[string]
    // }

    const _investments = localStorage.getItem("investments")

    if (_investments !== null) {
      this.investments = JSON.parse(_investments)
    }

    let holdingIndex = _.findIndex(this.investments, { ticker })
    console.log('onOrderExecute', holdingIndex, this.investments, order, orderType)

    const quantity = Number.parseInt(order.quantity)
    const price = Number.parseFloat(order.price)

    if (orderType === "bid") {
      // Add the order to the user portfolio after checking their account balance
      if (holdingIndex > -1) {
        // Then we have a holding
        this.investments[holdingIndex].amount += quantity
        this.investments[holdingIndex].price = price
      } else {
        holdingIndex = this.investments.length
        this.investments.push(order)
      }
    } else {
      // Make sure the user owns enough shares to sell?
      if (
        holdingIndex > -1 &&
        this.investments[holdingIndex].amount >= quantity
      ) {
        // Then we have a holding
        this.investments[holdingIndex].amount -= quantity
        this.investments[holdingIndex].price = price

        if (this.investments[holdingIndex].amount <= 0)
          this.investments.splice(holdingIndex, 1)
      } else {
        return false
      }
    }

    updateBalance(orderType, price * quantity)

    // Add transaction array
    if (!this.investments[holdingIndex].transactions) {
      this.investments[holdingIndex].transactions = []
    }

    // Add order to transaction array
    this.investments[holdingIndex].transactions.unshift(Object.assign({
      type: orderType,
      date: moment().format('LLL'),
    }, order))

    this.updateHoldings()
    localStorage.setItem("investments", JSON.stringify(toJS(this.investments)))
    return true
  }

  @computed get userHoldings() {
    return padDollarAmount(this.holdings)
  }

  @computed get earningsChangeWeek() {
    const sign = this.weeklyChange < 0 ? "-" : "+"
    // TODO can't really do this until we have an actual API and database
    return `${sign}${padDollarAmount(this.weeklyChange)}`
  }

  @computed get userTopWatchlist() {
    return this.watchlist.slice(0, 3)
  }

  @computed get topPortfolioCategories() {
    // Go through and calculate the top categories of the holdings of the user by genre tag
    const categoryCount = {}

    this.investments.forEach(i => {
      i.categories.forEach(c => {
        if (!categoryCount[c]) categoryCount[c] = 1
        else categoryCount[c]++
      })
    })

    const keys = Object.keys(categoryCount)
    if (keys.length === 0) return []
    const toSort = []
    keys.forEach(k => {
      toSort.push({ key: k, count: categoryCount[k] })
    })

    return _.sortBy(toSort, "count")
      .reverse()
      .slice(0, 3)
  }

  @computed get topInvestments() {
    return _.sortBy(this.investments, i => i.amount * parseFloat(i.price)).reverse()
  }

  @computed get topChips() {
    const sorted = _.sortBy(this.investments, i => i.amount * parseFloat(i.price)).reverse().slice(0, 2)
    const chips = sorted.map(s => {
      return { ticker: s.ticker, amount: s.amount }
    })

    return chips
  }

  getMaxSell(ticker) {
    const investment = _.find(this.investments, i => i.ticker === ticker)
    return investment ? investment.amount : 0
  }
}
