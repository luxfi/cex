import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import DateRangeIcon from '@material-ui/icons/DateRange'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { withRouter } from 'next/router'
import React from 'react'

import Link from '../../app/Link'

import { formatCurrency, slugFromPath } from '../../../util'

import styles from './checkout.style'

@inject('store')
@observer
class CheckoutView extends React.Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')

    const { store: { ticketingStore } } = this.props
    ticketingStore.selectShowtime(showtimeId)
    ticketingStore.selectVenue(venueId)
  }

  addTicket = (categoryName) => () => {
    const {
      store: {
        ticketCheckoutStore,
      },
    } = this.props
    ticketCheckoutStore.addTicket(categoryName)
  }

  removeTicket = (categoryName) => () => {
    const {
      store: {
        ticketCheckoutStore,
      },
    } = this.props
    ticketCheckoutStore.removeTicket(categoryName)
  }

  render() {
    const {
      classes,
      router,
      store: {
        movieStore,
        ticketCheckoutStore: {
          subTotal,
          tickets,
          ticketsCount,
        },
        ticketingStore: {
          selectedShowtime,
          selectedVenue,
          selectedDate,
        },
      },
    } = this.props
    const slug = slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')
    const refHash = urlParams.get('ref')

    const movie = movieStore.getMovieBySlug(slug)

    const refString = refHash && refHash.length ? `&ref=${refHash}` : ''

    return (
      <div className={classes.outerContainer}>
        <div className={classes.innerContainer}>
          <Grid item xs={12} md={3} className={classes.movieInfoContainer}>
            <img className={classes.movieImg} src={`/images/film/${movie.posterImg}`} alt='movie image' />
            <div>
              <Typography variant='h5'>{movie.name}</Typography>
              <div>{selectedVenue.venue && selectedVenue.venue.address.line}</div>
              <div>{`${selectedDate.formated && selectedDate.formated} ${moment(selectedShowtime && selectedShowtime.localShowtimeStart).format('hh:mm A')}`}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <Table className={classes.table} aria-label='Movie ticket table'>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.ticketColumnHeader}>Ticket</TableCell>
                  <TableCell className={classes.ticketColumnHeader} align='right'>Price</TableCell>
                  <TableCell className={classes.ticketColumnHeader} align='right'>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.category}>
                    <TableCell className={classes.ticketColumn} component='th' scope='row'>
                      {ticket.category}
                    </TableCell >
                    <TableCell className={classes.ticketColumn} align='right'>{formatCurrency(ticket.price)}</TableCell>
                    <TableCell align='right'>
                      {
                        ticket.quantity
                          ? (<div className={classes.manageQuantitySection}>
                          <button onClick={this.removeTicket(ticket.category)} type='button' className={classNames(classes.ticketBtn, 'minus-button')}>
                            <RemoveCircleOutlineIcon className={classes.buttonIcon} />
                          </button>
                          <Typography variant='h5' className={classes.ticketQuantity}>{ticket.quantity}</Typography>
                          <button onClick={this.addTicket(ticket.category)} type='button' className={classNames(classes.ticketBtn, 'plus-button')}>
                            <AddCircleOutlineOutlinedIcon className={classes.buttonIcon} />
                          </button>
                        </div>) : <Button className={classNames(classes.addBtn, 'add-button')} onClick={this.addTicket(ticket.category)}>ADD</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.tableFooter}>
              <a href='https://www.atomtickets.com/help/entry/smg-age-policy' className={classes.agePolicyLink}>
                <DateRangeIcon className={classes.agePolicyLinkIcon} />
                Age Policy
              </a>
            </div>
          </Grid>
        </div>
        <div className={classes.subTotalContainer}>
          <div>
            <div>
              <Typography variant='h6' className={classes.subTotalText}>SUBTOTAL</Typography>
              <Typography variant='h5' className={classes.subTotal}>{formatCurrency(subTotal)}</Typography>
            </div>
            <div>
              <Link
                href='/pickSeats/[id]'
                as={`/pickSeats/${slug}?venueId=${venueId}&showtimeId=${showtimeId}${refString}`}
                className={classes.aTag}
              >
                <Button disabled={ticketsCount <= 0} className={classes.nextButton} id='pickSeatsButton'>PICK SEATS</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(CheckoutView))
