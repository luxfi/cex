import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, withStyles } from '@material-ui/core'

import { PortfolioSection } from '../../components/portfolio'
import { TabbedNav } from '../../components/app'
import { TradeView } from '../../components/portfolio'

import { googlePageView } from "../../util"

import styles from '../../styles/pages/portfolio.style.js'
import portfolioTabs from '../../settings/portfolioTabs'
import { withOnDemandAuth } from '../../util/HOC'

const isServer = typeof window === "undefined"

@inject("store")
@observer
class Portfolio extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.store.userStore.loadAccountBalance()
    this.props.store.userPortfolio.getInvestments()
    this.props.store.userPortfolio.getWatchlist()
    googlePageView()
  }

  render() {
    const { store, classes } = this.props
    const { movieStore, userPortfolio, newsStore, userStore } = store

    // What functions do we need from the movie and user store?
    const findMovieByTicker = t => movieStore.getMovieByTicker(t)
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
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
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
      </Container>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Portfolio))
