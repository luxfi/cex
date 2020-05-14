import React from "react"
import {
  makeStyles,
  Typography,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import TicketOrderElement from './TicketOrderElement'

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

const OrdersElement = (props) => {

  const classes = useStyles()
  
  const {
    tabTitle,
    store: {
      movieStore,
      ticketCheckoutStore: {
        ticketTransactions,
      },
    },
  } = props

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
            return <TicketOrderElement
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
}

export default inject('store')(observer(OrdersElement))
