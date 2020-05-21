import React from 'react'
import classNames from 'classnames'
import Link from '../../app/Link'

import {
  Button,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'

import moment from 'moment/moment'

export default ({ movie, ticket, classes, showDivider }) => (
  <Grid container direction='column'>
    <Grid container item>
      <Grid item xs={10}>
        <Link
          className={classNames(classes.link, 'order-link')}
          href={`/orderDetails/[id]/?ticketId=${ticket.ticketId}`}
          as={`/orderDetails/${movie.movieSlug}/?ticketId=${ticket.ticketId}`}
        >
          <Typography variant='body2'>{`${movie.name} (#${ticket.ticketId}) - ${moment(ticket.date).format('MMM Do, YYYY')}`}</Typography>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Link
          className={classNames(classes.noUnderline, 'orderButton')}
          href={`/orderDetails/[id]/?ticketId=${ticket.ticketId}`}
          as={`/orderDetails/${movie.movieSlug}/?ticketId=${ticket.ticketId}`}
        >
          <Button className={classes.link}>See Details</Button>
        </Link>
      </Grid>
    </Grid>
    {
      showDivider ? <Grid item xs={12}>
        <Divider style={{ marginBottom: '15px' }} />
      </Grid> : null
    }
  </Grid>
)
