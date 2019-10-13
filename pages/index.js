import React from "react"
// @material-ui/core components
import { Container } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Hero from "../components/landing/Hero/Hero"

// styles
import styles from "../pageStyles/landing.style"

// Sections for this page
import { InvestNow } from "../components/app"
import { OurPartners, ESXCommunity, NewestPicks } from "../components/landing"

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
        {/* <div className={`${classes.main}`}>
          <div className={classes.container} */}
        <Container maxWidth="lg"
          style={{
            transform: "translate(0, -15vh)"
          }}
        >
          <NewestPicks />
          { /*<InvestorTopPicksSection />*/}
          <InvestNow loggedIn={loggedIn} />
          <OurPartners />
          <ESXCommunity />
        </Container>
      </>
    )
  }
}

export default withStyles(styles)(Index)
