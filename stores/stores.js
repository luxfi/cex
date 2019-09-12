import { action, observable, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'

import MovieStore from './MovieStore'
import OrderBook from './OrderBook'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let store = null

const _initialData = {
  movieStore: {},
  orderBook: {},
}

export default function initializeStore(initialData = _initialData) {
  if (isServer) {
    // Server stuff
    store = {
      movieStore: new MovieStore(initialData.movieStore),
      orderBook: new OrderBook(initialData.orderBook),
    }
  } else if (store === null) {
    // Client stuff
    store = {
      movieStore: new MovieStore(initialData.movieStore),
      orderBook: new OrderBook(initialData.orderBook),
    }
  }
  // Otherwise we don't need to re-initialize the store
  return store
}