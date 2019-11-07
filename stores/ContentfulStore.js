import { action, observable, computed } from "mobx"

import { ContentfulClient, ContentfulCache} from 'react-contentful'

const CONTENTFUL_API = {
  accessToken: '1ulGLoKXVO2wTcEODgrGo0W-GzCk8m8ZZCZ_GGfLP9Y',
  host: 'cdn.contentful.com',
  space: 'au6d8n3ji32v',
}
const CONTENT_TYPE = 'faq' // couldn't change once it had been created


export default class ContentfulStore {

  @observable items = []
  @observable mappedByTags = new Map()

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  @action getContent(isSSR) {
    const client = new ContentfulClient({
      ...CONTENTFUL_API,
      cache: new ContentfulCache(),
      ssrMode: isSSR
    })

    client.getEntries({
      content_type: CONTENT_TYPE

    })
    .then((res) => {
      this.items = res.items
      this.mappedByTags = sortByTags(this.items)
    })
    .catch (console.error)
  }

  byTag(tag) {
    let result = this.mappedByTags.get(tag)
    return (result) ? result : []
  }
}


const itemTags = (item) => {
  return (item.fields.tags) ? item.fields.tags : []
}

const sortByTags = (items) => {
  const mapByTags = new Map()
  items.forEach(item => {
    const tags = itemTags(item)
    tags.forEach((tag) => {
      let taggedItems = mapByTags.get(tag)
      if (!taggedItems) {
        taggedItems = []
        mapByTags.set(tag, taggedItems)
      }
      taggedItems.push(item)
    })
  })
  return mapByTags
}