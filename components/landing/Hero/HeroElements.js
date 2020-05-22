import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { makeStyles } from '@material-ui/core/styles'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Link from '../../app/Link'

import { getYoutubeId } from '../../../util'

const myStyles = makeStyles((theme) => ({

  container: {
    maxWidth: '600px'
  },

  label: {
    marginBottom: theme.spacing(2)
  },
  labelESX: {
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'block'
  },
  labelOffering: {
    fontSize: '20px',
    fontWeight: 100,
    display: 'block'
  },

  description: {
    fontSize: '20px',
    marginBottom: theme.spacing(2)
  },

  buttonGridContainer: {
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        width: '100%',
      },
      '& button': {
        width: '100%',
      },
    },
  },
  investButton: {
    fontSize: '0.9375rem',
    color: theme.palette.common.black,
    backgroundColor: '#FBC43E',
    padding: '12px 24px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  watchTrailerButton: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    padding: '11px 24px',
    fontSize: '0.9375rem',
  },
  watchTrailerButtonText: {
    color: 'inherit !important',
  },
}))

export default (props) => {

  const s = myStyles()
  const { movie, logo } = props
  const hrefLink = '/film/[id]'
  const asHref = `/film/${movie.movieSlug}`

  return (
    <Grid
      container
      direction='row'
      justify='flex-start'
      alignItems='flex-end'
      className={s.container}
    >
      <Grid item xs>
        <Typography className={s.label} variant='h5'>
          <span className={s.labelESX} >
            ESX
          </span>
          <span className={s.labelOffering} >
            INITIAL OFFERING
          </span>
        </Typography>
        {logo}
        <Typography variant='body2' className={s.description} >
          {movie.shortDescription}
        </Typography>
      </Grid>
      <Grid container item spacing={2} justify='flex-start' className={s.buttonGridContainer}>
        <Grid item >
          <Link
            href={`/watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}
            as={`/watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}
            style={{ textDecoration: 'none'}}
          >
            <Button
              className={`watch-trailer-button button ${s.watchTrailerButton}`}
              variant="outlined"
              startIcon={<PlayArrowIcon />}
            >
              Play Trailer
            </Button>
          </Link>
        </Grid>
        <Grid item >
          <Link
            href={hrefLink}
            as={asHref}
            style={{ textDecoration: 'inherit', color: '#000' }}
          >
            <Button
              className={s.investButton}
              startIcon={<MonetizationOnIcon />}
            >
              INVEST IN {movie.name}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
