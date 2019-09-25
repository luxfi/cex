import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"
import OurPartnersSection from "../views/LandingPage/Sections/OurPartnersSection"
import ESXCommunitySection from "../views/LandingPage/Sections/ESXCommunitySection"

@inject("store")
@observer
class Index extends React.Component {
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
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <div className={classes.container}>
            <InvestorTopPicksSection />
            <InvestNowSection />
            <OurPartnersSection />
            <ESXCommunitySection />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Index)
