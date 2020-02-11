import { action, observable, computed } from 'mobx'

export default class UIStore {
  @observable snackBarOpen = false
  @observable snackBarVariant = 'error'
  @observable snackBarMessage = ''
  @observable trading = 'pro'

  @observable drawers = {
    left: false,
    right: false,
  }

  @observable modal = {
    open: false,
    title: null,
    body: null,
  }

  @observable dialog = {
    open: false,
    name: null,
  }

  @action loadState = () => {
    const trading = window.localStorage.getItem('trading')

    if (trading) {
      this.trading = trading
    }
  }

  @action setTrading = (mode) => {
    this.trading = mode
    window.localStorage.setItem('trading', mode)
  }

  @action setLeftDrawerOpen = (openModal) => {
    this.drawers.left = openModal
  }

  @action setErrorMessage = (message) => {
    this.setSnackBarMessage(message, 'error')
  }

  @action setSuccessMessage = (message) => {
    this.setSnackBarMessage(message, 'success')
  }

  @action setSnackBarMessage = (message, variant) => {
    this.snackBarVariant = variant
    this.snackBarMessage = message
    this.snackBarOpen = true
  }

  @action setLeftDrawerOpen = (open) => {
    this.drawers.left = open
  }

  @action setRightDrawerOpen = (open) => {
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

  openDialog(name) {
    this.dialog.open = true
    this.dialog.name = name
  }

  closeDialog() {
    this.dialog.open = false
    this.dialog.name = null
  }
}
