import jobsFromJson from "../assets/tempData/careers.js"
import { action, observable, computed } from "mobx"

export default class CareerStore {
  @observable jobs = []
  @observable loading = false

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
    this.loadJobs()
  }

  /**
   * Fetches all Movies from the server
   */
  // @action async loadJobs() {
  //   try {
  //     const res = await fetch('...careers/', { method: 'GET' })
  //     const { jobs } = await res.json()
  //     console.log(jobs)
  //     this.jobs = jobs
  //   } catch (ex) {
  //     console.error('Caught parser exception', ex)
  //   }
  // }

  loadJobs() {
    this.isLoading = true
    this.jobs = jobsFromJson
    this.isLoading = false
  }

  @computed get getJobs() {
    return this.jobs
  }
}

