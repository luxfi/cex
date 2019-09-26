// Generic Libraries
import { action, observable, computed } from "mobx"
import * as ethers from "ethers"
// import _ from 'lodash'

// Proprietary Libraries
import Api from "../src/hanzo/api"
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
  @observable errors = null

  /*
  ** USER INFO **
  Works for both signup and login
  */
  // User Email
  @observable email = ""
  // User Password
  @observable password = ""
  // logged in user object returned by API
  @observable currentUser = ""
  // Token comes from the Hanzo API
  @observable token = null

  // ** SIGNUP INFO **
  @observable validEmail = false
  @observable validPassword = false
  @observable validFirstName = false
  @observable validLastName = false
  @observable over18 = false
  @observable firstName = undefined
  @observable middleName = undefined
  @observable lastName = undefined
  @observable passwordConfirm = undefined

  // ** KYC **
  @observable phone = undefined
  @observable taxId = undefined
  @observable birthdate = undefined
  @observable gender = "unspecified"
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
  @observable validTaxId = false
  @observable validBirthdate = false
  // gender is a dropdown and defaults to 'unspecified' -- no need to track
  @observable validAddress1 = false
  @observable validCity = false
  @observable validPostalCode = false
  // country is a dropdown
  // state is a dropdown

  /* what to do with ... TODO
    opts.kyc.ethereumAddress = this.props.ethKey.address
    opts.kyc.eosPublicKey = this.props.eosKey.publicKey
  */

  // ... Etc

  constructor(initialData = {}) {
    // TODO Do we still need this?
    // :aa I don't think so.... why would we?
    // E: This might be required for persisting state across page changes
  }

  // TODO store this w httpOnly in a cookie w all the proper security precautions.
  @action setToken(token) {
    if (!!token) {
      this.token = token
      window.localStorage.setItem("token", token)
    } else {
      this.token = undefined
      window.localStorage.removeItem("token")
    }
  }

  @action setValue(key, val) {
    // console.log("key, val", [key, val])
    this[key] = val
  }

  @action validateEmail() {
    console.log("Validating email", isEmail(this.email))
    this.validEmail = isEmail(this.email)
  }

  @action validatePassword() {
    this.validPassword = isPassword(this.password)
  }

  @action validateFirstName() {
    this.validFirstName = stringPresentAndValid(this.firstName)
  }

  @action validateLastName() {
    this.validLastName = stringPresentAndValid(this.lastName)
  }

  @action validatePhone(phone) {
    this.validPhone = isPhone(phone)
  }

  @action validateTaxId(id) {
    // 9 digits etc
    // https://howtodoinjava.com/regex/java-regex-validate-social-security-numbers-ssn/
    const regex = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/
    this.validTaxId = regex.test(id)
  }

  @action validateBirthdate(d) {
    // TODO valid date and range (this could be unnecessary if a date control is used)
    this.validBirthdate = stringPresentAndValid(d)
  }

  @action validateAddress1(a) {
    // TODO call API for street addresses in the US and make this unnecessary :)
    // in the meantime check for a valid date
    this.validAddress1 = stringPresentAndValid(a)
  }

  @action validateCity(c) {
    // TODO call API for street addresses in the US and make this unnecessary :)
    // in the meantime check for a valid date
    this.validCity = stringPresentAndValid(c)
  }

  @action validatePostalCode(c) {
    const regex = /^\d{ 5}$/
    this.validPostalCode = regex(c)
  }

  @action async signUp(onSuccess, onError) {
    // ** ONLY CALL WHEN @computed isValidSignup IS TRUE **
    this.updating = true

    try {
      const res = await this.api.client.account.create({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      })

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))

      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      // this.errors = (err.response && err.response.body && err.response.body.errors)
      //   ? err.response.body.errors : ''
      console.log("Error signing up", ex)
      onError && onError(ex)
    } finally {
      this.updating = false
    }
  }

  @action async login(onSuccess, onError) {
    this.updating = true

    try {
      const res = await this.api.client.account.login({
        email: this.email,
        password: this.password
      })

      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

      const i = this.email + this.password

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))
      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }
  @action async logout(onSuccess, onError) {
    this.updating = true

    try {
      const res = await this.api.client.account.logout()
      this.forgetUser()
      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging out", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action async updateKYC(onSuccess, onError) {
    // ** ONLY CALL WHEN @computed isValidKYC IS TRUE **
    this.updating = true
    let opts = ({
      phone,
      taxId,
      birthdate,
      gender,
      address1,
      address2,
      city,
      postalCode,
      country,
      state,
      documents0,
      documents1,
      documents2
    } = this)

    try {
      const res = await this.api.client.account.update({ opts })
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error saving KYC options", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action forgetUser() {
    this.currentUser = undefined
    this.setToken(undefined)
  }

  @computed get isValidName() {
    return (
      stringPresentAndValid(this.firstName) &&
      stringPresentAndValid(this.lastName)
    )
    // middle name is not checked
  }

  @computed get isValidSignup() {
    console.log("validEmail", this.validEmail)
    console.log("validPassword", this.validPassword)
    console.log(
      "password === passwordConfirm",
      this.password === this.passwordConfirm
    )
    console.log("over18", this.over18)
    console.log("isValidName", this.isValidName)

    return (
      this.validEmail &&
      this.validPassword &&
      this.password === this.passwordConfirm &&
      this.over18 &&
      this.isValidName
    )
  }

  @computed get isValidLogin() {
    return this.validEmail && this.validPassword
  }

  @computed get loggedIn() {
    return !!this.token
  }

  @computed get isValidKYC() {
    return (
      this.isValidName() &&
      this.validPhone &&
      this.validTaxId &&
      this.validBirthdate &&
      this.validAddress1 &&
      this.validCity &&
      this.postalCode
    )
    // country is dropdown (noted above)
  }
}

function stringPresentAndValid(s) {
  return typeof s === "string" && s.length >= 2
}
