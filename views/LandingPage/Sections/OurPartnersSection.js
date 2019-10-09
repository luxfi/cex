import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { Grid } from '@material-ui/core'

// @material-ui/icons

// core components
import ContentLoader from "react-content-loader"
// import GridContainer from "../../../components/Grid/GridContainer.js"
// import GridItem from "../../../components/Grid/GridItem.js"
// import Card from "../../../components/Card/Card.js"
// import CardBody from "../../../components/Card/CardBody.js"

// styles
import { makeStyles } from "@material-ui/core/styles"
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

const partners = [
  "https://upload.wikimedia.org/wikipedia/en/4/4d/Paramount_Pictures_2010.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/65/TWDC_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/65/Lionsgate_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/64/Warner_Bros_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
]

export default props => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Our Partners
        </h2>
        <Grid container style={{ justifyContent: "center", paddingTop: "36px" }}>
          {partners.map((imgSrc, i) => (
            <Grid item
              xs={12}
              sm={12}
              md={2}
              key={i}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item
                xs={12}
                sm={12}
                md={12}
                className={classes.itemGrid}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  style={{ width: "75%", maxHeight: "64px" }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
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
