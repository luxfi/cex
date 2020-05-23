import React, { useEffect, useRef, useState } from 'react'
import { toJS } from 'mobx'
import Router from 'next/router'

import { Element } from 'react-scroll'

import Hanzo from 'hanzo.js'
import { isRequired } from '@hanzo/middleware'
import { MUIText } from '@hanzo/react'

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  makeStyles,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'

import { red, green } from '@material-ui/core/colors'

import OrderBookClass from '../../../stores/OrderBook'
import { HANZO_KEY, HANZO_ENDPOINT } from '../../../settings'
import { formatCurrency } from '../../../util'

import {
  ExchangeHistoryBook,
  OrderBook,
  TradeHistoryBook,
} from '../../trade'

import {
  headerHeight,
  topBarHeight,
  tradingAreaWidth,
  tradingAreaHeight
} from './const.js'

import { Loading } from '../../app'
import { ProChart } from '..'

import {
  DollarFormatCustom,
  NumberFormatCustom,
  greaterThan0,
  useMidstream,
  longDash
} from './util'

import styles from './proTrader.style.js'
const useStyles = makeStyles(styles)

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
    return <Loading loading={!orderBook.isReady} />
  }

  const moviesCleaned = useRef([])
  const [selectState, setSelectState] = useState(false)
  const moviesFilter = {}

  const filterMovies = () => {
    const api = new Hanzo.Api({ key: HANZO_KEY, endpoint: HANZO_ENDPOINT })

    // eslint-disable-next-line no-restricted-syntax
    for (const movie of movies) {
      if (!moviesFilter[movie.ticker]) {
        const movieCopy = { ...movie }

        if (movieCopy.ticker) {
          movieCopy.orderBook = new OrderBookClass({}, api)
          movieCopy.orderBook.connect(movieCopy.ticker)
          movieCopy.orderBook.fetchStockData(movieCopy.ticker)
        }
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
                      Router.push('/trade/[id]', `/trade/${slug}`)
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
                    onOpen={() => {
                      setSelectState(true)
                    }}
                    onClose={() => {
                      setSelectState(false)
                    }}

                  >
                    {
                      moviesCleaned.current.map((m, i) => {
                        if (!m.orderBook) {
                          return null
                        }

                        if (!m.orderBook.book.lastPrice) {
                          return <MenuItem key={`menu_${i}`} value={m.movieSlug}>{m.name}</MenuItem>
                        }

                        const selectItem = selectState ? (
                          <MenuItem key={`menu_${i}`} value={m.movieSlug}>
                            <Grid container spacing={3}>
                              <Grid item xs={7} style={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                boxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                              }}>
                                {m.name}
                              </Grid>
                              <Grid item xs={3}>{m.ticker}</Grid>
                              <Grid item xs={2}>
                                { isNaN(m.orderBook.book.lastPrice) ? '--' : parseFloat(m.orderBook.book.lastPrice).toFixed(2) }
                              </Grid>
                            </Grid>
                          </MenuItem>
                        ) : (
                          <MenuItem key={`menu_${i}`} value={m.movieSlug}>{m.name}</MenuItem>
                        )

                        return selectItem
                      })
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
