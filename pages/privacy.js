import React from 'react'
import { googlePageView } from '../util/generic'

class Privacy extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <h1>Privacy Policy/h1>
    )
  }
}

export default Privacy
