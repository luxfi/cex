import { action, observable, computed } from "mobx"
import commentsFromJSON from '../assets/tempData/comments'

export default class CommentStore {
  @observable comments = {}
  @observable isLoading = true

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }
  
  getComments(identifierId) {
    // mock api call
    try {
      return new Promise((resolve, reject) => setTimeout(() => resolve(commentsFromJSON), 3000))
    } catch (error) {
      console.error('Caught parser exception', error)
    }
  }

  @action loadComments(identifierId) {
    this.isLoading = true
    this.getComments(identifierId).then(comments => {
      this.comments = comments
      this.isLoading = false
    })
  }

  @action addComment(commentObject) {
    console.log('comment added: ', commentObject)
  }

  
}


