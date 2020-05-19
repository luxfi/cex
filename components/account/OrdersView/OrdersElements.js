import React, { useEffect } from "react"
import { inject, observer } from 'mobx-react'

import {
  makeStyles,
  Typography,
} from '@material-ui/core'

import TicketOrderElements from './TicketOrderElements'

const noUnderline = {
  textDecoration: 'none',
}

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
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
})

const useStyles = makeStyles(styles)

export default inject('store')(observer((props) => {

  const classes = useStyles()

  const {
    store: {
      movieStore,
      ticketCheckoutStore,
      ticketCheckoutStore: {
        ticketTransactions,
      },
    },
  } = props

  useEffect(() => {
    ticketCheckoutStore.getTicketOrders()
  }, [])

  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant='h3'>{`Orders (${ticketTransactions.length})`}</Typography>
      {
        (ticketTransactions.length)
          ? ticketTransactions.map((order, i) => {
            if (!order.metadata) {
              return
            }

            const movie = movieStore.getMovieBySlug(order.metadata.movieSlug)
            return <TicketOrderElements
              classes={classes}
              movie={movie}
              ticket={order.metadata}
              key={order.metadata.ticketId}
              showDivider={i < ticketTransactions.length - 1}
            />
          }) : null
      }
      { (!ticketTransactions.length) && <Typography variant='body2'>You don't seem to have bought any movie tickets yet</Typography> }
    </div>
  )
}))

