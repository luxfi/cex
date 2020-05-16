import React from "react"

import { 
  Card, 
  CardContent,
  makeStyles,
  Paper
} from "@material-ui/core"

import ManagePhoneElements from './ManagePhoneElements'
import TwoStepVerificationElements from './TwoStepVerificationElements'

import styles from '../account.style.js'

const useStyles = makeStyles(styles)

export default (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <ManagePhoneElements phoneNumber='2154551234' classes={classes} />
        </CardContent>
      </Card>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <TwoStepVerificationElements classes={classes} />
        </CardContent>
      </Card>
    </Paper>
  )
}