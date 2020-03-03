import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import moment from 'moment'
import faker from 'faker'

import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'

import { formatCurrency, slugFromPath } from '../../../util'

import { AddPaymentMethodModal } from '../../app'

import styles from './confirmPayment.style'

@inject('store')
@observer
class ConfirmPaymentView extends React.Component {
  state = {
    processingPayment: false,
    transactionStatus: null,
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')

    const { store: { ticketingStore } } = this.props
    ticketingStore.selectShowtime(showtimeId)
    ticketingStore.selectVenue(venueId)
  }

  addPaymentMethod = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  editCardPaymentMethod = (cardIndex) => () => {
    const { store: { userStore, uiStore } } = this.props
    uiStore.openDialog()
    userStore.selectPaymentMethod('card')
    userStore.enableCardEditMode(cardIndex)
  }

  choosePaymentMethod = (paymentMethodIndex, paymentType, cardInfo) => () => {
    const { store: { userStore, ticketCheckoutStore } } = this.props
    userStore.choosePaymentMethod(paymentMethodIndex, paymentType, cardInfo)
  }

  handleTcketPayment = () => {
    const {
      router,
      store: {
        userStore: { paymentType, cardInfo, accountBalance },
        ticketCheckoutStore: { total, numberOfSeats },
        ticketCheckoutStore,
        userStore,
      },
    } = this.props
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')
    const transactionId = faker.random.uuid()
    const ticketId = faker.random.number()
    const movieSlug = router.query.slug || slugFromPath()

    this.setState({
      processingPayment: true,
    })

    // simulate async operation
    // TODO setTimeout remove when API is ready
    setTimeout(() => {
      if (paymentType === 'bank') {
        if (accountBalance >= total) {
          ticketCheckoutStore.addTransaction(
            venueId,
            showtimeId,
            transactionId,
            ticketId,
            numberOfSeats,
            movieSlug,
          )
          userStore.removeBalance(total)

          this.setState({ transactionStatus: 'successful' }, () => {
            router.push('/orderDetails', `/orderDetails/${movieSlug}?ticketId=${ticketId}`)
          })
        } else {
          this.setState({ transactionStatus: 'failed' })
        }
      } else if (paymentType === 'card') {
        if (cardInfo.amount >= total) {
          ticketCheckoutStore.addTransaction(venueId, showtimeId, transactionId, ticketId, numberOfSeats, movieSlug)

          this.setState({ transactionStatus: 'successful' }, () => {
            router.push('/orderDetails', `/orderDetails/${movieSlug}?ticketId=${ticketId}`)
          })
        } else {
          this.setState({ transactionStatus: 'failed' })
        }
      } else {
        this.setState({ transactionStatus: 'failed' })
      }

      this.setState({
        processingPayment: false,
      })
    }, 3000)
  }

  renderCardIcons = (cardType) => {
    const { classes } = this.props

    if (cardType === 'visaCard') {
      return <VisaCard className={classes.creditCardIcon}/>
    }
    if (cardType === 'masterCard') {
      return <MasterCard className={classes.creditCardIcon} />
    }
    if (cardType === 'amexCard') {
      return <AmericanExpress className={classes.creditCardIcon} />
    }
    return <DiscoverCard className={classes.creditCardIcon} />
  }

