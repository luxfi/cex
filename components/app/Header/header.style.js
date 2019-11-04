import { fade } from "@material-ui/core/styles"

export default (theme) => {

  return {

    logo: {
      display: "inline-block",
      marginLeft: theme.spacing(1),
      marginTop: "-15px",
    },

    menuBarOuter: {
      display: "flex",
      flexWrap: "noWrap",
      justifyContent: "space-between",
      flexDirection: "row"
    },

    menuButton: {
      marginRight: theme.spacing(2),
      minWidth: "0",
      whiteSpace: "nowrap"
    },

    menuSpacer: {
      width: theme.spacing(12)
    },
   
    accountOuter: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        display: "inline"
      },
      marginRight: theme.spacing(2),
      display: "none"
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
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
    },

    flex: {
      display: "flex"
    },

    transparent: {
      background: "transparent !important",
      transition: "background 0.25s ease-in-out"
    },
    translucent: {
      background: "rgba(17, 17, 17, 0.847)",
      transition: "background 0.25s ease-in-out"
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