import { action, observable, computed, autorun } from 'mobx'
import { computedFn } from 'mobx-utils'
import uuid from 'uuid'

import tradingStatus from '../settings/tradingStatus'
import moviesFromJson from '../assets/tempData/movies'

export default class MovieStore {
  @observable movies = []
  @observable isLoading = true
  @observable currentMovie = undefined
  
  facets = {
    genres: observable.map(),
    distributors: observable.map()
  }

  @observable tradingStatusFilter = tradingStatus.byIndex(0) 

  constructor(initialData, hanzoApi) {
    this.loadMovies()
    this.api = hanzoApi
  }

  @action setTradingStatusFilter(status) {
    this.tradingStatusFilter = status 
  }

  @computed get filteredMovies() {
    return (this.movies.filter(m => this.filtersAllow(m) && this.facetsAllow(m)))
  }

  @computed get tradingMovies() {
    return (this.movies.filter(movie => movie.trading))
  } 
  
  @computed get fundingMovies() {
    return (this.movies.filter(movie => !movie.trading))
  } 
  
  filtersAllow = (movie) => {
    switch(this.tradingStatusFilter.key) {
      case 'funding': return !movie.trading
      case 'trading': return movie.trading
    }
    return true // all
  }


  facetsAllow = (movie) => {
    const facetsNamesAsArray = Object.keys(this.facets)
      // initilize all facets results to false
    const facetResults = Array(facetsNamesAsArray.length).fill(false) 
    for (let i = 0; i < facetsNamesAsArray.length; i++) {
      const facet = facetsNamesAsArray[i]
      if (this.facets[facet].size === 0) {
        console.log(`No constraints on ${facet}, so "${movie.name}" matches`)
        facetResults[i] = true
      }
      else {
          // logical OR within a facet
        for (const [key, value] of this.facets[facet]) {
          if (movie[facet].includes(key)) {
            console.log(`"${movie.name}" matches ${key} for ${facet}`)
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
      console.log(`FACET: ${key} selected for ${name}`)
    }
    else {
      console.log(`FACET: ${key} cleared for ${name}`)
    }
    if (!name in this.facets ) {
      throw new Error('MovieStore: setFacetValue() expects an existing facet name')
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
  

  nullQuery(query) {
    return !query || Object.entries(query).length === 0
  }

  loadMovies(query) {

    if (this.nullQuery(query) && this.movies.length > 0) {
      return
    }

    this.isLoading = true
    this.movies.clear()
    moviesFromJson.forEach(m => {
      this.movies.push(this.moviefromJSON(m))
    })
    if (!this.nullQuery(query)) {
      this.clearFacets()
      this.setFacetValue(query.facet, query.value, true)
    }
    this.currentMovie = this.movies[0] // TEMP
    this.isLoading = false
  }

  moviefromJSON(json) {
    const movie = new Movie(json.imbdid)
    movie.updateFromJson(json)
    return movie
  }

  // @computed get topMovies() {
  //   return this.movies.length > 0
  //     ? _.sortBy(this.movies, r => -r.percentChange).slice(0, 15)
  //     : this.movies
  // }
  @computed get investorTopPicks() {
    return this.movies.length > 0 ? this.movies.slice(0, 3) : this.movies
  }

  // Public helper functions
  getMovieByTicker(ticker) {
    return this.movies.find(m => m.ticker === ticker)
  }
  getMovieBySlug(slug) {
    return this.movies.find(m => m.movieSlug === slug)
  }

  validateTicketingSlug(slug) {
    if(typeof slug === 'string') {
      return this.movies.some(m => m.movieSlug === slug)
    }
    return false
  }

  validateCheckoutSlug(slug, routeName) {
    if(Array.isArray(slug)) {
      return slug[1] === 'checkout' && slug[3] === routeName;
    }
    return false
  }
}

export class Movie {
  /**
   * unique id of this Movie, immutable.
   */
  id = null
  // store = null

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

  /**
   * Indicates whether changes in this object
   * should be submitted to the server
   */
  // autoSave = true

  /**
   * Disposer for the side effect that automatically
   * stores this Movie, see @dispose.
   */
  // saveHandler = null

  constructor(id = uuid.v4()) {
    this.id = id
  }


  updateFromJson(json) {
      // make sure our changes aren't sent back to the server
    Object.keys(json).forEach(k => {
      this[k] = json[k]
    })
  }

}
