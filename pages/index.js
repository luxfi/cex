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

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Hero } from '../components/app'

// import heroInfo from '../components/landing/Hero/terminator-dark-fate'
import TerminatorHero from '../assets/images/terminator-hero.jpg'
import TerminatorLogo from '../assets/svg/terminator-logo.svg'

import {
  CategorySlider,
  ForYouSlider,
  StudioSlider,
  TrailerSlider,
  HeroElements
} from '../components/landing'

import { googlePageView } from '../util/generic'


const sliderSettings = {
  dots: false,
  //arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
}

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
  
  //store.movieStore.movies.filter((m) => movieExtendedMap[m.movieSlug]).map((movie) => {
    //const hrefLink = `/film/${movie.movieSlug}`

  return (
    <>
      <Hero image={heroInfo.img} styles={heroStyles} >
        <HeroElements movie={heroMovie} logo={heroInfo.logo}/>
      </Hero>
      <div id="trailer-slider">
        <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            NEWEST TRAILERS
          </Box>
        </Typography>
        <Slider {...sliderSettings}>
        {store.movieStore.movies.map((movie, i) => <SliderItem movie={movie} key={i} />) }
        </Slider>
      </div>
    </>
  )
})))

/*
      <div style={{ marginTop: -120, position: 'relative' }}>
<TrailerSlider />
<ForYouSlider />
<StudioSlider />
<CategorySlider />
      </div>
*/

const SliderItem = ({ movie }) => {
  return (
  <div style={{height: '100px', backgroundColor: '#aaa'}}>TESTING</div>
  )
}


/*
const SliderItem = ({ movie }) => {
  return (
    <div
      className="item"
      style={{
        flex: "0 0 19.7%",
        textAlign: "center",
        marginRight: "16px",
        transition: "transform 300ms ease 100ms",
        position: "relative"
      }}
    >
      <Card
        //onClick={() => childRef.current.handleOpen()}
      >
        <CardContent
          style={{
            display: 'block',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${movie.posterImg})`,
            maxHeight: '1200px',
            minHeight: '487px',
            minWidth: '287px',
            backgroundSize: 'cover',
          }}
        >
            FOo
        </CardContent>
      </Card>
    </div>
  )
}
*/
          //<TrailerSliderModal movie={movie} ref={childRef} />
