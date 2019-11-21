import React from "react"
import NextLink from "next/link"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { inject, observer } from 'mobx-react'
import { Carousel } from 'react-responsive-carousel'

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import { Grid, useMediaQuery } from "@material-ui/core"

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


@inject("store")
@observer
class Hero extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const buttons = document.getElementsByClassName('control-arrow')
    Array.from(buttons).forEach(button => button.style.zIndex = "1000")
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <>
        <div className="hero-container">
          <MyCarousel>
            {this.props.store.movieStore.movies.map((movie, i) => {
              const hrefLink = '/film/' + movie.movieSlug
              console.log('hrefLink', hrefLink)
              return <HeroImg key={i} {...rest} img={movieExtendedMap[movie.movieSlug].img}>
                <div className={classes.container}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                  >
                    <Grid justify="flex-start" container item spacing={1} item xs={10} md={6} style={{ textAlign: 'left' }} >
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
                      <Grid container item spacing={2} justify="flex-start">
                        <Grid item >
                          <TrailerModal movie={movie} buttonClass={classes.watchTrailerButton} />
                        </Grid>
                        <Grid item >
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
                </div>
              </HeroImg>
            })}
          </MyCarousel>
        </div>
        <style jsx>{`
          .hero-container {
            position: relative;
            overflow: hidden;
            margin-top: -233px // -64px + -169px from slider
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
            color: #FFF;
          }

          .hero-container :global(.control-dots) {
            bottom: 15vh;
            display: none:
          }

          // @media (max-width: 768px) {
          //   .hero-container :global(.button) {
          //     margin: 0 0;
          //     width: 100%;
          //   }

          //   .hero-container :global(.watch-trailer-button) {
          //     margin: 0 0 16px;
          //   }
          // }

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
