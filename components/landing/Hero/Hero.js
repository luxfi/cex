import React, { useEffect } from "react"
import NextLink from "next/link"
import { inject, observer } from 'mobx-react'
import { Carousel } from 'react-responsive-carousel'

// @material-ui/core components
import {
  Container,
  Grid,
  useMediaQuery,
  Button,
  Box,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

// core components
import { TrailerModal, HeroImg } from ".."

import styles from "./Hero.style"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import terminatorHero from "../../../assets/images/terminator-hero.jpg"
import uncutGemsHero from "../../../assets/images/uncut-gems-hero.jpg"
import birdsOfPreyHero from "../../../assets/images/birds-of-prey-hero.jpg"
import onwardHero from "../../../assets/images/onward-hero.jpg"
import TerminatorLogo from "../../../assets/images/terminator-logo.svg"
import birdsOfPreyLogo from "../../../assets/images/birds-of-prey-logo.png"

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)

const movieExtendedMap = {
  'terminator-dark-fate': {
    // logo: <img className="logo" src={terminatorLogo} />,
    logo: <TerminatorLogo />,
    img: <img src={terminatorHero} style={{ marginLeft: "40vw" }} />,
  },
  'uncut-gems': {
    logo: <h1 className="logo">Uncut Gems</h1>,
    img: <img src={uncutGemsHero} style={{ marginLeft: "40vw" }} />,
  },
  'birds-of-prey': {
    logo: <img className="logo" src={birdsOfPreyLogo} />,
    img: <img src={birdsOfPreyHero} style={{ marginLeft: "40vw" }} />,
  },
  'onward': {
    logo: <h1 className="logo">Onward</h1>,
    img: <img src={onwardHero} style={{ marginLeft: "40vw" }} />,
  }
}

const MyCarousel = ({ children }) => {
  // collapse arrows on mobile
  const mobile = useMediaQuery('(max-width:600px)')
  React.useEffect(() => {
    const buttons = document.getElementsByClassName('control-arrow')
    // move zIndex down if on mobile to allow fo swipeable drawer component
    const index = mobile ? "100" : "1000"
    Array.from(buttons).forEach(button => button.style.zIndex = index)
  }, [mobile])
  return (
    <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} useKeyboardArrows>
      {children}
    </Carousel>
  )
}

const useStyles = makeStyles((theme) => {
  return {
    ...styles(theme)
  }
})

export default inject("store")(observer((props) => {
  useEffect(() => {
    const buttons = document.getElementsByClassName('control-arrow')
    Array.from(buttons).forEach(button => button.style.zIndex = "1000")
  }, [])

  const classes = useStyles()

  const { store, maxHeight, minHeight, ...rest } = props

  return (
    <div {...rest}>
      <div className={classes.container}>
        <MyCarousel>
          {store.movieStore.movies.map((movie, i) => {
            const hrefLink = '/film/' + movie.movieSlug
            return (
              <HeroImg key={i} img={movieExtendedMap[movie.movieSlug].img} maxHeight={maxHeight} minHeight={minHeight}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems='flex-end'
                  className={classes.gridContainer}
                >
                  <Grid justify="flex-start" container item xs={12} sm={6} md={6} style={{ textAlign: 'left' }} >
                    <Grid item xs>
                      <Box lineHeight={1} letterSpacing={2}>
                        <Typography className="esx-initial-offering" variant="h5">
                          <Box fontWeight='bold' fontSize={24}>
                            ESX
                        </Box>
                          <Box fontWeight={100} fontSize={20}>
                            INITIAL OFFERING
                        </Box>
                        </Typography>
                        <br />
                        {movieExtendedMap[movie.movieSlug].logo}
                        <br />
                        <br />
                        <Typography variant="body2">
                          {movie.shortDescription}
                        </Typography>
                        <br />
                      </Box>
                    </Grid>
                    <br />
                    <Grid container item spacing={2} justify="flex-start" className={classes.buttonGridContainer}>
                      <Grid item>
                        <TrailerModal movie={movie} buttonClass={classes.watchTrailerButton} />
                      </Grid>
                      <Grid item>
                        <Button
                          className={classes.investButton}
                          size="large"
                          startIcon={<MonetizationOnIcon />}
                        >
                          <NextLink href={hrefLink}>
                            <Typography variant="body2" className={classes.watchTrailerButtonText}>
                              INVEST IN {movie.name}
                            </Typography>
                          </NextLink>
                        </Button>
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />
                  </Grid>
                </Grid>
              </HeroImg>
            )
          })}
        </MyCarousel>
      </div>
    </div>
  )
}))
