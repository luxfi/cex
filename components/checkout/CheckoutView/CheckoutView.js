import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core'

import { Tickets } from '../Tickets';

import { getSlugPathName } from '../../../util/getSlugPathName'

class CheckoutView extends React.Component {
  renderCheckoutSteps = () => {
    const { router } = this.props
    const currentCheckoutStep = getSlugPathName(router.query, 1);

    if (currentCheckoutStep === 'tickets') {
      return <Tickets />
    } else if (currentCheckoutStep === 'payment-method') {
      return <h1>Payment Methods Page</h1>
    } else if (currentCheckoutStep === 'confirm') {
      return <hi>Confirm Page</hi>
    }
    return router.push('/')
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        {this.renderCheckoutSteps()}
      </>
    )
  }
}

export default withRouter(CheckoutView)
