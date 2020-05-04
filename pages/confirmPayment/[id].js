import { Box } from '@material-ui/core'
import React from 'react'

import { ConfirmPaymentView } from '../../components/checkout'

class ConfirmPayment extends React.Component {
  render() {
    return (
      <Box>
        <ConfirmPaymentView />
      </Box>
    )
  }
}

export default ConfirmPayment
