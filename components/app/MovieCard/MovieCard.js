import React from 'react'
import {
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

import InfoIcon from "@material-ui/icons/Help"
import PollIcon from "@material-ui/icons/Poll"
import FavoriteIcon from "@material-ui/icons/FavoriteBorder"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'


import classNames from 'classnames'

import styles from './MovieCard.style.js'
const useStyles = makeStyles(styles)

export default ({
  movie, 
  goToMovieDetail, 
  goToMovieTrading,
  goToMovieOffering,
  playMovieTrailer,
  height, 
  className
}) => {
  const classes = useStyles()
  const style = (height) ? { height: height, width: 'auto' } : {}

  const auxContent = (movie.trading) ?
  (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieTrading(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><FavoriteIcon /></Button>
    </div>
  ) : (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieOffering(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><FavoriteIcon /></Button>
    </div>
  )

  return (
    <Card className={classNames(classes.card, className)} >
      <CardMedia src={movie.posterImg} className={classes.cardMedia} component='img' style={style}/>
      <CardContent className={classes.cardContent}>
        <TrailerImage movie={movie} className={classes.trailerImg} playMovieTrailer={playMovieTrailer}/>
        <Box className={classes.innerCardContent}>
          <Box className={classes.standardContent}>
            <Typography className={classes.title} variant="body2">{movie.name}</Typography>
          </Box>
          <Box className={classes.hoverContent}>
            <Typography className={classes.title} variant="body2">{movie.name}</Typography>
            <Typography className={classes.status} variant="body2"><span className={classes.label}>Status: </span>{movie.trading ? 'Trading' : 'Funding'}</Typography>
            {auxContent}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const TrailerImage = ({movie, className, playMovieTrailer}) => (
  <div className={className} onClick={() => playMovieTrailer(movie)}>
    <FontAwesomeIcon icon={faPlayCircle} size='1x' />
    <img src={movie.heroImg} />
  </div>
)


//<img className={classes.trailerPoster} src={movie.heroImg} width='100%' height='auto' />
