import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'

import MasterCardIcon from '../../../assets/svg/MasterCard.svg'

import { formatCurrency, slugFromPath } from '../../../util'

import CustomDialog from '../../app/CustomDialog'


import styles from './confirmPayment.style'

@inject('store')
@observer
class ConfirmPaymentView extends React.Component {
  openDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeDialog()
  }

  render() {
    const {
      classes,
      router,
      store: {
        uiStore,
        movieStore,
        ticketCheckoutStore: {
          serviceFee,
          subTotal,
          total,
          tickets,
        },
      },
    } = this.props

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
            <Typography variant='h6'>Payment Method</Typography>
            <Box className={classes.paymentMethodContainer}>
              <Grid className={classes.editCardSection} container alignItems='center' justify='space-between' wrap='nowrap'>
                <Grid container alignItems='center'>
                  <MasterCardIcon className={classes.creditCardIcon}/>
                  <span>ending in 5463</span>
                </Grid>
                <button type='button' className={classes.link}>Edit</button>
              </Grid>
              <Divider />
              <Box className={classes.addPaymentSection}>
                <button onClick={this.openDialog} type='button' className={classes.link}>Add payment method</button>
              </Box>
              <CustomDialog
                open={uiStore.dialog.open}
                title='Select Payment Method'
                handleClose={this.closeDialog}
              >
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <AccountBalanceIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Bank Account' />
                    <ArrowForwardIosIcon color='disabled' />
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <ListItemIcon>
                      <CreditCardIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Debit Card' />
                    <ArrowForwardIosIcon color='disabled' />
                  </ListItem>
                </List>
              </CustomDialog>
            </Box>
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
        <Grid container justify='flex-end' alignItems='center' className={classes.subTotalContainer}>
          <Box>
            <Typography variant='h6' className={classes.subTotalText}>TOTAL</Typography>
            <Typography variant='h5' className={classes.subTotal}>{formatCurrency(total)}</Typography>
          </Box>
          <Grid>
            <Button className={classes.buyBtn}>BUY</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(ConfirmPaymentView))
