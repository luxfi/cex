import React from 'react'
import Link from 'next/link'

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
      <Link href={`/orderDetails/${movie.movieSlug}/?ticketId=${ticket.ticketId}`}>
          <a className={classes.link}>
            <Typography variant='body2'>{`${movie.name} (#${ticket.ticketId}) - ${moment(ticket.date).format('MMM Do, YYYY')}`}</Typography>
          </a>
        </Link>
      </Grid>
      <Grid item xs={2}>
        <Link href={`/orderDetails/${movie.movieSlug}/?ticketId=${ticket.ticketId}`}>
          <a className={classes.noUnderline}>
            <Button className={classes.link}>See Details</Button>
          </a>
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
