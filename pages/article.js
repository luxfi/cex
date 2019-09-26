import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Breadcrumbs from "../components/Breadcrumbs.js"
import Button from "../components/CustomButtons/Button"
import ContentLoader from "react-content-loader"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

const MyLoader = () => (
  <ContentLoader
    height={800}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="400" height="800" />
  </ContentLoader>
)

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
            <article>
              <div className={classes.flex}>
                <h1 className={classes.title} style={{ textAlign: "left" }}>
                  Filming The Lone Wolf Dies
                </h1>
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
              <p className={classes.description}>
                Deep in the human unconscious is a pervasive need for a logical
                universe that makes sense. But the real universe is always one
                step beyond logic. Deep in the human unconscious is a pervasive
                need
              </p>
              <div className={classes.mainImage}>
                <MyLoader />
              </div>
            </article>
            <InvestNowSection />
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Index)
