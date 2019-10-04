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
import RewardsView from "../views/PortfolioPage/RewardsView"
import ProTraderCTA from "../views/ProfilePage/ProTraderCTA"

@inject("store")
@observer
class Portfolio extends React.Component {
  state = {
    tabIdx: 2
  }

  setTab = (evt, val) => {
    this.setState({ tabIdx: val })
  }

  render() {
    const { store, classes } = this.props
    const { movieStore, userPortfolio } = store
    const { tabIdx } = this.state

    // What functions do we need from the movie and user store?
    const findMovieByTicker = t => { movieStore.getMovieByTicker(t) }
    const addToWatchlist = t => { userPortfolio.addToWatchlist(t, findMovieByTicker) }
    const removeFromWatchlist = t => { userPortfolio.removeFromWatchlist(t) }

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
          rank={userPortfolio.rank}
          rankPercent={userPortfolio.rankPercent}
          benefits={userPortfolio.benefits}
          benefitsMonthly={userPortfolio.benefitsThisMonth}
          topCategories={userPortfolio.topPortfolioCategories}
          watchlist={userPortfolio.userTopWatchlist}
        />
        <TradeView
          tabIdx={tabIdx}
          index={1}
        />
        <RewardsView
          tabIdx={tabIdx}
          index={2}
        />
        <ProTraderCTA />
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio)
