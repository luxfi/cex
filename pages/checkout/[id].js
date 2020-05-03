import React from 'react'
import { Box } from "@material-ui/core"

import { CheckoutView } from '../components/checkout'

class Checkout extends React.Component {
  render() {
    return (
      <Box>
        <CheckoutView />
      </Box>
    )
  }
}

export default Checkout
