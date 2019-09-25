import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import ContentLoader from "react-content-loader"
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"

import styles from "../../../assets/jss/views/landingPageSections/ourPartnersStyle.js"

const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={50}
    width={150}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="150" height="50" />
  </ContentLoader>
)

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Our Partners
        </h2>
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem xs={12} sm={12} md={2}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <MyLoader />
              </GridItem>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <MyLoader />
              </GridItem>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <MyLoader />
              </GridItem>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <MyLoader />
              </GridItem>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <MyLoader />
              </GridItem>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
