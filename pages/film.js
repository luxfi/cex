import React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"

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
