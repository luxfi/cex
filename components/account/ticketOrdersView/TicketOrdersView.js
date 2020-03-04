import {
  Button,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import moment from 'moment/moment'
import Link from 'next/link'
import React from 'react'

const noUnderline = {
  textDecoration: 'none',
}

const styles = {
  noUnderline,
  link: {
    color: '#fff',
    ...noUnderline,
    '&:hover': {
      color: '#FBC43E',
    },
  },
  heading: {
    fontSize: '1.8em',
    margin: '0 0 2em 0',
  },
}

const SingleTicketOrder = ({
  movie, ticket, classes, showDivider,
}) => (
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

const TicketOrdersView = inject('store')(observer((props) => {
  const {
    tabTitle,
    classes,
    store: {
      movieStore,
      ticketCheckoutStore: {
        ticketTransactions,
      },
    },
  } = props

  return (
    <>
      <Typography className={classes.heading} variant='h3'>{`${tabTitle} (${ticketTransactions.length})`}</Typography>
      {
        ticketTransactions.length && ticketTransactions.map((ticket, i) => {
          const movie = movieStore.getMovieBySlug(ticket.movieSlug)
          return <SingleTicketOrder classes={classes} movie={movie} ticket={ticket} showDivider={i < ticketTransactions.length - 1} />
        })
      }
      { (!ticketTransactions.length) && <Typography variant='body2'>You don't seem to have bought any movie ticket yet</Typography> }
    </>
  )
}))

export default withStyles(styles)(TicketOrdersView)
