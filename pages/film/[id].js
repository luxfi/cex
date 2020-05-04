import React from "react"

import { FilmView } from "../../components/film"
import { googlePageView } from '../../util'

class Film extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <FilmView />
    )
  }
}

export default Film
