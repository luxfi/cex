import React from 'react'
import { 
  Typography, 
  makeStyles, 
  withWidth,
  isWidthDown, 
} from '@material-ui/core'
import { ChevronLeft, ChevronRight} from '@material-ui/icons'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import classNames from 'classnames'

import MovieCard from '../../app/MovieCard'

import styles from './MovieSlider.style.js'
const useStyles = makeStyles(styles)

const ChevronButton = ({onClick, className, children, classes, style }) => (
  <div className={classNames(className, classes.arrow)} onClick={onClick} style={{...style}}>
    {children}
  </div>
)
const PreviousArrow = ({onClick, classes, style}) => (
  <ChevronButton onClick={onClick} className={classes.previousArrow} classes={classes} style={style}>
    <ChevronLeft/>
  </ChevronButton>
)
const NextArrow = ({onClick, classes, style}) => (
  <ChevronButton onClick={onClick} className={classes.nextArrow} classes={classes} style={style}>
    <ChevronRight/>
  </ChevronButton>
)

/*
let slider = undefined
const next = () => slider.slickNext()
const previous = () => slider.slickPrev()
*/

export default (props) => {

  const {
    movies,
    title,
    onClick
  } = props 

  const classes = useStyles()

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
      // some mistake somewhere, but have to reverse these for some reason...
    nextArrow: <PreviousArrow classes={classes}/>,
    prevArrow: <NextArrow classes={classes}/>,
  }
  

  return (
    <div className={classes.outerMost}>
      <Typography variant="h4" className={classes.title}>{title}</Typography>
      <div className={classes.outer} >
        <Slider {...sliderSettings} >
          {movies.map((movie, i) => <MovieCard movie={movie} onClick={onClick} key={movie.movieSlug}/>) }
        </Slider>
      </div>
    </div>
  )
}
