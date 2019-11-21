import React from 'react'
import Link from 'next/link'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter, Router } from 'next/router'
import { MUISwitch } from '@hanzo/react'

import classNames from 'classnames'

// orderbook
import { formatTakeResults } from '../../../util/formatOrderBookDataForChart'

// @material-ui/core components
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

// core components
import { CustomBreadcrumbs, BasicTrader, InvestNow, ProTrader } from '../../app'
import { TrailerModal } from '../../landing'

// section
import { padDollarAmount } from '../../../util/generic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// the nice looking double chevrons are part of the "pro" package that costs money
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import styles from './trade.style.js'

import { isObservableArray } from 'mobx'

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children }, ref) => (
    <Link ref={ref} href={href || ''} as={hrefAs}>
      <a className={className}>{children}</a>
    </Link>
  ),
)

const ExternalLink = React.forwardRef(
  ({ className, href, hrefAs, children }, ref) => (
    <a
      className={className}
      ref={ref}
      href={href || ''}
      as={hrefAs}
      target="_blank"
    >
      {children}
    </a>
  ),
)

const formatMonthlyStats = (price, valueDelta) => {
  return (
    (valueDelta > 0 ? '+ ' : '- ') +
    Math.abs(valueDelta) +
    ' (' +
    ((valueDelta / price) * 100).toFixed(2) +
    '%) '
  )
}

@inject('store')
@observer
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMode: localStorage.getItem('tradeMode') || 'basic',
    }
  }

  componentDidMount() {
    // Need to pass the order book the data to render
    const { router } = this.props
    const { slug } = router.query
    const { userStore, movieStore, orderBook, userPortfolio } = this.props.store
    const movie = movieStore.getMovieBySlug(slug)
    // orderBook.initiateDataGenerator(movie.ticker, movie.price)
    userStore.loadAccountBalance()
    userPortfolio.getInvestments()
    orderBook.connect(movie.ticker)
    this.props.store.orderBook.fetchStockData(movie.ticker)
    window.store = this.props.store
  }

  componentWillUnmount() {
    // Disconnect socket
    this.props.store.orderBook.disconnect()
  }

  onModeSelected(tab) {
    if (this.state.selectedMode !== tab) {
      // if going to a new tab, collapse the view as well.
      localStorage.setItem('tradeMode', tab)
      this.setState({
        selectedMode: tab || 'pro',
      })
    }
  }

  render() {
    const { classes, store } = this.props

    // get router slug and find article
    const { router } = this.props
    const { slug } = router.query
    const { movieStore, orderBook, userStore, userPortfolio } = this.props.store
    const movie = movieStore.getMovieBySlug(slug)
    // orderBook stuff
    let takeResultsArray = orderBook.takeResults.slice(0)
    const {
      printInterval,
      buyOrders,
      sellOrders,
      activeChart,
      marketOrderType,
    } = orderBook
    const funds = userStore.accountBalance
    const chartData = formatTakeResults(takeResultsArray, printInterval)
    const yDomain = [orderBook.low * 0.94, orderBook.high * 1.06]
    const updatePrintInterval = time => {
      orderBook.updatePrintInterval(time)
    }
    const setActiveChart = activeChart => {
      orderBook.setActiveChart(activeChart)
    }
    const setMarketOrderType = marketOrder => {
      orderBook.setMarketOrderType(marketOrder)
    }

    const createOrder = order => {
      orderBook.socketOrderCreate(order, (ticker, orderType) => {
        const updateBalance = (side, val) => {
          if (side === 'bid') userStore.removeBalance(val)
          else userStore.addBalance(val)
        }
        userPortfolio.onOrderExecute(order, ticker, orderType, updateBalance)
      })
    }

    // Load necessary user data
    const maxSell = userPortfolio.getMaxSell(movie.ticker)

    const addToWatchlist = t => {
      userPortfolio.addToWatchlist(t)
    }

    const removeFromWatchlist = t => {
      userPortfolio.removeFromWatchlist(t)
    }

    return (
      <>
        <article>
          <Box p={3} pt={8}>
            <MUISwitch
              label="Professional"
              value={this.state.selectedMode == 'pro'}
              setValue={val => this.onModeSelected(val ? 'pro' : 'basic')}
            />
            {this.state.selectedMode === 'basic' ? (
              <BasicTrader
                chartData={chartData}
                yDomain={yDomain}
                updatePrintInterval={updatePrintInterval}
                setActiveChart={setActiveChart}
                setMarketOrderType={setMarketOrderType}
                marketOrderType={marketOrderType}
                funds={funds}
                printInterval={printInterval}
                activeChart={activeChart}
                buyOrders={buyOrders}
                sellOrders={sellOrders}
                orderBook={orderBook}
                book={orderBook.book}
                ticker={movie.ticker}
                atomTicketsURL={
                  'https://www.atomtickets.com/movies/' + movie.atomTicketsSlug
                }
                createOrder={createOrder}
                onExecute={(order, orderType) => {
                  return userPortfolio.onOrderExecute(order, orderType)
                }}
                movieCategories={toJS(movie.genre)}
                maxSell={maxSell}
                stockName={movie.name}
                accountBalance={userStore.accountBalance}
                userStore={userStore}
                watchlist={userPortfolio.watchlist}
                removeFromWatchlist={removeFromWatchlist}
                addToWatchlist={addToWatchlist}
                movies={movieStore.movies}
              />
            ) : (
              <ProTrader
                chartData={chartData}
                yDomain={yDomain}
                updatePrintInterval={updatePrintInterval}
                setActiveChart={setActiveChart}
                setMarketOrderType={setMarketOrderType}
                marketOrderType={marketOrderType}
                funds={funds}
                printInterval={printInterval}
                activeChart={activeChart}
                buyOrders={buyOrders}
                sellOrders={sellOrders}
                orderBook={orderBook}
                book={orderBook.book}
                ticker={movie.ticker}
                createOrder={createOrder}
                onExecute={(order, orderType) => {
                  return userPortfolio.onOrderExecute(order, orderType)
                }}
                movieCategories={toJS(movie.genre)}
                maxSell={maxSell}
                stockName={movie.name}
                accountBalance={userStore.accountBalance}
              />
            )}
          </Box>
        </article>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
