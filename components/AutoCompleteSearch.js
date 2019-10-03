import React from "react"
import deburr from "lodash/deburr"
import Autosuggest from "react-autosuggest"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Popper from "@material-ui/core/Popper"
import InputBase from "@material-ui/core/InputBase"
import { makeStyles } from "@material-ui/core/styles"

const suggestions = [
  {
    name: "Terminator: Dark Fate",
    movieSlug: "terminator-dark-fate",
    articles: ["edward-furlong-edward-furlong-terminator-dark-fate"],
    genre: ["Action", "Adventure", "Sci-Fi"],
    trailer: "https://www.youtube.com/embed/jCyEX6u-Yhs",
    posterImg:
      "https://m.media-amazon.com/images/M/MV5BMTUwNWI2ZDQtODRjNy00OGE1LThlNGEtYzU2NDU5ZGMzN2RmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    heroImg:
      "https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2019/07/terminator-dark-fate-arnold-schwarzenegger-linda-hamilton-sdcc-den-of-geek-cover.jpg?itok=I6okknqO",
    website: "https://www.facebook.com/Terminator/",
    rated: "R",
    imdbid: "tt6450804",
    actors: [
      "Arnold Schwarzenegger",
      "Mackenzie Davis",
      "Edward Furlong",
      "Linda Hamilton"
    ],
    director: ["Tim Miller"],
    releaseDate: "01 Nov 2019",
    writer: [
      "James Cameron (story by)",
      "Charles H. Eglee (story by)",
      "Josh Friedman (story by)",
      "David S. Goyer (story by)",
      "Justin Rhodes (story by)",
      "David S. Goyer (screenplay by)",
      "Justin Rhodes (screenplay by)",
      "Billy Ray (screenplay by)"
    ],
    shortDescription:
      "Sarah Connor and a hybrid cyborg human must protect a young girl from a newly modified liquid Terminator from the future.",
    ticker: "TERMDF",
    price: 125.15,
    valueDelta: 3.78,
    financialDescription: "Term Inc. - Class C Capital Stock"
  },
  {
    name: "Uncut Gems",
    movieSlug: "uncut-gems",
    articles: ["uncut-gems-review-adam-sandler"],
    genre: ["Comedy", "Crime", "Drama", "Mystery", "Thriller"],
    trailer: "https://www.youtube.com/embed/vTfJp2Ts9X8",
    posterImg:
      "https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,640,1000_AL_.jpg",
    heroImg:
      "https://www.indiewire.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-23-at-10.22.47-AM.png",
    website: "https://a24films.com/films/uncut-gems",
    rated: "R",
    imdbid: "tt5727208",
    actors: ["Adam Sandler", "Julia Fox", "Kevin Garnett", "The Weeknd"],
    director: ["Benny Safdie", "Josh Safdie"],
    releaseDate: "25 Dec 2019",
    writer: ["Ronald Bronstein", "Benny Safdie", "Josh Safdie"],
    shortDescription:
      "A jewelry dealer to the rich and famous must find a way to pay his debts when his merchandise is taken from one of his top sellers and girlfriend.",
    ticker: "UNCTGM",
    price: 44.21,
    valueDelta: 1.81,
    financialDescription: "Uncut Gems Inc. - Class C Capital Stock"
  },
  {
    name: "Birds of Prey",
    movieSlug: "birds-of-prey",
    articles: ["birds-of-prey-poster-harley-quinn"],
    genre: ["Action", "Adventure", "Crime"],
    trailer: "https://www.youtube.com/embed/Zk_LJzZr5i8",
    posterImg:
      "https://m.media-amazon.com/images/M/MV5BNmRlZGNjNWYtZmQ4Yy00Yjg3LTkzZmYtYjZlYjczMzhlY2I1XkEyXkFqcGdeQXVyODQzNTE3ODc@._V1_SX300.jpg",
    heroImg:
      "https://cdn3.movieweb.com/i/article/HOA5mfuEbJpFv40wfnhibOtDWThlZb/1107:50/Birds-Of-Prey-Poster.jpg",
    website: "https://www.facebook.com/watch/?v=2197453547145355",
    rated: "R",
    imdbid: "tt7713068",
    actors: [
      "Margot Robbie",
      "Mary Elizabeth Winstead",
      "Ewan McGregor",
      "Rosie Perez"
    ],
    director: ["Cathy Yan"],
    releaseDate: "07 Feb 2020",
    writer: [
      "Chuck Dixon (Birds Of Prey Comics created by)",
      "Jordan B. Gorfinkel (Birds Of Prey Comics created by)",
      "Christina Hodson",
      "Greg Land (Birds Of Prey Comics created by)"
    ],
    shortDescription:
      "After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord, Black Mask in Gotham City.",
    ticker: "BRDOP",
    price: 78.22,
    valueDelta: 1.11,
    financialDescription: "Birds of Prey Inc. - Class C Capital Stock"
  },
  {
    name: "Onward",
    movieSlug: "onward",
    articles: ["pixar-onward-trailer"],
    genre: ["Animation", "Adventure", "Comedy", "Drama", "Family", "Fantasy"],
    trailer: "https://www.youtube.com/embed/x8DKg_fsacM",
    posterImg:
      "https://m.media-amazon.com/images/M/MV5BZTU3Y2RlYjAtMzAzOC00MjdiLWI2MjctYzhhMmI3MWRhODhhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    heroImg:
      "https://cdn3.movieweb.com/i/article/HOA5mfuEbJpFv40wfnhibOtDWThlZb/1107:50/Birds-Of-Prey-Poster.jpg",
    website: "https://movies.disney.com/onward",
    rated: "PG",
    imdbid: "tt7146812",
    actors: [
      "Tom Holland",
      "Chris Pratt",
      "Julia Louis-Dreyfus",
      "Octavia Spencer"
    ],
    director: ["Dan Scanlon"],
    releaseDate: "06 Mar 2020",
    writer: ["Dan Scanlon"],
    shortDescription:
      "Two teenage elf brothers, Ian and Barley Lightfoot, go on an journey to discover if there is still a little magic left out there in order to spend one last day with their father, who died when they were too young to remember him.",
    ticker: "ONWRD",
    price: 52.13,
    valueDelta: 4.02,
    financialDescription: "Onward 2020 Inc. - Class C Capital Stock"
  }
]

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
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
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

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
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
  },
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
  }
}))

export default function IntegrationAutosuggest() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [state, setState] = React.useState({
    single: "",
    popper: ""
  })

  const [stateSuggestions, setSuggestions] = React.useState([])

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
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
    <>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: "react-autosuggest-simple",
          value: state.single,
          onChange: handleChange("single")
        }}
        theme={{
          container: classes.container,
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
    </>
  )
}
