import { fade } from "@material-ui/core/styles"

export default (theme) => {
  return {

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
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.10),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        width: 175
      },
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        //marginLeft: 0,
        width: 160,
        "&:focus-within": {
          backgroundColor: fade(theme.palette.common.white, 0.15),
          width: 175
        },
        display: "inline-block",
        //marginRight: theme.spacing(6),
      },
      [theme.breakpoints.up("md")]: {
        width: 170,
        "&:hover": {
          width: 200
        },
        "&:focus-within": {
          width: 200
        },
      },
      display: "none"
    },
    searchIcon: {
      width: 28,
      paddingLeft: 4,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
    },

    inputRoot: {
      color: "inherit"
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 5),
      width: 140
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
  }
}
