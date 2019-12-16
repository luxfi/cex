// @material-ui/core components
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { inject, observer } from 'mobx-react'
import NextLink from 'next/link'
import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import BirdsOfPreyHero from '../../../assets/images/birds-of-prey-hero.jpg'
import BirdsOfPreyLogo from '../../../assets/images/birds-of-prey-logo.png'
import OnwardHero from '../../../assets/images/onward-hero.jpg'
import TerminatorHero from '../../../assets/images/terminator-hero.jpg'
import TerminatorLogo from '../../../assets/images/terminator-logo.svg'
import UncutGemsHero from '../../../assets/images/uncut-gems-hero.jpg'

import styles from './Hero.style'

// core components
import { HeroImg, TrailerModal } from '..'

const movieExtendedMap = {
  'terminator-dark-fate': {
    // logo: <img className='logo' src={terminatorLogo} />,
    logo: <TerminatorLogo />,
    img: <img src={TerminatorHero} alt='Terminator: Dark Fate' style={{ marginLeft: '40vw' }} />,
  },
  'uncut-gems': {
    logo: <h1 className='logo'>Uncut Gems</h1>,
    img: <img src={UncutGemsHero} alt='Uncut Gems' style={{ marginLeft: '40vw' }} />,
  },
  'birds-of-prey': {
    logo: <img className='logo' alt='Birds Of Prey' src={BirdsOfPreyLogo} />,
    img: <img src={BirdsOfPreyHero} alt='Birds Of Prey' style={{ marginLeft: '40vw' }} />,
  },
  onward: {
    logo: <h1 className='logo'>Onward</h1>,
    img: <img src={OnwardHero} alt='Onward' style={{ marginLeft: '40vw' }} />,
  },
}

const MyCarousel = ({ children }) => {
  // collapse arrows on mobile
  const mobile = useMediaQuery('(max-width:600px)')
  React.useEffect(() => {
    const buttons = document.getElementsByClassName('control-arrow')
    // move zIndex down if on mobile to allow fo swipeable drawer component
    const index = mobile ? '100' : '1000'
    Array.from(buttons).forEach((button) => { button.style.zIndex = index })
  }, [mobile])

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
    >
      {children}
    </Carousel>
  )
}

const useStyles = makeStyles((theme) => ({
  ...styles(theme),
}))

export default inject('store')(observer((props) => {
  useEffect(() => {
    const buttons = document.getElementsByClassName('control-arrow')
    Array.from(buttons).forEach((button) => { button.style.zIndex = '1000' })
  }, [])

  const classes = useStyles()

  const {
    store,
    maxHeight,
    minHeight,
    ...rest
  } = props

  return (
    <div {...rest}>
      <div className={classes.container}>
        <MyCarousel>
          {store.movieStore.movies.filter((m) => movieExtendedMap[m.movieSlug]).map((movie) => {
            const hrefLink = `/film/${movie.movieSlug}`
            return (
              <HeroImg
                key={movie.movieSlug}
                img={movieExtendedMap[movie.movieSlug].img}
                maxHeight={maxHeight}
                minHeight={minHeight}
              >
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='flex-end'
                  className={classes.gridContainer}
                >
                  <Grid justify='flex-start' container item xs={12} sm={6} md={6} style={{ textAlign: 'left' }} >
                    <Grid item xs>
                      <Box lineHeight={1} letterSpacing={2}>
                        <Typography className='esx-initial-offering' variant='h5'>
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
                        <Typography variant='body2'>
                          {movie.shortDescription}
                        </Typography>
                        <br />
                      </Box>
                    </Grid>
                    <br />
                    <Grid container item spacing={2} justify='flex-start' className={classes.buttonGridContainer}>
                      <Grid item>
                        <TrailerModal
                          movie={movie}
                          buttonClass={classes.watchTrailerButton}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          className={classes.investButton}
                          size='large'
                          startIcon={<MonetizationOnIcon />}
                        >
                          <NextLink href={hrefLink}>
                            <Typography variant='body2' className={classes.watchTrailerButtonText}>
                              INVEST IN {movie.name}
                            </Typography>
                          </NextLink>
                        </Button>
                      </Grid>
                    </Grid>
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
