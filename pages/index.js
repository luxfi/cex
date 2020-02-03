import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { 
  Box, 
  Card,
  CardContent,
  Typography, 
  makeStyles, 
  withWidth,
  isWidthDown, 
} from "@material-ui/core"

import { Hero } from '../components/app'
import TerminatorHero from '../assets/images/terminator-hero.jpg'
import TerminatorLogo from '../assets/svg/terminator-logo.svg'

import {
  MovieSlider,
  CategorySlider,
  StudioSlider,
  HeroElements
} from '../components/landing'

import { googlePageView } from '../util/generic'

// Test moving terminator-dark-fate.js to here
const heroInfo = {
  slug: 'terminator-dark-fate',
  img: TerminatorHero,
  styles: {
    backgroundPosition: 'right -500px center',
    backgroundColor: 'black'
  },
  logo: (<TerminatorLogo style={{
    fill: "#F0f0f0",
    width: "60%",
    height: "60%"
  }}/>)
}

export default withWidth()(inject('store')(observer((props) => {

  useEffect(() => {
    props.store.userPortfolio.getWatchlist()
    googlePageView()
  }, [])

  const { store, width } = props
  const heroMovie = store.movieStore.movies.find(m => (m.movieSlug === heroInfo.slug))

  const heroStyles = heroInfo.styles
  if (isWidthDown('sm', width)) {
    Object.assign(heroStyles, {
      backgroundPosition: 'center center',
    })
  }
  
  return (
    <>
      <Hero image={heroInfo.img} styles={heroStyles} >
        <HeroElements movie={heroMovie} logo={heroInfo.logo}/>
      </Hero>
      <MovieSlider 
        movies={store.movieStore.fundingMovies} 
        title='Now Funding' 
        onClick={(movie) => {console.log("MOVIE CLICKED: " + movie.name) }} 
      />
      <CategorySlider />
      <StudioSlider />
    </>
  )
})))


