import React from "react"
import Link from "next/link"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import HeroImg from "./HeroImg"
import GridContainer from "../Grid/GridContainer.js"
import GridItem from "../Grid/GridItem.js"
import Button from "../CustomButtons/Button.js"

//material
import Typography from "@material-ui/core/Typography"

import styles from "../../assets/jss/views/hero"

const useStyles = makeStyles(styles)

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  const hrefLink = props.loggedIn ? "/portfolio" : "/signup"
  return (
    <div className="hero-container">
      <HeroImg {...rest}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <div style={{ width: "362px" }}>
                <Typography variant="h5">
                  ESX is proud to announce the first offering of
                </Typography>
                <p></p>
                <Typography variant="h3">TERMINATOR: DARK FATE</Typography>
                <Typography variant="h5">
                  Own equity in next summer's biggest blockbuster now!
                </Typography>
              </div>
              {/* <h1>
                TERMINATOR: DARK FATE New Trailer Reunites Sarah Connor and The
                Terminator
              </h1>
              <h4>
                It will feel no pity. No remorse. No pain. No fear. It will have
                only one purpose: to return to the present and prevent the
                future. This weapon will be called...The Terminator.
              </h4> */}
              <br />
              <Button
                component={ButtonLink}
                href={hrefLink}
                color="danger"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginBottom: "114px"}}
            >
                <i className="fas fa-play" />
                Invest in this Film
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </HeroImg>
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
          margin-top: -64px;
        }
      `}</style>
    </div>
  )
}
