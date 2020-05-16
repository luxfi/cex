import React from "react"
import { Paper, makeStyles, Card, CardContent } from "@material-ui/core"

import DepositElements from './DepositElements'

import styles from '../account.style'

const useStyles = makeStyles(styles)

export default (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <DepositElements />
        </CardContent>
      </Card>
    </Paper>
  )
}
