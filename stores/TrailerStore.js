import { action, observable, computed } from 'mobx'
import stores from './stores'

import { manageReaction } from '../util/helpers'
import { getYoutubeId } from '../util'

export default class TrailerStore {
  @observable relatedMovies = []
  @observable autoplayMovies = []
  @observable autoPlaySet = true
  @observable reaction = {}
  @observable views = 0
  @observable subscribers = 0
  @observable relatedMovieTrailers = []
  @observable selectedMovieTrailer = null;

  constructor(initialData = {}, hanzoApi) {
    // Pass down the Hanzo API through a central point
    this.api = hanzoApi
  }

  getComments(identifierId) {
    // mock api call
    try {
      return new Promise((resolve, reject) => setTimeout(() => resolve(commentsFromJSON), 3000))
    } catch (error) {
      console.error('Caught parser exception', error)
    }
  }

  // TODO: Refactor
  @action getRelatedMovies(slug, updateAutoplayMovies = true) {
    const movieStore = stores().movieStore
    const allMovies = movieStore.movies
    const requestedMovie = movieStore.getMovieBySlug(slug)
    const relatedMovies = allMovies.map(movie => {
      let score = 0
      movie.genres.some(genre => {
        requestedMovie.genres.includes(genre) ? score++ : null;
      })
      movie.distributors.some(distributor=> {
        requestedMovie.genres.includes(distributor) ? score++ : null
      })
      movie.directors.some(director=> {
        requestedMovie.genres.includes(director) ? score++ : null
      })
      movie.actors.some(actor=> {
        requestedMovie.genres.includes(actor) ? score++ : null
      })

      return {
        score,
        ...movie,
      }
    })
      .filter((movie) => movie.movieSlug !== slug)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    if (updateAutoplayMovies) {
      this.autoplayMovies = [requestedMovie, ...relatedMovies]
    }
    this.relatedMovies = relatedMovies
  }

  @action loadRelatedMovieTrailers(movie, trailerId) {
    const relatedMovieTrailers = movie.trailers
      .filter((trailerDetail) => getYoutubeId(trailerDetail.trailer) !== trailerId)
      .map((trailerDetail) => {
        const trailerId = getYoutubeId(trailerDetail.trailer)
        return { ...movie, thumbnail: trailerDetail.thumbnail, trailerId }
      })
  
    this.relatedMovieTrailers = relatedMovieTrailers
  }

  @action selectMovieTrailer(movie, trailerId) {
    const selectedMovieTrailer = movie.trailers
      .find((trailerDetail) => getYoutubeId(trailerDetail.trailer) === trailerId)
    
    if (selectedMovieTrailer) {
      this.setAutoplay(false)
      this.selectedMovieTrailer = { ...selectedMovieTrailer, youtubeId: getYoutubeId(selectedMovieTrailer.trailer) }
    } else {
      this.selectedMovieTrailer = null
    }
  }

  @action setAutoplay(value) {
    this.autoPlaySet = value
    localStorage.setItem('autoplay', value)
  }

  @action getAutoPlay() {
    const value = localStorage.getItem('autoplay')
    if (value) {
      this.autoPlaySet = value
    }
  }

  @action setMovieTrailerDetails(movie) {
    const { trailerDetails } = movie
    this.reaction = trailerDetails.reaction
    this.views = trailerDetails.views
    this.subscribers = trailerDetails.subscribers
  }

  // eslint-disable-next-line class-methods-use-this
  @action setMovieReaction(movie, userId, type) {
    const reaction = { ...this.reaction }
    manageReaction(reaction, type)
    this.reaction = reaction
  }
}
