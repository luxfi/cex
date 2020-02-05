import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router';
import { Box, Grid, Button, Container, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Add from '../../../assets/svg/Add.svg';
import Minus from '../../../assets/svg/Minus.svg';
import Calendar from '../../../assets/svg/Calendar.svg';

import styles from './tickets.style'

const imgSrc = 'https://atom-tickets-res.cloudinary.com/image/upload/c_lfill,f_auto,g_north,q_auto,w_300/v1567707539/ingestion-images-archive-prod/archive/1567707538556_194671_cops_0.jpg';

class Tickets extends React.Component {
  render() {
    const { classes } = this.props;
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
                  <Minus className={classes.buttonIcon} />
                </button>
                <Typography variant="h5" className={classes.ticketQuantity}>1</Typography>
                <button className={classes.ticketBtn}>
                  <Add className={classes.buttonIcon} />
                </button>
              </Grid>
            </Grid>
            <Box container className={classes.tableFooter}>
              <a className={classes.agePolicyLink}>
                <Calendar className={classes.agePolicyLinkIcon} />
                Age Policy
              </a>
            </Box>
          </Grid>
          <Box>
            <Box><img className={classes.movieImg} src={imgSrc} /></Box>
            <Box>
              <Typography variant="h5">Terminator: Dark Fate</Typography>
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
            <Link href="/checkout/368249511/payment-method">
              <Button className={classes.nextButton}>NEXT</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(Tickets))
