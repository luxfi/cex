import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { withRouter } from 'next/router'

import { BasicTrader } from '../../app'
import { slugFromPath } from '../../../util'

import { formatTakeResults } from '../../../util/formatOrderBookDataForChart'

@withRouter
@inject('store')
@observer
export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedMode: localStorage.getItem('tradeMode') || 'basic',
    }
  }

  componentDidMount() {
    // Need to pass the order book the data to render
    const { router, store } = this.props
    const slug = router.query.slug || slugFromPath()
    const { userStore, movieStore, orderBook, userPortfolio } = store
    const movie = movieStore.getMovieBySlug(slug)
    // orderBook.initiateDataGenerator(movie.ticker, movie.price)
    userStore.loadAccountBalance()
    userPortfolio.getInvestments()
    orderBook.connect(movie.ticker)
    orderBook.fetchStockData(movie.ticker)
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

    const { router, store } = this.props

    const slug = router.query.slug || slugFromPath()
    const { movieStore, orderBook, userStore, userPortfolio, uiStore } = store
    const { loggedIn } = userStore

    // TODO, use the decorator
    const redirectLogin = () => {
      if (!loggedIn) {
        return router.push('/login')
      }
    }
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
          if (side === 'bid') {
            userStore.removeBalance(val)
          } 
          else {
            userStore.addBalance(val)
          }
        }
        userPortfolio.onOrderExecute(order, ticker, orderType, updateBalance)
      })
    }

    // Load necessary user data
    const maxSell = userPortfolio.getMaxSell(movie.ticker)
    const investmentHistory = userPortfolio.getInvestmentHistory(movie.ticker)

    const addToWatchlist = t => {
      redirectLogin()
      userPortfolio.addToWatchlist(t)
    }

    const removeFromWatchlist = t => {
      redirectLogin()
      userPortfolio.removeFromWatchlist(t)
    }

    return (
      <BasicTrader
        chartData={chartData}
        yDomain={yDomain}
        updatePrintInterval={updatePrintInterval}
        setActiveChart={setActiveChart}
        setMarketOrderType={setMarketOrderType}
        marketOrderType={marketOrderType}
        printInterval={printInterval}
        activeChart={activeChart}
        buyOrders={buyOrders}
        sellOrders={sellOrders}
        orderBook={orderBook}
        book={orderBook.book}
        ticker={movie.ticker}
        movieSlug={movie.movieSlug}
        createOrder={createOrder}
        onExecute={(order, orderType) => (userPortfolio.onOrderExecute(order, orderType))}
        setTrading={(mode) => { uiStore.setTrading(mode) }}
        slug={slug}
        movieCategories={toJS(movie.genre)}
        maxSell={maxSell}
        investmentHistory={investmentHistory}
        stockName={movie.name}
        accountBalance={userStore.accountBalance}
        userStore={userStore}
        watchlist={userPortfolio.watchlist}
        removeFromWatchlist={removeFromWatchlist}
        addToWatchlist={addToWatchlist}
        movies={movieStore.movies}
        redirectLogin={redirectLogin}
      />
    )
  }
}
