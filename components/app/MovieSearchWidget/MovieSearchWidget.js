import React from "react"
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import _ from 'lodash'
import Autosuggest from "react-autosuggest"
import classNames from 'classnames'

import { withStyles, IconButton } from '@material-ui/core'
import Search from '@material-ui/icons/Search'

import styles from './movieSearchWidget.style.js'

@withRouter
@withStyles(styles)
@inject('store')
@observer
class MovieSearchWidget extends React.Component {

  suggestionSet = []

  constructor(props) {
    super(props)
 
    this.suggestionSet = props.movies.map(movie => ({ name: `${movie.name} - ${movie.ticker}`, movie }))

    this.state = {
      suggestions: [],
      popper: '',       // unused but needs to exist
      single: '',
      searchOpened: false,
    }
  }

  setSuggestions = (s) => {
    this.setState({
      suggestions: s
    }, () => this.addMovieToStore(s))
  }

  handleSuggestionsFetch = ({ value }) => {
    this.setSuggestions(
      this.suggestionSet
        .filter(str => fuzzyMatch(str.name, value))
        .map(movie => movie.movie)
    )
  }

  handleSuggestionsClear = () => {
    this.setSuggestions([])
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })

    if (!event.target.value) {
      const { store: { movieStore } } = this.props
      movieStore.resetMovieSearchResult()
    }
  }

  renderInputComponent = (inputProps) => {
    const { classes, onChange, ref, value, } = inputProps
    const { searchOpened } = this.state
    const { isBrowseModal } = this.props

    return (
      <input
        type="text"
        placeholder="Search..."
        className={classNames(classes.input, { [classes.opened]: searchOpened || isBrowseModal })}
        onChange={onChange}
        value={value}
        ref={ref}
        autoFocus
      />
    )
  }

  addMovieToStore = (movies, callback = null) => {
    const { store: { movieStore } } = this.props

    movieStore.setMovieSearchResult(movies)
    if (callback) {
      callback()
    }
  }

  openSearch = () => {
    const { store: { uiStore }, router } = this.props

    this.setState({
      searchOpened: true,
    }, () => {
      setTimeout(()=> {
        uiStore.openBrowseModal(() => {
          let href = `${router.asPath}?modal=browse`

          if (router.route === '/watch') {
            href = `${router.asPath}&modal=browse`
          }
      
          router.push(router.route, href, { shallow: true })

          this.setState({
            searchOpened: false,
          })
        })
      }, 1000)
    })
  }

  noop = () => {}

  render = () => {
    const { classes, isBrowseModal } = this.props
    const { suggestions, single } = this.state

    const autoSuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetch,
      onSuggestionsClearRequested: this.noop,
      getSuggestionValue,
    }

    return (
      <div className={classes.searchOuter}>
        <Autosuggest
          {...autoSuggestProps}
          inputProps={{
            classes,
            id: 'react-autosuggest-simple',
            value: single,
            onChange: this.handleChange('single'),
          }}
          renderSuggestionsContainer={this.noop}
          renderSuggestion={this.noop}
        />
        <IconButton disabled={isBrowseModal} onClick={this.openSearch} className={classes.iconButton}>
          <Search />
        </IconButton>
      </div>
    )
  }
}

const fuzzyMatch = (str, pattern) => {
  const cache = _.memoize(function (str) {
    return new RegExp("^" + str.replace(/./g, function (x) {
      return /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/.test(x) ? "\\" + x + "?" : x + "?"
    }) + "$")
  })
  return cache(str.toLowerCase()).test(pattern.toLowerCase())
}

const getSuggestionValue = (suggestion) => (suggestion.name)


export default MovieSearchWidget
