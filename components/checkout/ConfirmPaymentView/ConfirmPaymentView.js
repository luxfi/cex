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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import classNames from 'classnames'
import faker from 'faker'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { withRouter } from 'next/router'
import React from 'react'
import uuid from 'uuid'

import { formatCurrency, slugFromPath } from '../../../util'

import { AddPaymentMethodModal, CreditCardIconType } from '../../app'

import styles from './confirmPayment.style'

@inject('store')
@observer
class ConfirmPaymentView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      processingPayment: false,
      transactionStatus: null,
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')

    const { store: { ticketingStore } } = this.props
    ticketingStore.selectShowtime(showtimeId)
    ticketingStore.selectVenue(venueId)
  }

  openAddPaymentMethodModal = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  openEditCardPaymentMethodModal = (cardIndex) => () => {
    const { store: { userStore, uiStore } } = this.props
    uiStore.openDialog()
    userStore.selectPaymentMethod('card')
    userStore.enableCardEditMode(cardIndex)
  }

  choosePaymentMethod = (paymentMethodIndex, paymentType, cardInfo) => () => {
    const { store: { userStore } } = this.props
    userStore.choosePaymentMethod(paymentMethodIndex, paymentType, cardInfo)
  }

  purchaseTickets = async () => {
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
    const refHash = urlParams.get('ref')
    const transactionId = faker.random.uuid()
    const ticketId = faker.random.number()
    const movieSlug = router.query.slug || slugFromPath()

    const refParamString = (refHash && refHash.length) ? `&ref=${refHash}` : ''

    this.setState({
      processingPayment: true,
      transactionStatus: null,
    })

    const metadata = { venueId, showtimeId, ticketId, numberOfSeats, movieSlug, paymentType: 'movieTicket' }

    if (paymentType === 'bank') {
      if (accountBalance >= total) {
        ticketCheckoutStore.addTransaction({
          metadata: {
            venueId,
            showtimeId,
            transactionId,
            ticketId,
            numberOfSeats,
            movieSlug,
          },
          referrerId: refHash,
          date: new Date(),
        })

        await ticketCheckoutStore.checkoutOrder(total, userStore.account, cardInfo, refHash, metadata, 'deposit') // deposit should be removed. Just a hack to make deposits work
        userStore.removeBalance(total)

        this.setState({ transactionStatus: 'successful' }, () => {
          router.push('/orderDetails', `/orderDetails/${movieSlug}?ticketId=${ticketId}${refParamString}`)
        })
      } else {
        this.setState({ transactionStatus: 'failed' })
      }
    } else if (paymentType === 'card') {
      const transaction = await ticketCheckoutStore.checkoutOrder(total, userStore.account, cardInfo, refHash, metadata)

      if (transaction && transaction.id) {
        ticketCheckoutStore.addTransaction(transaction)
        this.setState({ transactionStatus: 'successful' }, () => {
          router.push('/orderDetails', `/orderDetails/${movieSlug}?ticketId=${ticketId}${refParamString}`)
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
  }

  getFundStatus = (formattedAccount) => {
    const { store: { userStore: { accountBalance } } } = this.props
    if (formattedAccount.name === 'ESX') {
      return formatCurrency(accountBalance)
    }
    return 'Funded'
  }

  render() {
    const {
      classes,
      router,
      store: {
        movieStore,
        userStore: {
          cardPaymentOptions,
          formattedAccounts,
          paymentMethodIndex,
          paymentOptionSelected,
          accountBalance,
        },
        ticketCheckoutStore: {
          serviceFee,
          subTotal,
          total,
          tickets,
          paymentError,
        },
        ticketingStore: {
          selectedShowtime,
          selectedVenue,
          selectedDate,
        },
      },
    } = this.props

    const { processingPayment, transactionStatus } = this.state

    const movieSlug = router.query.slug || slugFromPath()
    const movie = movieStore.getMovieBySlug(movieSlug)

    return (
      <Grid container className={classes.outerContainer}>
        <Grid item xs={12} md={3}>
          <img className={classes.movieImg} src={`/images/film/${movie.posterImg}`} alt='' />
          <Typography variant='h5'>{movie.name}</Typography>
          <div>{selectedVenue.venue && selectedVenue.venue.address.line}</div>
          <div>{`${selectedDate.formated && selectedDate.formated} ${moment(selectedShowtime && selectedShowtime.localShowtimeStart).format('hh:mm A')}`}</div>
        </Grid>
        <Grid item xs={12} md={9}>
          <div className={classes.ticketContainer}>
            <div>
              <Typography className={classes.header} variant='h6'>Promo Codes</Typography>
              <div className={classes.promoCodeContainer}>
                <TextField
                  label='Promo Code'
                  variant='outlined'
                  size='small'
                  className={classes.promoCodeInput}
                />
                <Button className={classes.applyPromoBtn}>APPLY</Button>
              </div>
            </div>
            <div className={classes.ticketOrderContainer}>
              <Typography className={classes.header} variant='h6'>Your Order</Typography>
              <Table className={classes.table}>
                <TableBody>
                  {tickets.map(((ticket) => {
                    if (!ticket.quantity) return null
                    return (
                    <TableRow key={ticket.category}>
                      <TableCell>
                        {ticket.category} ticket
                      </TableCell>
                      <TableCell>
                        {formatCurrency(ticket.price * ticket.quantity)}
                      </TableCell>
                    </TableRow>
                    )}))}
                  <TableRow key='Subtotal'>
                    <TableCell>
                      Subtotal
                    </TableCell>
                    <TableCell>
                      {formatCurrency(subTotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow key='serviceFee'>
                    <TableCell>
                      Service fee
                    </TableCell>
                    <TableCell>
                      {formatCurrency(serviceFee)}
                    </TableCell>
                  </TableRow>
                  <TableRow key='total'>
                    <TableCell>
                      YOUR TOTAL
                    </TableCell>
                    <TableCell>
                      {formatCurrency(total)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <Typography variant='h6' style={{ marginBottom: 12 }}>Payment Method</Typography>
              {transactionStatus === 'failed'
                && (<Typography color='error'>
                  {paymentError || 'Transaction failed, try again.'}
                </Typography>)
              }
              <div className={classes.paymentMethodContainer}>
                {formattedAccounts.map((formattedAccount, index) => (
                  <Grid
                    key={uuid.v4()}
                    onClick={this.choosePaymentMethod(index, 'bank')}
                    className={`${classes.editCardSection} ${paymentMethodIndex === index ? 'selected' : null}`}
                    container
                    alignItems='center'
                    justify='space-between'
                    wrap='nowrap'
                    component='button'
                    disabled={(formattedAccount.name === 'ESX' && !accountBalance)}
                  >
                    <div className={classes.accountNameContainer}>
                      <AccountBalanceIcon fontSize='small' />
                      <Typography className={classes.accountName}>
                        {formattedAccount.name === 'ESX' ? 'Available Deposit' : formattedAccount.name}
                      </Typography>
                    </div>
                    <div className={classes.accountBalanceContainer}>
                      <Typography className={classes.accountBalance}>{this.getFundStatus(formattedAccount)}</Typography>
                    </div>
                  </Grid>
                ))}
                <Divider />
                {cardPaymentOptions.length ? cardPaymentOptions.map((paymentOption, cardIndex) => (
                  <Grid
                    onClick={this.choosePaymentMethod(cardIndex + formattedAccounts.length, 'card', paymentOption)}
                    className={`${classNames(classes.editCardSection, 'payment-method')} ${paymentMethodIndex === (cardIndex + formattedAccounts.length) ? 'selected' : null}`}
                    container
                    alignItems='center'
                    justify='space-between'
                    wrap='nowrap'
                    key={uuid.v4()}

                  >
                    <div className={classes.accountNameContainer}>
                      <CreditCardIconType cardType={paymentOption.type} className={classes.creditCardIcon} />
                      <span>ending in {paymentOption.creditCard.substr(paymentOption.creditCard.length - 4)}</span>
                    </div>
                    <button id='editPaymentButton' type='button' className={classes.link} onClick={this.openEditCardPaymentMethodModal(cardIndex)}>Edit</button>
                  </Grid>
                )) : null}
                <Divider />
                <div className={classes.addPaymentSection}>
                  <button id='addPaymentButton' onClick={this.openAddPaymentMethodModal} type='button' className={classes.link}>Add payment method</button>
                </div>
                <AddPaymentMethodModal />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.subTotalContainer}>
            <div>
              <Typography variant='h6' className={classes.subTotalText}>TOTAL</Typography>
              <Typography variant='h5' className={classes.subTotal}>{formatCurrency(total)}</Typography>
            </div>
            <div>
              <Button
                disabled={processingPayment || !paymentOptionSelected || total === serviceFee}
                className={classes.buyBtn}
                onClick={this.purchaseTickets}
                id='buyButton'
              >
                { processingPayment ? <CircularProgress color='inherit' /> : 'BUY' }
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(ConfirmPaymentView))
