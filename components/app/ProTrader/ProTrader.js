import { isRequired } from '@hanzo/middleware'
import { MUIText } from '@hanzo/react'

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'

import {
  green,
  red,
} from '@material-ui/core/colors'

import { makeStyles } from '@material-ui/core/styles'

import midstream from 'midstream'
import { toJS } from 'mobx'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { Element } from 'react-scroll'

import { formatCurrency } from '../../../util/generic'

import {
  OrderBook,
  TradeHistoryBook,
} from '../../trade'

import { ProChart } from '..'

const DollarFormatCustom = (props) => {
  const { inputRef, onBlur, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        const n = parseFloat(values.value)
        onBlur({
          target: {
            value: Number.isNaN(n) ? 0 : n,
          },
        })
      }}
      isNumericString
      prefix='$'
    />
  )
}

const NumberFormatCustom = (props) => {
  const { inputRef, onBlur, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        const n = parseFloat(values.value)
        onBlur({
          target: {
            value: Number.isNaN(n) ? 0 : n,
          },
        })
      }}
      isNumericString
    />
  )
}

// manually measured
const headerHeight = 64
const topBarHeight = 53
const tradingAreaWidth = 240
const tradingAreaHeight = 364

const useStyles = makeStyles((theme) => ({
  proTrader: {
    height: `calc(100vh - ${headerHeight}px)`,
    // fonts
    '& *': {
      fontSize: '.7rem',
    },
    // labels
    '& .MuiInputLabel-root': {
      fontSize: 'calc(.7rem / .75)',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: theme.palette.common.white,
    },
    // inputs
    '& .MuiInput-root': {
      padding: '3px 12px',
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 6px)',
      right: 8,
    },
  },
  proTraderLabel: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  orderBookArea: {
    width: 400,
    height: '100%',
    overflow: 'auto',
  },
  tradeHistoryArea: {
    height: '100%',
    overflow: 'auto',
  },
  orderBookPaper: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    '& span': {
      fontWeight: 600,
    },
  },
  tradeHistoryBookPaper: {
    // extend: 'orderBookPaper',
    borderLeft: 0,
    border: '1px solid',
    height: '100%',
    overflow: 'auto',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    '& span': {
      fontWeight: 600,
    },
  },
  proChart: {
    '& tspan': {
      fill: '#FFFFFF',
    },
  },
  tradePaper: {
    height: '100%',
  },
  tabsPaper: {
    height: '100%',
  },
  tabs: {
    height: '100%',
    '& > *': {
      height: '100%',
      '& > :first-child': {
        height: '100%',
      },
      '& > :last-child': {
        top: 0,
      },
    },
  },
  tab: {
    height: '100%',
    fontSize: '1.25rem',
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    width: '50%',
    minWidth: 0,
    textTransform: 'uppercase',
    fontWeight: 600,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  bordered: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    borderLeft: '0',
  },
  buyButton: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
  },
  sellButton: {
    backgroundColor: red[500],
    color: theme.palette.common.white,
  },
}))

const greaterThan0 = (v) => {
  if (v > 0) {
    return v
  }

  throw new Error('Enter a value greater than 0.')
}

// Simple hook for Midstream
const useMidstream = (config) => {
  const dst = {}
  const err = {}

  // standard force rerender hack
  const [tick, setTick] = useState(0)

  const [ms] = useState(() => (
    midstream(config, {
      dst: (name, value) => {
        dst[name] = value
        setTick(tick + 1)
      },
      // err behaves just like dst
      err: (name, value) => {
        err[name] = value
        setTick(tick + 1)
      },
    })
  ))

  return ms
}

