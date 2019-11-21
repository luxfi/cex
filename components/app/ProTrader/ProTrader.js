import {
  useEffect,
  useState,
} from 'react'

import {
  BuySellForm,
  ChartIntervalControls,
  ChartCandlestickFake,
  ChartLineSeries,
  ProChart,
} from "../"

import { toJS } from "mobx"
import { timelineLabels } from "../../../util/dateRange"
import { Element, scroller } from "react-scroll"
import dynamic from "next/dynamic"

import {
  Grid,
  Button,
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  InputAdornment,
} from "@material-ui/core"

import {
  makeStyles
} from '@material-ui/core/styles'

import {
  red,
  green,
} from '@material-ui/core/colors'

import NumberFormat from 'react-number-format'

import midstream from 'midstream'
import { isRequired } from '@hanzo/middleware'
import { MUIText } from '@hanzo/react'


const TVChartContainer = dynamic(
  async () => {
    const mod = await import("../TVChartContainer")
    return mod.TVChartContainer
  },
  {
    ssr: false,
    loading: () => <div style={{ color: "red" }}>This is loading</div>
  }
)

function getActiveChart(activeChart, { chartData, yDomain, labels }) {
  switch (activeChart) {
    case "candlestick":
      return (
        <ChartCandlestickFake
          data={chartData}
          yDomain={yDomain}
          labels={labels}
        />
      )
    case "line-chart":
      return (
        <ChartLineSeries
          data={chartData}
          yDomain={yDomain}
          labels={labels}
        />
      )
    case 2:
      return null
    default:
      return null
  }
}

function DollarFormatCustom(props) {
  const { inputRef, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        let n = parseFloat(values.value)
        onBlur({
          target: {
            value: isNaN(n) ? 0 : n
          },
        });
      }}
      isNumericString
      prefix="$"
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        let n = parseFloat(values.value)
        onBlur({
          target: {
            value: isNaN(n) ? 0 : n
          },
        });
      }}
      isNumericString
    />
  );
}

const useStyles = makeStyles((theme) => {
  return {
    orderBookPaperGrid: {
      width: 400,
    },
    orderBookPaper: {
      border: '1px solid',
      borderColor: theme.palette.background.paper,
      backgroundColor: theme.palette.background.default,
      '& span': {
        fontWeight: 600,
      }
    },
    orderBook: {
      maxHeight: 420,
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
    proChart: {
      '& tspan': {
        fill: '#FFFFFF'
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
      '& > *' : {
        height: '100%',
        '& > :first-child' : {
          height: '100%',
        },
        '& > :last-child' : {
          top: 0,
        },
      }
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
      }
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
  }
})

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

export default props => {
  const {
    chartData,
    yDomain,
    updatePrintInterval,
    activeChart,
    buyOrders,
    sellOrders,
    orderBook,
    book,
    ticker,
    movieCategories,
    createOrder,
    onExecute,
    maxSell,
    setActiveChart,
    setMarketOrderType,
    marketOrderType,
    funds,
    stockName,
    accountBalance,
  } = props
  let labels = timelineLabels()

  const [mode, setMode] = useState(0)
  const [showError, setShowError] = useState(false)

  const stock = toJS(orderBook.stock)
  let { connected } = orderBook

  const { src, dst, err, hooks } = useMidstream({
    type: [isRequired, (v) => {
      // side effects of setting the type if setting
      if (v !== dst.type) {
        setShowError(false)
        src.price = 0
        dst.price = 0
      }
      return v
    }],
    price: (v) => dst.type === 'limit' ? greaterThan0(v) : v,
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
        side: side,
        type: dst.type,
        price: dst.price,
        quantity: dst.quantity,
      })
    } catch (e) {
    }
  }

  window.orderBook = orderBook

  const meanPrice = orderBook.book ? parseFloat(orderBook.book.meanPrice) : 0
  const spread = orderBook.book ? parseFloat(orderBook.book.spread) : 0

  const bids = book.orderBook.bids
  const asks = book.orderBook.asks

  const classes = useStyles()
  const isMarket = dst.type === 'market'

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

  let data = stock.proChartData

  return (
    <Element>
      <Box ml={-3} mr={-3} mt={2}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} md={2}>
            <Paper square={true} className={ classes.tabsPaper }>
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
          <Grid item xs={12} sm={8} md={10}>
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
          <Grid item xs={12} sm={4} md={2}>
            <Paper square={true} className={ classes.tradePaper }>
              <Box p={2} pl={4} pr={4}>
                <div>
                  {
                    mode === 0 ? (
                      <>
                        <Typography variant='body2'>
                          Available Cash to Trade:
                        </Typography>
                        <Typography variant='h6'>
                          ${ accountBalance.toFixed(2) }
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
                    placeholder={ '$' + (isMarket ? (meanPrice).toFixed(2) : '100.00') }
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
          <Grid item xs={12} sm={8} md={10} className={classes.proChart}>
            <ProChart data={data} />
          </Grid>
          <Grid item className={classes.orderBookPaperGrid}>
            <Paper square={true} className={classes.orderBookPaper}>
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
                    { asks.map((ask, i) =>
                        <Grid key={i} container spacing={1} style={{ color: red[500] }}>
                          <Grid item xs={6}>
                            <Typography variant='caption'>
                              {ask ? parseFloat(ask[1]).toFixed(0) : '&nbsp;'}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant='caption'>
                              ${ask ? parseFloat(ask[0]).toFixed(2) : '&nbsp;'}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                          </Grid>
                        </Grid>
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

                    { bids.map((bid, i) =>
                        <Grid key={i} container spacing={1} style={{ color: green[500] }}>
                          <Grid item xs={6}>
                            <Typography variant='caption'>
                              {bid ? parseFloat(bid[1]).toFixed(0) : '&nbsp;'}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant='caption'>
                              ${bid ? parseFloat(bid[0]).toFixed(2) : '&nbsp;'}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                          </Grid>
                        </Grid>
                      )
                    }
                  </Box>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Element>
  )
}
