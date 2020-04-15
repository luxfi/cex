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
import moment from 'moment'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React, { Fragment } from 'react'

import { slugFromPath } from '../../../util'

import CustomDialog from '../../app/CustomDialog'

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

  renderVenue = (selectedVenue) => {
    const {
      classes,
      router,
    } = this.props

    const urlParams = new URLSearchParams(window.location.search)
    const refHash = urlParams.get('ref')
    const slug = slugFromPath()

    return (
      <Box key={selectedVenue.venue.id} className={classes.movieVenue}>
        <Grid>
          <Grid className={classes.panelBody} container alignContent='flex-start'>
            <Box className={classes.movieVenueIconContainer}>
              <img
                className={classes.movieVenueIcon}
                src={selectedVenue.venue.logoIcon}
                alt='Logo'
              />
            </Box>
            <Grid className={classes.movieVenueContainer}>
              <Typography variant='h6' className={classes.movieVenueTitleLink}>
                {selectedVenue.venue.name}
              </Typography>
              <Box component='span'>{
                `${selectedVenue.venue.address.line}, 
                ${selectedVenue.venue.address.city}, 
                ${selectedVenue.venue.address.state}`
                }</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.showtimeSchedules} wrap='nowrap' alignItems='flex-start'>
          <Box className={classes.formatContainer}><Typography variant='h5' className={classes.showtimeTitle}>STANDARD FORMAT</Typography></Box>
          <Grid container component='ul' alignContent='space-between' alignItems='center'>
            {
              selectedVenue.showtimeDetails.length
                ? selectedVenue.showtimeDetails.map((showtimeDetail) => {
                  const refString = (refHash && refHash.length) ? `&ref=${refHash}` : ''
                  return (
                    <li key={showtimeDetail.showtimeId}>
                      <Link href='/checkout' as={`/checkout/${slug}?venueId=${selectedVenue.venue.id}&showtimeId=${showtimeDetail.showtimeId}${refString}`}>
                        <Button className={classes.btnShowtime}>{moment(showtimeDetail.localShowtimeStart).format('hh:mm A')}</Button>
                      </Link>
                    </li>
                )})
                : null
            }
          </Grid>
        </Grid>
      </Box>
    )
  }

  render() {
    const {
      classes,
      router,
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

    console.log("MOVIE " + movie + " slug " + slug)

    return (
      <Box className={classes.outerContainer}>
        <Box>
          <Box className={classes.movieSummaryHero}>
            <Box className={classes.movieSummaryHeroPoster}>
              <img className={classes.heroImage} src={movie.posterImg} alt='' role='presentation' />
            </Box>
            <Box className={classes.movieSummaryHeroInfo}>
              <Typography variant='h1' className={classes.movieSummaryHeroTitle}>{movie.name}</Typography>
              <Grid container alignItems='center' className={classes.movieSummaryHeroMetadata}>
                {movie.rated ? (<span className={classes.rRatedContainer}>{movie.rated}</span>) : ''}
                {movie.releaseDate ? (<span className={classes.movieTimer}>Release Date: <b>{movie.releaseDate}</b></span>) : ''}
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
                <Button
                  className={classes.bookmarkButton}
                  endIcon={<BookmarkBorderIcon className={classes.whiteSvgIcon} />}
                >
                  Add To Watchlist
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className={classes.dateLocationStripe}>
            <Typography variant='h2' className={classes.dateLocationStripeHeading}>Find Movie Theaters & Showtimes</Typography>
            <span className={classes.dateLocationStripeText}>for</span>
            <Button
              startIcon={<DateRangeIcon className={classes.svgIcon} />}
              endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
              onClick={this.openModal('date')}
            >
              {selectedDate.formated ? selectedDate.formated : '...' }
            </Button>
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
            <span className={classes.dateLocationStripeText}>in</span>
            <Button
              endIcon={<KeyboardArrowDownIcon className={classes.svgIcon} />}
              className={classes.dateLocationStripeDropdown}
              onClick={this.openModal('formats')}
            >
              All Formats
            </Button>
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
          </Box>
          <Box>
            {
              movieVenues.length
                ? movieVenues.map((selectedVenue) => this.renderVenue(selectedVenue))
                : (<Box className={classes.panelBody}>
                      Hmm... we couldn&apos;t find any showtimes for this date and location.
                    </Box>
                )
            }
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withRouter(withStyles(styles)(TicketingView))
