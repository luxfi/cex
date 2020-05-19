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

let _initialData = {
  articleStore: {},
  careerStore: {},
  commentStore: {},
  contentfulStore: {},
  movieStore: {},
  newsStore: {},
  orderBook: {},
  pickSeatStore: {},
  ticketCheckoutStore: {},
  ticketingStore: {},
  trailerStore: {},
  uiStore: {},
  userPortfolio: {},
  userStore: {},
}

let stores = null
export default (initialData = _initialData) => {
  let api = null

  if (!isServer) {
    api = new Hanzo.Api({key: HANZO_KEY, endpoint: HANZO_ENDPOINT})
  }

  stores = {
    articleStore: new ArticleStore(initialData.articleStore, api),
    careerStore: new CareerStore(initialData.uiStore, api),
    commentStore: new CommentStore(initialData.commentStore, api),
    contentfulStore: new ContentfulStore(initialData.contentfulStore, api),
    movieStore: new MovieStore(initialData.movieStore, api),
    newsStore: new NewsStore(initialData.newsStore, api),
    orderBook: new OrderBook(initialData.orderBook, api),
    pickSeatStore: new PickSeatStore(initialData.pickSeatStore, api),
    ticketCheckoutStore: new TicketCheckoutStore(initialData.ticketCheckoutStore, api),
    ticketingStore: new TicketingStore(initialData.ticketingStore, api),
    trailerStore: new TrailerStore(initialData.trailerStore, api),
    uiStore: new UIStore(initialData.uiStore, api),
    userPortfolio: new UserPortfolio(initialData.userPortfolio, api),
    userStore: new UserStore(initialData.userStore, api),
  }

  if (!isServer) {
    // Should any of these be called here?
    // stores.ticketCheckoutStore.getTicketOrders()
    stores.trailerStore.getAutoPlay()
    stores.uiStore.loadState()
    stores.userPortfolio.getWatchlist()
    stores.userStore.loadSession()
  }

  // Otherwise we don't need to re-initialize the store
  return stores
}
