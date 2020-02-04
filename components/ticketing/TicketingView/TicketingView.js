import React from 'react'
import { Box, Grid, Button, Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Rating from 'react-rating';

import styles from './ticketing.style'

import EmptyStar from '../../../assets/svg/EmptyStar.svg'
import FullStar from '../../../assets/svg/FullStar.svg'
import PlayButton from '../../../assets/svg/PlayButton.svg'
import Bookmark from '../../../assets/svg/Bookmark.svg'
import DownArrow from '../../../assets/svg/DownArrow.svg'
import Calendar from '../../../assets/svg/Calendar.svg'
import Location from '../../../assets/svg/Location.svg'

const imgSrc = 'https://atom-tickets-res.cloudinary.com/image/upload/c_fill,f_auto,g_north,h_240,q_auto,w_161/v1567707539/ingestion-images-archive-prod/archive/1567707538556_194671_cops_0.jpg';

class TicketingView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.outerContainer}>
        <Box>
          <Box className={classes.movieSummaryHero}>
            <Box class={classes.movieSummaryHeroPoster}>
              <img class={classes.heroImage} src={imgSrc} alt="" role="presentation" />
            </Box>
            <Box className={classes.movieSummaryHeroInfo}>
              <h1 class={classes.movieSummaryHeroTitle}>Terminator: Dark Fate</h1>
              <Box className={classes.movieSummaryHeroMetadata}>
                <span className={classes.rRatedContainer}>R</span>
                <span className={classes.movieTimer}>2hrs 8m</span>
                <Rating
                  emptySymbol={<EmptyStar className={classes.whiteSvgIcon} />}
                  fullSymbol={<FullStar className={classes.whiteSvgIcon} />}
                  readonly
                  initialRating={4}
                />
              </Box>
              <Box className={classes.movieSummaryHeroSynopsis}>
                Linda Hamilton (“Sarah Connor”) and Arnold Schwarzenegger (“T-800”) return in their iconic roles in Terminator: Dark Fate, directed by Tim Miller (Deadpool)… 
                <a className={classes.movieSummaryHeroInfoLink}>More Details »</a>
              </Box>
              <Grid>
                <Button className={classes.watchTrailerButton} endIcon={<PlayButton className={classes.whiteSvgIcon} />}>
                  Watch Trailer
                </Button>
                <Button className={classes.bookmarkButton} endIcon={<Bookmark className={classes.whiteSvgIcon} />}>
                  Added
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className={classes.dateLocationStripe}>
            <h2 className={classes.dateLocationStripeHeading}>Find Movie Theaters & Showtimes</h2>
            <span className={classes.dateLocationStripeText}>for</span>
            <Button
              startIcon={<Calendar className={classes.svgIcon} />}
              endIcon={<DownArrow className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              Tomorrow
            </Button>
            <span className={classes.dateLocationStripeText}>near</span>
            <Button
              startIcon={<Location className={classes.svgIcon} />}
              endIcon={<DownArrow className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              Lagos
            </Button>
            <span className={classes.dateLocationStripeText}>in</span>
            <Button
              endIcon={<DownArrow className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
            >
              All Formats
            </Button>
          </Box>
          <Box>
            <Box className={classes.panelBody}>
              Hmm... we couldn't find any showtimes for this date and location.
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withStyles(styles)(TicketingView)