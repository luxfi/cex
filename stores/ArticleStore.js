import { action, observable, computed, autorun } from "mobx"
import _ from "lodash"
import uuid from "uuid"

import articlesFromJson from "../assets/tempData/articles"

export default class ArticleStore {
  @observable articles = []
  @observable isLoading = true
  @observable currentArticle = undefined

  constructor(initialData, hanzoApi) {
    this.loadArticles()
    // this.articles = initialData
    this.api = hanzoApi
    // TEMP
    this.currentArticle = this.articles[0]
  }

  /**
   * Fetches all Articles from the server
   */
  loadArticles() {
    this.isLoading = true
    // this.fetchArticles().then(fetchedArticles => {
    //   fetchedArticles.forEach(json => this.updateArticleFromServer(json))
    //   this.isLoading = false
    // })
    // console.log("We have articles", articles)
    articlesFromJson.forEach(m => this.updateArticleFromServer(m))

    this.isLoading = false
  }

  /**
   * Update a article with information from the server. Guarantees a article
   * only exists once. Might either construct a new article, update an existing one,
   * or remove a article if it has been deleted on the server.
   */
  updateArticleFromServer(json) {
    // const article = this.articles.find(article => article.id === json.id)
    // if (!article) {
    //   article = new Article(this, json.id)
    //   this.articles.push(article)
    // }
    // if (json.isDeleted) {
    //   this.removeArticle(article)
    // } else {
    //   article.updateFromJson(json)
    // }
    const article = new Article(json.articleSlug)
    article.updateFromJson(json)
    this.articles.push(article)
  }

  // @computed get topArticles() {
  //   return this.articles.length > 0
  //     ? _.sortBy(this.articles, r => -r.percentChange).slice(0, 15)
  //     : this.articles
  // }
  @computed get homePageArticles() {
    return this.articles.length > 0 ? this.articles.slice(0, 4) : this.articles
  }

  getArticle(slug) {
    return this.articles.find(article => article.articleSlug === slug)
  }
}

export class Article {
  /**
   * unique id of this Article, immutable.
   */
  id = null
  // store = null

  @observable movieName = ""
  @observable movieSlug = ""
  @observable articleSlug = ""
  @observable articleTitle = ""
  @observable heroImage = ""
  @observable description = ""
  @observable date = ""
  @observable author = ""
  @observable avatar = ""
  @observable articleSections = []

  /**
   * Indicates whether changes in this object
   * should be submitted to the server
   */
  // autoSave = true

  /**
   * Disposer for the side effect that automatically
   * stores this Article, see @dispose.
   */
  // saveHandler = null

  constructor(id = uuid.v4()) {
    this.id = id
  }

  // constructor(store, id = uuid.v4()) {
  //   this.store = store
  //   this.id = id

  //   this.saveHandler = reaction(
  //     // observe everything that is used in the JSON:
  //     () => this.asJson,
  //     // if autoSave is on, send json to server
  //     json => {
  //       if (this.autoSave) {
  //         this.store.transportLayer.saveArticle(json)
  //       }
  //     }
  //   )
  // }

  /**
   * Remove this Article from the client and server
   */
  // delete() {
  //   this.store.transportLayer.deleteArticle(this.id)
  //   this.store.removeArticle(this)
  // }

  // @computed get asJson() {
  //   return {
  //     id: this.id,
  //     completed: this.completed,
  //     task: this.task,
  //     authorId: this.author ? this.author.id : null
  //   }
  // }

  /**
   * Update this Article with information from the server
   */
  updateFromJson(json) {
    // make sure our changes aren't sent back to the server
    this.movieName = json.movieName
    this.articleSlug = json.articleSlug
    this.movieSlug = json.movieSlug
    this.articleTitle = json.articleTitle
    this.heroImage = json.heroImage
    this.description = json.description
    this.date = json.date
    this.author = json.author
    this.avatar = json.avatar
    this.articleSections = json.articleSections
  }

  // dispose() {
  //   // clean up the observer
  //   this.saveHandler()
  // }
}
