import {
  Button,
  CircularProgress,
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
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { withRouter } from 'next/router'

import QRCode from 'qrcode.react'


import React from 'react'

import Link from '../../app/Link'

import { slugFromPath } from '../../../util'
import { Map, ShareButtons } from '../../app'
import styles from './orderDetails.style.js'


@inject('store')
@observer
class OrderDetailsView extends React.Component {
  state = {
    showCopiedFeedback: false,
    loading: true,
    ticketExist: false,
  }

  componentDidMount() {
    this.getTicketDetails()
  }

  getTicketDetails = async () => {
    const {
      store: {
        ticketingStore,
        ticketCheckoutStore,
      },
    } = this.props

    const slug = slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const ticketId = urlParams.get('ticketId')

    const ticketDetails = await ticketCheckoutStore.isValidPurchasedTicket(ticketId, () => {
      this.setState({ loading: false })
    })

    if (ticketDetails && ticketDetails.movieSlug === slug) {
      ticketingStore.selectVenue(ticketDetails.venueId)
      this.setState({ ticketExist: true })
    }
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
    const movie = movieStore.getStockBySlug(slug)

    const refHash = userStore.referrerId
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

    const { loading, showCopiedFeedback, ticketExist } = this.state

    const movieShowtimeDetails = this.getShowtime(ticketDetails.showtimeId) || {}
    const movieDate = moment(movieShowtimeDetails.localShowtimeStart).format('Do MMM')
    const movieTime = moment(movieShowtimeDetails.localShowtimeStart).format('LT')
    const qrCodeData = encodeURI(ticketUrl) // ideally, this should be the ticket information

    return (
      <div className={classes.outerContainer}>
        {
          loading ? (
            <div className={classes.loadingIcon}>
              <CircularProgress />
            </div>
          ) : (
            <>
            <div className={classes.topText}>
              <Typography variant='h4'>{ ticketExist ? 'You\'re all set' : 'Invalid Ticket' }</Typography>
              <Typography component='span'>
                { ticketExist ? 'Find your ticket details below' : 'It seems you\'re using a broken link or trying to access a ticket that doesn\'t exist' }
              </Typography>
            </div>
            { ticketExist &&
              <Grid container className={classes.innerContainer}>
                <Grid item md={9} xs={12} className={classNames(classes.mainContentArea, 'print-area')}>
                  <div className={classes.qrCodeSection}>
                    <img src={`/images/film/${movie.posterImg}`} alt={`${movie.name} poster`} />
                    <QRCode value={qrCodeData} size={250} level='M' includeMargin />
                    <Typography variant='h4'>{movie.name}</Typography>
                  </div>
                  <div className={classes.contentBox}>
                    <div className={classes.detailBox}>
                      <div className={classes.screenDetailsWrapper}>
                        <div item xs className={classes.ticketDetail}>
                          <Typography variant='body1'>{movieDate}</Typography>
                          <Typography component='span'>{movieTime}</Typography>
                        </div>
                        <div item xs className={classes.ticketDetail}>
                          <Typography variant='body1'>Screen</Typography>
                          <Typography component='span'>11</Typography>
                        </div>
                        <div item xs className={classes.ticketDetail}>
                          <Typography variant='body1'>{ ticketDetails.numberOfSeats === 1 ? '1 Seat' : `${ticketDetails.numberOfSeats} seats`}</Typography>
                          <Typography component='span'>View</Typography>
                        </div>
                      </div>
                      <div className={classes.ticketDetailsLink}>
                        <Button
                          variant='text'
                          color='secondary'
                          className={classes.button}
                          startIcon={<LocationOnIcon />}
                        >
                          <Typography component='span'>{`${venueName}: ${line}, ${city}, ${state}`}</Typography>
                        </Button>
                      </div>
                      <div className={classes.ticketDetailsLink}>
                        <Button
                          variant='text'
                          color='secondary'
                          className={classes.button}
                          startIcon={<InfoIcon />}
                        >
                          <Typography component='span'>What to do at the Cinema</Typography>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={classes.contentBox}>
                    <div className={classes.locationSection}>
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
                      <div className={classes.venueAddress} >
                        <Typography className='name'>{venueName}</Typography>
                        <Typography>{`${line}, ${city}, ${state}`}</Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} xs={12} className={classes.sideBar}>
                  <div className={classes.contentBox}>
                    <div className={classes.detailBox}>
                      <div className={classes.emailInfo}>
                        <Typography>We sent your ticket to:</Typography>
                        <Typography>{userStore.email}</Typography>
                      </div>
                      <div className={classes.buttonWrapper}>
                        <Button
                          className={classes.sidebarButton}
                          onClick={() => this.handleEmailTicket(userStore.email, ticketUrl)}
                          startIcon={<EmailIcon />}
                          size='large'
                          fullWidth
                        >
                          Email my ticket
                        </Button>
                        <Button
                          className={classes.sidebarButton}
                          onClick={this.handlePrintPage}
                          startIcon={<PrintIcon />}
                          size='large'
                          fullWidth
                        >
                          Print my ticket
                        </Button>
                        <Link href='/account/orders' className={classes.aTags}>
                          <Button
                            className={classes.sidebarButton}
                            startIcon={<ViewListIcon />}
                            size='large'
                            fullWidth
                          >
                            View orders
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={classes.contentBox}>
                    <div className={classes.detailBox}>
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
                    </div>
                  </div>
                </Grid>
              </Grid>
            }
            <UrlWasCopiedSnackbar
              open={showCopiedFeedback}
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
            </>
          )
        }
      </div>
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
