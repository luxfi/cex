import { action, observable, computed } from 'mobx'
// import _ from 'lodash'

/**
 * Later we'll wrap the fetch stuff up a bit more cleanly and / or use a helper library
 */

// TODO
const BASE_HANZO_API_URL = "TODO" // should get this from a config object

export default class UserStore {

    // logged in user object returned by API
  @observable currentUser = undefined
    // use for wait states in UI
  @observable updating = false
    // any errors returned by APIs
    // (not sure of type)
  @observable errors = undefined

    // TODO store this w httpOnly in a cookie w all the proper security precautions. 
  @observable token = window.localStorage.getItem('jwt');

    // use for login / reg for temp UI states (if validation errors or whatnot)
  @observable displayValues = {
    email: '',
    password: ''
  }

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
  @action login() {
    this.updating = true
    fetch(BASE_HANZO_API_URL + '/users/login',  // these might be wrong :)
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
      action(() => { this.updating = false })
    )
  }


  @action forgetUser() {
    this.currentUser = undefined
    this.setToken(undefined)
  }
}
