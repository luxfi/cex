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
import { Skeleton } from "@material-ui/lab"
import NumberFormat from 'react-number-format'
import { useState } from "react"
import { MUIText } from '@hanzo/react'

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
    stockName,
    accountBalance
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

  if (orderBook.isReady) {
    const { bids } = book.orderBook
    const visibleBids = bids
        .slice()
        .reverse()
        .slice(0, 5)
    const { asks } = book.orderBook
    const visibleAsks = bids
        .slice()
        .slice(0, 5)
        .reverse()
        
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <br />
          <Paper>
            <Tabs value={mode} onChange={handleModeChange}>
              <Tab label="BUY" />
              <Tab label="SELL" />
            </Tabs>
            <Box p={2}>
              <div>
                {
                  mode === 0 ? (
                    <>
                      <Typography variant='body2'>
                        Balance
                      </Typography>
                      <Typography variant='h6'>
                        ${accountBalance} USD
                      </Typography>
                    </>
                  ) : (
                      <>
                        <Typography variant='body2'>
                          Total Shares
                      </Typography>
                        <Typography variant='h6'>
                          {maxSell}
                        </Typography>
                      </>
                    )
                }
                <Typography variant='body2'>
                  Last Price
                </Typography>
                <Typography variant='h6'>
                  ${book.meanPrice} USD
                </Typography>
                <br />
                <MUIText
                  label='Order Type:'
                  variant='outlined'
                  select
                  options={{
                    limit: 'Limit',
                    market: 'Market',
                  }}
                  value={orderType}
                  setValue={setOrderType}
                  fullWidth
                />
                <br />
                <MUIText
                  label='Price:'
                  placeholder={'$' + ((orderType === 'market') ? book.meanPrice : '100.00')}
                  variant='outlined'
                  value={(orderType === 'market') ? book.meanPrice : orderPrice}
                  setValue={setOrderPrice}
                  InputProps={{
                    inputComponent: DollarFormatCustom,
                  }}
                  fullWidth
                  disabled={orderType === 'market'}
                />
                <br />
                <MUIText
                  label='Quantity:'
                  placeholder='100'
                  variant='outlined'
                  value={orderQuantity}
                  setValue={setOrderQuantity}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  fullWidth
                />
                <br />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Subtotal:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
                      ${(orderPrice * orderQuantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Fee:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
                      ${(orderPrice * orderQuantity * 0.005).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' align='right'>
                      ${(orderPrice * orderQuantity * 1.005).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
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
          <Paper>
            <Box p={2}>
              <Grid container>
                <Grid item xs={6}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  Quantity
                </Grid>
              </Grid>
              {visibleAsks.map((ask, i ) =>
                <Grid container style={{ color: 'red' }} key={i}>
                  <Grid item xs={6}>
                    ${parseFloat(ask[0]).toFixed(2)}
                  </Grid>
                  <Grid item xs={6}>
                    {parseFloat(ask[1]).toFixed(0)}
                  </Grid>
                </Grid>
              )
              }
              {visibleBids.map((bid, i) =>
                <Grid container style={{ color: 'green' }} key={i}>
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
    )
  }
  else {
    return (
        <React.Fragment>
            <Skeleton width="25%" />
            <Skeleton height={32} width="15%" />
            <Skeleton variant="rect" height={300} />
        </React.Fragment>
    );
  }
}
