import React from 'react'
import {
  Button,
  Divider,
  Grid,
  Typography
 } from '@material-ui/core'
//  import {AddIcon} from "@material-ui/icons/Backup"

export default (props) => {
  const {
    accountName,
    accountNumber,
    accountType,
    subtype,
    institution,
    removeAccount
  } = props

  let iconType
  switch (accountType) {
    case 'depository':
      iconType = 'account_balance'
      break
    case 'credit':
      iconType = 'credit_card'
      break
    default:
      iconType = 'account_balance'
      break
  }

  // accountType is 'bank' or 'cc'

  return (
    <Grid item xs={12}>
      <Grid container direction="column" spacing={0}>
        <Divider style={{ marginBottom: '15px' }} />
        <Grid container>
          <Grid item xs={3}>
          <i className="material-icons" style={{ fontSize: '60px' }}>
            {iconType}
          </i>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">
              {accountName} - {accountNumber}
            </Typography>
            <Typography variant="h6">
              {institution} {subtype} ****{accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={removeAccount}
              variant="outlined"
              style={{ height: '55px' }}
              id='removeLinkedAccountButton'
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
