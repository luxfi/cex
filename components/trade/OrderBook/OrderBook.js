import {
  useEffect,
  useState,
  memo,
} from 'react'

import {
  Grid,
  Typography,
  Box,
} from "@material-ui/core"

import { Element, scroller } from "react-scroll"

import {
  makeStyles
} from '@material-ui/core/styles'

import {
  red,
  green,
} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => {
  return {
    orderBook: {
      height: 420,
      overflowY: 'scroll',
      position: 'relative',
      '& > *': {
        width: '100%',
      }
    },
    orderBookSpread: {
      border: '1px solid',
      borderColor: theme.palette.background.paper,
      borderLeft: 0,
      borderRight: 0,
      margin:  `0 -${theme.spacing(2)}px`,
      padding: `0 ${theme.spacing(2)}px`,
    },
    orderBookHeader: {
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.background.paper,
    },
  }
})

const Order = memo(({color, quantity, price}) => {
  return (
    <Grid container spacing={1} style={{ color }}>
      <Grid item xs={6}>
        <Typography variant='caption'>
          {quantity != null ? parseFloat(quantity).toFixed(0) : '&nbsp;'}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='caption'>
          ${quantity != null ? parseFloat(price).toFixed(2) : '&nbsp;'}
        </Typography>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
  )
})

export default props => {
  const classes = useStyles()
  const { asks, bids, spread } = props

  useEffect(() => {
    requestAnimationFrame(() =>
      scroller.scrollTo('spread', {
        containerId: 'orderBookScroll',
        duration: 0,
        delay: 0,
        offset: -200,
      })
    )
  }, [])

  return (
    <Box pt={1} pb={1}>
      <Box pl={2} pr={2} className={classes.orderBookHeader}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant='caption'>
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='caption'>
              Price
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='caption'>
              My Orders
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.orderBook} id='orderBookScroll'>
        <Box pl={2} pr={2}>
          {
            asks.slice(0, 8).map((ask, i) =>
              <div key={i}>
                <Order
                  color={red[500]}
                  quantity={ask ? ask[1]: undefined}
                  price={ask ? ask[0] : undefined}
                />
              </div>
            )
          }
          <Element name='spread' className={classes.orderBookSpread}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant='caption'>
                  SPREAD
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption'>
                  ${ spread.toFixed(2) } USD
                </Typography>
              </Grid>
            </Grid>
          </Element>
          {
            bids.slice(0, 8).map((bid, i) =>
              <div key={i}>
                <Order
                  color={green[500]}
                  quantity={bid ? bid[1]: undefined}
                  price={bid ? bid[0] : undefined}
                />
              </div>
            )
          }
        </Box>
      </div>
    </Box>
  )
}
