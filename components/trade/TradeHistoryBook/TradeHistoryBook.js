import {
  Box,
  Fade,
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

import moment from 'moment'

import {
  memo,
} from 'react'

const useStyles = makeStyles((theme) => ({
  tradeHistoryBookContainer: {
    position: 'relative',
    height: '100%',
  },
  tradeHistoryBook: {
    height: '100%',
    overflowY: 'scroll',
    position: 'relative',
    '& > *': {
      width: '100%',
    },
  },
  tradeHistoryBookHeader: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.background.paper,
  },
}))

const Trade = memo(
  ({
    fillPrice,
    fillQuantity,
    executedAt,
    executingOrder,
  }) => (
    <Fade in timeout={1000}>
      <Grid container spacing={1} style={{ color: executingOrder.side === 'ask' ? red[500] : green[500] }}>
        <Grid item xs={2}>
          <Typography variant='caption'>
            { moment(executedAt).format('ll hh:mm:ssA') }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='caption'>
            ${ fillPrice } USD
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='caption'>
            { fillQuantity }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='caption'>
            { executingOrder.type.toUpperCase() }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='caption'>
            { executingOrder.side.toUpperCase() }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='caption'>
            { executingOrder.status.replace('-', ' ').toUpperCase() }
          </Typography>
        </Grid>
      </Grid>
    </Fade>
  ),
)

export default (props) => {
  const classes = useStyles()
  const { trades } = props

  return (
    <Box pt={1} className={classes.tradeHistoryBookContainer}>
      <Box pl={2} pr={2} className={classes.tradeHistoryBookHeader}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Date
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Filled Price
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Fill Quantity
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Type
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Side
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption'>
              Status
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.tradeHistoryBook} id='tradeHistoryBookScroll'>
        <Box pl={2} pr={2}>
          {
            trades.slice(0, 40).map((trade) => (
              <div key={trade.id}>
                <Trade {...trade}/>
              </div>
            ))
          }
        </Box>
      </div>
    </Box>
  )
}
