import { action, observable, computed } from 'mobx'
import _ from 'lodash'



export default class MovieStore {
  
  @observable currentMovie = undefined

  constructor(initialData , hanzoApi) {
    this.movies = initialData
    this.api = hanzoApi
      // TEMP
    this.currentMovie = this.movies[0]
    this.currentMovie.shortDescription = "Lorem ipsum dolor sit amet, \
      consectetur adipiscing elit, sed do eiusmod tempor incididunt."
  }

  // hydrate(serializedStore) {
  //     this.movies = serializedStore
  // }

  @action setMovies(movies) {
    this.movies = movies
  }

  @computed get topMovies() {
    return this.movies.length > 0 ? _.sortBy(this.movies, r => -r.percentChange).slice(0, 15) : this.movies
  }
}

/*
export async function fetchInitialStoreState(initialData = []) {
  let jsonArray = []

  // You can do anything to fetch initial store state
  const csvFilePath = './assets/tempData/movies.csv'
  const csv = require('csvtojson')


  // // Async / await usage
  jsonArray = await csv().fromFile(csvFilePath)

  return jsonArray
}
*/