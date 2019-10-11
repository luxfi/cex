import React from "react"
// @material-ui/core components
import { MuiThemeProvider } from "@material-ui/core/styles"
import { inject, observer } from "mobx-react"

import { FilmView } from "../components/film"

class Film extends React.Component {
  render() {
    const { darkTheme } = this.props
    return (
      <MuiThemeProvider theme={darkTheme}>
        <FilmView />
      </MuiThemeProvider>
    )
  }
}

export default Film
