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
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'

import { formatCurrency, slugFromPath } from '../../../util'

import styles from './checkout.style.js'

@inject('store')
@observer
class CheckoutView extends React.Component {
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
        },
      },
    } = this.props
    const slug = router.query.slug || slugFromPath()
    const urlParams = new URLSearchParams(window.location.search)
    const showtimeId = urlParams.get('showtimeId')
    const venueId = urlParams.get('venueId')
    const refHash = urlParams.get('ref')

    const movie = movieStore.getMovieBySlug(slug)

    const refString = refHash && refHash.length ? `&ref=${refHash}` : ''

    return (
      <Grid className={classes.outerContainer}>
        <Grid container alignItems='flex-start' justify='center' className={classes.innerContainer}>
          <Box className={classes.ticketQuantityContainer}>
            <Table className={classes.table} aria-label='customized table'>
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
                          ? (<Grid container justify='flex-end' alignItems='center' wrap='nowrap'>
                          <button onClick={this.removeTicket(ticket.category)} type='button' className={classes.ticketBtn}>
                            <RemoveCircleOutlineIcon className={classes.buttonIcon} />
                          </button>
                          <Typography variant='h5' className={classes.ticketQuantity}>{ticket.quantity}</Typography>
                          <button onClick={this.addTicket(ticket.category)} type='button' className={classes.ticketBtn}>
                            <AddCircleOutlineOutlinedIcon className={classes.buttonIcon} />
                          </button>
                        </Grid>) : <Button className={classes.addBtn} onClick={this.addTicket(ticket.category)}>ADD</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box className={classes.tableFooter}>
              <a href='https://www.atomtickets.com/help/entry/smg-age-policy' className={classes.agePolicyLink}>
                <DateRangeIcon className={classes.agePolicyLinkIcon} />
                Age Policy
              </a>
            </Box>
          </Box>
          <Box>
            <Box><img className={classes.movieImg} src={movie.posterImg} alt='' /></Box>
            <Box>
              <Typography variant='h5'>{movie.name}</Typography>
              <Box>Cinemark Hollywood USA Movies 15</Box>
              <Box>Monday at 3:45 PM</Box>
            </Box>
          </Box>
        </Grid>
        <Grid container justify='flex-end' alignItems='center' className={classes.subTotalContainer}>
          <Box>
            <Typography variant='h6' className={classes.subTotalText}>SUBTOTAL</Typography>
            <Typography variant='h5' className={classes.subTotal}>{formatCurrency(subTotal)}</Typography>
          </Box>
          <Grid>
            <Link href='/pickSeats' as={`/pickSeats/${slug}?venueId=${venueId}&showtimeId=${showtimeId}${refString}`}>
              <Button className={classes.nextButton}>PICK SEATS</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(CheckoutView))
