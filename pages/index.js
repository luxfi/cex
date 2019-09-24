import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Header from "../components/layout/header"
import Footer from "../components/generic/Footer"
import Hero from "../components/landing/Hero"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import ProductSection from "../views/LandingPage/Sections/ProductSection.js"
import TeamSection from "../views/LandingPage/Sections/TeamSection.js"
import WorkSection from "../views/LandingPage/Sections/WorkSection.js"

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
      <div className={classes.stickyFooterRoot}>
        <Header />
        <Hero />
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <div className={classes.container}>
            {/* <ProductSection />
            <TeamSection />
            <WorkSection /> */}
          </div>
        </div>
        <div className={classes.stickyFooter}>
          <Footer />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Index)
