import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classNames from 'classnames'

import {
  Box, Divider, Grid, Switch, Typography,
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
      },
      trailerStore,
    },
    nextMovieIndex,
  } = props

  const [state, setState] = useState({
    autoPlay: autoPlaySet,
  })

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
          />
        </Box>
      </Box>
      {
        showNext ? (
          <>
            <Link
              href={`watch?video=${nextVideo.movieSlug}`} key={`showingNext-${nextVideo.id}`}>
              <a onClick={() => onClick(nextVideo.movieSlug)}>
                  <Grid container className={classes.singleVideo} spacing={2}>
                    <Grid item xs={6} className={classes.imageWrapper}>
                      <img src={nextVideo.heroImg} alt={nextVideo.name} />
                      <Box className={classes.playTime}>
                        <Typography component='span'>{formatDuration(nextVideo.trailerDetails.duration)}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                      >
                        {nextVideo.name}
                      </Typography>
                      <Box className={classes.sidebarVideoMeta}>
                        <Typography className={classes.singleLine}>{nextVideo.distributors[0]}</Typography>
                        <Typography className={classes.singleLine}>{`${formatNumber(nextVideo.trailerDetails.views, 1)} views • ${calculateDateFrom(nextVideo.trailerDetails.createdAt)}`}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
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
              <Grid container className={classes.singleVideo} spacing={2}>
                <Grid item xs={6} className={classes.imageWrapper}>
                  <img src={movie.heroImg} alt={movie.name} />
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
        )))
      }
    </Box>
  )
}))

export default withRouter(withStyles(styles)(ShowingNext))
