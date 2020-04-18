import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import NextLink from 'next/link'

import { makeStyles } from '@material-ui/core/styles'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
  },
  watchTrailerButtonText: {
    color: 'inherit !important',
  },
}))

export default (props) => {

  const s = myStyles()
  const { movie, logo } = props
  const hrefLink = `/film/${movie.movieSlug}`

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
          <NextLink href={`/watch?video=${movie.movieSlug}&trailerId=${getYoutubeId(movie.trailer)}`}>
            <a style={{ textDecoration: 'none'}}>
              <Button
                className={`watch-trailer-button button ${s.watchTrailerButton}`}
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
              >
                <Typography variant="body2">
                  Play Trailer
                </Typography>
              </Button>
            </a>
          </NextLink>
        </Grid>
        <Grid item >
          <Button
            className={s.investButton}
            size='large'
            startIcon={<MonetizationOnIcon />}
          >
            <NextLink href={hrefLink}>
              <Typography variant='body2' className={s.watchTrailerButtonText}>
                INVEST IN {movie.name}
              </Typography>
            </NextLink>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )

}


