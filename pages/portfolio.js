import React from "react"
import Link from "next/link"

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Container from "@material-ui/core/Container"

import { inject, observer } from "mobx-react"

// core components
import PillsTabs from "../components/PillsTabs.js"

// import styles from "assets/jss/material-kit-react/views/portfolioPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import ProTraderCTA from "../views/ProfilePage/ProTraderCTA"
import TabPanel from "../views/ProfilePage/TabPanel"

@inject("store")
@observer
class Portfolio extends React.Component {
  state = {
    tabIndex: 0
  }

  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue })
  }

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
