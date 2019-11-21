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
      main: "#5fb8ff", // desaturaed logo blue per Material recommendations for dark mode
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
