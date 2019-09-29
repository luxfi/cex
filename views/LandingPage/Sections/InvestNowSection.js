import React from "react"
import Link from "next/link"
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

// import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"
import styles from "../../../assets/jss/views/landingPageSections/investNowStyle.js"

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

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

export default props => {
  const classes = useStyles()
  const { loggedIn, ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)
  const hrefLink = loggedIn ? "/portfolio" : "/signup"

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title}>
          Invest more than screen time in your favorite films.
        </h2>
        <Button component={ButtonLink} href={hrefLink}>
          Invest Now
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
          What is ESX?
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
