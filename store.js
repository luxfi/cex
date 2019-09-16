import { action, observable, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import _ from 'lodash'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class Store {
  // @observable lastUpdate = 0
  // @observable light = false
  @observable movies = []

  hydrate(serializedStore) {
    this.movies = serializedStore
  }

  @computed get topMovies() {
      return this.movies.length > 0 ? _.sortBy(this.movies, r => -r.percentChange).slice(0,15) : this.movies
  }
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  const csvFilePath = './assets/tempData/movies.csv'
  const csv = require('csvtojson')


  // // Async / await usage
  const jsonArray = await csv().fromFile(csvFilePath)
  return jsonArray
}
