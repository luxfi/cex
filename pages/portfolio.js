import React from "react"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import PillsTabs from "../components/PillsTabs.js"

// import styles from "assets/jss/material-kit-react/views/portfolioPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import PortfolioView from "../views/PortfolioPage/PortfolioView"
import TradeView from "../views/PortfolioPage/TradeView"
import ProTraderCTA from "../views/ProfilePage/ProTraderCTA"

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
    // this.props.store.userPortfolio.getWatchlist() TODO
  }

  render() {
    const { store, classes } = this.props
    const { movieStore, userPortfolio } = store
    const { tabIdx } = this.state

    // What functions do we need from the movie and user store?
    const findMovieByTicker = t => movieStore.getMovieByTicker(t)
    const addToWatchlist = t => { userPortfolio.addToWatchlist(t, findMovieByTicker) }
    const removeFromWatchlist = t => { userPortfolio.removeFromWatchlist(t) }

    const fakeRankPercent = 1 - (userPortfolio.holdings / 137000).toFixed(2)
    const fakeRank = 28749 - Math.floor(fakeRankPercent * 28749)

    return (
      <div className={classes.container}>
        <div style={{ height: "70px" }}></div>
        <PillsTabs tabIdx={tabIdx} handleChange={this.setTab} />
        <PortfolioView
          tabIdx={tabIdx}
          index={0}
          findMovie={findMovieByTicker}
          holdings={userPortfolio.userHoldings}
          weeklyChange={userPortfolio.earningsChangeWeek}
          rank={fakeRank < 1 ? 1 : fakeRank}
          rankPercent={fakeRankPercent < .001 ? 1 : fakeRankPercent * 100}
          benefits={userPortfolio.benefits}
          benefitsMonthly={userPortfolio.benefitsThisMonth}
          topCategories={userPortfolio.topPortfolioCategories}
          watchlist={userPortfolio.userTopWatchlist}
        />
        <TradeView 
          tabIdx={tabIdx}
          index={1}
          investments={userPortfolio.topInvestments}
          findMovieByTicker={findMovieByTicker}
          store={store}
        />
        <ProTraderCTA />
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio)
