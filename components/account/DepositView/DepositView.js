import React from "react"
import { Paper, makeStyles, Card, CardContent } from "@material-ui/core"

import DepositElement from './DepositElement'

import styles from '../account.style'

const useStyles = makeStyles(styles)

const DepositView = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <DepositElement />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default DepositView
