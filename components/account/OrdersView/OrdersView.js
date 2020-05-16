import React from 'react'

import { 
  Card, 
  CardContent, 
  Paper, 
  makeStyles 
} from '@material-ui/core'

import OrdersElements from './OrdersElements'

import styles from '../account.style.js'

const useStyles = makeStyles(styles)

export default (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <OrdersElements />
        </CardContent>
      </Card>
    </Paper>
  )
}
