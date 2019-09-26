// Generic Libraries
import { action, observable, computed } from 'mobx'
import * as ethers from 'ethers'
// import _ from 'lodash'

// Proprietary Libraries
import Api from '../src/hanzo/api'
import isEmail from "../src/control-middlewares/isEmail"
import isPassword from "../src/control-middlewares/isPassword"

// Constants
import { HANZO_KEY, HANZO_ENDPOINT } from "../src/settings.js"

/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
*/


const BASE_HANZO_API_URL = "TODO" // should get this from a config object
const api = new Api(HANZO_KEY, HANZO_ENDPOINT)

export default class UserStore {

  // ** GENERIC HELPERS **
  // use for wait states in UI
  @observable updating = false
  // any errors returned by APIs
  // (not sure of type)
  @observable errors = undefined

  /*
  ** USER INFO **
  Works for both signup and login
  */
  // User Email
  @observable email = undefined
  // User Password
  @observable password = undefined
  // logged in user object returned by API
  @observable currentUser = undefined
  // Token comes from the Hanzo API
  @observable token = undefined

  // ** SIGNUP INFO **
  @observable validEmail = false
  @observable validPassword = false
  @observable over18 = false
  @observable firstName = undefined
  @observable lastName = undefined
  @observable confirmPassword = undefined

  constructor(initialData = {  }) {
    // TODO Do we still need this?
  }
  
    // TODO store this w httpOnly in a cookie w all the proper security precautions. 
  @action setToken(token) {
    if (!!token) {
      this.token = token
      window.localStorage.setItem('token', token)
    } else {
      this.token = undefined
      window.localStorage.removeItem('token')
    }
  }

  @computed loggedIn() {
    return !!this.currentUser
  }

  @action validateEmail (email) {
    this.validEmail = isEmail(email)
  }

  @action validatePassword (password) {
    this.validPassword = isPassword(password)
  }

  @action async signUp () {
    // ** ONLY CALL WHEN @computer isValidSignup IS TRUE **
    // Sign the user up
    this.updating = true

    try {
      const res = await api.client.account.create({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      })

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)

    } catch (ex) {
      this.errors = (err.response && err.response.body && err.response.body.errors)
        ? err.response.body.errors : ''
    } finally {
      this.updating = false
    }
  }

    // Assumes values are in `displayValues`
  @action async login() {
    this.updating = true
    
    try {
      const res = await api.client.account.login({
        email: this.email,
        password: this.password,
      })

      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)

    } catch (ex) {
      // this.errors = (err.response && err.response.body && err.response.body.errors)
      //   ? err.response.body.errors : ''
      console.log('Error logging in', ex)
    } finally {
      this.updating = false
    }
  }

  @action forgetUser() {
    this.currentUser = undefined
    this.setToken(undefined)
  }

  @computed get isValidSignup() {
    return this.validEmail 
          && this.validPassword 
          && this.password === this.confirmPassword
          && typeof this.firstName === 'string'
          && this.firstName.length >= 2
          && typeof this.lastName === 'string'
          && this.lastName.length >= 2
          && this.over18
  }
}
