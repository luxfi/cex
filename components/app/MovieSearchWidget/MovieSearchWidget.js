import React, { useEffect } from "react"
import Router from "next/router"
import _ from "lodash"
import deburr from "lodash/deburr"

import Autosuggest from "react-autosuggest"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"

import classNames from 'classnames'

import {
  InputBase,
  MenuItem,
  Paper,
  withStyles
} from '@material-ui/core'
import Search from '@material-ui/icons/Search'

import { CustomLink } from '..'

import styles from './movieSearchWidget.style.js'

const fuzzyMatch = (str, pattern) => {
  const cache = _.memoize(function (str) {
    return new RegExp("^" + str.replace(/./g, function (x) {
      return /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/.test(x) ? "\\" + x + "?" : x + "?"
    }) + "$")
  })
  return cache(str.toLowerCase()).test(pattern.toLowerCase())
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}

class MovieSearchWidget extends React.Component {

  suggestionSet = []

  constructor(props) {
    super(props)
 
    this.suggestionSet = props.movies.map(movie => ({ name: `${movie.name} - ${movie.ticker}` }))

    this.state = {
      suggestions: [],
      popper: '',       // unused but needs to exist
      single: '',
    }
  }

  setSuggestions = (s) => {
    this.setState({
      suggestions: s
    })
  }
  
  handleSuggestionsFetch = ({ value }) => {
    this.setSuggestions(this.suggestionSet.filter(str => fuzzyMatch(str.name, value)))
  }

  handleSuggestionsClear = () => {
    this.setSuggestions([])
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    })
  }

  renderInputComponent = (inputProps) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps
  
    return (
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        {...other}
      />
    )
  }

  getMovieSlugByString = (text) => {
    let ary = text.split('-')
    if (ary.length < 2) return
    let ticker = ary[ary.length - 1].trim()
    return this.props.movies.find(m => m.ticker === ticker).movieSlug
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query)
    const parts = parse(suggestion.name, matches)
    const href = `/film/${this.getMovieSlugByString(parts.map(t => t.text).join(''))}`
    return (
      <MenuItem selected={isHighlighted} component={CustomLink} href={href}>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }} >
            {part.text}
          </span>
        ))}
      </MenuItem>
    )
  }

  render = () => {
    const { classes, className } = this.props

    const autoSuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetch,
      onSuggestionsClearRequested: this.handleSuggestionsClear,
      getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
    }

    return (
      <div className={classNames(classes.searchOuter, className)}>
        <Search className={classes.searchIcon}/>
        <Autosuggest
          {...autoSuggestProps}
          inputProps={{
            classes: classes,
            id: 'react-autosuggest-simple',
            value: this.state.single,
            onChange: this.handleChange('single')
          }}
          theme={{
            container: classes.suggestionsContainer,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

export default withStyles(styles)(MovieSearchWidget)