  render() {
    const {
      classes,
      router,
      store: {
        movieStore,
        userStore: {
          paymentOptions,
          accountBalance,
          paymentMethodIndex,
          paymentOptionSelected,
        },
        ticketCheckoutStore: {
          serviceFee,
          subTotal,
          total,
          tickets,
        },
        ticketingStore: {
          selectedShowtime,
          selectedVenue,
          selectedDate,
        }
      },
    } = this.props

    const { processingPayment, transactionStatus } = this.state

    const movieSlug = router.query.slug || slugFromPath()
    const movie = movieStore.getMovieBySlug(movieSlug)

    return (
      <Grid container className={classes.outerContainer} justify='space-evenly' alignItems='flex-start'>
        <Box className={classes.ticketContainer}>
          <Box>
            <Typography className={classes.header} variant='h6'>Promo Codes</Typography>
            <Grid container justify='flex-start' wrap='nowrap' className={classes.promoCodeContainer}>
              <TextField
                label='Promo Code'
                variant='outlined'
                size='small'
                className={classes.promoCodeInput}
              />
              <Button className={classes.applyPromoBtn}>APPLY</Button>
            </Grid>
          </Box>
          <Box className={classes.ticketOrderContainer}>
            <Typography className={classes.header} variant='h6'>Your Order</Typography>
            <Table className={classes.table}>
              <TableBody>
                {tickets.map(((ticket) => (
                  <TableRow key={ticket.category}>
                    <TableCell>
                      {ticket.category} ticket
                    </TableCell>
                    <TableCell>
                      {formatCurrency(ticket.price)}
                    </TableCell>
                  </TableRow>
                )))}
                <TableRow>
                  <TableCell>
                    Subtotal
                  </TableCell>
                  <TableCell>
                    {formatCurrency(subTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Service fee
                  </TableCell>
                  <TableCell>
                    {formatCurrency(serviceFee)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    YOUR TOTAL
                  </TableCell>
                  <TableCell>
                    {formatCurrency(total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Typography variant='h6' style={{ marginBottom: 12 }}>Payment Method</Typography>
            {transactionStatus === 'failed' &&
              (<Typography color='error'>
                Transaction failed, try again.
              </Typography>)
            }
            <Box className={classes.paymentMethodContainer}>
              {paymentOptions.length ? paymentOptions.map((paymentOption, cardIndex) => (
                <Grid
                  onClick={this.choosePaymentMethod(cardIndex, 'card', paymentOption)}
                  className={`${classes.editCardSection} ${paymentMethodIndex === cardIndex ? 'selected' : null}`}
                  container
                  alignItems='center'
                  justify='space-between'
                  wrap='nowrap'
                >
                  <Grid container alignItems='center'>
                    {this.renderCardIcons(paymentOption.type)}
                    <span>ending in {paymentOption.creditCard.substr(paymentOption.creditCard.length - 4)}</span>
                  </Grid>
                  <button type='button' className={classes.link} onClick={this.editCardPaymentMethod(cardIndex)}>Edit</button>
                </Grid>
              )) : null}
              <Divider />
              <Grid
                onClick={this.choosePaymentMethod(paymentOptions.length, 'bank')}
                className={`${classes.editCardSection} ${paymentMethodIndex === paymentOptions.length ? 'selected' : null}`}
                container
                alignItems='center'
                justify='space-between'
                wrap='nowrap'
                component='button'
                disabled={!accountBalance}
              >
                <Typography style={{ fontSize: 14 }}>Bank Payment</Typography>
                <Typography style={{ fontSize: 14 }}>{accountBalance ? 'Connected' : 'Disconnected'}</Typography>
              </Grid>
              <Divider />
              <Box className={classes.addPaymentSection}>
                <button onClick={this.addPaymentMethod} type='button' className={classes.link}>Add payment method</button>
              </Box>
              <AddPaymentMethodModal />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box><img className={classes.movieImg} src={movie.posterImg} alt='' /></Box>
          <Box>
            <Typography variant='h5'>{movie.name}</Typography>
              <Box>{selectedVenue.venue && selectedVenue.venue.address.line}</Box>
              <Box>{`${ selectedDate.formated && selectedDate.formated} ${moment(selectedShowtime && selectedShowtime.localShowtimeStart).format('hh:mm A')}`}</Box>
          </Box>
        </Box>
        <Grid container justify='flex-end' alignItems='center' className={classes.subTotalContainer}>
          <Box>
            <Typography variant='h6' className={classes.subTotalText}>TOTAL</Typography>
            <Typography variant='h5' className={classes.subTotal}>{formatCurrency(total)}</Typography>
          </Box>
          <Grid>
            <Button
              disabled={!paymentOptionSelected}
              className={classes.buyBtn}
              onClick={this.handleTcketPayment}
            >
              { processingPayment ? <CircularProgress color='inherit' /> : 'BUY' }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(ConfirmPaymentView))
