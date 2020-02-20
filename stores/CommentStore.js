import { action, observable, computed } from 'mobx'
import uuid from 'uuid'
import commentsFromJSON from '../assets/tempData/comments'
import stores from './stores'


export default class CommentStore {
  @observable comments = {}
  @observable isLoading = true
  @observable sortBy = 'recent'
  @observable addCommentLoading = false

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
    this.getComments(identifierId).then((comments) => {
      this.comments = comments
      this.isLoading = false
    })
  }

  @action addComment(commentObject) {
    this.addCommentLoading = true
    const comment = this.generateCommentObject(commentObject)
    console.log(comment, 'rejtnjrnter')
    if (!comment.parentCommentId) {
      const newArray = [comment].concat(this.comments.comments)
      this.comments.comments = newArray
    } else {
      let replyIndex
      for (let i = 0; i < this.comments.comments.length; i++) {
        if (this.comments.comments[i].commentId === comment.parentCommentId) {
          replyIndex = i
          break
        }
      }
      this.comments.comments[replyIndex].replies.push(comment)
    }
    this.addCommentLoading = false
  }

  // eslint-disable-next-line class-methods-use-this
  generateCommentObject(commentObject) {
    const userStore = stores().userStore
    return {
      commentId: uuid.v4(),
      type: {
        typeId: commentObject.identifierId,
        typeSlug: 'terminator-dark-fate',
        commentType: 'trailerComment',
      },
      author: {
        authorId: commentObject.userId,
        authorDisplayName: userStore.getFullName,
        authorProfileImageUrl: 'https://yt3.ggpht.com/a/AGF-l7-4weoMHSuytRUC3Mk4PrrdTXdm8PYEYGqSyw=s48-c-k-c0xffffffff-no-rj-mo',
      },
      text: commentObject.text,
      replies: commentObject.parentId ? null : [],
      parentCommentId: commentObject.parentId,
      likeCount: 0,
      unlikeCount: 0,
      isPublic: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
    }
  }

  @action sortComments(sortBy) {
    const sortOptions = {
      recent: (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      top: (a, b) => b.likeCount - a.likeCount,
    }

    if (!sortOptions[sortBy]) {
      return
    }
    this.sortBy = sortBy
    const sorted = this.comments.comments.slice().sort(sortOptions[sortBy])
    this.comments.comments = sorted
  }
}
