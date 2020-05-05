import React from "react"
import { Paper, makeStyles, Card, CardContent } from "@material-ui/core"

import OrdersElement from './OrdersElement'

import styles from '../account.style'

const useStyles = makeStyles(styles)

const OrdersView = (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <OrdersElement />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default OrdersView
