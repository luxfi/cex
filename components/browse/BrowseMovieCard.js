import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'

import {
  Button,
  Tooltip,
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

import { getYoutubeId } from "../../util"

import styles from './browseMovieCard.style.js'
const useStyles = makeStyles(styles)

const BrowseMovieCard = ({
  movie,
  goToMovieDetail,
  goToMovieTrading,
  goToMovieOffering,
  store,
}) => {
  const classes = useStyles()
  const { uiStore } = store

  const handleGotoMovieDetail = () => {
    goToMovieDetail(movie)
  }

  const handleGoToMovieOffering = () => {
    (movie.trading) ? goToMovieTrading(movie) : goToMovieOffering(movie)
  }

  const handleFavouriteMovie = () => {
    console.log("FAV BOOKMARK clicked for " + movie.name)
  }

  const handleInvestment = () => {
    (movie.trading) ? goToMovieTrading(movie) : goToMovieOffering(movie)
  }

  const closeModal = () => {
    uiStore.closeBrowseMovieModal()
  }

  return (
    <div className={classes.card} >
      <figure className={classes.figure}>
        <NextLink href={`/watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}>
          <a onClick={closeModal} className={classes.playLink}>
            <FontAwesomeIcon icon={faPlayCircle} size='1x' />
          </a>
        </NextLink>
        <img src={movie.heroImg} className={classes.img} />
      </figure>
      <div className={classes.content}>
        <div>
          <NextLink href='/film/[id]' as={`/film/${movie.movieSlug}`}>
            <a onClick={closeModal} className={classes.aTag}>
              <Typography className={classNames(classes.title, classes.aTag)} variant="body2">{movie.name}</Typography>
            </a>
          </NextLink>
          <Tooltip title={movie.shortDescription} arrow classes={{ tooltip: classes.tooltip }}>
            <p className={classes.description}>{movie.shortDescription}</p>
          </Tooltip>
        </div>
        <div className={classes.buttonsOuter}>
          <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={handleGotoMovieDetail} ><InfoIcon /></Button>
          <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={handleGoToMovieOffering} ><PollIcon /></Button>
          <Button className={classNames(classes.detailsButton, classes.hoverButton)} onClick={handleFavouriteMovie} ><FavoriteIcon /></Button>
          <Button className={classNames(classes.detailsButton, classes.hoverButton, classes.textButton)} onClick={handleInvestment} >{(movie.trading) ? 'TRADE' : 'INVEST'}</Button>
        </div>
      </div>
    </div>
  )
}

export default inject('store')(observer(BrowseMovieCard))
