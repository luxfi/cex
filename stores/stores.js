import { useStaticRendering } from "mobx-react"

import Hanzo from 'hanzo.js'

// Constants
import { HANZO_KEY, HANZO_ENDPOINT } from "../settings"

// Stores
import MovieStore from "./MovieStore"
import ArticleStore from "./ArticleStore"
import OrderBook from "./OrderBook"
import UserStore from "./UserStore"
import UserPortfolio from "./UserPortfolio"
import CommentStore from "./CommentStore"
import ContentfulStore from "./ContentfulStore"
import NewsStore from "./NewsStore"
import PickSeatStore from './PickSeatStore'
import TicketCheckoutStore from './TicketCheckoutStore'
import TicketingStore from './TicketingStore'
import TrailerStore from "./TrailerStore"
import UIStore from "./UIStore"
import CareerStore from "./CareerStore"

const isServer = typeof window === "undefined"
useStaticRendering(isServer)

let store = null

const _initialData = {
  movieStore: {},
  orderBook: {},
  userStore: {},
  userPortfolio: {},
  commentStore: {},
  contentfulStore: {},
  newsStore: {},
  pickSeatStore: {},
  ticketCheckoutStore: {},
  ticketingStore: {},
  uiStore: {},
  careerStore: {},
}

export default function initializeStore(initialData = _initialData) {
  const api = new Hanzo.Api({key: HANZO_KEY, endpoint: HANZO_ENDPOINT})
  if (isServer) {
    // Server stuff
    store = {
      movieStore: new MovieStore(initialData.movieStore, api),
      articleStore: new ArticleStore(initialData.articleStore, api),
      orderBook: new OrderBook(initialData.orderBook, api),
      userStore: new UserStore(initialData.userStore, api),
      userPortfolio: new UserPortfolio(initialData.userPortfolio, api),
      commentStore: new CommentStore(initialData.commentStore, api),
      contentfulStore: new ContentfulStore(initialData.contentfulStore, api),
      newsStore: new NewsStore(initialData.newsStore, api),
      pickSeatStore: new PickSeatStore(initialData.pickSeatStore, api),
      ticketCheckoutStore: new TicketCheckoutStore(initialData.ticketCheckoutStore, api),
      ticketingStore: new TicketingStore(initialData.ticketingStore, api),
      trailerStore: new TrailerStore(initialData.trailerStore, api),
      uiStore: new UIStore(initialData.uiStore, api),
      careerStore: new CareerStore(initialData.uiStore, api),
    }
  } else if (store === null) {
    // Client stuff
    store = {
      movieStore: new MovieStore(initialData.movieStore, api),
      articleStore: new ArticleStore(initialData.articleStore, api),
      orderBook: new OrderBook(initialData.orderBook, api),
      userStore: new UserStore(initialData.userStore, api),
      userPortfolio: new UserPortfolio(initialData.userPortfolio, api),
      commentStore: new CommentStore(initialData.commentStore, api),
      contentfulStore: new ContentfulStore(initialData.contentfulStore, api),
      newsStore: new NewsStore(initialData.newsStore, api),
      pickSeatStore: new PickSeatStore(initialData.pickSeatStore, api),
      ticketCheckoutStore: new TicketCheckoutStore(initialData.ticketCheckoutStore, api),
      ticketingStore: new TicketingStore(initialData.ticketingStore, api),
      trailerStore: new TrailerStore(initialData.trailerStore, api),
      uiStore: new UIStore(initialData.uiStore, api),
      careerStore: new CareerStore(initialData.uiStore, api),
    }

    store.uiStore.loadState()
  }
  // Otherwise we don't need to re-initialize the store
  return store
}
