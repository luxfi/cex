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

const useStyles = makeStyles ((theme) => (

{
  gridContainer: {
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
}
))



export default (props) => {

  const classes = useStyles()

  const { movie, logo } = props

  const hrefLink = `/film/${movie.movieSlug}`


  return (
    <Grid
    container
    direction='row'
    justify='flex-start'
    alignItems='flex-end'
    className={classes.gridContainer}
    >
      <Grid justify='flex-start' container item xs={12} sm={6} md={6} style={{ textAlign: 'left' }} >
        <Grid item xs>
          <Box lineHeight={1} letterSpacing={2}>
            <Typography className='esx-initial-offering' variant='h5'>
              <Box fontWeight='bold' fontSize={24}>
                ESX
            </Box>
              <Box fontWeight={100} fontSize={20}>
                INITIAL OFFERING
            </Box>
            </Typography>
            {logo}
            <Typography variant='body2'>
              {movie.shortDescription}
            </Typography>
          </Box>
        </Grid>
        <Grid container item spacing={2} justify='flex-start' className={classes.buttonGridContainer}>
          <Grid item>
            <NextLink href={`/watch?video=${movie.movieSlug}`}>
              <a style={{ textDecoration: 'none'}}>
                <Button
                  className={`watch-trailer-button button ${classes.watchTrailerButton}`}
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
          <Grid item>
            <Button
              className={classes.investButton}
              size='large'
              startIcon={<MonetizationOnIcon />}
            >
              <NextLink href={hrefLink}>
                <Typography variant='body2' className={classes.watchTrailerButtonText}>
                  INVEST IN {movie.name}
                </Typography>
              </NextLink>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}


