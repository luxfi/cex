import {
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'

import React from 'react'

export default (props) => {
  const {
    name,
    amount,
    date,
    deposit,
  } = props

  return (
    <Grid item xs={12}>
      <Grid container direction='column' spacing={0}>
        <Divider style={{ marginBottom: '15px' }} />
        <Grid container>
          <Grid item xs={8}>
            <Typography variant='h5'>
              {deposit ? 'Deposit from' : 'Withdrawal to'} {name}
            </Typography>
            <Typography variant='h6'>
              {date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            { deposit
              ? <Typography variant='h6' style={{ color: 'green' }}>
                + ${amount}
              </Typography>
              : <Typography variant='h6' style={{ color: 'red' }}>
                - ${amount}
              </Typography>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
