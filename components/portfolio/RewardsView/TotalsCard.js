import React from 'react'

import {
  Box,
  Icon,
  Paper,
  Typography,
} from "@material-ui/core"

export default (props) => {

  const { 
    total, 
    monthTotal,
    classes
  } = props

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.totalTitle}>Total Credits</Typography>
      <Box className={classes.totalOuter}>
        <Icon className={classes.totalIcon}>stars_rounded</Icon>
        <span className={classes.totalString}>{total}</span>
      </Box>
      <Typography className={classes.monthTotalString} >{monthTotal}&nbsp;this month</Typography>
    </Paper>
  )
}
