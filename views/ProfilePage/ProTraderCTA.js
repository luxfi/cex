import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import Button from "../../components/CustomButtons/Button.js"
import ContentLoader from "react-content-loader"

// import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"
import styles from "../../assets/jss/views/portfolioPageSections/proTraderCTAStyle.js"

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

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title}>Become a Pro Trader.</h2>
        <span>
          Pro Traders make a lot more money and know a lot more things than non
          pro traders.
        </span>
        <Button
          style={{
            marginLeft: "20px"
          }}
        >
          Remind Later
        </Button>
        <Button
          color="outlined"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "black",
            marginLeft: "20px"
          }}
        >
          Join Now
        </Button>
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
