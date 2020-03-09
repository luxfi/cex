import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import classNames from 'classnames'
import hashSum from 'hash-sum'
import moment from 'moment'
import QRCode from 'qrcode.react'

import {
  Box,
  Button,
  ButtonBase,
  Fade,
  Grid,
  Snackbar,
  Typography,
  withStyles,
} from '@material-ui/core'

import {
  Email as EmailIcon,
  Info as InfoIcon,
  LocationOn as LocationOnIcon,
  Print as PrintIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons'

import { Map, ShareButtons } from '../../app'
import { slugFromPath } from '../../../util'
import styles from './orderDetails.style.js'


@inject('store')
@observer
class OrderDetailsView extends React.Component {

  state = {
    showCopiedFeedback: false,
  }

  componentDidMount() {
    const {
      router,
      store: {
        ticketingStore,
        ticketCheckoutStore,
      },
    } = this.props

    const slug = router.query.slug || slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const ticketId = urlParams.get('ticketId')
    const ticketDetails = ticketCheckoutStore.isValidPurchasedTicket(ticketId)

    if (!ticketDetails || ticketDetails.movieSlug !== slug) {
      router.push('/browse', '/browse')
      return
    }

    ticketingStore.selectVenue(ticketDetails.venueId)
  }

  handlePrintPage = () => {
    window.print()
  }

  onCopy = () => {
    this.setState({
      showCopiedFeedback: true,
    })
  }

  getShowtime = (showTmeId) => {
    const {
      store: {
        ticketingStore,
      },
    } = this.props
    const { showtimeDetails } = ticketingStore.selectedVenue || {}
    if (showtimeDetails) {
      return showtimeDetails.find((showTime) => showTime.showtimeId === showTmeId)
    }
    return {}
  }

  handleEmailTicket = (email, ticketUrl) => {
    const {
      store: { ticketCheckoutStore },
    } = this.props
    ticketCheckoutStore.sendTicketEmail(email, ticketUrl)
  }

  render() {
    const {
      classes,
      router,
      store: {
        movieStore,
        ticketingStore,
        ticketCheckoutStore,
        userStore,
      },
    } = this.props

    const slug = router.query.slug || slugFromPath()
    const ticketDetails = ticketCheckoutStore.currentPurchasedTicket || {}
    const movie = movieStore.getMovieBySlug(slug)

    const refHash = hashSum(userStore.email)
    const shareUrl = `${window.location.origin}/ticketing/${slug}?ref=${refHash}`
    const ticketUrl = `${window.location.origin}/orderDetails/${slug}?ticketId=${ticketDetails.ticketId}&ref=${refHash}`
    const shareMessage = `I just bought tickets for ${movie.name}! Please watch it too!`
    const movieVenue = ticketingStore.selectedVenue
    const {
      venue: {
        name: venueName,
        address: {
          line,
          city,
          state,
          lat,
          lon,
        } = {},
      } = {},
    } = movieVenue || {}

    const movieShowtimeDetails = this.getShowtime(ticketDetails.showtimeId) || {}
    const movieDate = moment(movieShowtimeDetails.localShowtimeStart).format('Do MMM')
    const movieTime = moment(movieShowtimeDetails.localShowtimeStart).format('LT')
    const qrCodeData = encodeURI(ticketUrl) // ideally, this should be the ticket information

    return (
      <Box className={classNames(classes.container, classes.padding20)}>
        <Box className={classes.topText}>
          <Typography variant='h4'>You're all set</Typography>
          <Typography component='span'>Find your ticket details below</Typography>
        </Box>
        <Grid container xs={12} spacing={3} className={classNames(classes.darkerBg, classes.container)} justify='space-evenly' alignItems='flex-start'>
          <Grid container item direction='column' xs={9} spacing={3} className='print-area'>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.padding20, classes.movieDetails)}>
                <img src={movie.posterImg} alt={`${movie.name} poster`} />
                <QRCode value={qrCodeData} size={250} level='M' includeMargin />
                <Typography variant='h4'>{movie.name}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.borderBottom)}>
                <Grid container>
                  <Grid item xs className={classes.ticketDetail}>
                    <Typography variant='body1'>{movieDate}</Typography>
                    <Typography component='span'>{movieTime}</Typography>
                  </Grid>
                  <Grid item xs className={classes.ticketDetail}>
                    <Typography variant='body1'>Screen</Typography>
                    <Typography component='span'>11</Typography>
                  </Grid>
                  <Grid item xs className={classes.ticketDetail}>
                    <Typography variant='body1'>{ ticketDetails.numberOfSeats === 1 ? '1 Seat' : `${ticketDetails.numberOfSeats} seats`}</Typography>
                    <Typography component='span'>View</Typography>
                  </Grid>
                </Grid>
                <Box className={classes.ticketDetailsLink}>
                  <Button
                    variant='text'
                    color='secondary'
                    className={classes.button}
                    startIcon={<LocationOnIcon />}
                  >
                    <Typography component='span'>{`${venueName}: ${line}, ${city}, ${state}`}</Typography>
                  </Button>
                </Box>
                <Box className={classes.ticketDetailsLink}>
                  <Button
                    variant='text'
                    color='secondary'
                    className={classes.button}
                    startIcon={<InfoIcon />}
                  >
                    <Typography component='span'>What to do at the Cinema</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.padding20, classes.borderBottom)}>
                <Typography className={classes.mapSectionTitle} variant='h4'>Venue details</Typography>
                <Map
                  lat={lat}
                  long={lon}
                  text={
                    <div>
                      <div>{venueName}</div>
                      <div>{`${line}, ${city}, ${state}`}</div>
                    </div>
                  }
                  height='300px'
                  width='100%'
                />
                <Box className={classes.venueAddress} >
                  <Typography className='name'>{venueName}</Typography>
                  <Typography>{`${line}, ${city}, ${state}`}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container direction='column' item xs={3} spacing={3} className={classes.sideBar}>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.borderBottom)}>
                <Box className={classes.padding20}>
                  <Typography>We sent your ticket to:</Typography>
                  <Typography>{userStore.email}</Typography>
                </Box>
                <ButtonBase className={classes.sidebarButton} onClick={() => this.handleEmailTicket(userStore.email, ticketUrl)}>
                  <EmailIcon fontSize='large' />
                  <Typography>Email my ticket</Typography>
                </ButtonBase>
                <ButtonBase className={classes.sidebarButton} onClick={this.handlePrintPage}>
                  <PrintIcon fontSize='large' />
                  <Typography>Print my ticket</Typography>
                </ButtonBase>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.borderBottom)}>
                <Link href='/account/ticketOrders'>
                  <a className={classes.aTags}>
                    <ButtonBase className={classes.sidebarButton}>
                      <ViewListIcon fontSize='large' />
                      <Typography>View orders</Typography>
                    </ButtonBase>
                  </a>
                </Link>
                {/* <ButtonBase className={classes.sidebarButton}>
                  <CancelIcon fontSize='large' />
                  <Typography>Cancel</Typography>
                </ButtonBase> */}
              </Box>
            </Grid>
            <Grid item>
              <Box className={classNames(classes.lighterBg, classes.borderBottom)}>
                <Typography className={classes.shareLabel}>Share this film with others!</Typography>
                <ShareButtons 
                  show={['Facebook', 'Twitter', 'LinkedIn', 'CopyURL']}
                  shareURL={shareUrl} 
                  message={shareMessage} 
                  onCopy={this.onCopy}
                  orientation='horizantal' 
                  iconSize='large'
                  hideLabels 
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <UrlWasCopiedSnackbar
          open={this.state.showCopiedFeedback}
          handleSnackbarClose={
            (evt, reason) => {
              if (reason === 'clickaway') {
                return
              }
              this.setState({
                showCopiedFeedback: false,
              })
            }
          }
        />
      </Box>
    )
  }
}

const UrlWasCopiedSnackbar = ({ open, handleSnackbarClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={1000}
    TransitionComponent={Fade}
    message={<span>Movie url copied</span>}
    onClose={handleSnackbarClose}
  />
)


export default withRouter(withStyles(styles)(OrderDetailsView))
