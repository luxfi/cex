import React from 'react'
import { isObservableArray, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import classNames from 'classnames'

import {
  Button,
  Typography,
  withStyles,
} from '@material-ui/core'

import { padDollarAmount, slugFromPath } from '../../../util'
import { formatTakeResults } from '../../../util/formatOrderBookDataForChart'

import {
  AuthModal,
  BasicTrader,
  CustomBreadcrumbs,
  InvestNow,
  NextMuiLink,
  Trailers,
} from "../../app"

import AboutMain from './AboutMain'
import PageTabs from './PageTabs'
import AboutMore from './AboutMore'

import styles from './film.style.js'

@withRouter
@withStyles(styles)
@inject('store')
@observer
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'about',
      selectedTrader: 'basic',
    }
    this.onTabSelected = this.onTabSelected.bind(this)
  }

  onTabSelected(tab) {
    if (this.state.selectedTab !== tab) {
      // if going to a new tab, collapse the view as well.
      this.setState({
        selectedTab: tab,
      })
    }
  }

  renderInvestButton(className, movie, text, onClick) {
    return (
      <Button
        component={NextMuiLink}
        style={{
          color: 'black',
          height: '48px',
        }}
        className={className}
        onClick={onClick}
      >
        {text}
      </Button>
    )
  }

  renderUpperRow(classes, selectedTab, movie) {
    return (
      <div
        className={classNames(
          classes.leftAndRight,
          classes.breadcrumbRow,
        )}
      >
        <CustomBreadcrumbs>{movie.name}</CustomBreadcrumbs>
        <PageTabs
          classes={classes}
          selectedTab={selectedTab}
          onTabSelected={this.onTabSelected}
        />
      </div>
    )
  }

  renderAboutMain(classes, movie) {
    const { store: { userPortfolio } } = this.props
    return (
      <Grid container>
        <Grid item xs={12} md={9}>
          <div className={classes.titleAndDescription}>
            <h1
              className={classes.title}
              style={{ textAlign: "left" }}
            >
              {movie.name}
            </h1>
            <p className={classes.description}>
              {movie.shortDescription}
            </p>
          </div>
          <div>
            <Button
              href={"/trade/" + movie.movieSlug}
              rel="noopener noreferrer"
              variant="contained"
              className={classes.movieButton}
            >
              Invest
            </Button>
            {this.renderAddToPlaylistButton(movie)}
            <Link href="/ticketing" as={`/ticketing/${movie.movieSlug}`}>
              <Button
                variant="contained"
                className={classes.movieButton}
              >
                Buy Tickets
              </Button>
            </Link>
          </div>
          <br />
          <br />
          <Grid item xs={12} md={10}>
            <Typography variant="h6">Watch Trailers</Typography>
            <Trailers />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <img src={movie.posterImg} height="444" />
        </Grid>
      </Grid>
    )
  }

  renderTableRow(field, label, movie) {
    // note that Array.isArray() will return false
    const content = isObservableArray(movie[field])
      ? movie[field].join(", ")
      : movie[field]

    return (
      <tr style={{ marginBottom: "12px" }}>
        <td valign="top">{label}</td>
        <td valign="top">{content}</td>
      </tr>
    )
  }

  renderAboutMore(classes, movie) {
    return (
      <>
        <div className={classes.aboutMoreTitleArea}>
          <h1 className={classes.sectionTitle}>About</h1>
          <h2 className={classes.sectionByline}>
            More about the film
                    </h2>
        </div>
        <div className={classes.aboutMoreCopyArea}>
          <div className={classes.aboutMoreStats}>
            <table className={classes.aboutMoreStatsTable}>
              <tbody>
                {this.renderTableRow(
                  "director",
                  "Director",
                  movie
                )}
                {this.renderTableRow(
                  "actors",
                  "Starring",
                  movie
                )}
                {this.renderTableRow(
                  "writer",
                  "Writers",
                  movie
                )}
                {this.renderTableRow("genre", "Genres", movie)}
                {this.renderTableRow("rated", "Rating", movie)}
              </tbody>
            </table>
          </div>
          <div className={classes.aboutMoreText}>
            {
              movie.longDescription
            }
          </div>
        </div>
      </>
    )
  }

  renderInvestMain(
    classes,
    movie,
    chartPrice,
    chartData,
    yDomain,
    updatePrintInterval,
    setActiveChart,
    setMarketOrderType,
    marketOrderType,
    funds,
    printInterval,
    activeChart,
    buyOrders,
    sellOrders,
    orderBook,
    loggedIn,
    onExecute,
    maxSell,
  ) {
    const price = padDollarAmount(chartPrice).split('.')
    const deltaString = formatMonthlyStats(
      chartPrice,
      (chartPrice - movie.price).toFixed(2),
    )
    return (
      <div>
        {!loggedIn
          && this.renderInvestButton(
            classNames(classes.movieButton, classes.statsButton),
            movie,
            'Invest Now',
          )
        }
        {orderBook.connected ? (
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
            ticker={movie.ticker}
            onExecute={onExecute}
            movieCategories={toJS(movie.genre)}
            maxSell={maxSell}
            stockName={movie.name}
          />
        ) : (
            <Typography>Loading chart...</Typography>
        )}
      </div>
    )
  }

  renderInvestMore(classes, movie) {
    return (
      <div className={classes.investMoreOuter}>
        <table className={classes.investMoreTable}>
          <tbody>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
          </tbody>
        </table>
        <table className={classes.investMoreTable}>
          <tbody>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
            <tr>
              <td>OPEN</td>
              <td>631.45</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const { classes, store } = this.props

    // get router slug and find article
    const { router } = this.props
    const slug = router.query.slug || slugFromPath()

    const {
      movieStore,
      orderBook,
      userStore,
      userPortfolio,
      uiStore: { authModalOpen, tabIndexValue },
    } = store
    const movie = movieStore.getMovieBySlug(slug)
    // orderBook stuff
    const takeResultsArray = orderBook.takeResults.slice(0)
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
    const updatePrintInterval = (time) => {
      orderBook.updatePrintInterval(time)
    }
    const setActiveChart = (activeChart) => {
      orderBook.setActiveChart(activeChart)
    }
    const setMarketOrderType = (marketOrder) => {
      orderBook.setMarketOrderType(marketOrder)
    }

    // Load necessary user data
    const maxSell = userPortfolio.getMaxSell(movie.ticker)

    const { selectedTab, selectedTrader } = this.state

    return (
      <>
        {selectedTab === 'about'
          && <article
            className={classNames(classes.container, classes.outermost)}
          >
            {this.renderUpperRow(
              classes,
              selectedTab,
              movie,
            )}
            <AboutMain classes={classes} movie={movie} />
            <AboutMore classes={classes} movie={movie} />
          </article>
        }
        {selectedTab === 'invest' && selectedTrader === 'basic'
          && <article>
            {this.renderInvestMain(
              classes,
              movie,
              orderBook.price,
              chartData,
              yDomain,
              updatePrintInterval,
              setActiveChart,
              setMarketOrderType,
              marketOrderType,
              funds,
              printInterval,
              activeChart,
              buyOrders,
              sellOrders,
              orderBook,
              userStore.token !== null,
              (order, orderType) => userPortfolio.onOrderExecute(
                order,
                orderType,
              ),
              maxSell,
            )}
          </article>
        }
        {selectedTab === 'invest' && selectedTrader === 'pro'
          && <article>
            {this.renderInvestMain(
              classes,
              movie,
              orderBook.price,
              chartData,
              yDomain,
              updatePrintInterval,
              setActiveChart,
              setMarketOrderType,
              marketOrderType,
              funds,
              printInterval,
              activeChart,
              buyOrders,
              sellOrders,
              orderBook,
              userStore.token !== null,
              (order, orderType) => userPortfolio.onOrderExecute(
                order,
                orderType,
              ),
              maxSell,
            )}
          </article>
        }
        <div
          className={classNames(classes.container)}
          style={{ paddingLeft: '0px', paddingRight: '0px' }}
        >
          {!userStore.token ? <InvestNow /> : ''}
        </div>
        <AuthModal authModalOpen={authModalOpen} tabIndexValue={tabIndexValue} />
      </>
    )
  }
}

const ExternalLink = React.forwardRef(
  ({
    className, href, hrefAs, children,
  }, ref) => (
    <a
      className={className}
      ref={ref}
      href={href || ''}
      as={hrefAs}
      target='_blank'
    >
      {children}
    </a>
  ),
)

const formatMonthlyStats = (price, valueDelta) => (
  `${(valueDelta > 0 ? '+ ' : '- ')
    + Math.abs(valueDelta)
  } (${
    ((valueDelta / price) * 100).toFixed(2)
  }%) `
)