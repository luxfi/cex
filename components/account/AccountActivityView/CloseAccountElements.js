import React from 'react'
import { Typography, Button } from '@material-ui/core'

export default (props) => {
  const { classes } = props

  return (
    <>
      <Typography>
        Withdraw funds and close your ESX Accounts - <span className={classes.warning}>this cannot be undone</span>
      </Typography>
      <Button variant="outlined">Close Account</Button>
    </>
  )
}
