import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import ContentLoader, { Facebook } from "react-content-loader"

import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"

const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={70}
    width={70}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <circle cx="30" cy="30" r="30" />
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
          ESX Community Backed Films in the News
        </h2>
        <GridContainer
          style={{
            marginLeft: "-7px",
            marginRight: -"7px"
          }}
        >
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={2} sm={2} md={2}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  The following article covers a topic that has recently moved
                  to center stage-at least it seems that way. If you've been
                  thinking you need to know more about unconditional love,
                  here's your opportunity.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={2} sm={2} md={2}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  The following article covers a topic that has recently moved
                  to center stage-at least it seems that way. If you've been
                  thinking you need to know more about unconditional love,
                  here's your opportunity.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={2} sm={2} md={2}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  The following article covers a topic that has recently moved
                  to center stage-at least it seems that way. If you've been
                  thinking you need to know more about unconditional love,
                  here's your opportunity.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={2} sm={2} md={2}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  The following article covers a topic that has recently moved
                  to center stage-at least it seems that way. If you've been
                  thinking you need to know more about unconditional love,
                  here's your opportunity.
                </p>
              </CardBody>
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
