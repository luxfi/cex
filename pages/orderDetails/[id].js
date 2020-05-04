import { Box } from '@material-ui/core'
import React from 'react'

import { OrderDetailsView } from '../../components/checkout'

class OrderDetails extends React.Component {
  render() {
    return (
      <Box>
        <OrderDetailsView />
      </Box>
    )
  }
}

export default OrderDetails
