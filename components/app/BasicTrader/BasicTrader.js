import React from 'react' 
import { toJS } from 'mobx'
import Router from 'next/router'
import Link from '../Link'

import { Grid, Typography, Button, Box, Divider, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { StockChart } from '../'

import {
  AboutSection,
  BuySellWidget,
  FinancialsSection,
  HistorySection,
  EarningsSection,
  OtherFilmsTrading,
  AnalystSection,
} from '../../trade'

  // not that /components/trade/TradeView.style.js is unused!... 
  
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  buyTicketsButton: {},
  buyTicketsText: {
    color: '#fff',
    padding: theme.spacing(1),
  },
  label: {
    textTransform: 'capitalize',
  },
  card: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
  }
}))

export default (props) => {
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
    investmentHistory,
    marketOrderType,
    stockName,
    accountBalance,
    watchlist,
    removeFromWatchlist,
    addToWatchlist,
    movieSlug,
    movies,
    redirectLogin,
    setTrading,
    slug,
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
      <Grid justify="center" container spacing={4} className={classes.card}>
        <Grid item lg={9} md={8} xs={12} spacing={4}>
          {orderBook.isReady ? (
            <StockChart
              stock={stock}
              stockName={stockName}
              ticker={ticker}
              connected={connected}
              marketPrice={marketPrice}
              movieSlug={movieSlug}
            />
          ) : (
            <React.Fragment>
              <Skeleton width="25%" />
              <Skeleton height={32} width="15%" />
              <Skeleton variant="rect" height={300} />
            </React.Fragment>
          )}
        </Grid>
        <Grid item lg={3} md={4} xs={12} spacing={4}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <BuySellWidget
                classes={classes}
                marketPrice={marketPrice}
                ticker={ticker}
                orderType="bid"
                accountBalance={accountBalance}
                createOrder={createOrder}
                redirectLogin={redirectLogin}
                movieCategories={movieCategories}
                maxSell={maxSell}
                book={book}
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={3} pl={4} pr={4}>
                <Link
                  href="/ticketing/[id]"
                  as={`/ticketing/${movieSlug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    title="Tweet"
                    variant="outlined"
                    fullWidth
                    color="primary"
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
                </Link>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={3} pl={4} pr={4}>
                <Button
                  onClick={e => {
                    inWatchlist
                      ? removeFromWatchlist(ticker)
                      : addToWatchlist(ticker)
                  }}
                  variant="outlined"
                  fullWidth
                  color="primary"
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
                    {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={3} pl={4} pr={4}>
                <Button
                  title="Switch to Pro"
                  variant="outlined"
                  fullWidth
                  color="primary"
                  size="large"
                  className={classes.buyTicketsButton}
                  classes={{
                    label: classes.label,
                  }}
                  onClick={() => {
                    setTrading('pro')
                    Router.push(`/pro/${slug}`)
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.buyTicketsText}
                  >
                    Switch to Pro
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid justify="center" container spacing={4} className={classes.card}>
        <Grid item xs={12}  md={8} lg={9} spacing={4}>
          <FinancialsSection />
          <Divider />
          <AnalystSection />
          <Divider />
          <EarningsSection />
          <Divider />
          <HistorySection investmentHistory={investmentHistory} ticker={ticker} />
          <Divider />
          <OtherFilmsTrading movies={movies} />
        </Grid>
        <Grid item lg={3} md={4} xs={12} />
      </Grid>
    </>
  )
}
