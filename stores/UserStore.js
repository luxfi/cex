import { action, observable, computed } from 'mobx'
import _ from 'lodash'

export default class UserStore {
  @observable email = ''

  constructor(initialData = { email: '' }) {
    this.email = initialData.email;
  }

  @action fetchUser (data) {
    this.email = data.email
  }

  @computed get user() {
    return { email: this.email }
  }
}
