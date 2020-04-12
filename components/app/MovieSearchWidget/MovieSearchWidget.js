import React from "react"
import Router from "next/router"
import { inject } from 'mobx-react'

import _ from 'lodash'
import Autosuggest from "react-autosuggest"
import classNames from 'classnames'

import { InputBase, withStyles } from '@material-ui/core'

import Search from '@material-ui/icons/Search'

import styles from './movieSearchWidget.style.js'


@inject('store')
class MovieSearchWidget extends React.Component {

  suggestionSet = []

  constructor(props) {
    super(props)
 
    this.suggestionSet = props.movies.map(movie => ({ name: `${movie.name} - ${movie.ticker}`, movie }))

    this.state = {
      suggestions: [],
      popper: '',       // unused but needs to exist
      single: '',
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
      this.addMovieToStore([], () => movieStore.loadMovies({}))
    }
  }

  handleInputClick = () => [
    // TODO Router.push('/browse')
  ]

  renderInputComponent = (inputProps) => {
    const { classes, inputRef = this.noop, ref, ...other } = inputProps

    return (
      <InputBase
        placeholder="Search…"
        onClick={this.handleInputClick}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        {...other}
      />
    )
  }

  addMovieToStore = (movie, callback = null) => {
    const { store: { movieStore } } = this.props
    movieStore.setMovieSearchResult(movie)
    if (callback) {
      callback()
    }
  }

  noop = () => {}

  render = () => {
    const { classes, className } = this.props
    const { suggestions, single } = this.state

    const autoSuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetch,
      onSuggestionsClearRequested: this.noop,
      getSuggestionValue,
    }

    return (
      <div className={classNames(classes.searchOuter, className)}>
        <Search className={classes.searchIcon}/>
        <Autosuggest
          {...autoSuggestProps}
          inputProps={{
            classes,
            id: 'react-autosuggest-simple',
            value: single,
            onChange: this.handleChange('single'),
          }}
          renderSuggestionsContainer={this.noop}
        />
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


export default withStyles(styles)(MovieSearchWidget)
