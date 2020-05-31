import { action, observable, computed } from 'mobx'
import { computedFn } from 'mobx-utils'
import uuid from 'uuid'
import memoize from 'lodash.memoize'

import tradingStatuses from '../settings/tradingStatus'
import FACETS from '../settings/facets'
import STOCKS_AS_JSON from '../assets/tempData/movies'

export default class {

  @observable stocks = []
  @observable resultSet = []
  @observable tradingStatusFilter = tradingStatuses.byIndex(0)

  constructor(initialData, hanzoApi) {
    this.facets = {}
    FACETS.forEach((f)=> {
      this.facets[f.name] = observable.map()
    })
    this.loadStocks()
    this.api = hanzoApi
  }

  @action setTradingStatusFilter(status) {
    this.tradingStatusFilter = status
  }

  @computed get filteredResultSet() {
    return (this.resultSet.filter(m => this.filtersAllow(m) && this.facetsAllow(m)))
  }

  @computed get allTradingStocks() {
    return (this.stocks.filter(movie => movie.trading))
  }

  @computed get allFundingStocks() {
    return (this.stocks.filter(movie => !movie.trading))
  }

  filtersAllow = (stock) => {
    switch(this.tradingStatusFilter.key) {
      case 'funding': return !stock.trading
      case 'trading': return stock.trading
    }
    return true // all
  }

  facetsAllow = (stock) => {
    const facetsNamesAsArray = Object.keys(this.facets)
      // initilize all facets results to false
    const facetResults = Array(facetsNamesAsArray.length).fill(false)
    for (let i = 0; i < facetsNamesAsArray.length; i++) {
      const facet = facetsNamesAsArray[i]
      if (this.facets[facet].size === 0) {
        //console.log(`No constraints on ${facet}, so "${movie.name}" matches`)
        facetResults[i] = true
      }
      else {
          // logical OR within a facet
        for (const [key, value] of this.facets[facet]) {
          if (stock[facet].includes(key)) {
            //console.log(`"${movie.name}" matches ${key} for ${facet}`)
            facetResults[i] = true
            break
          }
        }
      }
      if (!facetResults[i]) {
        break
      }
    }
      // logical AND between facets
    return !facetResults.includes(false)
  }

  @action setFacetValue = (name, key, set) => {
    if (set) {
      //console.log(`FACET: ${key} selected for ${name}`)
    }
    else {
      //console.log(`FACET: ${key} cleared for ${name}`)
    }
    if (!name in this.facets ) {
      throw new Error('setFacetValue() expects an existing facet name')
    }
    if (set) {
      this.facets[name].set(key, true)
    }
    else {
      this.facets[name].delete(key)
    }
  }

  @action clearFacets() {
    for (const f in this.facets) {
      this.facets[f].clear()
    }
  }


  getFacetValue = computedFn((name, key) => {
    if (!name in this.facets ) {
      throw new Error('MovieStore: getFacetValue() expects an existing facet name')
    }
    return (this.facets[name].has(key))
  }, {keepAlive : false})


  loadStocks() {
    this.stocks.clear()
    STOCKS_AS_JSON.forEach(m => {
      this.stocks.push(stockFromJSON(m))
    })
  }

    // TEMP
  @computed get investorTopPicks() {
    return this.stocks.length > 0 ? this.stocks.slice(0, 3) : this.stocks
  }

  getStockByTicker(ticker) {
    if (!ticker || ticker === '') {
      throw new Error('getStockByTicker() requires ticker to be defined')
    }
    return this.stocks.find(m => m.ticker === ticker)
  }

  getStockBySlug(slug) {
    if (!slug) {
      throw new Error('getStockBySlug() requires slug to be defined')
    }
    return this.stocks.find(m => m.movieSlug === slug)
  }

  @action fuzzyMatchValue(value) {
    this.resultSet = this.stocks.filter((s) => (fuzzyMatch(s.name, value)))
  }

  @action setResultSet(stocks) {
    this.resultSet = [...stocks]
  }

  @action clearResultSet() {
    this.resultSet.clear()
  }
}

class Stock {

  id = null

    // Should just create observables from field names here! :aa
  @observable name = ""
  @observable movieSlug = ""
  @observable articles = []
  @observable genre = []
  @observable trailer = []
  @observable website = ""
  @observable rated = ""
  @observable imdbid = ""
  @observable actors = []
  @observable director = []
  @observable releaseDate = ""
  @observable writer = []
  @observable posterImg = ""
  @observable heroImg = []
  @observable ticker = ""
  @observable financialDescription = ""
  @observable price = 0.00
  @observable valueDelta = 0.00

  constructor(id = uuid.v4()) {
    this.id = id
  }

  fieldsFromJson(json) {
        // Should just create observables here! :aa
    Object.keys(json).forEach(k => {
      this[k] = json[k]
    })
  }

}

const stockFromJSON = (json) => {
  const movie = new Stock(json.imbdid)
  movie.fieldsFromJson(json)
  return movie
}

const fuzzyMatch = (str, pattern) => {
  const cache = memoize((str) => (
    new RegExp("^" + str.replace(
      /./g, 
      (x) => (
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/.test(x) ? "\\" + x + "?" : x + "?"
      )
    ) + "$")
  ))
  return cache(str.toLowerCase()).test(pattern.toLowerCase())
}

