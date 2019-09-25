import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Button from "../../../components/CustomButtons/Button.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import CardFooter from "../../../components/Card/CardFooter.js"
import ContentLoader, { Facebook } from "react-content-loader"

import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"

import team1 from "../../../assets/img/faces/avatar.jpg"
import team2 from "../../../assets/img/faces/christian.jpg"
import team3 from "../../../assets/img/faces/kendall.jpg"

const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={217}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="388" height="217" />
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
          Investor Top Picks
        </h2>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Deep in the human unconscious is a pervasive need for a
                  logical universe that makes sense. But the real universe is
                  always one step beyond logic.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Deep in the human unconscious is a pervasive need for a
                  logical universe that makes sense. But the real universe is
                  always one step beyond logic.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <MyLoader />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Call of the Wild: A Space Odyssey
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Deep in the human unconscious is a pervasive need for a
                  logical universe that makes sense. But the real universe is
                  always one step beyond logic.
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
