import React from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core'

import { loginRequired } from '../../util'
import { TabbedNav } from '../../components/app'
import { PortfolioSection, TradeView } from '../../components/portfolio'

import styles from '../../styles/pages/portfolio.style.js'
import portfolioTabs from '../../settings/portfolioTabs'

@loginRequired
@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {

  componentDidMount () {
    this.props.store.userStore.loadAccountBalance()
    this.props.store.userPortfolio.getInvestments()
    this.props.store.userPortfolio.getWatchlist()
  }

  render() {
    const { store, classes } = this.props
    const { movieStore, userPortfolio, newsStore, userStore } = store

    // What functions do we need from the movie and user store?
    const findMovieByTicker = t => movieStore.getStockByTicker(t)
    const addToWatchlist = t => { userPortfolio.addToWatchlist(t, findMovieByTicker) }
    const removeFromWatchlist = t => { userPortfolio.removeFromWatchlist(t) }

    let fakeRankPercent = 1 - (userPortfolio.holdings / 137000).toFixed(2)
    let fakeRank = 28749 - Math.floor(fakeRankPercent * 28749)
    fakeRankPercent = fakeRankPercent < .001 ? 1 : fakeRankPercent * 100
    fakeRank = fakeRank < 1 ? 1 : fakeRank
    if (userPortfolio.holdings === 0) {
      fakeRank = 0
      fakeRankPercent = 100
    }

    return (
      <div className={classes.outerContainer}>
        <PortfolioSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='' />
        </PortfolioSection>
        <TradeView
          investments={userPortfolio.topInvestments}
          findMovieByTicker={findMovieByTicker}
          store={store}
          findMovie={findMovieByTicker}
          holdings={userPortfolio.userHoldings}
          weeklyChange={userPortfolio.earningsChangeWeek}
          rank={fakeRank}
          rankPercent={fakeRankPercent}
          benefits={userPortfolio.benefits}
          benefitsMonthly={userPortfolio.benefitsThisMonth}
          topChips={userPortfolio.topChips}
          topCategories={userPortfolio.topPortfolioCategories}
          watchlist={userPortfolio.userTopWatchlist}
          removeFromWatchlist={removeFromWatchlist}
          accountBalance={userStore.accountBalance}
        />
      </div>
    )
  }
}
