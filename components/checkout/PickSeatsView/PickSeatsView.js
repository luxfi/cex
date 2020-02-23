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

  openModal = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeDialog()
  }

  selectSeat = (seatName, index) => () => {
    const { store: { pickSeatStore } } = this.props
    pickSeatStore.toggleSeatSelection(seatName, index)
  }

  render() {
    const {
      classes,
      router,
      store: {
        uiStore,
        pickSeatStore: {
          seats,
        },
        ticketingStore: {
          venueShowtimes,
          selectedDate,
          selectedShowtime,
        },
        ticketCheckoutStore: {
          subTotal,
        },
      },
    } = this.props
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
              <button type='button' className={classes.seatLegendbtn} onClick={this.openModal}>Seat Legend</button>
              <CustomDialog
                open={uiStore.dialog.open}
                title='Seat Legend'
                handleClose={this.closeDialog}
              >
                <List className={classes.seatLegendList}>
                  <ListItem>
                    <ListItemIcon>
                      <img src='/images/seats/user.png' alt='' className={classes.seatLegendIcon}/>
                    </ListItemIcon>
                    <ListItemText primary='My Seat' />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <img src='/images/seats/standard.png' alt='' className={classes.seatLegendIcon}/>
                    </ListItemIcon>
                    <ListItemText primary='Standard' className={classes.seatLegendIcon} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <img src='/images/seats/wheelchair.png' alt='' className={classes.seatLegendIcon}/>
                    </ListItemIcon>
                    <ListItemText primary='Wheelchair' />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <img src='/images/seats/companion.png' alt='' className={classes.seatLegendIcon}/>
                    </ListItemIcon>
                    <ListItemText primary='Companion' />
                  </ListItem>
                </List>
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
                          <Tooltip title={seatCoulumn.name} aria-label={seatCoulumn.name}>
                            <button style={{ border: 'none', background: 'none' }} type='button' onClick={this.selectSeat(seatCoulumn.name, index)}>
                                <img
                                  className={classes.seatImage}
                                  src={`/images/seats/${seatCoulumn.selected ? 'user' : seatCoulumn.type}.png`}
                                  alt=''
                                />
                            </button>
                          </Tooltip>
                        </li>
                      )) }
                    </Grid>))
                }
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
            <Typography variant='h6' className={classes.subHeader}>YOUR SEATS</Typography>
            <Typography variant='h5' className={classes.selectedSeats} noWrap>
              E14, E13, E12, E11, E10, E9
            </Typography>
          </Grid>
          <Grid container justify='flex-end'>
            <Box>
              <Typography variant='h6' className={classes.subHeader}>SUBTOTAL</Typography>
              <Typography variant='h5' className={classes.subTotal}>{formatCurrency(subTotal)}</Typography>
            </Box>
            <Grid>
              <Button className={classes.nextButton}>NEXT</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(PickSeatsView))
