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
import BookmarkIcon from "@material-ui/icons/Bookmark"


import classNames from 'classnames'

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

  const auxContent = (movie.trading) ?
  (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieTrading(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><BookmarkIcon /></Button>
    </div>
  ) : (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieOffering(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><BookmarkIcon /></Button>
    </div>
  )

  return (
    <Card className={classNames(classes.card, className)} >
      <CardMedia src={movie.posterImg} className={classes.cardMedia} component='img' style={style}/>
      <CardContent className={classes.cardContent}>
        <TrailerImage img={movie.heroImg} className={classes.trailerImg} />
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

const TrailerImage = ({img, className}) => (
  <div className={className} >
    <img src={img} />
  </div>
)


//<img className={classes.trailerPoster} src={movie.heroImg} width='100%' height='auto' />
