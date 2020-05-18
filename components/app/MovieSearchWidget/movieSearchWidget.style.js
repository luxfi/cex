import { fade } from "@material-ui/core/styles"

export default (theme) => ({
  suggestionsContainer: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    display: "block"
  },

  searchOuter: {
    backgroundColor: fade(theme.palette.common.white, 0.10),
    position: "relative",
    display: "inline-block",
    width: '100%',
    flex: 1,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      width: 175
    },
    borderRadius: '8px', 
    transition: theme.transitions.create("width"),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      height: 40,
      width: 200,
      borderRadius: '8px', 
      marginLeft: theme.spacing(16),
      "&:hover": {
        width: 220,
      },
      "&:focus-within": {
        width: 220,
      },
    },
  },

  searchIcon: {
    top: 1,
    left: 5,
    width: 28,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    opacity: 0.6,
  },

  inputRoot: {
    color: "inherit",
    width: '100%',

  },
  
  inputInput: {
    display: 'block',
    padding: theme.spacing(0, 1, 0, 5),
    width: '100%',
    height: 42,
    '&::placeholder': {
      display: 'block',
      position: 'relative',
    }
  },

  select: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
        display: "inline"
    },
    marginRight: theme.spacing(2),
    display: "none"
  },
})

