import { fade } from "@material-ui/core/styles"

export default (theme) => {
  return {

    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        marginLeft: 0,
        width: 160,
        "&:focus-within": {
          width: 175
        },
        display: "inline-block",
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        width: 170,
        "&:focus-within": {
          width: 200
        }
      },
      display: "none"
    },
    searchIcon: {
      width: 26,
      paddingLeft: 4,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
    },

    inputRoot: {
      color: "inherit"
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 4),
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
