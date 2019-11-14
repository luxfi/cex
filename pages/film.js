import React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import io from 'socket.io-client'

import { FilmView } from "../components/film"
import { googlePageView } from '../util/generic'

class Film extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  
  render() {
    const { darkTheme } = this.props
    return (
      <MuiThemeProvider theme={darkTheme}>
        <FilmView socket={this.socket} />
      </MuiThemeProvider>
    )
  }
}

export default Film
