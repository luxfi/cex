import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import { 
  makeStyles, 
  withWidth,
  isWidthDown, 
} from "@material-ui/core"

import { Hero, MovieSlider } from '../components/app'
import TerminatorHero from '../assets/images/terminator-hero.jpg'
import TerminatorLogo from '../assets/svg/terminator-logo.svg'

import {
  CategorySlider,
  StudioSlider,
  HeroElements
} from '../components/landing'

import { googlePageView } from '../util'

// Test moving terminator-dark-fate.js to here
const heroInfo = {
  slug: 'terminator-dark-fate',
  img: TerminatorHero,
    // this is here because it's potentially specific to each image
  styles: {
    backgroundPosition: 'right -500px center',
    backgroundColor: 'black'
  },
  logo: (<TerminatorLogo style={{
    fill: "#F0f0f0",
    width: "100%",
    height: "auto"
  }}/>)
}

const SLIDER_OFFSET = 80
const HERO_CONTENT_BOTTOM_PADDING = 90

const useStyles = makeStyles((theme) => ({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',

      // to match header.style.js and other elements
    padding: `0px ${theme.spacing(3)}`,

    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}`,
    },

    paddingBottom: `${SLIDER_OFFSET + HERO_CONTENT_BOTTOM_PADDING}px !important`,
  },

  main: {

    marginTop: `-${SLIDER_OFFSET}px`,
    position: 'relative',
    zIndex: 2,

      // to match header.style.js and other elements
    padding: `0px ${theme.spacing(3)}`,
    
    [theme.breakpoints.up('lg')]: {
      padding: `0px ${theme.spacing(8)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0px ${theme.spacing(2)}`,
    },
      
  },
}))

export default withRouter(withWidth()(inject('store')(observer((props) => {

  useEffect(() => {
    props.store.userPortfolio.getWatchlist()
    googlePageView()
  }, [])

  const { store, width, router, pathName } = props
  const heroMovie = store.movieStore.movies.find(m => (m.movieSlug === heroInfo.slug))
  const heroStyles = heroInfo.styles
  if (isWidthDown('sm', width)) {
    Object.assign(heroStyles, {
      backgroundPosition: 'center center',
    })
  }

  const classes = useStyles()

  return (
    <>
      <Hero image={heroInfo.img} styles={heroStyles} className={classes.hero}>
        <HeroElements movie={heroMovie} logo={heroInfo.logo}/>
      </Hero>
      <div className={classes.main}>
        <MovieSlider 
          movies={store.movieStore.fundingMovies} 
          title='Now Funding' 
          goToMovieDetail={(movie) => {router.push(`/film/${movie.movieSlug}`)}} 
          goToMovieOffering={(movie) => {router.push(`/offering/${movie.movieSlug}`)}} 
          goToMovieTrading={(movie) => {router.push(`/trade/${movie.movieSlug}`)}} 
          className={classes.fundingSlider}
          height='480px'
        />
        <MovieSlider 
          movies={store.movieStore.tradingMovies} 
          title='Now Trading' 
          goToMovieDetail={(movie) => {router.push(`/film/${movie.movieSlug}`)}} 
          goToMovieOffering={(movie) => {router.push(`/offering/${movie.movieSlug}`)}} 
          goToMovieTrading={(movie) => {router.push(`/trade/${movie.movieSlug}`)}} 
          className={classes.tradingSlider}
          height='480px'
        />
        <CategorySlider />
        <StudioSlider />
      </div>
    </>
  )
}))))
