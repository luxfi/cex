import React from 'react'
import { Container } from "@material-ui/core"

import { CheckoutPaymentView } from '../components/checkout'

class CheckoutPayment extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="lg">
        <CheckoutPaymentView />
      </Container>
    )
  }
}

export default CheckoutPayment
