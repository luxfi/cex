import { StockChart } from '../'
import { toJS } from 'mobx'
import { Grid, Typography, Button, Box, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import {
  AboutSection,
  BuySellWidget,
  FinancialsSection,
  HistorySection,
  EarningsSection,
  OtherFilmsTrading,
  AnalystSection,
} from '../../trade'
import { useState, useEffect } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    temp: console.log('t', theme),
  },
  buyTicketsButton: {},
  buyTicketsText: {
    color: '#fff',
    padding: theme.spacing(1),
  },
  label: {
    textTransform: 'capitalize',
  },
}))

export default props => {
  const {
    buyOrders,
    sellOrders,
    orderBook,
    book,
    ticker,
    movieCategories,
    onExecute,
    createOrder,
    maxSell,
    marketOrderType,
    funds,
    stockName,
    accountBalance,
    watchlist,
    removeFromWatchlist,
    addToWatchlist,
    atomTicketsURL,
    movies,
  } = props
  const stock = toJS(orderBook.stock)
  let { connected } = orderBook
  const classes = useStyles()
  // temp fix - sometimes book is undefined...
  let meanPrice = 0
  if (book) {
    meanPrice = book.meanPrice
  }
  const marketPrice = Number.parseFloat(meanPrice).toFixed(2)
  const inWatchlist = watchlist.includes(ticker)
  return (
    <>
      <Grid justify="center" container spacing={4}>
        <Grid item xs={12} lg={7}>
          {orderBook.isReady ? (
            <StockChart
              stock={stock}
              stockName={stockName}
              connected={connected}
              marketPrice={marketPrice}
            />
          ) : (
            <React.Fragment>
              <Skeleton width="25%" />
              <Skeleton height={32} width="15%" />
              <Skeleton variant="rect" height={300} />
            </React.Fragment>
          )}
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <BuySellWidget
                classes={classes}
                marketPrice={marketPrice}
                ticker={ticker}
                orderType="bid"
                funds={funds}
                createOrder={createOrder}
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={3} pl={4} pr={4}>
                <Button
                  href={atomTicketsURL}
                  target="_blank"
                  title="Tweet"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  size="large"
                  className={classes.buyTicketsButton}
                  classes={{
                    label: classes.label,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.buyTicketsText}
                  >
                    Buy Tickets
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={3} justifyContent="center" display="flex">
                <Typography
                  onClick={e => {
                    inWatchlist
                      ? removeFromWatchlist(ticker)
                      : addToWatchlist(ticker)
                  }}
                  variant="subtitle1"
                  color="secondary"
                >
                  {inWatchlist ? 'Remove from Watchlist' : 'Add to WatchList'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid justify="center" container spacing={4}>
        <Grid item xs={12} lg={7}>
          <AboutSection />
          <Divider />
          <FinancialsSection />
          <Divider />
          <AnalystSection />
          <Divider />
          <EarningsSection />
          <Divider />
          <HistorySection book={orderBook.book} />
          <Divider />
          <OtherFilmsTrading movies={movies} />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12} />
      </Grid>
      {/* hide buy sell until there is a design for it */}
      {/* <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="green"
            buttonText="BUY"
            orderType="bid"
            ticker={ticker}
            createOrder={createOrder}
            orders={buyOrders}
            orderBook={orderBook}
            onExecute={onExecute}
            createOrder={createOrder}
            movieCategories={movieCategories}
            marketOrderType={marketOrderType}
            funds={funds}
            connected={connected}
            accountBalance={accountBalance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="red"
            buttonText="SELL"
            orderType="ask"
            ticker={ticker}
            orders={sellOrders}
            orderBook={orderBook}
            createOrder={createOrder}
            onExecute={onExecute}
            createOrder={createOrder}
            movieCategories={movieCategories}
            maxSell={maxSell}
            marketOrderType={marketOrderType}
            funds={funds}
            accountBalance={accountBalance}
          />
        </Grid> */}
    </>
  )
}
