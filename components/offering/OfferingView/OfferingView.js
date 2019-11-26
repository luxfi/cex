import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { OfferingHeader } from '../'

@inject('store')
@observer
class OfferingView extends Component {
  render() {
    const { store } = this.props
    return (
      <Box m={3} mt={8}>
        <OfferingHeader/>
      </Box>
    )
  }
}

export default OfferingView
