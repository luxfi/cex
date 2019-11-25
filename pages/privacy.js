import React from 'react'
import { googlePageView } from '../util/generic'

class Privacy extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <Container component="main" maxWidth="xl">
        <h1>Privacy Policy</h1>
      </Container>
    )
  }
}

export default Privacy
