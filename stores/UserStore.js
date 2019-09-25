import { action, observable, computed } from 'mobx'
import Api from '../../src/hanzo/api'
import * as ethers from 'ethers'
// import _ from 'lodash'

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

  // ** USER INFO **
  // User Email
  @observable email = undefined
  // User Password
  @observable password = undefined
  // logged in user object returned by API
  @observable currentUser = undefined
  // Token comes from the Hanzo API
  @observable token = undefined


  constructor(initialData = {  }) {
    // TODO Do we still need this?
  }
  
    // TODO store this w httpOnly in a cookie w all the proper security precautions. 
  @action setToken(token) {
    if (!!token) {
      window.localStorage.setItem('jwt', token)
    } 
    else {
      window.localStorage.removeItem('jwt')
    }
    this.token = token  // assign after for cleaner state mgt ;)
  }

  @computed loggedIn() {
    return !!this.currentUser
  }  

  @action register(
    email,
    password  
  ) {
    this.updating = true
    fetch(BASE_HANZO_API_URL + '/users', // these might be wrong :)
      {
        method: 'post',
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    )
    .then( 
      action(({ user }) => {
        this.currentUser = user
        this.setToken(user.token)
      })
    )
    .catch(action((err) => {
      this.errors = (err.response && err.response.body && err.response.body.errors) 
        ? err.response.body.errors : ''
      throw err
    }))
    .finally(
      action(() => { this.updating = false})
    )
  }

    // Assumes values are in `displayValues`
  @action async login() {
    this.updating = true
    // fetch(BASE_HANZO_API_URL + '/users/login',  // these might be wrong :)
    //   {
    //     method: 'post',
    //     body: JSON.stringify({
    //       email: email,
    //       password: password
    //     })
    //   }
    // )
    // .then(
    //   action(({ user }) => { 
    //     this.currentUser = user 
    //     this.setToken(user.token)
    //   })
    // )
    // .catch(action((err) => {
    //   this.errors = (err.response && err.response.body && err.response.body.errors)
    //     ? err.response.body.errors : ''
    //   throw err
    // }))
    // .finally(
    //   action(() => { this.updating = false })
    // )

    try {
      let p = this.password

      const res = await api.client.account.login({
        email: this.email,
        password: p,
      })

      // TODO Not sure what this is? This needs to go in the password update function
      // this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

      let i = this.email + p

      this.identity = ethers.utils.sha256(ethers.utils.toUtf8Bytes(i))
      this.token = res.token

    } catch (ex) {
      
    }
  }


  @action forgetUser() {
    this.currentUser = undefined
    this.setToken(undefined)
  }
}
