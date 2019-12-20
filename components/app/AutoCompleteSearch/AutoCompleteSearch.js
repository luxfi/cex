import React from "react"
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
  makeStyles
} from '@material-ui/core'
import Search from '@material-ui/icons/Search'

import { CustomLink } from '..'
import searchWidgetStyles from './searchWidget.style.js'
import movies from './movies'

const searchStyles = makeStyles(searchWidgetStyles)

const autoSuggestStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    // marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  }
  /*
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }*/
}))

const suggestions = movies.map(movie => ({ name: `${movie.name} - ${movie.ticker}` }))

const fuzzyMatch = (str, pattern) => {
  const cache = _.memoize(function (str) {
    return new RegExp("^" + str.replace(/./g, function (x) {
      return /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/.test(x) ? "\\" + x + "?" : x + "?"
    }) + "$")
  })
  return cache(str.toLowerCase()).test(pattern.toLowerCase())
}

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    // <TextField
    //   fullWidth
    //   InputProps={{
    //     inputRef: node => {
    //       ref(node)
    //       inputRef(node)
    //     },
    //     classes: {
    //       input: classes.input
    //     }
    //   }}
    //   {...other}
    // />
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
      // InputProps={{
      //   inputRef: node => {
      //     ref(node)
      //     inputRef(node)
      //   },
      //   classes: {
      //     input: classes.input
      //   }
      // }}
      {...other}
    />
  )
}

const getMovieSlugByString = (text) => {
  let ary = text.split('-')
  if (ary.length < 2) return
  let ticker = ary[ary.length - 1].trim()
  return movies.find(m => m.ticker === ticker).movieSlug
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)
  const href = `/film/${getMovieSlugByString(parts.map(t => t.text).join(''))}`
  const handleClick = () => { Router.push(href)}
  return (
    <MenuItem selected={isHighlighted} component={CustomLink} href={href}>
        <div>
          {parts.map(part => (
            <span
              // onClick={() => handleClick()}
              key={part.text}
              style={{ fontWeight: part.highlight ? 500 : 400 }}
            >
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
  )
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.name.slice(0, inputLength).toLowerCase() === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

function getSuggestionValue(suggestion) {
  return suggestion.name
}


export default (props) =>  {

  const autoSuggestClasses = autoSuggestStyles()
  const searchClasses = searchStyles()
  const { className } = props 

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [state, setState] = React.useState({
    single: "",
    popper: ""
  })

  const [stateSuggestions, setSuggestions] = React.useState([])

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(suggestions.filter(str => fuzzyMatch(str.name, value)))
    // setSuggestions(getSuggestions(value))
  }

  const handleSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue
    })
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  }

  return (
    <div className={classNames(searchClasses.searchOuter, className)}>
      <Search className={searchClasses.searchIcon}/>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes: searchClasses,
          id: "react-autosuggest-simple",
          value: state.single,
          onChange: handleChange("single")
        }}
        theme={{
          container: autoSuggestClasses.container,
          suggestionsContainerOpen: autoSuggestClasses.suggestionsContainerOpen,
          suggestionsList: autoSuggestClasses.suggestionsList,
          suggestion: autoSuggestClasses.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      {/* <div className={classes.divider} /> */}
      {/* <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: "react-autosuggest-popper",
          label: "Country",
          placeholder: "With Popper",
          value: state.popper,
          onChange: handleChange("popper"),
          inputRef: node => {
            setAnchorEl(node)
          },
          InputLabelProps: {
            shrink: true
          }
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
            <Paper
              square
              {...options.containerProps}
              style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
      /> */}
    </div>
  )
}
