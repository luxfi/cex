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

import Link from 'next/link'
import InfoIcon from "@material-ui/icons/Help"
import PollIcon from "@material-ui/icons/Poll"
import FavoriteIcon from "@material-ui/icons/FavoriteBorder"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'


import classNames from 'classnames'

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

  const auxContent = (movie.trading) ?
  (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieTrading(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><FavoriteIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton, classes.textButton)} onClick={() => {goToMovieTrading(movie)}} >TRADE</Button>
    </div>
  ) : (
    <div className={classes.buttonsOuter}>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieDetail(movie)}} ><InfoIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {goToMovieOffering(movie)}} ><PollIcon /></Button>
      <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={() => {console.log("BOOKMARK clicked for " + movie.name)}} ><FavoriteIcon /></Button>
      <Link href="/offering" as={`/offering/${movie.movieSlug}`}>
        <Button className={classNames(classes.detailsButton, classes.hoverButton, classes.textButton)}>INVEST</Button>
      </Link>
    </div>
  )

  return (
    <Card className={classNames(classes.card, className)} >
      <CardMedia src={movie.posterImg} className={classes.cardMedia} component='img' style={style}/>
      <CardContent className={classes.cardContent}>
        <TrailerImage movie={movie} className={classes.trailerImg}/>
        <Box className={classes.innerCardContent}>
          <Box className={classes.standardContent}>
            <Typography className={classes.title} variant="body2">{movie.name}</Typography>
          </Box>
          <Box className={classes.hoverContent}>
            <Typography className={classes.title} variant="body2">{movie.name}</Typography>
            <Typography className={classes.shortDescription} variant="body1">{truncate(movie.shortDescription, 20)}</Typography>
            {auxContent}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const TrailerImage = ({movie, className}) => {
  const childRef = React.useRef()
  return (
    <Link href={`/watch?video=${movie.movieSlug}`}>
      <a style={{ color: '#fff'}}>
        <div className={className}>
          <FontAwesomeIcon icon={faPlayCircle} size='1x' />
          <img src={movie.heroImg} />
          <TrailerSliderModal movie={movie} ref={childRef} />
        </div>
      </a>
    </Link>
    // <div className={className} onClick={() => childRef.current.handleOpen()}>
    //   <FontAwesomeIcon icon={faPlayCircle} size='1x' />
    //   <img src={movie.heroImg} />
    //   <TrailerSliderModal movie={movie} ref={childRef} />
    // </div>
  )
}
