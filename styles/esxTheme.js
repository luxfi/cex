import { createMuiTheme } from "@material-ui/core/styles"

const SPACING_BASE = 8
const spacingPx = (factor) => (`${SPACING_BASE * factor}px`)

export default createMuiTheme({

  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },

  spacing: spacingPx,

  palette: {
    type: "dark",
    common: {
      black: "#090909",
      white: "#F0f0f0"
    },
    primary: {
      main: '#0099ff',
      light: '#5fb8ff', // desaturaed logo blue per Material recommendations for dark mode
    },
    secondary: {
      main: "#fac54c",  // logo yellow
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",   // "white" (from Jeff's spec)
      secondary: "rgba(255, 255, 255, 0.65)",
      disabled: "rgba(255, 255, 255, 0.40)",
      hint: "#47caa9", // teal as per spec

    },
    divider: "rgba(255, 255, 255, 0.20)",
    background: {
      default: "#090909", // "black" (from Jeff's spec)
      paper: "#222"    // slightly lighter
    },
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  },

  overrides: {
  },

  defaultSVGColor: "#F0f0f0",
})

