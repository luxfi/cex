import { action, observable, computed } from 'mobx'

export default class UIStore {
  @observable snackBarOpen = false
  @observable authModalOpen = false
  @observable browseModalOpened = false
  @observable tabIndexValue = 0
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
    const trading = localStorage.getItem('trading')

    if (trading) {
      this.trading = trading
    }
  }

  @action setTrading = (mode) => {
    this.trading = mode
    localStorage.setItem('trading', mode)
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

  @action openAuthModal() {
    this.authModalOpen = true
  }

  @action closeAuthModal() {
    this.authModalOpen = false
  }

  @action openBrowseModal(cb) {
    this.browseModalOpened = true

    if (cb) {
      cb()
    }
  }

  @action closeBrowseModal(success) {
    this.browseModalOpened = false
  }

  @action openDialog(name) {
    this.dialog.open = true
    if (name) {
      this.dialog.name = name
    }
  }

  @action closeDialog() {
    this.dialog.open = false
    this.dialog.name = null
  }

  @action setTabIndexValue(currentValue) {
    this.tabIndexValue = currentValue
  }
}
