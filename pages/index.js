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

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


import {
  CategorySlider,
  ForYouSlider,
  StudioSlider,
  TrailerSlider,
  HeroElements
} from '../components/landing'

import { googlePageView } from '../util/generic'
import { Translate } from '@material-ui/icons'

const useStyles = makeStyles ((theme) => (
  {
    previousArrow: {
      display: 'block',
      position: 'absolute',
      color: 'white',
      top: '50%',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      left: '-25px',
      width: '20px',
      height: '20px',
      zIndex: 100,
      //'&:before': {
        //content: '&#x3008'
      //}
    },
    nextArrow: {
      display: 'block',
      position: 'absolute',
      color: 'white',
      zIndex: 100,
      top: '50%',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      width: '20px',
      height: '20px',
      right: '-25px',
      //'&:before': {
        //content: '&#x3009'
      //}
    }
  }
))


const Arrow = (props) => {
  const { which, onClick, style } = props

//       onClick={onClick}
  const classes = useStyles()

  return (
    <div
      className={(which === 'next') ? classes.nextArrow : classes.previousArrow}
      style={{ ...style}}
      onClick={onClick}
  >{(which === 'next') ? <ChevronRightIcon/> : <ChevronLeftIcon/>}</div>
  )
}

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <Arrow which='previous'/>,
  nextArrow: <Arrow which='next' />,
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
  
  return (
    <>
      <Hero image={heroInfo.img} styles={heroStyles} >
        <HeroElements movie={heroMovie} logo={heroInfo.logo}/>
      </Hero>
      <div id="trailer-slider">
        <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            NOW FUNDRAISING
          </Box>
        </Typography>
        <div className='slider-outer' style={{paddingLeft: '30px', paddingRight: '30px'}}>
          <Slider {...sliderSettings} >
            {store.movieStore.movies.filter(m => !m.trading).map((movie, i) => <SliderItem movie={movie} key={i} />) }
          </Slider>
        </div>
      </div>
      <CategorySlider />
      <StudioSlider />
    </>
  )
})))

/*
      <div style={{ marginTop: -120, position: 'relative' }}>
<TrailerSlider />
<ForYouSlider />
      </div>
*/


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
            
        </CardContent>
      </Card>
    </div>
  )
}

          //<TrailerSliderModal movie={movie} ref={childRef} />
