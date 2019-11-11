import { action, observable, computed } from "mobx"

export default class UIStore {
  @observable snackBarOpen = false
  @observable rightDrawerOpen = false
  @observable error = ""
  @observable modal = {
    open: false,
    title: null,
    body: null
  }
  
  @computed get open() {
    return this.snackBarOpen
  }

  @computed get error() {
    return this.snackBarOpen
  }

  @action setRightDrawerOpen(open) {
    this.rightDrawerOpen = open
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
