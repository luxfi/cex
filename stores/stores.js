import { action, observable, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'

import MovieStore from './MovieStore';

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let store = null

export default function initializeStore(initialData = { movieStore: {} }) {
    if (isServer) {
        // Server stuff
        store = {
            movieStore: new MovieStore(initialData.movieStore)
        }
    } else if (store === null) {
        // Client stuff
        store = {
            movieStore: new MovieStore(initialData.movieStore)
        }
    }
    // Otherwise we don't need to re-initialize the store
    return store
}