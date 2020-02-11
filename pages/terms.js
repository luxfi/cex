import React from 'react'
import { Container, Box } from "@material-ui/core"

import { googlePageView } from '../util'


class Terms extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <Container component="main" maxWidth="xl">
        <h1>Terms of Use</h1>
      </Container>
    )
  }
}

export default Terms
