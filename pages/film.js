import React from "react"
// @material-ui/core components
import { MuiThemeProvider } from "@material-ui/core/styles"
import { inject, observer } from "mobx-react"

import FilmPage from "../components/FilmPage"

class Film extends React.Component {
  render() {
    const { darkTheme } = this.props
    return (
      <MuiThemeProvider theme={darkTheme}>
        <FilmPage />
      </MuiThemeProvider>
    )
  }
}

export default Film
