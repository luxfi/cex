import { createMuiTheme } from "@material-ui/core/styles"

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0099ff" // logo blue
    },
    secondary: {
      main: "#ff9e3e" // logo yellow
    },

    text: {
      primary: "#f0f0f0",
      secondary: "#f0f0f0" // breadcrumbs uses this
    },
    background: {
      default: "rgb(29, 38, 50)",
      paper: "#2f2f2f"
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: "rgb(29, 38, 50)"
          }
        }
      }
    }
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0099ff", // logo blue
    },
    secondary: {
      main: "#ff9e3e",  // logo yellow
    }
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  }
})


export { lightTheme, darkTheme }

// example of page film.js
// import React from "react"

// import { MuiThemeProvider } from "@material-ui/core/styles"
// import { withRouter } from "next/router"
// import { withStyles } from "@material-ui/core/styles"
// import FilmPage from "../views/FilmPage/FilmPage"
// import { inject, observer } from "mobx-react"
// import { darkTheme } from "../themes"

//import styles from "../../assets/jss/views/filmPage.js"

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
