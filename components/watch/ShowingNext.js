import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classNames from 'classnames'

import {
  Box, Divider, Switch, Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { formatDuration, formatNumber, calculateDateFrom } from './utils'

import styles from './style.js'

const ShowingNext = inject('store')(observer((props) => {
  const {
    classes,
    onClick,
    store: {
      trailerStore: {
        relatedMovies,
        autoplayMovies,
        autoPlaySet,
        relatedMovieTrailers,
        selectedMovieTrailer,
      },
      movieStore,
      trailerStore,
    },
    nextMovieIndex,
    router: { query: { video: movieSlug, trailerId } },
  } = props

  const [state, setState] = useState({
    autoPlay: autoPlaySet,
  })

  const movie = movieStore.getMovieBySlug(movieSlug)

  const handleChecked = (event) => {
    setState({
      autoPlay: event.target.checked,
    })

    trailerStore.setAutoplay(event.target.checked)
  }

  const nextVideo = autoplayMovies[nextMovieIndex] || {}
  const showNext = nextMovieIndex !== null && nextMovieIndex < autoplayMovies.length

  return (
    <Box className={classes.relatedVideos}>
      <Box className={classes.upNextTop}>
        <Typography variant='h4' className='title'>{ showNext ? 'Up next' : 'Related Movies' }</Typography>
        <Box className={classes.upNextToggle}>
          <Typography component='span'>Autoplay</Typography>
          <Switch
            checked={state.autoPlay === 'true' || state.autoPlay === true}
            onChange={handleChecked}
            disabled={!!(selectedMovieTrailer)}
          />
        </Box>
      </Box>
      {
        trailerId && relatedMovieTrailers.length ? 
        relatedMovieTrailers.map((relatedMovieTrailer) => (
          <>
            <Link
              href={`watch?video=${movieSlug}&trailerId=${relatedMovieTrailer.youtubeId}`}
              key={relatedMovieTrailer.youtubeId}
            >
                <Box className={classes.singleVideo}>
                  <Box className={classes.imageWrapper}>
                    <img src={relatedMovieTrailer.thumbnail} alt={movie.name} />
                    <Box className={classes.playTime}>
                      <Typography component='span'>{formatDuration(relatedMovieTrailer.trailerDetails.duration)}</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.sidebarVideoInfo}>
                    <Typography
                      className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                    >
                      {movie.name}
                    </Typography>
                    <Box className={classes.sidebarVideoMeta}>
                      <Typography className={classes.singleLine}>{nextVideo.distributors[0]}</Typography>
                      <Typography className={classes.singleLine}>{`${formatNumber(relatedMovieTrailer.trailerDetails.views, 1)} views • ${calculateDateFrom(relatedMovieTrailer.trailerDetails.createdAt)}`}</Typography>
                    </Box>
                  </Box>
                </Box>
            </Link>
            <Divider style={{ margin: '10px 0 0 0' }} />
          </>
        )) : null
      }
      {
        (trailerId && relatedMovieTrailers.length)
          ? (<Typography className={classes.recommendedTitle} variant="h5">Recommended</Typography>)
          : null
      }
      {
        showNext ? (
          <>
            <Link
              href={`watch?video=${nextVideo.movieSlug}`} key={`showingNext-${nextVideo.id}`}>
              <a onClick={() => onClick(nextVideo.movieSlug)}>
                  <Box className={classes.singleVideo}>
                    <Box className={classes.imageWrapper}>
                      <img src={nextVideo.heroImg} alt={nextVideo.name} />
                      <Box className={classes.playTime}>
                        <Typography component='span'>{formatDuration(nextVideo.trailerDetails.duration)}</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.sidebarVideoInfo}>
                      <Typography
                        className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                      >
                        {nextVideo.name}
                      </Typography>
                      <Box className={classes.sidebarVideoMeta}>
                        <Typography className={classes.singleLine}>{nextVideo.distributors[0]}</Typography>
                        <Typography className={classes.singleLine}>{`${formatNumber(nextVideo.trailerDetails.views, 1)} views • ${calculateDateFrom(nextVideo.trailerDetails.createdAt)}`}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </a>
            </Link>
            <Divider style={{ margin: '10px 0 0 0' }} />
          </>
        ) : ('')
      }
      {
        relatedMovies.length && relatedMovies.map((movie) => (nextVideo.id === movie.id ? null : (
          <Link href={`watch?video=${movie.movieSlug}`} key={`showingNext-${movie.id}`}>
            <a onClick={() => onClick(movie.movieSlug)}>
              <Box className={classes.singleVideo}>
                <Box className={classes.imageWrapper}>
                  <img src={movie.heroImg} alt={movie.name} />
                  <Box className={classes.playTime}>
                    <Typography component='span'>{formatDuration(movie.trailerDetails.duration)}</Typography>
                  </Box>
                </Box>
                <Box className={classes.sidebarVideoInfo}>
                  <Typography
                    className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                  >
                    {movie.name}
                  </Typography>
                  <Box className={classes.sidebarVideoMeta}>
                    <Typography className={classes.singleLine}>{movie.distributors[0]}</Typography>
                    <Typography className={classes.singleLine}>{`${formatNumber(movie.trailerDetails.views, 1)} views • ${calculateDateFrom(movie.trailerDetails.createdAt)}`}</Typography>
                  </Box>
                </Box>
              </Box>
            </a>
          </Link>
        )))
      }
    </Box>
  )
}))

export default withRouter(withStyles(styles)(ShowingNext))
