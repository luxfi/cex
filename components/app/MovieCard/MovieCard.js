import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'

import {
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

import {
  Help as InfoIcon,
  Poll as PollIcon,
  FavoriteBorder as FavoriteIcon,
} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import { TrailerSliderModal } from "../../landing"
import { truncate } from "../../../util"

import styles from './MovieCard.style.js'
const useStyles = makeStyles(styles)

export default ({
  movie,
  goToMovieDetail,
  goToMovieTrading,
  goToMovieOffering,
  height,
  className
}) => {
  const classes = useStyles()
  const style = (height) ? { height: height, width: 'auto' } : {}

  return (
    <div className={classNames(classes.card, className, movie.movieSlug)} >
      <img src={movie.posterImg} className={classes.cardMedia} style={style}/>
      <div className={classes.cardContent}>
        <TrailerImage movie={movie} className={classes.trailerImg}/>
        <Box className={classNames(classes.standardContent, classes.innerCardContent) }>
          <Typography className={classes.title} variant="body2">{movie.name}</Typography>
        </Box>
        <Box className={classNames(classes.hoverContent, classes.innerCardContent)}>
          <NextLink href={`/film/${movie.movieSlug}`}>
            <a className={classes.aTag}>
              <Typography className={classNames(classes.title, classes.aTag)} variant="body2">{movie.name}</Typography>
            </a>
          </NextLink>
          <Typography className={classes.shortDescription} variant="body1">{truncate(movie.shortDescription, 20)}</Typography>
          <div className={classes.buttonsOuter}>
            <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => { goToMovieDetail(movie) }} ><InfoIcon /></Button>
            <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => { (movie.trading) ? goToMovieTrading(movie) : goToMovieOffering(movie) }} ><PollIcon /></Button>
            <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => { console.log("FAV BOOKMARK clicked for " + movie.name) }} ><FavoriteIcon /></Button>
            <Button className={classNames(classes.detailsButton, classes.hoverButton, classes.textButton)} onClick={() => { (movie.trading) ? goToMovieTrading(movie) : goToMovieOffering(movie) }} >{(movie.trading) ? 'TRADE' : 'INVEST'}</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}

const TrailerImage = ({movie, className}) => {
  const childRef = React.useRef()
  return (
    <NextLink href={`/watch?video=${movie.movieSlug}`}>
      <a style={{ color: '#fff'}}>
        <div className={className}>
          <FontAwesomeIcon icon={faPlayCircle} size='1x' />
          <img src={movie.heroImg} />
          <TrailerSliderModal movie={movie} ref={childRef} />
        </div>
      </a>
    </NextLink>
  )
}
