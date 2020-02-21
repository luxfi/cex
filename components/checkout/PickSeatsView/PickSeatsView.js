import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'

import { formatCurrency, slugFromPath } from '../../../util'

import styles from './pickSeats.style'

@inject('store')
@observer
class PickSeatsView extends React.Component {
  render() {
    const {
      classes,
      router,
      store: {
        pickSeatStore: {
          seats,
        },
      },
    } = this.props
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const movieSlug = router.query.slug || slugFromPath()

    return (
      <Container maxWidth='md' className={classes.outerContainer}>
        <Grid container alignItems='flex-start' justify='space-evenly'>
          <Box className={classes.seatsSection}>
            <Grid className={classes.seatsTimerContainer} container justify='space-between' alignItems='center'>
              <span>Today at 6:50 PM</span>
              <span>Seat Legend</span>
            </Grid>
            <Box className={classes.seatsContainer}>
              <Typography className={classes.screenHeader} align='center' variant='h6'>SCREEN</Typography>
              <Divider light />
              <Box className={classes.screenSection}>
                {
                  seats.map((seatRow) => {
                    return (<Grid container justify='space-evenly' alignItems='center'>
                      { seatRow.map((seatCoulumn) => {
                        return (
                          <li className={classes.seats}>
                            <img className={classes.seatImage} src={`/images/seats/${seatCoulumn.type}.png`} alt=''/>
                          </li>
                        )
                      }) }
                    </Grid>)
                  })
                }
              </Box>
            </Box>
          </Box>
          <Box className={classes.formatSection}>
            <Grid container justify='space-between' alignItems='center'>
              <Typography className={classes.formatHeader} align='center' variant='h6'>STANDARD FORMAT</Typography>
            </Grid>
            <Grid container direction='column' wrap='nowrap' className={classes.btnList}>
              <Button className={classes.movieTimeBtn} size='large'>
                6:00 PM
              </Button>
              <Button className={classes.movieTimeBtn}>
                7:00 PM
              </Button>
              <Button className={classes.movieTimeBtn}>
                8:00 PM
              </Button>
              <Button className={classes.movieTimeBtn}>
                8:00 PM
              </Button>
              <Button className={classes.movieTimeBtn}>
                8:00 PM
              </Button>
              <Button className={classes.movieTimeBtn}>
                8:00 PM
              </Button>
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
              <Typography variant='h5' className={classes.subTotal}>{formatCurrency(20)}</Typography>
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
