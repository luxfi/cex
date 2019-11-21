import { action, observable, computed } from 'mobx'

export default class UIStore {
  @observable snackBarOpen = false
  @observable snackBarVariant = 'error'
  @observable snackBarMessage = ''

  @observable drawers = {
    left: false,
    right: false,
  }

  @observable modal = {
    open: false,
    title: null,
    body: null,
  }

  @action setLeftDrawerOpen = open => {
    this.drawers.left = open
  }

  @action setErrorMessage = message => {
    this.setSnackBarMessage(message, 'error')
  }

  @action setSuccessMessage = message => {
    this.setSnackBarMessage(message, 'success')
  }

  @action setSnackBarMessage = (message, variant) => {
    this.snackBarVariant = variant
    this.snackBarMessage = message
    this.snackBarOpen = true
  }

  @action setLeftDrawerOpen = open => {
    this.drawers.left = open
  }

  @action setRightDrawerOpen = open => {
    this.drawers.right = open
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
