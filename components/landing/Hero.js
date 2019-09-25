import React from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import HeroImg from "./HeroImg"
import GridContainer from "../Grid/GridContainer.js"
import GridItem from "../Grid/GridItem.js"
import Button from "../CustomButtons/Button.js"

import styles from "../../assets/jss/views/hero"

const useStyles = makeStyles(styles)

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  return (
    <div className="hero-container">
      <HeroImg {...rest}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Terminator: Dark Fate Announcement goes here
              </h1>
              <h4>
                It will feel no pity. No remorse. No pain. No fear. It will have
                only one purpose: to return to the present and prevent the
                future. This weapon will be called...The Terminator.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
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
