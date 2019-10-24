import { action, observable, computed } from "mobx"

export default class UIStore {
  @observable snackBarOpen = false
  @observable error = ""
  @observable modal = {
    open: false,
    title: null,
    body: null
  }

  // constructor(initialData, hanzoApi) {
  //   this.api = hanzoApi
  // }

  @computed get open() {
    return this.snackBarOpen
  }

  @computed get error() {
    return this.snackBarOpen
  }

  @action openModal(title, body) {
    this.modal.open = true
    this.modal.title = title
    this.modal.body = body
  }

  @action closeModal() {
    this.modal.open = false
    this.modal.title = null
    this.modal.body = null
  }
}
