import React from 'react'
import { Container } from "@material-ui/core"

import { CheckoutView } from '../components/checkout'

class Checkout extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="lg">
        <CheckoutView />
      </Container>
    )
  }
}

export default Checkout
