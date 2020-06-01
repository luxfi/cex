import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { withRouter } from 'next/router'

import { formatTakeResults } from '../../../util/formatOrderBookDataForChart'
import { slugFromPath } from '../../../util'

import { ProTrader } from '../../app'

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
    const {
      movieStore,
      orderBook,
      userPortfolio,
      userStore,
    } = store
    const movie = movieStore.getStockBySlug(slug)
    // orderBook.initiateDataGenerator(movie.ticker, movie.price)
    userStore.loadAccountBalance()
    userPortfolio.getInvestments()
    orderBook.connect(movie.ticker)
    orderBook.fetchStockData(movie.ticker)
  }

  componentWillUnmount() {
    const {
      store: {
        orderBook,
      },
    } = this.props
    // Disconnect socket
    orderBook.disconnect()
  }

  onModeSelected(tab) {
    const { selectedMode } = this.state
    if (selectedMode !== tab) {
      // if going to a new tab, collapse the view as well.
      localStorage.setItem('tradeMode', tab)
      this.setState({
        selectedMode: tab || 'pro',
      })
    }
  }

  render() {
    // get router slug and find article
    const { router, store } = this.props
    const slug = router.query.slug || slugFromPath()
    const {
      movieStore,
      orderBook,
      uiStore,
      userStore,
      userPortfolio,
    } = store
    const movie = movieStore.getStockBySlug(slug)
    // orderBook stuff
    const takeResultsArray = orderBook.takeResults.slice(0)
    const {
      printInterval,
      buyOrders,
      sellOrders,
      activeChart,
      marketOrderType,
    } = orderBook
    const chartData = formatTakeResults(takeResultsArray, printInterval)
    const yDomain = [orderBook.low * 0.94, orderBook.high * 1.06]
    const updatePrintInterval = (time) => {
      orderBook.updatePrintInterval(time)
    }
    const setActiveChart = (activeChart) => {
      orderBook.setActiveChart(activeChart)
    }
    const setMarketOrderType = (marketOrder) => {
      orderBook.setMarketOrderType(marketOrder)
    }

    const createOrder = (order) => {
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

    return (
      <ProTrader
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
        createOrder={createOrder}
        onExecute={(order, orderType) => (
          userPortfolio.onOrderExecute(order, orderType)
        )}
        setTrading={(mode) => {
          uiStore.setTrading(mode)
        }}
        slug={slug}
        movies={movieStore.movies}
        orders={userPortfolio
          .orders
          .filter((o) => o.ticker === movie.ticker)
          .slice(0)
          .reverse(() => {})
        }
        movieCategories={toJS(movie.genre)}
        maxSell={maxSell}
        stockName={movie.name}
        accountBalance={userStore.accountBalance}
      />
    )
  }
}
