import React from "react"
import { Paper, makeStyles, Card, CardContent } from "@material-ui/core"

import ManagePhoneElement from './ManagePhoneElement'
import TwoStepVerificationElement from './TwoStepVerificationElement'

import styles from '../account.style'

const useStyles = makeStyles(styles)

const SecurityView = (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <ManagePhoneElement phoneNumber='2154551234' classes={classes} />
        </CardContent>
      </Card>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <TwoStepVerificationElement classes={classes} />
        </CardContent>
      </Card>
    </Paper>
  )
}

export default SecurityView
