import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core'

import {
  green,
  red,
} from '@material-ui/core/colors'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  memo,
  useCallback,
} from 'react'
import { Element, scroller } from 'react-scroll'

const useStyles = makeStyles((theme) => ({
  orderBookContainer: {
    position: 'relative',
    height: '100%',
  },
  orderBook: {
    height: '100%',
    // overflowY: 'scroll',
    overflow: 'hidden',
    position: 'relative',
    '& > *': {
      width: '100%',
    },
  },
  orderBookSpread: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    borderLeft: 0,
    borderRight: 0,
    margin: `0 -${theme.spacing(2)}px`,
    padding: `0 ${theme.spacing(2)}px`,
  },
  orderBookHeader: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.background.paper,
    position: 'absolute',
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.common.black,
    zIndex: 1,
  },
}))

const Order = memo(({ color, quantity, price }) => (
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
))

export default (props) => {
  const classes = useStyles()
  const { asks, bids, spread } = props

  const measureHeight = useCallback((node) => {
    if (node !== null) {
      const { height } = node.parentNode.getBoundingClientRect()

      scroller.scrollTo('spread', {
        containerId: 'orderBookScroll',
        duration: 0,
        delay: 0,
        offset: -parseInt(height / 2, 10),
      })
    }
  }, [])

  // the asks and bids need to use i key
  return (
    <Box pt={1} className={classes.orderBookContainer}>
      <Box pl={2} pr={2} className={classes.orderBookHeader}>
        <Typography variant='h2'>Order Book</Typography>
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
        <Box pl={2} pr={2} ref={measureHeight}>
          {
            asks.slice(0, 20).map((ask, i) => (
              <div key={i.toString()}>
                <Order
                  color={red[500]}
                  quantity={ask ? ask[1] : undefined}
                  price={ask ? ask[0] : undefined}
                />
              </div>
            ))
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
            bids.slice(0, 20).map((bid, i) => (
              <div key={i.toString()}>
                <Order
                  color={green[500]}
                  quantity={bid ? bid[1] : undefined}
                  price={bid ? bid[0] : undefined}
                />
              </div>
            ))
          }
        </Box>
      </div>
    </Box>
  )
}
