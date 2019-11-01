import React from "react"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import { PillsTabs } from "../components/portfolio"

// import styles from "assets/jss/material-kit-react/views/portfolioPage.js"
import styles from "../pageStyles/portfolio.style"

// Sections for this page
import PortfolioView from "../components/portfolio/PortfolioView/PortfolioView"
import TradeView from "../components/portfolio/TradeView/TradeView"
import RewardsView from "../components/portfolio/RewardsView/RewardsView"
import NewsFeedView from "../components/portfolio/NewsFeedView"
import ProTraderCTA from "../components/portfolio/ProTraderCTA/ProTraderCTA"
import { googlePageView } from "../components/utils/generic.js"

@inject("store")
@observer
class Portfolio extends React.Component {
  state = {
    tabIdx: 0
  }

  setTab = (evt, val) => {
    this.setState({ tabIdx: val })
  }

  componentDidMount () {
    this.props.store.userPortfolio.getInvestments()
    this.props.store.userPortfolio.getWatchlist()
    googlePageView()
  }

  render() {
    const { store, classes } = this.props
    const { movieStore, userPortfolio } = store
    const { tabIdx } = this.state

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
      <div className={classes.container}>
        <div style={{ height: "30px" }}></div>
        <PillsTabs tabIdx={tabIdx} handleChange={this.setTab} />
        <PortfolioView
          tabIdx={tabIdx}
          index={0}
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
        />
        <TradeView
          tabIdx={tabIdx}
          index={1}
          investments={userPortfolio.topInvestments}
          findMovieByTicker={findMovieByTicker}
          store={store}
        />
        <RewardsView tabIdx={tabIdx} index={2} />
        <NewsFeedView tabIdx={tabIdx} index={3} />
        <ProTraderCTA />
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio)
