import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import uuid from 'uuid'


import { formatCurrency, slugFromPath } from '../../../util'

import CustomDialog from '../../app/CustomDialog'


import styles from './pickSeats.style'

@inject('store')
@observer
class PickSeatsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpened: false,
      modalMessage: '',
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const venueId = urlParams.get('venueId')
    const showtimeId = urlParams.get('showtimeId')

    const { store: { ticketingStore } } = this.props
    ticketingStore.getVenueShowtimes(venueId)
    ticketingStore.selectShowtime(showtimeId)
  }

  changeShowtime = (showtimeId) => () => {
    const { store: { ticketingStore } } = this.props
    ticketingStore.selectShowtime(showtimeId)
  }

  openDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeDialog()
  }

  closeModal = () => {
    this.setState({
      modalOpened: false,
      modalMessage: '',
    })
  }

  selectSeat = (seatName, seatStatus, seatType, index) => () => {
    const {
      store: {
        pickSeatStore,
        ticketCheckoutStore: {
          ticketsCount,
        },
      },
    } = this.props

    if ((pickSeatStore.totalSeatsCount < ticketsCount) || seatStatus) {
      pickSeatStore.toggleSeatSelection(seatName, index)

      if (seatType === 'wheelchair' && !seatStatus) {
        this.setState({
          modalOpened: true,
          modalMessage: 'You have selected a wheelchair space, not a seat.',
        })
      }

      if (seatType === 'companion' && !seatStatus) {
        this.setState({
          modalOpened: true,
          modalMessage: 'You have selected a wheelchair companion seat and may be asked to move.',
        })
      }
    }
  }

  gotoNextPage = () => {
    const {
      router,
      store: {
        userStore: { loggedIn },
      },
    } = this.props

    const slug = router.query.slug || slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')

    if (!loggedIn) {
      return router.push('/login?redirect=true')
    }
    return router.push('/confirmPayment', `/confirmPayment/${slug}?venueId=${venueId}&showtimeId=${showtimeId}`)
  }

  render() {
    const {
      classes,
      router,
      store: {
        uiStore,
        pickSeatStore: {
          seats,
          selectedSeats,
          totalSeatsCount,
        },
        ticketingStore: {
          venueShowtimes,
          selectedDate,
          selectedShowtime,
        },
        ticketCheckoutStore: {
          subTotal,
          ticketsCount,
        },
      },
    } = this.props
    const { modalOpened, modalMessage } = this.state

    const urlParams = new URLSearchParams(window.location.search)
    const venueId = urlParams.get('venueId')
    const showtimeId = urlParams.get('showtimeId')
    const movieSlug = router.query.slug || slugFromPath()

    return (
      <Container maxWidth='md' className={classes.outerContainer}>
        <Grid container alignItems='flex-start' justify='space-evenly'>
          <Box className={classes.seatsSection}>
            <Grid className={classes.seatsTimerContainer} container justify='space-between' alignItems='center'>
              <span>{`${selectedDate.formated} ${moment(selectedShowtime.localShowtimeStart).format('hh:mm A')}`}</span>
              <button type='button' className={classes.seatLegendbtn} onClick={this.openDialog}>Seat Legend</button>
              <CustomDialog
                open={uiStore.dialog.open}
                title='Seat Legend'
                handleClose={this.closeDialog}
              >
                <Grid container justify='center' alignItems='center' className={classes.seatLegendList}>
                  <Grid container wrap='nowrap' className={classes.seatLegendListRow}>
                    <Grid container>
                      <img src='/images/seats/selectedSeat.png' alt='' className={classes.seatLegendIcon}/>
                      <span>My Seat</span>
                    </Grid>
                    <Grid container>
                      <img src='/images/seats/standard.png' alt='' className={classes.seatLegendIcon}/>
                      <span>Standard</span>
                    </Grid>
                  </Grid>
                  <Grid container wrap='nowrap' className={classes.seatLegendListRow}>
                    <Grid container>
                      <img src='/images/seats/wheelchair.png' alt='' className={classes.seatLegendIcon}/>
                      <span>Wheelchair</span>
                    </Grid>
                    <Grid container>
                      <img src='/images/seats/companion.png' alt='' className={classes.seatLegendIcon}/>
                      <span>Companion</span>
                    </Grid>
                  </Grid>
                  <Grid container wrap='nowrap' className={classes.seatLegendListRow}>
                    <Grid container>
                      <img src='/images/seats/pickedSeat.png' alt='' className={classes.seatLegendIcon}/>
                      <span>Unavailable Seat</span>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomDialog>
            </Grid>
            <Box className={classes.seatsContainer}>
              <Typography className={classes.screenHeader} align='center' variant='h6'>SCREEN</Typography>
              <Divider light />
              <Box className={classes.screenSection}>
                {
                  seats.map((seatRow, index) => (<Grid key={uuid.v4()} container justify='space-evenly' alignItems='center'>
                      { seatRow.map((seatCoulumn) => (
                        <li key={uuid.v4()} className={classes.seats}>
                            <button
                              disabled={seatCoulumn.picked}
                              type='button'
                              style={{ border: 'none', background: 'none' }}
                              onClick={this.selectSeat(seatCoulumn.name, seatCoulumn.selected, seatCoulumn.type, index)}
                            >
                              <Tooltip title={seatCoulumn.name} aria-label={seatCoulumn.name}>
                                {
                                  seatCoulumn.type === 'empty' ? <span />
                                    : (<img
                                      className={classes.seatImage}
                                      src={`/images/seats/${seatCoulumn.picked ? 'pickedSeat' : seatCoulumn.selected ? 'selectedSeat' : seatCoulumn.type}.png`}
                                      alt='Seats'
                                    />)
                                }
                              </Tooltip>
                          </button>
                        </li>
                      )) }
                    </Grid>))
                }
                <CustomDialog
                  open={modalOpened}
                  handleClose={this.closeModal}
                >
                  <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography>{modalMessage}</Typography>
                    <Button className={classes.okButton} onClick={this.closeModal}>OK</Button>
                  </Grid>
                </CustomDialog>
              </Box>
            </Box>
          </Box>
          <Box className={classes.formatSection}>
            <Grid container justify='center'>
              <Typography className={classes.formatHeader} align='center' variant='h6'>STANDARD FORMAT</Typography>
            </Grid>
            <Grid container direction='column' wrap='nowrap' className={classes.btnList}>
              {
                venueShowtimes.length
                  ? venueShowtimes.map((showtime) => (
                    <Link key={showtime.showtimeId} href='/pickSeats' as={`/pickSeats/${movieSlug}?venueId=${venueId}&showtimeId=${showtime.showtimeId}`}>
                      <Button
                        className={`${classes.movieTimeBtn} 
                          ${showtime.showtimeId === showtimeId && classes.selectedBtn}`}
                        variant='outlined'
                        onClick={this.changeShowtime(showtime.showtimeId)}
                      >
                        {moment(showtime.localShowtimeStart).format('hh:mm A')}
                      </Button>
                    </Link>
                  ))
                  : 'Loading...'
              }
            </Grid>
          </Box>
        </Grid>
        <Grid container justify='space-between' alignItems='flex-start' wrap='nowrap' className={classes.subTotalContainer}>
          <Grid>
            <Typography variant='h6' className={classes.subHeader} noWrap>YOUR SEATS</Typography>
            <Typography variant='h5' className={classes.selectedSeats} noWrap>
              {totalSeatsCount < ticketsCount
                ? (<span>{totalSeatsCount} of {ticketsCount} selected</span>)
                : selectedSeats.map((selectedSeat) => (
                <span key={selectedSeat.name}>{selectedSeat.name} </span>
                ))
              }
            </Typography>
          </Grid>
          <Grid container justify='flex-end'>
            <Box>
              <Typography variant='h6' className={classes.subHeader}>SUBTOTAL</Typography>
              <Typography variant='h5' className={classes.subTotal}>{formatCurrency(subTotal)}</Typography>
            </Box>
            <Grid>
              <Button
                className={classes.nextButton}
                disabled={totalSeatsCount < ticketsCount}
                onClick={this.gotoNextPage}
              >
                NEXT
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(PickSeatsView))
