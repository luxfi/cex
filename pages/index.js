import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Hero from "../components/landing/LandingPageHero"

// styles
import styles from "../pageStyles/landingPageStyle"

// Sections for this page
import { InvestNowSection } from "../components/app"
import { OurPartnersSection, ESXCommunitySection, NewestPicksSection } from "../components/landing"

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
