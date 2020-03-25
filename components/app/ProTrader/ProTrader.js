import { isRequired } from '@hanzo/middleware'
import { MUIText } from '@hanzo/react'

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'

import {
  green,
  red,
} from '@material-ui/core/colors'

import { makeStyles } from '@material-ui/core/styles'
import Hanzo from 'hanzo.js'

import midstream from 'midstream'
import { toJS } from 'mobx'
import Link from 'next/link'
import Router from 'next/router'
import OrderBookClass from '../../../stores/OrderBook'
import { useEffect, useRef, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Element } from 'react-scroll'
import { HANZO_KEY, HANZO_ENDPOINT } from '../../../settings'

import { formatCurrency } from '../../../util'

import {
  ExchangeHistoryBook,
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

// long dash symbols
const longDash = '—'

// manually measured
const headerHeight = 64
const topBarHeight = 53
const tradingAreaWidth = 240
const tradingAreaHeight = 360

const useStyles = makeStyles((theme) => ({
  coloredLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  proTrader: {
    height: `calc(100vh - ${headerHeight}px)`,
    background: 'linear-gradient(to bottom, rgba(26,26,26,1) 0%,rgba(9,9,9,1) 100%)',
    marginTop: -64,
    paddingTop: 128,
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
  tickerLabel: {
    color: 'rgba(255,255,255,.5)',
  },
  tickerNumber: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  proTraderLabel: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  orderBookArea: {
    width: 280,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  orderBookPaper: {
    border: '1px solid',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    '& span': {
      fontWeight: 600,
    },
  },
  tradeHistoryArea: {
    width: 480,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 'auto',
    },
  },
  tradeHistoryBookPaper: {
    // extend: 'orderBookPaper',
    borderLeft: 0,
    border: '1px solid',
    height: '100%',
    overflow: 'hidden',
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    '& span': {
      fontWeight: 600,
    },
  },
  exchangeHistoryArea: {
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
      overflow: 'unset',
    },
  },
  exchangeHistoryBookPaper: {
    // extend: 'orderBookPaper',
    borderLeft: 0,
    border: '1px solid',
    height: '100%',
    overflow: 'hidden',
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
  noMaxWidth: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100% !important',
    },
  },
  autoHeight: {
    [theme.breakpoints.down('sm')]: {
      height: '100% !important',
    },
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
    slug,
    movies,
    orders,
    setTrading,
  } = props

  if (!orderBook.isReady) {
    return <Typography>Loading chart...</Typography>
  }

  const moviesCleaned = useRef([])
  const moviesFilter = {}

  const filterMovies = () => {
    const api = new Hanzo.Api({ key: HANZO_KEY, endpoint: HANZO_ENDPOINT })

    // eslint-disable-next-line no-restricted-syntax
    for (const movie of movies) {
      if (!moviesFilter[movie.ticker]) {
        const movieCopy = { ...movie }
        movieCopy.orderBook = new OrderBookClass({}, api)
        movieCopy.orderBook.connect(movieCopy.ticker)
        movieCopy.orderBook.fetchStockData(movieCopy.ticker)
        moviesCleaned.current.push(movieCopy)
        moviesFilter[movie.ticker] = true
      }
    }
  }

  useEffect(() => {
    filterMovies()
  }, [])


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
    type: ['market', isRequired, (v) => {
      // side effects of setting the type if setting
      if (v !== type) {
        setShowError(false)
        setPrice(0)
        dst.price = 0
      }
      return v
    }],
    price: [0, (v) => (type === 'market' ? greaterThan0(v) : v)],
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
  const lastCandle = data[data.length - 1]
  const secondLastCandle = data[data.length - 2]

  const dailyDelta = (lastCandle.close - secondLastCandle.close).toFixed(2)
  const dailyDeltaPercent = (
    ((lastCandle.close - secondLastCandle.close) * 100)
    / secondLastCandle.close
  ).toFixed(2)

  const subtotal = price * quantity

  return (
    <Element className={ classes.proTrader }>
      <div>
        <Grid container spacing={0}>
          <Grid item xs style={{
            minWidth: tradingAreaWidth,
            maxWidth: tradingAreaWidth,
          }}>
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
              <Grid container spacing={6}>
                <Grid item>
                  <Typography variant='caption' className={ classes.tickerLabel }>
                    Current price
                  </Typography>
                  <Typography variant='h6' className={ classes.tickerNumber }>
                    1 { ticker } / ${ parseFloat(book.lastPrice).toFixed(2) }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='caption' className={ classes.tickerLabel }>
                    Bid-Ask
                  </Typography>
                  <Typography variant='h6' className={ classes.tickerNumber }>
                    ${ parseFloat(bids[0][0]).toFixed(2) } - ${ parseFloat(asks[0][0]).toFixed(2) }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='caption' className={ classes.tickerLabel }>
                    24hr change
                  </Typography>
                  <Typography
                    variant='h6'
                    className={ classes.tickerNumber }
                    style={{ color: dailyDelta < 0 ? red[500] : green[500] }}
                  >
                    { dailyDelta < 0 ? '-' : ''}${ Math.abs(dailyDelta) } ({dailyDeltaPercent}%)
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='caption' className={ classes.tickerLabel }>
                    24hr range
                  </Typography>
                  <Typography variant='h6' className={ classes.tickerNumber }>
                    ${ lastCandle.low } - ${ lastCandle.high }
                  </Typography>
                </Grid>
                <Grid item xs/>
                <Grid item style={{ paddingRight: 0 }}>
                  <Button
                    title='Switch to Basic'
                    variant='outlined'
                    fullWidth
                    color='secondary'
                    size='medium'
                    onClick={() => {
                      setTrading('basic')
                      Router.push(`/trade/${slug}`)
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      className={classes.buyTicketsText}
                    >
                      Switch to Basic
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Select
                    defaultValue={slug}
                    onChange={(e) => {
                      if (e.target.value !== slug) {
                        Router.push(`/pro/${e.target.value}`)
                      }
                    }}
                  >
                    {
                      moviesCleaned.current.map((m, i) => <MenuItem key={`menu_${i}`} value={m.movieSlug}><Grid container spacing={3}>
                        <Grid item xs={7} style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          boxOrient: 'vertical',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'normal',
                        }}>{m.name}</Grid>
                        <Grid item xs={3}>{m.ticker}</Grid>
                        <Grid item xs={2}>
                          { isNaN(m.orderBook.book.lastPrice) ? '--' : parseFloat(m.orderBook.book.lastPrice).toFixed(2) }
                        </Grid>
                        </Grid></MenuItem>)
                    }
                  </Select>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          className={classes.autoHeight}
          style={{
            minHeight: tradingAreaHeight,
            height: `calc(60vh - (${headerHeight}px + ${topBarHeight}px) / 2)`,
          }}
        >
          <Grid item xs={12} className={classes.noMaxWidth} sm style={{
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
                          { formatCurrency(
                            Number.parseFloat(accountBalance).toFixed(2),
                          )}
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
                  <Box mt={1} mb={2}>
                    <a href='/account/funds' target='_blank' className={ classes.coloredLink }>+ Add funds</a>
                    &nbsp;|&nbsp;
                    <a href='/portfolio' target='_blank' className={ classes.coloredLink }>See all balances</a>
                  </Box>
                  <MUIText
                    label='Order Type'
                    select
                    options={{
                      market: 'Market',
                      limit: 'Limit',
                      stopLimit: 'Stop Limit',
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
                        Subtotal
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        {
                          subtotal > 0 ? `$${(subtotal).toFixed(2)}` : longDash
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Fee
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        {
                          subtotal > 0 ? `$${(price * quantity * 0.005).toFixed(2)}` : longDash
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Total
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        {
                          subtotal > 0 ? `$${(price * quantity * 1.005).toFixed(2)}` : longDash
                        }
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
          <Grid item xs={12} sm className={classes.proChart}>
            <ProChart data={data} />
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={0}
        style={{
          height: `calc(40vh - (${headerHeight}px + ${topBarHeight}px) / 2)`,
        }}
      >
        <Grid item className={classes.tradeHistoryArea}>
          <Paper square className={classes.tradeHistoryBookPaper}>
            <TradeHistoryBook orders={orders}/>
          </Paper>
        </Grid>
        <Grid item className={classes.orderBookArea}>
          <Paper square className={classes.orderBookPaper}>
            <OrderBook asks={asks} bids={bids} spread={spread}/>
          </Paper>
        </Grid>
        <Grid item xs className={classes.exchangeHistoryArea}>
          <Paper square className={classes.exchangeHistoryBookPaper}>
            <ExchangeHistoryBook trades={trades}/>
          </Paper>
        </Grid>
      </Grid>
    </Element>
  )
}
