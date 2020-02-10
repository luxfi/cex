import { action, observable, computed } from "mobx"
import moment from 'moment'

import movieDates from '../assets/tempData/movieDates'

export default class NewsStore {
  dates = []

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
    this.dates = movieDates;
  }

  @action async loadFeed(url) {
    try {
      const res = await fetch(url || 'https://files.hanzo.ai/feed/', { method: 'GET' })
      const { feed } = await res.json()
      this.feed = feed
    } catch (ex) {
      console.error('Caught parser exception', ex)
    }
  }

  @computed get formatedDates() {
    return this.feed.items ? this.feed.items : []
  }
}


