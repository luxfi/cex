import { Container } from '@material-ui/core'
import React from 'react'

import { OrderDetailsView } from '../components/checkout'

class OrderDetails extends React.Component {
  render() {
    return (
      <Container component='main' maxWidth='lg'>
        <OrderDetailsView />
      </Container>
    )
  }
}

export default OrderDetails
