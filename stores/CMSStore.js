import { action, observable} from "mobx"
import fetch from "node-fetch"

export default class cmsStore {

  @observable updating = false
  @observable errors = null
  @observable content = null

  constructor(initialData = {}, url) {
    // TODO Do we still need this?
    // :aa I don't think so.... why would we?
    // E: This might be required for persisting state across page changes

    this.loadContent(url)
  }

  @action async loadContent(url) {
    this.updating = true
    fetch(url + "/content")
      .then(
        res => {
          this.content = res.json() 
          this.updating = false
        }
      )
  }

 
}