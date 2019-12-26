import { action, observable, computed, autorun } from "mobx"
import { computedFn } from "mobx-utils"
import uuid from "uuid"

import moviesFromJson from "../assets/tempData/movies"

export default class MovieStore {
  @observable movies = []
  @observable isLoading = true
  @observable currentMovie = undefined
  
  facets = observable({
    genre: observable.map()
  })

  @observable filteredMovies = []

  constructor(initialData, hanzoApi) {
    this.loadMovies()
    // this.movies = initialData
    this.api = hanzoApi
  }

  @action updateFilteredMovies = () => {

    this.filteredMovies = this.movies.filter(m => this.checkFacets(m))
  }

  checkFacets = (movie) => {

    const facetsNamesAsArray = Object.keys(this.facets)
      // initilize all facets results to false
    const facetResults = Array(facetsNamesAsArray.length).fill(false) 
    for (let i = 0; i < facetsNamesAsArray.length; i++) {
      const name = facetsNamesAsArray[i]
      if (this.facets[name].size === 0) {
        facetResults[i] = true
      }
      else {
        for (let activeKey in this.facets[name]) {
          if (movie[name] === activeKey) {
            facetResults[i] = true
            break
          }
        }
      }
      if (facetResults[i]) {
        break
      }
    }

      // if any facet included this film...
    return facetResults.includes(true)
  }

  @action setFacetValue = (name, key, set) => {
    if (!name in this.facets ) {
      throw new Error('MovieStore: setFacetValue() expects an existing facet name')
    }
    if (set) {
      this.facets[name].set(key, true)
    }
    else {
      this.facets[name].delete(key)
    }
    this.updateFilteredMovies()
  }
  
  getFacetValue = computedFn((name, key) => {
    if (!name in this.facets ) {
      throw new Error('MovieStore: getFacetValue() expects an existing facet name')
    }
    return (this.facets[name].has(key))
  }, {keepAlive : true})

  loadMovies() {
    if (this.movies.length > 0) {
      return
    }

    this.isLoading = true
    // this.fetchMovies().then(fetchedMovies => {
    //   fetchedMovies.forEach(json => this.updateMovieFromServer(json))
    //   this.isLoading = false
    // })
    // console.log("We have movies", movies)
    moviesFromJson.forEach(m => this.updateMovieFromServer(m))
    
    this.filteredMovies = this.movies

    this.currentMovie = this.movies[0] // TEMP

    this.isLoading = false
  }

  /**
   * Update a movie with information from the server. Guarantees a movie
   * only exists once. Might either construct a new movie, update an existing one,
   * or remove a movie if it has been deleted on the server.
   */
  updateMovieFromServer(json) {
    // const movie = this.movies.find(movie => movie.id === json.id)
    // if (!movie) {
    //   movie = new Movie(this, json.id)
    //   this.movies.push(movie)
    // }
    // if (json.isDeleted) {
    //   this.removeMovie(movie)
    // } else {
    //   movie.updateFromJson(json)
    // }
    const movie = new Movie(json.imbdid)
    movie.updateFromJson(json)
    this.movies.push(movie)
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

  // constructor(store, id = uuid.v4()) {
  //   this.store = store
  //   this.id = id

  //   this.saveHandler = reaction(
  //     // observe everything that is used in the JSON:
  //     () => this.asJson,
  //     // if autoSave is on, send json to server
  //     json => {
  //       if (this.autoSave) {
  //         this.store.transportLayer.saveMovie(json)
  //       }
  //     }
  //   )
  // }

  /**
   * Remove this Movie from the client and server
   */
  // delete() {
  //   this.store.transportLayer.deleteMovie(this.id)
  //   this.store.removeMovie(this)
  // }

  // @computed get asJson() {
  //   return {
  //     id: this.id,
  //     completed: this.completed,
  //     task: this.task,
  //     authorId: this.author ? this.author.id : null
  //   }
  // }

  /**
   * Update this Movie with information from the server
   */
  updateFromJson(json) {
    // make sure our changes aren't sent back to the server
    Object.keys(json).forEach(k => {
      this[k] = json[k]
    })
  }

  // dispose() {
  //   // clean up the observer
  //   this.saveHandler()
  // }
}
