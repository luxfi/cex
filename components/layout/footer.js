import React from "react"
// @material-ui/core components
import { MuiThemeProvider } from "@material-ui/core/styles"
import Footer from "../generic/Footer"

class FooterComponent extends React.Component {
  render() {
    const { theme } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Footer />
      </MuiThemeProvider>
    )
  }
}

export default FooterComponent
