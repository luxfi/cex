// Generic Libraries
import { action, observable, computed } from 'mobx'
import * as ethers from 'ethers'
// import _ from 'lodash'

// Proprietary Libraries
import Api from '../src/hanzo/api'
import isEmail from "../src/control-middlewares/isEmail"
import isPassword from "../src/control-middlewares/isPassword"
import isPhone from "../src/control-middlewares/isPhone"

// Constants
import { HANZO_KEY, HANZO_ENDPOINT } from "../src/settings.js"

/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
*/

export default class UserStore {
  api = new Api(HANZO_KEY, HANZO_ENDPOINT)

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
  @observable middleName = undefined
  @observable lastName = undefined
  @observable confirmPassword = undefined

  // ** KYC **
  @observable phone = undefined
  @observable taxId = undefined
  @observable birthdate = undefined
  @observable gender = 'unspecified'
  @observable address1 = undefined
  @observable address2 = undefined
  @observable city = undefined
  @observable postalCode = undefined
  @observable country = undefined
  @observable state = undefined
  @observable documents0 = undefined
  @observable documents1 = undefined
  @observable documents2 = undefined

  @observable validPhone = false


  /* what to do with ?
   opts.kyc.ethereumAddress = this.props.ethKey.address
    opts.kyc.eosPublicKey = this.props.eosKey.publicKey
  */

  // ... Etc

  constructor(initialData = {  }) {
    // TODO Do we still need this?
    // :aa I don't think so.... why would we?
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
    return !!this.token
  }

  @action setValue (key, val) {
    this[key] = val
  }

  @action validateEmail (email) {
    this.validEmail = isEmail(email)
  }

  @action validatePassword(password) {
    this.validPassword = isPassword(password)
  }

  @action validatePhone(phone) {
    this.validPhone = isPhone(phone)
  }

  @action async signUp (onSuccess, onError) {
    // ** ONLY CALL WHEN @computer isValidSignup IS TRUE **
    // Sign the user up
    this.updating = true

    try {
      const res = await this.api.client.account.create({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      })

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      // this.errors = (err.response && err.response.body && err.response.body.errors)
      //   ? err.response.body.errors : ''
        console.log('Error signing up', ex)
        onError && onError()
    } finally {
      this.updating = false
    }
  }

    // Assumes values are in `displayValues`
  @action async login (onSuccess, onError) {
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
      // this.errors = (err.response && err.response.body && err.response.body.errors)
      //   ? err.response.body.errors : ''
      console.log('Error logging in', ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action forgetUser () {
    this.currentUser = undefined
    this.setToken(undefined)
  }

  @computed get isValidSignup () {
    return this.validEmail 
          && this.validPassword 
          && this.password === this.confirmPassword
          && typeof this.firstName === 'string'
          && this.firstName.length >= 2
          && typeof this.lastName === 'string'
          && this.lastName.length >= 2
          && this.over18
  }

  @computed get isValidLogin () {
    return this.validEmail
          && this.validPassword
  }
}
