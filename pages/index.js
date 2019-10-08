import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Hero from "../components/landing/Hero"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import NewestPicksSection from "../views/LandingPage/Sections/NewestPicksSection"
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

  componentDidMount() {
    this.props.store.userPortfolio.getWatchlist()
  }

  // componentWillUnmount() {
  //   this.props.store.orderBook.terminateDataGenerator()
  // }

  render() {
    // const { movieStore } = this.props.store
    const { classes, store } = this.props
    const loggedIn = store.userStore.loggedIn
    return (
      <>
        <Hero loggedIn={loggedIn} />
        <div className={`${classes.main}`}>
          <div className={classes.container}>
            <NewestPicksSection />
            { /*<InvestorTopPicksSection />*/ }
            <InvestNowSection loggedIn={loggedIn} />
            <OurPartnersSection />
            <ESXCommunitySection />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Index)
