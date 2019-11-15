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
} from "@material-ui/core"
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
    stockName
  } = props
  let labels = timelineLabels()

  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState(0)
  const [orderType, setOrderType] = useState('limit')
  const [orderPrice, setOrderPrice] = useState(0)
  const [orderQuantity, setOrderQuantity] = useState(0)

  console.log('p, q', orderPrice, orderQuantity)

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

  let bids = book.orderBook.bids.slice().reverse().slice(0, 10)
  let asks = book.orderBook.asks.slice().slice(0, 10).reverse()

  return (
    <Element>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <br />
          <Paper>
            <Tabs value={mode} onChange={ handleModeChange }>
              <Tab label="BUY" />
              <Tab label="SELL" />
            </Tabs>
            <Box p={2}>
              <div>
                <Typography variant='body2'>
                  Last Price
                </Typography>
                <Typography variant='h6'>
                  ${ book.meanPrice } USD
                </Typography>
                <br/>
                <MUIText
                  label='Order Type:'
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
                  label='Price:'
                  placeholder={ '$' + ((orderType === 'market') ? book.meanPrice : '100.00') }
                  variant='outlined'
                  value={ (orderType === 'market') ? book.meanPrice : orderPrice }
                  setValue={ setOrderPrice }
                  InputProps={{
                    inputComponent: DollarFormatCustom,
                  }}
                  fullWidth
                  disabled={ orderType === 'market' }
                />
                <br/>
                <MUIText
                  label='Quantity:'
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
                    <Typography variant='body2'>
                      Subtotal:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
                      ${ (orderPrice * orderQuantity).toFixed(2) }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Fee:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
                      ${ (orderPrice * orderQuantity * 0.005).toFixed(2) }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
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
                    color='primary'
                    fullWidth
                    onClick={() => executeTrade('bid')}
                  >
                    Buy
                  </Button>
                )
              }
              {
                mode === 1 && (
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
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
          <Grid container>
            <Grid item xs={6}>
              Price
            </Grid>
            <Grid item xs={6}>
              Quantity
            </Grid>
          </Grid>
            { asks.map((ask) =>
                <Grid container style={{ color: 'red' }}>
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
                <Grid container style={{ color: 'green' }}>
                  <Grid item xs={6}>
                    ${parseFloat(bid[0]).toFixed(2)}
                  </Grid>
                  <Grid item xs={6}>
                    {parseFloat(bid[1]).toFixed(0)}
                  </Grid>
                </Grid>
              )
            }
          </Grid>
      </Grid>

      <style jsx>{`
      `}</style>
    </Element>
  )
}
