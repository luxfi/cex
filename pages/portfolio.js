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

  render() {
    const { classes } = this.props
    const { tabIdx } = this.state
    
    return (
      <div className={classes.container}>
        <div style={{ height: "70px" }}></div>
        <PillsTabs tabIdx={tabIdx} handleChange={this.setTab} />
        <PortfolioView tabIdx={tabIdx} index={0} />
        <TradeView tabIdx={tabIdx} index={1} />
        <ProTraderCTA />
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio)
