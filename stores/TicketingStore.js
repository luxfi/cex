import { action, observable, computed } from "mobx"
import moment from 'moment'

import movieDates from '../assets/tempData/movieDates'
import locations from '../assets/tempData/locations'
import venues from '../assets/tempData/venueDetails'

export default class TicketingStore {
  dates = []
  @observable selectedDate = {}
  
  locations = []
  @observable location = ''
  @observable suggestedLocations = []
  @observable selectedLocation = {}
  
  venues = []
  @observable movieVenues = []
  @observable selectedMovie = {}

  @observable seleectedVenues = []
  
  constructor(initialData = {}, hanzoApi) {
    this.dates = movieDates
    this.locations = locations
    this.venues = venues
  }

  @computed get formatedDates() {
    return this.dates.map(date => ({
      formated: moment(date).format('ddd, MMMM DD'),
      isoFormat: date,
    }))
  }

  @action setSelectedDate(selected) {
    const [ selectedDate ] = this.formatedDates.filter(date => date.formated === selected.formated)
    this.selectedDate = selectedDate
  }

  @action searchLocation(searchValue) {
    this.location = searchValue
    this.selectedLocation = {}

    this.suggestedLocations = this.locations.filter(location => {
      if (!searchValue) return false
      return location.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      location.state.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  @action selectLocation(location) {
    this.selectedLocation = location
    this.location = ''
    this.selectVenues(location)
  }

  @action setSelectedMovie(movie) {
    this.selectedMovie = movie
  }

  selectVenues(location) {
    this.seleectedVenues = this.venues.filter(venueDetail => {
      return !!(venueDetail.showtimeDetails.filter(showtime => showtime.productionId ===  this.selectedMovie.productionId).length &&
      venueDetail.venue.address.city === location.city && venueDetail.venue.address.state === location.state
      )
    })
  }
}
