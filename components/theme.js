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
      default: "#222",
      paper: "#2f2f2f"
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: "#222"
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

export default darkTheme
