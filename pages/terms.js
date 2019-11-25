import React from 'react'
import { googlePageView } from '../util/generic'

class Terms extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <h1>Terms of Use</h1>
    )
  }
}

export default Terms
