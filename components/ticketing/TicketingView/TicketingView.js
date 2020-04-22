import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import DateRangeIcon from '@material-ui/icons/DateRange'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import PinDropIcon from '@material-ui/icons/PinDrop'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React, { Fragment } from 'react'

import { slugFromPath } from '../../../util'

import CustomDialog from '../../app/CustomDialog'
import MovieVenues from './MovieVenues'

import styles from './ticketing.style'

@inject('store')
@observer
class TicketingView extends React.Component {
  componentDidMount() {
    const { router, store: { movieStore, ticketingStore } } = this.props
    const slug = router.query.slug || slugFromPath()
    const movie = movieStore.getMovieBySlug(slug)
    ticketingStore.setSelectedMovie(movie)
  }

  openModal = (name) => () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog(name)
  }

  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeDialog()
  }

  selectDate = (date) => () => {
    const { store: { ticketingStore, uiStore } } = this.props
    ticketingStore.setSelectedDate(date)
    uiStore.closeDialog()
  }

  selectLocation = (location) => () => {
    const { store: { ticketingStore, uiStore } } = this.props
    ticketingStore.selectLocation(location)
    uiStore.closeDialog()
  }

  handleLocationSearch = (event) => {
    const { store: { ticketingStore } } = this.props
    ticketingStore.searchLocation(event.target.value)
  }

  render() {
    const {
      classes,
      store: {
        movieStore,
        uiStore,
        ticketingStore: {
          selectedDate,
          dates,
          location,
          suggestedLocations,
          selectedLocation,
          movieVenues,
        },
      },
    } = this.props

    const slug = slugFromPath()

    const movie = movieStore.getMovieBySlug(slug)

    return (
      <Box className={classes.outerContainer}>
        <Box>
          <Grid container alignContent="center" justify="center" className={classes.movieSummaryHero}>
            <Grid item xs={12} md={3} lg={2} className={classes.movieSummaryHeroPoster}>
              <img className={classes.heroImage} src={movie.posterImg} alt='' role='presentation' />
            </Grid>
            <Grid item xs={12} md={9} lg={10} className={classes.movieSummaryHeroInfo}>
              <Typography variant='h1' className={classes.movieSummaryHeroTitle}>{movie.name}</Typography>
              <Box display="flex" alignItems='center' className={classes.movieSummaryHeroMetadata}>
                {movie.rated ? (<Typography variant="subtitle2" className={classes.rRatedContainer}>{movie.rated}</Typography>) : ''}
                {movie.releaseDate ? (<Typography variant="subtitle2" className={classes.movieTimer}>Release Date: <b>{movie.releaseDate}</b></Typography>) : ''}
              </Box>
              <Box className={classes.movieSummaryHeroSynopsis}>
                <Typography variant="subtitle2">{movie.shortDescription}</Typography>
              </Box>
              <Box display="flex" alignItems="center" className={classes.buttonContainer}>
                <Button
                  href={movie.trailer}
                  className={classes.watchTrailerButton}
                  endIcon={<PlayCircleOutlineIcon className={classes.whiteSvgIcon} />}
                >
                  Watch Trailer
                </Button>
                <Button
                  className={classes.bookmarkButton}
                  endIcon={<BookmarkBorderIcon className={classes.whiteSvgIcon} />}
                >
                  Add To Watchlist
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <CustomDialog
            open={uiStore.dialog.open && uiStore.dialog.name === 'date'}
            title='Select Date'
            handleClose={this.closeDialog}
          >
            <List className={classes.datesList} aria-label='movie date list'>
              {dates.map((date) => (
                <Fragment key={date.isoFormat}>
                  <ListItem
                    onClick={this.selectDate(date)}
                    button
                    selected={selectedDate.formated === date.formated}
                  >
                    <ListItemText inset primary={date.formated} />
                  </ListItem>
                  <Divider light />
                </Fragment>
              ))}
            </List>
          </CustomDialog>
          <CustomDialog
            open={uiStore.dialog.open && uiStore.dialog.name === 'location'}
            title='Select Location'
            handleClose={this.closeDialog}
          >
            <>
              <FormControl fullWidth variant='outlined'>
                <TextField
                  onChange={this.handleLocationSearch}
                  className={classes.locationTextField}
                  value={location}
                  label='Enter Location'
                  variant='outlined'
                />
              </FormControl>
              <List aria-label='movie locations' className={classes.locationList}>

                {suggestedLocations.map((suggestedLocation) => (
                  <Fragment key={suggestedLocation.city}>
                    <ListItem
                      button
                      selected={selectedLocation.city === suggestedLocation.city}
                      onClick={this.selectLocation(suggestedLocation)}
                    >
                      <ListItemText inset primary={`${suggestedLocation.city}, ${suggestedLocation.state}`} />
                    </ListItem>
                    <Divider light />
                  </Fragment>
                ))}
                <ListItem button onClick={this.selectLocation({ city: 'Santa Monica', state: 'CA' })}>
                  <ListItemIcon>
                    <PinDropIcon />
                  </ListItemIcon>
                  <ListItemText primary='Current location' />
                </ListItem>
                <Divider light />
              </List>
            </>
          </CustomDialog>
          <CustomDialog
            open={uiStore.dialog.open && uiStore.dialog.name === 'formats'}
            title='Select Formats'
            handleClose={this.closeDialog}
          >
            <List aria-label='movie formats' className={classes.formatsList}>
              <ListItem button selected onClick={this.closeDialog}>
                <ListItemText inset primary='All Formats' />
              </ListItem>
            </List>
          </CustomDialog>
          <Grid container alignItems="center" className={classes.dateLocationStripe}>
            <Grid item xs={12} md={4} lg={3} className={classes.findMovieHeaderSection}>
              <Typography variant='h2' className={classes.dateLocationStripeHeading}>Find Movie Theaters & Showtimes</Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={9} className={classes.buttonSection}>
              <Box display="flex">
                <span className={classes.dateLocationStripeText}>for</span>
                <Button
                  startIcon={<DateRangeIcon className={classes.svgIcon} />}
                  endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
                  className={classes.dateLocationStripeDropdown}
                  onClick={this.openModal('date')}
                >
                  {selectedDate.formated ? selectedDate.formated : '...' }
                </Button>
              </Box>
              <Box display="flex">
                <span className={classes.dateLocationStripeText}>near</span>
                <Button
                  startIcon={<PinDropIcon className={classes.svgIcon} />}
                  endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
                  className={classes.dateLocationStripeDropdown}
                  onClick={this.openModal('location')}
                >
                  {selectedLocation.city
                    ? `${selectedLocation.city}, ${selectedLocation.state}`
                    : '...'
                  }
                </Button>
              </Box>
              <Box display="flex">
                <span className={classes.dateLocationStripeText}>in</span>
                <Button
                  endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
                  className={classes.dateLocationStripeDropdown}
                  onClick={this.openModal('formats')}
                >
                  All Formats
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <MovieVenues movieVenues={movieVenues} />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withRouter(withStyles(styles)(TicketingView))
