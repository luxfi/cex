// Generic Libraries
import { action, observable, computed, toJS } from "mobx"
import Router from "next/router"
import moment from 'moment/moment.js'

import * as ethers from "ethers"
import _ from 'lodash'

// Utilities
import isEmail from "../src/control-middlewares/isEmail"
import isPassword from "../src/control-middlewares/isPassword"
import isPhone from "../src/control-middlewares/isPhone"
import isRequired from "../src/control-middlewares/isRequired"

const base64MimeType = (encoded) => {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

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
  // must initialize to empty string for controlled inputs
  // https://reactjs.org/docs/forms.html#controlled-components
  @observable firstName = ""
  @observable lastName = ""
  @observable passwordConfirm = ""

  // ** KYC **
  @observable phone = ""
  @observable taxId = ""
  @observable birthdate = null
  @observable gender = "unspecified"
  @observable address1 = ""
  @observable address2 = ""
  @observable city = ""
  @observable postalCode = ""
  @observable country = "US"
  @observable state = ""
  @observable documents0 = ""
  @observable documents1 = ""
  @observable documents2 = ""
  // start kyc on first step
  @observable activeStep = 0

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
  @observable newPaymentMethodName = undefined
  // Set to plaid for now
  @observable newPaymentMethodType = "plaid"
  @observable newPaymentMethodMetadata = undefined

  @observable validNewPaymentMethodPublicToken = false
  @observable validNewPaymentMethodName = false
  @observable validNewPaymentMethodMetadata = false

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
    if (this.api.client.getCustomerToken) {
      this.token = this.api.client.getCustomerToken()
    }

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
        this.hydrateStore(account)
      } else {
        this.appSettings = await this.api.client.library.shopjs()
      }
    } catch (e) {
      console.log('account token expired', e)
      this.logout()
    }

    this.isLoading = false
  }

  hydrateStore(account) {
    const userFields = ["firstName", "lastName", "email"]
    const kycFields = ["birthdate", "gender", "phone", "taxId" ]
    const addressFields = 
      ["name", 
      "country", 
      "postalCode",
      "state",
      "city" ,
      [ "address1", "line1" ],
      [ "address2", "line2" ],
    ]
    const user = account
    const { kyc } = account
    const { address } = kyc
    this.updateFromJson(user, userFields)
    this.updateFromJson(kyc, kycFields)
    this.updateFromJson(address, addressFields)
    this.checkCurrentStatus()
  }

  updateFromJson(json, keys) {
    // make sure our changes aren't sent back to the server
    keys.forEach(k => {
      // only update if available
      if (typeof k === 'string' && json[k]) {
        this[k] = json[k]
      } else if(Array.isArray(k) && json[k[1]]) {
        this[k[0]] = json[k[1]]
      }
    })
  }

  checkCurrentStatus() {
    const personalDetails = ["birthdate", "gender", "phone", "taxId"]
    const personalAddress = 
    ["name",
      "country",
      "postalCode",
      "state",
      "city",
      "address1"]
    if (this.anyMissingData(personalDetails)) {
      this.setActiveStep(0)
    } else if (this.anyMissingData(personalDetails)) {
      this.setActiveStep(1)
    } else {
      this.setActiveStep(2)
    }
  }

  anyMissingData(keys) {
    keys.some(k => _.isEmpty(this[k]) )
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
    this[key] = val
  }

  @action setActiveStep(step) {
    // sets current step in KYC
    this.activeStep = step
  }

  @computed get validFirstName() {
    return stringPresentAndValid(this.firstName)
  }

  @computed get validLastName() {
    return stringPresentAndValid(this.lastName)
  }

  @computed get validEmail() {
    const regex = /^\S+@\S+\.\S+$/
    return regex.test(this.email)
  }

  @computed get validPassword() {
    return typeof this.password === 'string' && this.password.length > 6
  }

  @computed get validPhone() {
    // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    const regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
    return regex.test(this.phone)
  }


  @computed get validTaxId() {
    // 9 digits etc
    // https://howtodoinjava.com/regex/java-regex-validate-social-security-numbers-ssn/
    const regex = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/
    return regex.test(this.taxId)
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

  @action updateKYCPhotoDocuments() {
    const docs = [this.documents0, this.documents1, this.documents2]
    docs.forEach((file) => {
      this.updateKYCPhoto(file)
    })
  }

  @action async updateKYCPhoto(file, onSuccess, onError) {
    // ** ONLY CALL WHEN @computed isValidSignUp IS TRUE **
    this.updating = true

    const mimeType = base64MimeType(file)

    console.log(mimeType)

    try {
      const res = await fetch("https://files.hanzo.ai/upload", {
        // Your POST endpoint
        method: "POST",
        headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          "Content-Type": mimeType
        },
        body: file // This is your file object
      })

      let data = await response.json()

      console.log("json response: ", data)

      onSuccess && onSuccess()
    } catch (ex) {
      console.log("Error updatng photo documents", ex)
      onError && onError(ex.toString())
    } finally {
      this.updating = false
    }
  } 

  @action async signUp(onSuccess, onError) {
    // ** ONLY CALL WHEN @computed isValidSignUp IS TRUE **
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

      // this.setToken(res.token)
      this.loadSession()
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
      // this.account = await this.api.client.account.get()
      this.loadSession()
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
    const addressObj =
    {
      name: `${this.firstName} ${this.lastName}`,
      line1: this.address1,
      line2: this.address2,
      city: this.city,
      postalCode: this.postalCode,
      state: this.state,
      country: this.country,
    }

    const kycObj =
    {
      address: addressObj,
      taxId: this.taxId,
      phone: this.phone,
      birthdate: this.birthdate,
      gender: this.gender,
      documents: this.documents
    }
    try {
      const newAcc = Object.assign(
        this.account,
        {
          kyc: kycObj,
          firstName: this.firstName,
          lastName: this.lastName
        })
      await this.api.client.account.update(newAcc)
      // On success
      this.account = newAcc
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

  @computed get isValidSignUp() {
    return (
      this.validEmail &&
      this.validFirstName &&
      this.validLastName &&
      this.validPassword &&
      this.passwordsMatch
    )
  }

  @computed get isValidLogin() {
    return this.validEmail && this.validPassword
  }

  @computed get loggedIn() {
    return !!this.token
  }

  @computed get validAddress1() {
    const regex = /^\s*\S+(?:\s+\S+){2}/
    return regex.test(this.address1)
  }

  @computed get validCity() {
    const regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    return regex.test(this.city)
  }

  @computed get validPostalCode() {
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    return regex.test(this.postalCode)
  }

  @computed get isValidAddress() {
    return (
      this.validAddress1 &&
      this.validCity &&
      this.validPostalCode
    )
  }

  @computed get countries() {
    // returns array of objects, countries with code
    // [{ "name": "Afghanistan", "code": "AF" },
    // { "name": "Albania", "code": "AL" }]
    if (!this.appSettings) return {}
    return this.appSettings.countries.reduce((acc, memo) => {
      acc.push({ "name": memo.name, "code": memo.code })
      return acc
    }, [])
  }

  @computed get states() {
    // returns array of objects, states with code
    // [{ name: "Florida", code: "FL" },
    // { name: "Michigan", code: "MI" }]
    if (!this.appSettings) return {}
    const countryObj = this.appSettings.countries.find(country => country.code === this.country)
    const statesArray = countryObj.subdivisions
    return statesArray.reduce((acc, memo) => {
      acc.push({ "name": memo.name, "code": memo.code })
      return acc
    }, [])
  }

  @computed get isValidPersonalDetails() {
    return (
      this.validFirstName &&
      this.validLastName &&
      this.validPhone &&
      this.validTaxId &&
      !!this.birthdate
    )
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
  // support international names
  // https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
  const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  return typeof s === "string" && s.length >= 2 && regex.test(s)
}

export async function fetchUserSession() {
  // You can do anything to fetch initial store state
  return {}
}
