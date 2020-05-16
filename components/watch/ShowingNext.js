import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classNames from 'classnames'
import uuid from 'uuid';

import {
  Box, 
  Grid, 
  Switch, 
  Typography,
  withStyles,
} from '@material-ui/core'

import {
  formatDuration,
  formatNumber,
  calculateDateFrom,
  getYoutubeId,
} from '../../util'

import styles from './style.js'

export default withRouter(withStyles(styles)(inject('store')(observer(({
  classes,
  onClick,
  store: { trailerStore },
  relatedMovies,
  autoPlaySet,
  relatedMovieTrailers,
  nextMovieIndex,
}) => {

  const [state, setState] = useState({
    autoPlay: autoPlaySet,
  })

  const handleChecked = (event) => {
    setState({
      autoPlay: event.target.checked,
    })

    trailerStore.setAutoplay(event.target.checked)
  }

  const nextVideo = relatedMovieTrailers.length > 1 ? relatedMovieTrailers[nextMovieIndex] : {}

  return (
    <Box>
      <Box className={classes.upNextTop}>
        <Typography variant='h4' className='title'>Related Movies</Typography>
        <Box className={classes.upNextToggle}>
          <Typography component='span'>Autoplay</Typography>
          <Switch
            checked={state.autoPlay === 'true' || state.autoPlay === true}
            onChange={handleChecked}
          />
        </Box>
      </Box>
      <Box className={classes.videoList}>
        {
          relatedMovieTrailers.length ? relatedMovieTrailers.map((movie) => (
            <Link
              as={`watch?video=${movie.movieSlug}&trailerId=${movie.trailerId}`}
              href={`watch?video=${movie.movieSlug}&trailerId=${movie.trailerId}`}
              key={uuid.v4()}
            >
              <a onClick={() => onClick(movie.movieSlug)}>
                <Grid container spacing={2}>
                  <Grid item xs={6} className={classes.imageWrapper}>
                    <img src={movie.thumbnail} alt={movie.name} className={classes.movieImage} />
                    <Box className={classes.playTime}>
                      <Typography component='span'>{formatDuration(movie.trailerDetails.duration)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                    >
                      {movie.name}
                    </Typography>
                    <Box className={classes.sidebarVideoMeta}>
                      <Typography className={classes.singleLine}>{movie.distributors[0]}</Typography>
                      <Typography className={classes.singleLine}>{`${formatNumber(movie.trailerDetails.views, 1)} views • ${calculateDateFrom(movie.trailerDetails.createdAt)}`}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </a>
            </Link>
          )) : null
        }
        {
          relatedMovies.length ? relatedMovies.map((movie) => (nextVideo.id === movie.id ? null : (
            <Link
              href={`watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}
              as={`watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}
              key={uuid.v4()}
            >
              <a onClick={() => onClick(movie.movieSlug)}>
                <Grid container spacing={2}>
                  <Grid item xs={6} className={classes.imageWrapper}>
                    <img src={movie.heroImg} alt={movie.name} className={classes.movieImage} />
                    <Box className={classes.playTime}>
                      <Typography component='span'>{formatDuration(movie.trailerDetails.duration)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                    >
                      {movie.name}
                    </Typography>
                    <Box className={classes.sidebarVideoMeta}>
                      <Typography className={classes.singleLine}>{movie.distributors[0]}</Typography>
                      <Typography className={classes.singleLine}>{`${formatNumber(movie.trailerDetails.views, 1)} views • ${calculateDateFrom(movie.trailerDetails.createdAt)}`}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </a>
            </Link>
          ))) : null
        }
      </Box>
    </Box>
  )
}))))
