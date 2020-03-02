import { action, observable } from 'mobx'

import locations from '../assets/tempData/locations'
import movieDates from '../assets/tempData/movieDates'
import venues from '../assets/tempData/venueDetails'

export default class TicketingStore {
  dates = []

  @observable selectedDate = {}

  locations = []

  @observable location = ''

  @observable suggestedLocations = []

  @observable selectedLocation = {}

  venues = []

  @observable venueShowtimes = []

  @observable selectedShowtime = {}

  @observable movieVenues = []

  @observable selectedMovie = {}

  constructor(initialData = {}, hanzoApi) {
    const [selectedDate] = movieDates
    const [selectedLocation] = locations.filter((location) => location.city === 'Santa Monica')

    this.dates = movieDates
    this.locations = locations
    this.venues = venues
    this.selectedDate = selectedDate
    this.selectedLocation = selectedLocation
  }

  @action setSelectedDate(selected) {
    const [selectedDate] = this.dates.filter((date) => date.formated === selected.formated)
    this.selectedDate = selectedDate
  }

  @action searchLocation(searchValue) {
    this.location = searchValue
    this.selectedLocation = {}

    this.suggestedLocations = this.locations.filter((location) => {
      if (!searchValue) return false
      return location.city.toLowerCase().includes(searchValue.toLowerCase())
      || location.state.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  @action selectLocation(location) {
    this.selectedLocation = location
    this.location = ''
    this.selectVenues(location)
  }

  @action setSelectedMovie(movie) {
    this.selectedMovie = movie
    this.movieVenues = this.venues.filter((venueDetail) => !!(venueDetail.showtimeDetails.filter((showtime) => showtime.productionId === movie.productionId).length
      && (venueDetail.venue.address.city === this.selectedLocation.city || venueDetail.venue.address.state === this.selectedLocation.state)
    ))
  }

  getVenueShowtimes(venueId) {
    const [showTimes] = this.venues.filter((venueDetail) => venueDetail.venue.id === venueId)
    this.venueShowtimes = showTimes.showtimeDetails
  }

  selectShowtime(showtimeId) {
    const [selectedShowtime] = this.venueShowtimes.filter((venueShowtime) => venueShowtime.showtimeId === showtimeId)
    this.selectedShowtime = selectedShowtime
  }

  selectVenues(location) {
    this.movieVenues = this.venues.filter((venueDetail) => !!(venueDetail.showtimeDetails.filter((showtime) => showtime.productionId === this.selectedMovie.productionId).length
      && (venueDetail.venue.address.city === location.city || venueDetail.venue.address.state === location.state)
    ))
  }

  @action selectVenue(venueId) {
    const [selectedVenue] = this.venues.filter((venueDetail) => venueDetail.venue.id === venueId)
    this.selectedVenue = selectedVenue
  }
}
