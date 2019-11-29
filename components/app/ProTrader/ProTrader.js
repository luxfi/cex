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

const useStyles = makeStyles((theme) => ({
  orderBookPaperGrid: {
    width: 400,
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

const useMidstream = (middleware, defaults, dst) => {
  const [ms] = useState(() => midstream(middleware, { defaults, dst }))
  return ms
}

const greaterThan0 = (v) => {
  if (v > 0) {
    return v
  }

  throw new Error('Enter a value greater than 0.')
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

  const [mode, setMode] = useState(0)
  const [showError, setShowError] = useState(false)

  const stock = toJS(orderBook.stock)

  const {
    src,
    dst,
    err,
    hooks,
  } = useMidstream({
    type: [isRequired, (v) => {
      // side effects of setting the type if setting
      if (v !== dst.type) {
        setShowError(false)
        src.price = 0
        dst.price = 0
      }
      return v
    }],
    price: (v) => (dst.type === 'limit' ? greaterThan0(v) : v),
    quantity: greaterThan0,
  }, {
    type: 'limit',
    price: 0,
    quantity: 0,
  }, {
    price: 0,
    quantity: 0,
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
        type: dst.type,
        price: dst.price,
        quantity: dst.quantity,
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
  const isMarket = dst.type === 'market'

  const data = stock.proChartData

  return (
    <Element>
      <Box ml={-3} mr={-3} mt={-8}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper square className={ classes.tabsPaper }>
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
          <Grid item xs={12} sm={8} md={9}>
            <Box
              p={1}
              pl={2}
              pr={2}
              className={ classes.bordered }
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant='caption'>
                    Current Price:
                  </Typography>
                  <Typography variant='h6'>
                    1 { ticker } / ${ parseFloat(book.lastPrice).toFixed(2) }
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Paper square className={ classes.tradePaper }>
              <Box p={2} pl={4} pr={4}>
                <div>
                  {
                    mode === 0 ? (
                      <>
                        <Typography variant='body2'>
                          Available Cash to Trade:
                        </Typography>
                        <Typography variant='h6'>
                          { formatCurrency(Number.parseFloat(accountBalance).toFixed(2)) }
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant='body2'>
                          Available Share to Trade:
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
                    variant='outlined'
                    select
                    options={{
                      limit: 'Limit',
                      market: 'Market',
                    }}
                    showError={ showError }
                    error={ err.type }
                    value={ src.type }
                    setValue={ hooks.type[1] }
                    fullWidth
                  />
                  <br/>
                  <MUIText
                    label='Price'
                    placeholder={ `$${(isMarket ? (meanPrice).toFixed(2) : '100.00')}` }
                    variant='outlined'
                    showError={ showError }
                    error={ err.price }
                    value={ isMarket ? meanPrice : src.price }
                    setValue={ hooks.price[1] }
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
                    variant='outlined'
                    showError={ showError }
                    error={ err.quantity }
                    value={ src.quantity }
                    setValue={ hooks.quantity[1] }
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
                        ${ (dst.price * dst.quantity).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Fee:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (src.price * src.quantity * 0.005).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Total:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (src.price * src.quantity * 1.005).toFixed(2) }
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
          <Grid item xs={12} sm={8} md={9} className={classes.proChart}>
            <ProChart data={data} />
          </Grid>
          <Grid item className={classes.orderBookPaperGrid}>
            <Paper square className={classes.orderBookPaper}>
              <OrderBook asks={asks} bids={bids} spread={spread}/>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper square className={classes.tradeHistoryBookPaper}>
              <TradeHistoryBook trades={trades}/>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Element>
  )
}
