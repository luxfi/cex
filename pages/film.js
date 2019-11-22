import React from "react"
import io from 'socket.io-client'

import { FilmView } from "../components/film"
import { googlePageView } from '../util/generic'

class Film extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  
  render() {
    return (
      <FilmView socket={this.socket} />
    )
  }
}

export default Film
