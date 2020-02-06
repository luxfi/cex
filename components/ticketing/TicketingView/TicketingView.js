import React from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react'
import { Box, Grid, Button, Container, Typography } from '@material-ui/core'

import { Ticketing } from '../Ticketing';
import { CheckoutTickets } from '../CheckoutTickets'
import { PaymentMethod } from '../PaymentMethod'

import { getSlugPathName } from '../../../util/getSlugPathName'

@inject('store')
@observer
class TicketingView extends React.Component {
  renderCheckoutSteps = () => {
    const {
      router: { query: { slug } },
      store: { movieStore },
    } = this.props

    if(movieStore.validateTicketingSlug(slug)) {
      return <Ticketing />
    } else if (movieStore.validateCheckoutSlug(slug, 'tickets')) {
      return <CheckoutTickets />
    } else if (movieStore.validateCheckoutSlug(slug, 'payment-method')) {
      return <PaymentMethod />
    }
    return Router.push('/');
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

export default withRouter(TicketingView)
