// Generic Libraries
import { action, observable, computed } from 'mobx'
// import _ from 'lodash'

/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
*/

export default class UserPortfolio {

  // ** GENERIC HELPERS **
  // use for wait states in UI
  @observable updating = false
  // any errors returned by APIs
  // (not sure of type)
  @observable errors = undefined

  // ** Watchlist **
  @observable watchlist = {}

  // ** Investments  **
  @observable investments = {}

  // ... Etc

  constructor(initialData = {  }, hanzoApi) {
    // TODO Do we still need this?
    // :aa I don't think so.... why would we?
    // E: This might be required for persisting state across page changes

    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  @action async getWatchlist (onSuccess, onError) {
    this.updating = true
    
    try {
      const res = await this.api.client.account.login({
        email: this.email,
        password: this.password,
      })

      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      console.log('Error logging in', ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action async getInvestments (onSuccess, onError) {
    this.updating = true
    
    try {
      const res = await this.api.client.account.login({
        email: this.email,
        password: this.password,
      })

      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      console.log('Error logging in', ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @computed get isValidName() {
    return stringPresentAndValid(this.firstName) 
        && stringPresentAndValid(this.lastName)
          // middle name is not checked
  }

}
