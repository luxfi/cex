import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Breadcrumbs from "../components/Breadcrumbs.js"
import Button from "../components/CustomButtons/Button"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

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
        <div style={{ height: "140px" }}></div>
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <div className={classes.container}>
            <Breadcrumbs />
            <div className={classes.section}>
              <h2 className={classes.title} style={{ textAlign: "left" }}>
                Filming The Lone Wolf Dies
              </h2>
              <div className={classes.grow} />
              <Button
                color="outlined"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "black",
                  marginLeft: "20px",
                  height: "48px"
                }}
                className={classes.investButton}
              >
                Invest Now
              </Button>
            </div>
            <InvestNowSection />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Index)
