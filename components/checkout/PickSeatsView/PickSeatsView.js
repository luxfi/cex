import {
  Box,
  Button,
  Divider,
  Grid,
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

import { AuthModal, CustomDialog, Loading } from '../../app'

import styles from './pickSeats.style'

@withRouter
@withStyles(styles)
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
        uiStore,
      },
    } = this.props

    if (!loggedIn) {
      return uiStore.openAuthModal()
    }

    const slug = router.query.slug || slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')
    const refHash = urlParams.get('ref')

    if (!loggedIn) {
      return uiStore.openAuthModal()
    }

    const refString = (refHash && refHash.length) ? `&ref=${refHash}` : ''
    return router.push('/confirmPayment', `/confirmPayment/${slug}?venueId=${venueId}&showtimeId=${showtimeId}${refString}`)
  }

  render() {
    const {
      classes,
      router,
      store: {
        uiStore,
        uiStore: { authModalOpen, tabIndexValue },
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
    const refHash = urlParams.get('ref')
    const movieSlug = router.query.slug || slugFromPath()
    const refString = (refHash && refHash.length) ? `&ref=${refHash}` : ''

    const localShowtimeStart = selectedShowtime && selectedShowtime.localShowtimeStart
    const formatedDate = selectedDate && selectedDate.formated

    return (
      <>
        <AuthModal authModalOpen={authModalOpen} tabIndexValue={tabIndexValue} />
        <CustomDialog
          open={uiStore.dialog.open}
          title='Seat Legend'
          handleClose={this.closeDialog}
        >
          <div>
            <div className={classes.seatLegend}>
              <img src='/images/seats/selectedSeat.png' alt='' className={classes.seatLegendIcon}/>
              <span>My Seat</span>
            </div>
            <div className={classes.seatLegend}>
              <img src='/images/seats/standard.png' alt='' className={classes.seatLegendIcon}/>
              <span>Standard</span>
            </div>
            <div className={classes.seatLegend}>
              <img src='/images/seats/wheelchair.png' alt='' className={classes.seatLegendIcon}/>
              <span>Wheelchair</span>
            </div>
            <div className={classes.seatLegend}>
              <img src='/images/seats/companion.png' alt='' className={classes.seatLegendIcon}/>
              <span>Companion</span>
            </div>
            <div item xs={12} sm={4}>
              <img src='/images/seats/pickedSeat.png' alt='' className={classes.seatLegendIcon}/>
              <span>Unavailable Seat</span>
            </div>
          </div>
        </CustomDialog>
        <CustomDialog
          open={modalOpened}
          handleClose={this.closeModal}
        >
          <div>
            <Typography>{modalMessage}</Typography>
            <Button className={classes.okButton} onClick={this.closeModal}>OK</Button>
          </div>
        </CustomDialog>
        <div className={classes.outerContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} md={10} className={classes.seatsSection}>
              <Grid className={classes.seatsTimerContainer} container justify='space-between' alignItems='center'>
                <span>
                  {`${formatedDate} ${moment(localShowtimeStart).format('hh:mm A')}`}
                </span>
                <button type='button' className={classes.seatLegendbtn} onClick={this.openDialog}>Seat Legend</button>
              </Grid>
              <div className={classes.seatsContainer}>
                <Typography className={classes.screenHeader} align='center' variant='h12'>SCREEN</Typography>
                <Divider light />
                <div className={classes.screenSection}>
                  {
                    seats.map((seatRow, index) => (<div key={uuid.v4()} className={classes.seatColumn}>
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
                      </div>))
                  }
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={2} className={classes.formatSection}>
              <div>
                <Typography className={classes.formatHeader} align='center' variant='h12'>STANDARD FORMAT</Typography>
              </div>
              <div className={classes.btnList}>
                <Loading loading={!venueShowtimes.length}>
                  {
                    venueShowtimes.map((showtime) => (
                        <Link
                          key={showtime.showtimeId}
                          href='/pickSeats'
                          as={`/pickSeats/${movieSlug}?venueId=${venueId}&showtimeId=${showtime.showtimeId}${refString}`}
                        >
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
                  }
                </Loading>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h12' className={classes.subHeader} noWrap>YOUR SEATS</Typography>
              <Typography variant='h5' className={classes.selectedSeats} noWrap>
                {totalSeatsCount < ticketsCount
                  ? (<span>{totalSeatsCount} of {ticketsCount} selected</span>)
                  : selectedSeats.map((selectedSeat) => (
                  <span key={selectedSeat.name}>{selectedSeat.name} </span>
                  ))
                }
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.nextButtonContainer}>
                <Typography variant='h12' className={classes.subHeader}>SUBTOTAL</Typography>
                <Typography variant='h5' className={classes.subTotal}>{formatCurrency(subTotal)}</Typography>
                <Button
                  className={classes.nextButton}
                  disabled={totalSeatsCount < ticketsCount || ticketsCount <= 0}
                  onClick={this.gotoNextPage}
                >
                  NEXT
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }
}

export default PickSeatsView
