import React from "react"
// @material-ui/core components
import { MuiThemeProvider } from "@material-ui/core/styles"
import Footer from "../generic/Footer"

class Film extends React.Component {
  render() {
    const { darkTheme } = this.props
    return (
      <MuiThemeProvider theme={darkTheme}>
        <Footer />
      </MuiThemeProvider>
    )
  }
}

export default Film
