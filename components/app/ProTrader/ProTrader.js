import {
  BuySellForm,
  ChartIntervalControls,
  ChartCandlestickFake,
  ChartLineSeries,
  ToggleVisibleChart,
  StockChart
} from "../"

import { toJS } from "mobx"
import { timelineLabels } from "../../../util/dateRange"
import { Element } from "react-scroll"
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
import { useState } from "react"
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

  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState(0)
  const [orderType, setOrderType] = useState('limit')
  const [orderPrice, setOrderPrice] = useState(0)
  const [orderQuantity, setOrderQuantity] = useState(0)

  const stock = toJS(orderBook.stock)
  let { connected } = orderBook

  const handleModeChange = (event, newValue) => {
    setMode(newValue)
  }

  const executeTrade = (side) => {
    createOrder({
      side: side,
      type: orderType,
      price: orderPrice,
      quantity: orderQuantity,
    })
  }

  window.orderBook = orderBook

  let bids = book.orderBook.bids
  let asks = book.orderBook.asks

  const classes = useStyles()

  return (
    <Element>
      <Box ml={-3} mr={-3} mt={2}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={0} sm={6} md={9}>
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
          <Grid item xs={12} sm={6} md={3}>
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
                    value={ orderType }
                    setValue={ setOrderType }
                    fullWidth
                  />
                  <br/>
                  <MUIText
                    label='Price'
                    placeholder={ '$' + ((orderType === 'market') ? book.meanPrice : '100.00') }
                    variant='outlined'
                    value={ (orderType === 'market') ? book.meanPrice : orderPrice }
                    setValue={ setOrderPrice }
                    InputProps={{
                      inputComponent: DollarFormatCustom,
                      endAdornment: <InputAdornment position='end'>USD</InputAdornment>,
                    }}
                    fullWidth
                    disabled={ orderType === 'market' }
                  />
                  <br/>
                  <MUIText
                    label='Quantity'
                    placeholder='100'
                    variant='outlined'
                    value={ orderQuantity }
                    setValue={ setOrderQuantity }
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
                        ${ (orderPrice * orderQuantity).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Fee:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (orderPrice * orderQuantity * 0.005).toFixed(2) }
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        Total:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className='right-aligned'>
                      <Typography variant='body1' align='right'>
                        ${ (orderPrice * orderQuantity * 1.005).toFixed(2) }
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
          <Grid item xs={12} sm={6} md={9}>
            <StockChart stock={stock} stockName={stockName} connected={connected} />
          </Grid>
          <Grid item xs={12}>
            <Paper square={true}>
              <Box p={2}>
                <Grid container>
                  <Grid item xs={6}>
                    Price
                  </Grid>
                  <Grid item xs={6}>
                    Quantity
                  </Grid>
                </Grid>
                  { asks.map((ask) =>
                      <Grid container style={{ color: red[500] }}>
                        <Grid item xs={6}>
                          ${parseFloat(ask[0]).toFixed(2)}
                        </Grid>
                        <Grid item xs={6}>
                          {parseFloat(ask[1]).toFixed(0)}
                        </Grid>
                      </Grid>
                    )
                  }
                  { bids.map((bid) =>
                      <Grid container style={{ color: green[500] }}>
                        <Grid item xs={6}>
                          ${parseFloat(bid[0]).toFixed(2)}
                        </Grid>
                        <Grid item xs={6}>
                          {parseFloat(bid[1]).toFixed(0)}
                        </Grid>
                      </Grid>
                    )
                  }
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Element>
  )
}
