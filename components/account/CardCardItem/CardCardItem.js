import {
  Button,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import React from 'react'

import CreditCardIconType from '../../app/CreditCardIconType'

export default (props) => {
  const {
    nameOnCard,
    creditCardNumber,
    cardType,
    expiryMonth,
    expiryYear,
    removeAccount,
  } = props

  return (
    <Grid item xs={12}>
      <Grid container direction='column' spacing={0}>
        <Divider style={{ marginBottom: '15px' }} />
        <Grid container>
          <Grid item xs={3}>
            <CreditCardIconType cardType={cardType} style={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5'>
              {nameOnCard} - {expiryMonth}/{expiryYear}
            </Typography>
            <Typography variant='h6' style={{ textTransform: 'capitalize' }}>
              {cardType} ****{creditCardNumber.substr(creditCardNumber.length - 4)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={removeAccount}
              variant='outlined'
              style={{ height: '55px' }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
