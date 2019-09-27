import React from "react"
import PropTypes from "prop-types"
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Chip from "@material-ui/core/Chip"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import { inject, observer } from "mobx-react"

// core components

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import PortfolioCta from "../views/ProfilePage/PortfolioCta"
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
    // const { movieStore } = this.props.store
    // TODO: The Tabs and TabPanel tags usually have value={value} functional notes, 
    // but I have removed those to get structure working.
    // Tabs also has an onChange propery.
    /*
     <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    */
    const { classes } = this.props
    return (
      <>
        <div style={{ height: "140px" }}></div>
        <Tabs aria-label="simple tabs example" value={this.state.tabIndex} onChange={this.handleChange}>
          <Tab label="Portfolio" component={'div'} />
          <Tab label="Trade" />
          <Tab label="Benefits" />
          <Tab label="Newsfeed" />
        </Tabs>
        <TabPanel index={0}>
          Portfolio
        </TabPanel>
        <TabPanel index={1}>
          Trade
        </TabPanel>
        <TabPanel index={2}>
          Benefits
        </TabPanel>
        <TabPanel index={3}>
          Newsfeed
        </TabPanel>
        <InvestorTopPicksSection />
        <PortfolioCta/>
      </>
    )
  }
}

export default withStyles(styles)(Portfolio)