export default (props) => {
  const {
    orderBook,
    book,
    ticker,
    movieCategories,
    createOrder,
    maxSell,
    accountBalance,
  } = props

  if (!orderBook.isReady) {
    return <Typography>Loading chart...</Typography>
  }

  const stock = toJS(orderBook.stock)

  const {
    src,
    mode, setMode,
    type, setType,
    price, setPrice,
    quantity, setQuantity,
    showError, setShowError,
    dst,
    err,
  } = useMidstream({
    mode: [0],
    showError: [false],
    type: ['limit', isRequired, (v) => {
      // side effects of setting the type if setting
      if (v !== type) {
        setShowError(false)
        setPrice(0)
        dst.price = 0
      }
      return v
    }],
    price: [0, (v) => (type === 'limit' ? greaterThan0(v) : v)],
    quantity: [0, greaterThan0],
  })

  const handleModeChange = (event, newValue) => {
    setMode(newValue)
  }

  const executeTrade = async (side) => {
    setShowError(true)

    try {
      await src.runAll()
      setShowError(false)

      createOrder({
        side,
        type,
        price,
        quantity,
        categories: movieCategories,
        ticker,
      })
    } catch (e) {
      // continue
    }
  }

  const meanPrice = orderBook.book ? parseFloat(orderBook.book.meanPrice) : 0
  const spread = orderBook.book ? parseFloat(orderBook.book.spread) : 0

  const {
    bids,
    asks,
  } = book.orderBook

  const { trades } = orderBook

  const classes = useStyles()
  const isMarket = type === 'market'

  const data = stock.proChartData

  return (
    <Element className={ classes.proTrader }>
      <div>
        <Grid container spacing={0}>
          <Grid item xs style={{ minWidth: tradingAreaWidth, maxWidth: tradingAreaWidth }}>
            <Paper
              square
              className={ classes.tabsPaper }
              style={{ minHeight: topBarHeight }}
            >
              <Tabs
                value={mode}
                onChange={ handleModeChange }
                className={ classes.tabs }
              >
                <Tab
                  label='Buy'
                  className={ classes.tab }
                />
                <Tab
                  label='Sell'
                  className={ classes.tab }
                />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs>
            <Box
              p={1}
              pl={2}
              pr={2}
              className={ classes.bordered }
              style={{ minHeight: topBarHeight }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant='caption'>
                    Current Price:
                  </Typography>
                  <Typography variant='h6' className={ classes.proTraderLabel }>
                    1 { ticker } / ${ parseFloat(book.lastPrice).toFixed(2) }
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          style={{
            minHeight: tradingAreaHeight,
            height: `calc(55vh - (${headerHeight}px + ${topBarHeight}px) / 2)`,
          }}
        >
          <Grid item xs style={{
            minWidth: tradingAreaWidth,
            maxWidth: tradingAreaWidth,
          }}>
            <Paper square className={ classes.tradePaper }>
              <Box p={1.5} pl={1} pr={1}>
                <div>
                  {
                    mode === 0 ? (
                      <>
                        <Typography variant='body2' className={ classes.proTraderLabel }>
                          Available Cash to Trade
                        </Typography>
                        <Typography variant='h6'>
                          { formatCurrency(Number.parseFloat(accountBalance).toFixed(2)) }
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant='body2' className={ classes.proTraderLabel }>
                          Available Share to Trade
                        </Typography>
                        <Typography variant='h6'>
                          { maxSell }
                        </Typography>
                      </>
                    )
                  }
                  <br/>
                  <MUIText
                    label='Order Type'
                    select
                    options={{
                      limit: 'Limit',
                      market: 'Market',
                    }}
                    showError={ showError }
                    error={ err.type }
                    value={ type }
                    setValue={ setType }
                    fullWidth
                  />
                  <br/>
                  <MUIText
                    label='Price'
                    placeholder={ `$${(isMarket ? (meanPrice).toFixed(2) : '100.00')}` }
                    showError={ showError }
                    error={ err.price }
                    value={ isMarket ? meanPrice : price }
                    setValue={ setPrice }
                    InputProps={{
                      inputComponent: DollarFormatCustom,
                      endAdornment: <InputAdornment position='end'>USD</InputAdornment>,
                    }}
                    fullWidth
                    disabled={ isMarket }
                  />
                  <br/>
                  <MUIText
                    label='Quantity'
                    placeholder='100'
                    showError={ showError }
                    error={ err.quantity }
                    value={ quantity }
                    setValue={ setQuantity }
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    fullWidth
                  />
                  <br/>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Subtotal:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (price * quantity).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Fee:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (price * quantity * 0.005).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Total:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (price * quantity * 1.005).toFixed(2) }
                      </Typography>
                    </Grid>
                  </Grid>
                  <br/>
                </div>
                {
                  mode === 0 && (
                    <Button
                      variant='contained'
                      size='large'
                      fullWidth
                      onClick={() => executeTrade('bid')}
                      className={ classes.buyButton }
                    >
                      Buy
                    </Button>
                  )
                }
                {
                  mode === 1 && (
                    <Button
                      variant='contained'
                      size='large'
                      fullWidth
                      className={ classes.sellButton }
                      onClick={() => executeTrade('ask')}
                    >
                      Sell
                    </Button>
                  )
                }
              </Box>
            </Paper>
          </Grid>
          <Grid item xs className={classes.proChart}>
            <ProChart data={data} />
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={0}
        style={{
          height: `calc(45vh - (${headerHeight}px + ${topBarHeight}px) / 2)`,
        }}
      >
        <Grid item className={classes.orderBookArea}>
          <Paper square className={classes.orderBookPaper}>
            <OrderBook asks={asks} bids={bids} spread={spread}/>
          </Paper>
        </Grid>
        <Grid item xs className={classes.tradeHistoryArea}>
          <Paper square className={classes.tradeHistoryBookPaper}>
            <TradeHistoryBook trades={trades}/>
          </Paper>
        </Grid>
      </Grid>
    </Element>
  )
}
