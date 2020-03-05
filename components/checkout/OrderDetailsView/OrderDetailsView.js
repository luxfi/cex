import {
  Box,
  Button,
  ButtonBase,
  Fade,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import CancelIcon from '@material-ui/icons/Cancel'
import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import InfoIcon from '@material-ui/icons/Info'
import LinkIcon from '@material-ui/icons/Link'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PrintIcon from '@material-ui/icons/Print'
import TwitterIcon from '@material-ui/icons/Twitter'
import ViewListIcon from '@material-ui/icons/ViewList'


import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import hashSum from 'hash-sum'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

import { slugFromPath } from '../../../util'

import styles from './orderDetails.style'

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

@inject('store')
@observer
class OrderDetailsView extends React.Component {
  state = {
    copyURL: false,
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

  onCopied = () => {
    this.setState({
      copyURL: true,
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
    const urlParams = new URLSearchParams(window.location.search)

    
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
        } = {},
      } = {},
    } = movieVenue || {}
    const movieShowtimeDetails = this.getShowtime(ticketDetails.showtimeId) || {}
    const movieDate = moment(movieShowtimeDetails.localShowtimeStart).format('Do MMM')
    const movieTime = moment(movieShowtimeDetails.localShowtimeStart).format('LT')

    const { copyURL } = this.state

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
                <CopyToClipboard text={shareUrl} onCopy={this.onCopied}>
                  <ButtonBase className={classes.sidebarButton}>
                    <LinkIcon fontSize='large' />
                    <Typography>Copy URL</Typography>
                  </ButtonBase>
                </CopyToClipboard>
                <ButtonBase className={classes.sidebarButton}>
                  <FacebookShareButton url={shareUrl} quote={shareMessage}>
                    <FacebookIcon fontSize='large' />
                    <Typography>Facebook</Typography>
                  </FacebookShareButton>
                </ButtonBase>
                <ButtonBase className={classes.sidebarButton}>
                  <TwitterShareButton url={shareUrl} quote={shareMessage}>
                    <TwitterIcon fontSize='large' />
                    <Typography>Twitter</Typography>
                  </TwitterShareButton>
                </ButtonBase>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <UrlWasCopiedSnackbar
          open={copyURL}
          handleSnackbarClose={
            (evt, reason) => {
              if (reason === 'clickaway') {
                return
              }
              this.setState({
                copyURL: false,
              })
            }
          }
        />
      </Box>
    )
  }
}

export default withRouter(withStyles(styles)(OrderDetailsView))
