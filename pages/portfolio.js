import React from "react"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import PillsTabs from "../components/PillsTabs.js"

// import styles from "assets/jss/material-kit-react/views/portfolioPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import ProTraderCTA from "../views/ProfilePage/ProTraderCTA"

@inject("store")
@observer
class Portfolio extends React.Component {\
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div style={{ height: "70px" }}></div>
        <PillsTabs />
        <InvestorTopPicksSection />
        <ProTraderCTA />
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio)
