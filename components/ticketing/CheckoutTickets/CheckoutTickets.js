import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react'
import { Box, Grid, Button, Container, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import DateRangeIcon from '@material-ui/icons/DateRange'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

import styles from './checkoutTickets.style'

@inject('store')
@observer
class CheckoutTickets extends React.Component {
  render() {
    const {
      classes,
      router: { query: { slug } },
      store: { movieStore }
    } = this.props;

    const [ movieSlug ] = slug;
    const movie = movieStore.getMovieBySlug(movieSlug);

    return (
      <Grid className={classes.outerContainer}>
        <Grid container alignItems="flex-start" justify="center" className={classes.innerContainer}>
          <Grid className={classes.ticketQuantityContainer}>
            <Grid container justify="space-between" className={classes.tableHeader}>
              <Box className={classes.ticketColumnHeader}>Ticket</Box>
              <Box className={classes.ticketColumnHeader}>Price</Box>
              <Box className={classes.ticketColumnHeader}>Quantity</Box>
            </Grid>
            <Grid container justify="space-between" className={classes.tableBody}>
              <Box className={classes.ticketColumn}>Matinee</Box>
              <Box className={classes.ticketColumn}>$2.17</Box>
              <Grid className={classes.ticketColumn} container justify="flex-start" alignItems="center" wrap="nowrap">
                <button className={classes.ticketBtn}>
                  <RemoveCircleOutlineIcon className={classes.buttonIcon} />
                </button>
                <Typography variant="h5" className={classes.ticketQuantity}>1</Typography>
                <button className={classes.ticketBtn}>
                  <AddCircleOutlineOutlinedIcon className={classes.buttonIcon} />
                </button>
              </Grid>
            </Grid>
            <Box container className={classes.tableFooter}>
              <a className={classes.agePolicyLink}>
                <DateRangeIcon className={classes.agePolicyLinkIcon} />
                Age Policy
              </a>
            </Box>
          </Grid>
          <Box>
            <Box><img className={classes.movieImg} src={movie.posterImg} /></Box>
            <Box>
              <Typography variant="h5">{movie.name}</Typography>
              <Box>Cinemark Hollywood USA Movies 15</Box>
              <Box>Monday at 3:45 PM</Box>
            </Box>
          </Box>
        </Grid>
        <Grid container justify="flex-end" alignItems="center" className={classes.subTotalContainer}>
          <Box>
            <Typography variant="h6" className={classes.subTotalText}>SUBTOTAL</Typography>
            <Typography variant="h5" className={classes.subTotal}>$15.19</Typography>
          </Box>
          <Grid>
            <Link href="payment-method">
              <Button className={classes.nextButton}>NEXT</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(CheckoutTickets))
