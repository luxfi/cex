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

import MovieCard from '../MovieCard'

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

export default (props) => {

  const {
    movies,
    title,
    onClick,
    className,
    height
  } = props 

  const classes = useStyles()

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PreviousArrow classes={classes}/>,
    nextArrow: <NextArrow classes={classes}/>,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className={classNames(classes.outerMost, className)}>
      <Typography variant="h4" className={classes.title}>{title}</Typography>
      <div className={classes.outer}>
        <Slider {...sliderSettings} >
          {movies.map((movie, i) => <MovieCard movie={movie} onClick={onClick} key={movie.movieSlug} height={height} className={classes.movieCard}/>) }
        </Slider>
      </div>
    </div>
  )
}
