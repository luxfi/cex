import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'

import { inject, observer } from "mobx-react"

// core components

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import PortfolioCta from "../views/ProfilePage/PortfolioCta"

@inject("store")
@observer
class Portfolio extends React.Component {
  // static async getInitialProps({ mobxStore }) {
  //   await mobxStore.movieStore.fetch()
  //   return {
  //     movieStore: mobxStore.movieStore,
  //     orderBook: mobxStore.orderBook
  //   }
  // }

  // componentDidMount() {
  //   console.log("index props componentDidMount", this.props.store.orderBook)
  //   this.props.store.orderBook.initiateDataGenerator()
  // }

  // componentWillUnmount() {
  //   this.props.store.orderBook.terminateDataGenerator()
  // }

  render() {
    // const { movieStore } = this.props.store
    const { classes } = this.props
    return (
      <>
        <div style={{ height: "140px" }}></div>
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Portfolio" {...a11yProps(0)} />
              <Tab label="Trade" {...a11yProps(1)} />
              <Tab label="Benefits" {...a11yProps(2)} />
              <Tab label="Newsfeed" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Portfolio
          </TabPanel>
          <TabPanel value={value} index={1}>
            Trade
          </TabPanel>
          <TabPanel value={value} index={2}>
            Benefits
          </TabPanel>
          <TabPanel value={value} index={3}>
            Newsfeed
          </TabPanel>
          <div className={classes.container}>
            <InvestorTopPicksSection />
            <PortfolioCta/>
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Portfolio)
