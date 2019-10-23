// Generic Libraries
import { action, observable, computed } from "mobx"
import Router from "next/router"

import * as ethers from "ethers"
// import _ from 'lodash'

// Utilities
import isEmail from "../src/control-middlewares/isEmail"
import isPassword from "../src/control-middlewares/isPassword"
import isPhone from "../src/control-middlewares/isPhone"
import isRequired from "../src/control-middlewares/isRequired"

/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
 */

export default class UserStore {
  // ** GENERIC HELPERS **
  // use for wait states in UI
  @observable updating = false
  // any errors returned by APIs
  // (not sure of type)
  @observable errors = null

  // Application Level Settings
  @observable appSettings = null

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
  // Account comes from the Hanzo API
  @observable token = null
  @observable account = null

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

  // ** Watchlist **
  @observable watchlist = []

  // **

  // ... Etc

  // ** Payment Method **
  @observable newPaymentMethodPublicToken = undefined
  @observable newPaymentMethodName        = undefined
  // Set to plaid for now
  @observable newPaymentMethodType        = "plaid"
  @observable newPaymentMethodMetadata    = undefined

  @observable validNewPaymentMethodPublicToken = false
  @observable validNewPaymentMethodName        = false
  @observable validNewPaymentMethodMetadata    = false

  constructor(initialData = {}, hanzoApi) {
    // TODO Do we still need this?
    // :aa I don't think so.... why would we?
    // E: This might be required for persisting state across page changes

    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
    this.loadSession()
  }

  /**
   * Fetches all todos from the server
   */
  @action async loadSession() {
    this.isLoading = true

    this.token = this.api.client.getCustomerToken()

    try {
      if (this.token) {
        const ps = [
          this.api.client.library.shopjs(),
          this.api.client.account.get(),
        ]

        let [appSettings, account] = await Promise.all(ps)
        this.appSettings = appSettings
        this.account = account
      } else {
        this.appSettings = await this.api.client.library.shopjs()
      }
    } catch (e) {
      console.log('account token expired', e)
      this.logout()
    }

    this.isLoading = false
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

  @action validateNewPaymentMethodPublicToken() {
    this.validNewPaymentMethodPublicToken = isRequired(this.newPaymentMethodPublicToken)
  }

  @action validateNewPaymentMethodName() {
    this.validNewPaymentMethodName = isRequired(this.newPaymentMethodName)
  }

  @action validateNewPaymentMethodMetadata() {
    this.validNewPaymentMethodMetadata = isRequired(this.newPaymentMethodMetadata)
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
      onError && onError(ex.toString())
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
      this.account = await this.api.client.account.get()
      this.setToken(res.token)
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error logging in", ex)
      onError && onError(ex.toString())
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
      Router.push('/login')
    } catch (ex) {
      console.log("Error logging out", ex)
      onError && onError(ex.toString())
    } finally {
      this.updating = false
    }
  }

  @action async addPaymentMethod(onSuccess, onError) {
    try {
      const opts = {
        publicToken: this.newPaymentMethodPublicToken,
        accountId: this.newPaymentMethodMetadata.account_id,
        type: this.newPaymentMethodType,
        name: this.newPaymentMethodName,
        metadata: this.newPaymentMethodMetadata,
      }

      const res = await this.api.client.account.paymentMethod.create(opts)

    } catch (ex) {
      console.log("Error logging out", ex)
      onError && onError(ex.toString())
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
      this.account = await this.api.client.account.update({ opts })
      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error saving KYC options", ex)
      onError && onError()
    } finally {
      this.updating = false
    }
  }

  @action forgetUser() {
    if (this.api.client.deleteCustomerToken) {
      this.token = this.api.client.deleteCustomerToken()
    }
    this.account = undefined
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
      this.passwordsMatch &&
      this.over18 &&
      this.isValidName
    )
  }

  @computed get isValidLogin() {
    console.log("this.validEmail", this.validEmail)
    console.log("this.validPassword", this.validPassword)
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

  @computed get isValidNewPaymentMethod() {
    return (
      this.validNewPaymentMethodPublicToken &&
      this.validNewPaymentMethodName &&
      this.validNewPaymentMethodMetadata
    )
  }


  @computed get passwordsMatch() {
    return this.password === this.passwordConfirm
  }
}

function stringPresentAndValid(s) {
  return typeof s === "string" && s.length >= 2
}

export async function fetchUserSession() {
  // You can do anything to fetch initial store state
  return {}
}
