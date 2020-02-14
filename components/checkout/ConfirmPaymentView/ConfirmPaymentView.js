import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'

import { slugFromPath } from '../../../util'

import styles from './confirmPayment.style'

@inject('store')
@observer
class ConfirmPaymentView extends React.Component {
  render() {
    const {
      classes,
      router,
      store: {
        movieStore,
      },
    } = this.props

    const movieSlug = router.query.slug || slugFromPath()
    const movie = movieStore.getMovieBySlug(movieSlug)

    return (
      <Grid container className={classes.outerContainer} justify='between' alignItems='flex-start' spacing={3}>
        <Box>
          <Box>
            <Typography variant='h6'>Promo Codes</Typography>
            <Grid container spacing={2} justify='between'>
              <TextField
                label='Promo Code'
                variant='outlined'
                size='small'
              />
              <Button>APPLY</Button>
            </Grid>
          </Box>
          <Box>
            <Typography variant='h6'>Your Order</Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Adult ticket
                  </TableCell>
                  <TableCell>
                    $2.17
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Subtotal
                  </TableCell>
                  <TableCell>
                    $5.17
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Service fee
                  </TableCell>
                  <TableCell>
                    $1.17
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    YOUR TOTAL
                  </TableCell>
                  <TableCell>
                    $9.17
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Typography variant='h6'>Payment Method</Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    ending in 5438
                  </TableCell>
                  <TableCell>
                    Edit
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Add Payment Method
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
    )
  }
}

export default withRouter(withStyles(styles)(ConfirmPaymentView))
