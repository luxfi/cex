import { createMuiTheme } from "@material-ui/core/styles"
import { red } from '@material-ui/core/colors'

const baseTheme = {

  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },

  palette: {
    primary: {
      main: "#0099ff", // logo blue
    },
    secondary: {
      main: "#ff9e3e",  // logo yellow
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  }
}

export const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    primary: {
      main: "#5fb8ff", // desaturaed logo blue per material recommendations for dark mod
    },
    secondary: {
      main: "#ffbb66",  // logo yellow
    },
    type: "dark",
    text: {
      primary: "#f0f0f0",
      secondary: "#f0f0f0" // breadcrumbs uses this
    },
    background: {
      default: "rgb(15, 15, 15)",
      paper: "#2f2f2f"
    },
  },
  defaultSVGColor: "white"
})

export const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "light",
    background: {
      default: "white",
      paper: "#f0f0f0"
    },
  },
  defaultSVGColor: "black"
})

// example of page film.js
// import React from "react"

// import { MuiThemeProvider } from "@material-ui/core/styles"
// import { withRouter } from "next/router"
// import { withStyles } from "@material-ui/core/styles"
// import FilmPage from "../views/FilmPage/FilmPage"
// import { inject, observer } from "mobx-react"
// import { darkTheme } from "../themes"

//import styles from ".././filmPage.js"

//const FilmPage = () => (
//<MuiThemeProvider theme={darkTheme}>
//  <FilmPage />
//</MuiThemeProvider>
// );



// export default withRouter(withStyles(styles)(Index))

// resources
// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
// switch theme based on local storage
// https://markoskon.com/dark-mode-in-react/
// https://github.com/4nubhav/Todo/blob/8c18e32769d8dc4a34c9fef41fe93a1294ac10ce/src/components/contexts/ThemeContext.js
