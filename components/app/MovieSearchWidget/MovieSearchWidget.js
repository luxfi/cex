import React from "react"
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import memoize from 'lodash.memoize'

import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'

import { withStyles, IconButton } from '@material-ui/core'
import { 
  Search as SearchIcon, 
//  HighlightOff as CloseIcon 
  Close as CloseIcon
} from '@material-ui/icons'

import styles from './movieSearchWidget.style.js'

@withRouter
@withStyles(styles)
@inject('store')
@observer
class MovieSearchWidget extends React.Component {

  constructor(props) {
    super(props)
 
    this.totalSet = props.movies.map(movie => ({ name: `${movie.name} - ${movie.ticker}`, movie }))

    this.state = {
      suggestions: [],
      popper: '',       // unused but needs to exist
      single: '',
      searchWidgetOpened: false,
    }
  }

  setSuggestions = (s) => {
    this.setState({
      suggestions: s
    }, () => {this.setAsResultSet(s)})
  }

  handleSuggestionsFetch = ({ value }) => {
    this.setSuggestions(
      this.totalSet
        .filter(str => fuzzyMatch(str.name, value))
        .map(movie => movie.movie)
    )
  }

  handleSuggestionsClear = () => {
    this.setSuggestions([])
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      single: newValue,
    })

  // TEMP
console.log('CHANGE: ' + newValue)
    
    if (!event.target.value) {
      const { store: { movieStore } } = this.props
      movieStore.resetMovieSearchResult()
    }
  }

  renderSuggestionsContainer = ({ containerProps, children, query }) => (
    <div 
      className={classNames(
        this.props.classes.searchOuter, 
        (this.state.searchWidgetOpened) ? this.props.classes.searchWidgetOpened : this.props.classes.searchWidgetClosed
      )} 
      {...containerProps}
    >
      {children}
    </div>
  )

  renderInputComponent = ({ classes, onChange, ref, value, }) => (
    <>
    <input
      type="text"
      placeholder="Search..."
      className={classNames(classes.input)}
      onChange={onChange}
      value={value}
      ref={ref}
      autoFocus
    />
    <IconButton onClick={() => {this.openSearchWidget(!this.state.searchWidgetOpened)}} className={classNames(classes.iconButton)}>
      {this.state.searchWidgetOpened ? <CloseIcon /> : <SearchIcon /> }
    </IconButton>
    </>
  )

  setAsResultSet = (movies) => {
    const { store: { movieStore } } = this.props
  
  // TEMP
  console.log('RESULT SET: ' + JSON.stringify(movies.map((m) =>(m.name)), null, 2))
  

    //movieStore.setMovieSearchResult(movies)
  }

  openSearchWidget = (open) => {
    const { store: { uiStore }, router } = this.props

    this.setState({
      searchWidgetOpened: open,
      single: '',
      suggestions: []
    }, () => {
      /*
      setTimeout(()=> {
        uiStore.openBrowseModal(() => {
          let href = `${router.asPath}?modal=browse`

          if (router.asPath.includes('?')) {
            href = `${router.asPath}&modal=browse`
          }
      
          router.push(router.route, href, { shallow: true })

          this.setState({
            searchOpened: false,
          })
        })
      }, 1000)
      */
    })
  }

  noop = () => {}

  render = () => {
    const { classes } = this.props
    const { suggestions, single } = this.state

    const autoSuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetch,
      onSuggestionsClearRequested: this.handleSuggestionsClear,
      getSuggestionValue: (suggestion) => (suggestion.name),
      shouldRenderSuggestions: (value) => (value.trim().length > 2),
      inputProps: {
        classes,  // must have this w classes.input defined! .. thanks for documenting, asshats! ;)
        id: 'react-autosuggest-simple',
        value: single,
        onChange: this.handleChange,
      },
      renderSuggestion: (suggestion) => (<span>'FOOO'{suggestion.text}</span>)
    }

    return (
      <div 
        className={classNames(
          this.props.classes.searchOuter, 
          (this.state.searchWidgetOpened) ? this.props.classes.searchWidgetOpened : this.props.classes.searchWidgetClosed
        )} 
      >
        <Autosuggest {...autoSuggestProps} />
      </div>
    )
  }
}

const fuzzyMatch = (str, pattern) => {
  const cache = memoize((str) => (
    new RegExp("^" + str.replace(
      /./g, 
      (x) => (
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/.test(x) ? "\\" + x + "?" : x + "?"
      )
    ) + "$")
  ))
  return cache(str.toLowerCase()).test(pattern.toLowerCase())
}

export default MovieSearchWidget
