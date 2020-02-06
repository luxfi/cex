import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { Box, Grid, Button, Container, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import DateRangeIcon from '@material-ui/icons/DateRange'
import PinDropIcon from '@material-ui/icons/PinDrop'

import styles from './ticketing.style'

@inject('store')
@observer
class Ticketing extends React.Component {
  render() {
    const {
      classes,
      router: { query: { slug } },
      store: { movieStore },
    } = this.props

    const movie = movieStore.getMovieBySlug(slug)

    return (
      <Box className={classes.outerContainer}>
        <Box>
          <Box className={classes.movieSummaryHero}>
            <Box className={classes.movieSummaryHeroPoster}>
              <img className={classes.heroImage} src={movie.posterImg} alt="" role="presentation" />
            </Box>
            <Box className={classes.movieSummaryHeroInfo}>
              <Typography variant='h1' class={classes.movieSummaryHeroTitle}>{movie.name}</Typography>
              <Grid container={true} alignItems="center" className={classes.movieSummaryHeroMetadata}>
                <span className={classes.rRatedContainer}>R</span>
                <span className={classes.movieTimer}>2hrs 8m</span>
                <Rating
                  name="read-only"
                  value={4}
                />
              </Grid>
              <Box className={classes.movieSummaryHeroSynopsis}>
                {movie.shortDescription}
              </Box>
              <Grid>
                <Button
                  href={movie.trailer}
                  className={classes.watchTrailerButton}
                  endIcon={<PlayCircleOutlineIcon className={classes.whiteSvgIcon} />}
                >
                  Watch Trailer
                </Button>
                <Button className={classes.bookmarkButton} endIcon={<BookmarkBorderIcon className={classes.whiteSvgIcon} />}>
                  Added
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className={classes.dateLocationStripe}>
            <Typography variant="h2" className={classes.dateLocationStripeHeading}>Find Movie Theaters & Showtimes</Typography>
            <span className={classes.dateLocationStripeText}>for</span>
            <Button
              startIcon={<DateRangeIcon className={classes.svgIcon} />}
              endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              Tomorrow
            </Button>
            <span className={classes.dateLocationStripeText}>near</span>
            <Button
              startIcon={<PinDropIcon className={classes.svgIcon} />}
              endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              Lagos
            </Button>
            <span className={classes.dateLocationStripeText}>in</span>
            <Button
              endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              All Formats
            </Button>
          </Box>
          <Box>
            <Grid className={classes.panelBody} container alignContent="flex-start">
              {/* <Box>
                Hmm... we couldn't find any showtimes for this date and location.
              </Box> */}
              <Box className={classes.movieVenueIconContainer}>
                <img
                  className={classes.movieVenueIcon}
                  src="https://images.atomtickets.com/image/upload/v1/client-image-repo/circuit-logo/CinemarkLogoCircle_Red.svg"
                  alt="Logo"
                />
              </Box>
              <Grid className={classes.movieVenueContainer}>
                <a href="#" className={classes.movieVenueTitleLink}>
                  Cinemark Hollywood USA Movies 15
                </a>
                <Box component="span">4040 S. Shiloh Road, Garland, TX</Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container className={classes.showtimeSchedules} alignItems="center">
            <Typography variant="h4" className={classes.showtimeTitle}>STANDARD FORMAT</Typography>
            <ul className={classes.formatShowtimesList}>
              <li>
                <Link href={`${slug}/checkout/368249511/tickets`}>
                  <a className={classes.showtimeLink}>
                    <Button className={classes.btnShowtime}>12:45 PM</Button>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${slug}/checkout/368249511/tickets`}>
                  <a className={classes.showtimeLink}>
                    <Button className={classes.btnShowtime}>1:45 PM</Button>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${slug}/checkout/368249511/tickets`}>
                  <a className={classes.showtimeLink}>
                    <Button className={classes.btnShowtime}>2:00 PM</Button>
                  </a>
                </Link>
              </li>
            </ul>
          </Grid>
        </Box>
      </Box>
    )
  }
}

export default withRouter(withStyles(styles)(Ticketing))
