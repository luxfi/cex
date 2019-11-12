import { action, observable, computed } from "mobx"

export default class NewsStore {
  @observable feed = {}

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  @action async loadFeed(url) {
    console.log('Calling loadFeed')
    try {
      const res = await fetch(url || 'https://files.hanzo.ai/feed/', { method: 'GET' })
      const { feed } = await res.json()
      console.log(feed)
      
      this.feed = feed
    } catch (ex) {
      console.error('Caught parser exception', ex)
    }
  }

  @computed get getFeedItems() {
    return this.feed.items ? this.feed.items : []
  }
}


