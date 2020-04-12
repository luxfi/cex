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
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      width: 175
    },
    transition: theme.transitions.create(["width", "border-radius"]),
    //transition: theme.transitions.create("border-radius"),
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: 160,
      "&:focus-within": {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        width: 175
      },
      display: "inline-block",
    },
    [theme.breakpoints.up("md")]: {
      width: 40,
      height: 40,
      borderRadius: '50%', 

      "&:hover": {
        width: 200,
        borderRadius: '8px', 
      },
      "&:focus-within": {
        width: 200,
        borderRadius: '8px', 
      },
    },
    display: "none"
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
    color: "inherit"
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
    width: '100%'
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

