import React from "react"
import Link from "next/link"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { inject, observer } from 'mobx-react'
import { Carousel } from 'react-responsive-carousel'

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

// @material-ui/icons
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

// core components
import HeroImg from "../HeroImg/HeroImg"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import { TrailerModal } from ".."


//material
import Typography from "@material-ui/core/Typography"

import styles from "./Hero.style"

import terminatorHero from "../../../assets/images/terminator-hero.jpg"
import uncutGemsHero from "../../../assets/images/uncut-gems-hero.jpg"
import birdsOfPreyHero from "../../../assets/images/birds-of-prey-hero.jpg"
import onwardHero from "../../../assets/images/onward-hero.jpg"
import terminatorLogo from "../../../assets/images/terminator-logo.svg"
import birdsOfPreyLogo from "../../../assets/images/birds-of-prey-logo.png"

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

const movieExtendedMap = {
  'terminator-dark-fate': {
    logo: <img className="logo" src={terminatorLogo} />,
    img: <img src={terminatorHero} style={{ height: "120vh", marginTop: "10vh", marginLeft: "40vw" }} />,
  },
  'uncut-gems': {
    logo: <h1 className="logo">Uncut Gems</h1>,
    img: <img src={uncutGemsHero} />,
  },
  'birds-of-prey': {
    logo: <img className="logo" src={birdsOfPreyLogo} />,
    img: <img src={birdsOfPreyHero} style={{ height: "135vh" }} />,
  },
  'onward': {
    logo: <h1 className="logo">Onward</h1>,
    img: <img src={onwardHero} />,
  }
}

@inject("store")
@observer
class Hero extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, ...rest } = this.props
    const hrefLink = '/film/terminator-dark-fate'
    return (
      <>
        <div className="hero-container">
          <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
            {this.props.store.movieStore.movies.map((movie) => {
              return <HeroImg {...rest} img={movieExtendedMap[movie.movieSlug].img}>
                <div className={classes.container}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
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
                        { /*<Typography variant="body2">
                          Own equity in next summer's biggest blockbuster now!
                        </Typography>*/ }
                      </Box>
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
                      {/* <Button
                        className="watch-trailer-button button"
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                      >
                        <a href={ movie.trailer }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography variant="body2">
                            <i className="fas fa-play" />
                            Play Trailer
                          </Typography>
                        </a>
                      </Button> */}
                      <TrailerModal movie={movie} />
                      <Button
                        className="invest-button button"
                        size="large"
                        startIcon={<MonetizationOnIcon />}
                      >
                        <Link href={hrefLink}>
                          <Typography variant="body2">
                            <i className="fas fa-play" />
                            INVEST IN {movie.ticker}
                          </Typography>
                        </Link>
                      </Button>
                      <br />
                      <br />
                      <Typography variant="caption">
                        {movie.financialDescription}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6}>
                    </Grid> */}
                  </Grid>
                </div>
              </HeroImg>
            })}
          </Carousel>
        </div>
        <style jsx>{`
          .hero-container {
            position: relative;
            overflow: hidden;
            margin-top: -64px;
          }

          .hero-container :global(.logo) {
            width: 100%;
            margin: 0;
            font-size: 64px;
          }

          .esx-logo {
            height: 2rem;
            position: relative;
            top: 1px;
          }

          .hero-container :global(p) {
            color: #FFF !important;
          }

          .hero-container :global(.watch-trailer-button) {
            color: #FFF !important;
            border: 1px solid #FFF;
            padding: 11px 24px;
          }

          .hero-container :global(.invest-button p) {
            color: #000 !important;
          }

          .hero-container :global(.invest-button) {
            color: #000 !important;
            background-color: #FBC43E;
            margin-left: 16px;
            padding: 12px 24px;
          }

          .hero-container :global(.control-dots) {
            bottom: 15vh;
          }

          @media (max-width: 768px) {
            .hero-container :global(.button) {
              margin: 0 0;
              width: 100%;
            }

            .hero-container :global(.watch-trailer-button) {
              margin: 0 0 16px;
            }
          }

          a {
            color: #FFF;
            text-decoration: none;
          }
        `}</style>
      </>
    )
  }
}

export default withStyles(styles)(Hero)
