import { action, observable, computed } from "mobx"

export default class NewsStore {
  @observable feed = {}
  @observable loading = true

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  @action async loadFeed(url) {
    try {
      const res = await fetch(url || 'https://files.hanzo.ai/feed/', { method: 'GET' })
      const { feed } = await res.json()
      this.feed = feed
      this.loading = false
    } catch (ex) {
      console.error('Caught parser exception', ex)
      this.loading = false
    }
  }

  @computed get getFeedItems() {
    return this.feed.items ? this.feed.items : []
  }
}


