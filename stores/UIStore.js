import { action, observable, computed } from "mobx"

export default class UIStore {
  @observable snackBarOpen = false
  @observable error = ""

  constructor(initialData, hanzoApi) {
    this.api = hanzoApi
  }

  @computed get open() {
    return this.snackBarOpen
  }

  @computed get error() {
    return this.snackBarOpen
  }

  // @action setSnackBarOpen(bool) {
  //   this.snackBarOpen = bool
  // }
}
