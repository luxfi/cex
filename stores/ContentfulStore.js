import { action, observable, computed } from "mobx"

import { ContentfulClient, ContentfulCache, withContentful } from 'react-contentful'

const CONTENTFUL_API = {
  accessToken: '1ulGLoKXVO2wTcEODgrGo0W-GzCk8m8ZZCZ_GGfLP9Y',
  host: 'cdn.contentful.com',
  space: 'au6d8n3ji32v',
}
const CONTENT_TYPE = 'faq' // couldn't change once it had been created


export default class ContentfulStore {

  @observable items = []

  constructor(isSSR) {
    this.getContent(isSSR)
  }

  getContent(isSSR) {
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
    })
    .catch (console.error)
  }

}

