import { Container } from '@material-ui/core'
import React from 'react'

import { ConfirmPaymentView } from '../components/checkout'

class ConfirmPayment extends React.Component {
  render() {
    return (
      <Container component='main' maxWidth='sm'>
        <ConfirmPaymentView />
      </Container>
    )
  }
}

export default ConfirmPayment
