import React from 'react'
import {
  Typography,
  makeStyles,
  withWidth,
  isWidthDown,
} from '@material-ui/core'
import { ChevronLeft, ChevronRight} from '@material-ui/icons'

import Slider from 'react-slick'
import './modified-slick.css'

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
    goToMovieDetail,
    goToMovieOffering,
    goToMovieTrading,
    className,
    height,
  } = props

  const classes = useStyles()

  const sliderSettings = {
    dots: false,
    //arrows: true,
    infinite: false,
    variableWidth: true,
    speed: 500,
    slidesToScroll: 6,
    swipeToSlide: true,
    prevArrow: <PreviousArrow classes={classes}/>,
    nextArrow: <NextArrow classes={classes}/>,
    
      /*
        TODO:  pass in a "averageWidth" prop, and generate these breakpoints dynamically.

        These are based on ~320px width
      */
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={classNames(classes.outerMost, className)}>
      <Typography variant="h4" className={classes.title}>{title}</Typography>
      <div className={classes.outer}>
        <Slider {...sliderSettings} >
          {movies.map((movie, i) =>
            <MovieCard
              movie={movie}
              goToMovieDetail={goToMovieDetail}
              goToMovieOffering={goToMovieOffering}
              goToMovieTrading={goToMovieTrading}
              key={movie.movieSlug}
              height={height}
              className={classes.movieCard}
            />
          )}
        </Slider>
      </div>
    </div>
  )
}
