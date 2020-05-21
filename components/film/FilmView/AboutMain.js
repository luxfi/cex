import React from 'react'
import Link from 'next/link'

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import { PlayArrow as PlayArrowIcon } from '@material-ui/icons'
import { getYoutubeId } from '../../../util'

import { AddToWatchlistButton } from '../../app'

export default ({ classes, movie }) => (
  <Grid container>
    <Grid item xs={12} md={9}>
      <div className={classes.titleAndDescription}>
        <h1
          className={classes.title}
          style={{ textAlign: 'left' }}
        >
          {movie.name}
        </h1>
        <p className={classes.description}>
          {movie.shortDescription}
        </p>
      </div>
      <div>
        <Link href={`/watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}>
          <a className={classes.watchButton}>
            <Button
              className='watch-trailer-button button'
              variant='outlined'
              size='large'
              startIcon={<PlayArrowIcon />}
            >
              <Typography variant='body2'>
                Play Trailer
              </Typography>
            </Button>
          </a>
        </Link>
        <Link href={`/trade/${movie.movieSlug}`} as={`/trade/${movie.movieSlug}`}>
          <Button
            variant='contained'
            className={classes.movieButton}
          >
            Invest
          </Button>
        </Link>
        <AddToWatchlistButton movie={movie} className={classes.movieButton} />
        <Link href='/ticketing' as={`/ticketing/${movie.movieSlug}`}>
          <Button
            id='buyTicketsButton'
            variant='contained'
            className={classes.movieButton}
          >
            Buy Tickets
          </Button>
        </Link>
      </div>
      <br />
      <br />
    </Grid>
    <Grid item xs={12} md={3}>
      <img className={classes.aboutImage} src={`/images/film/${movie.posterImg}`} />
    </Grid>
  </Grid>
)
