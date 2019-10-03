/* eslint-disable react/prop-types */
import React, { useState } from "react"
import classNames from "classnames"
import { Grid, Paper, Icon } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { green, red } from '@material-ui/core/colors'

const miniReset = {
  margin: 0,
  padding: 0
}

const generalStyles = makeStyles(theme => ({

  root: {
    marginTop: "25px",
    marginBottom: "25px"
  },

}))

const cardStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: "216px",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  disabledText: {
    color: theme.palette.text.secondary + " !important",
  },

  title: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1rem",
    fontWeight: 200,
    marginBottom: "12px"
  },

  cardIcon: {
    display: "block",
    fontSize: '5.5rem',
    color: green[500],
    marginBottom: "6px"
  },
  disabledIcon: {
    color: theme.palette.grey[300] + " !important",
  },

  pointsString: {
    ...miniReset,
    marginBottom: "0.4rem",
  },
  completedIcon: {
    fontSize: '0.8rem',
    color: green[500],
    marginBottom: "-0.2rem",
    marginRight: "0.1rem"
  },
  completedString: {
    ...miniReset,
    fontSize: '0.7rem',
  },

  totalTitle: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: 300,
    marginBottom: "12px",
    textAlign: "baseline"
  },
  heartIcon: {
    display: "inline",
    fontSize: '2.5rem',
    color: red[800],
    paddingRight: "0.2rem",
  },
  totalString: {
    ...miniReset,
    fontSize: "2.3rem",
    fontWeight: 300,
    marginBottom: "12px"
  },

}))

const CardOuter = props => {
  const paperClasses = props.completed ? props.classes.paper : classNames(props.classes.paper, props.classes.disabledText)
  return (
    <Grid item xs={(props.double) ? 8 : 4}>
      <Paper className={paperClasses}>{props.children}</Paper>
    </Grid>
  )
}

const RewardCard = props => {

  const {
    title,
    completed,
    points,
    double,
  } = props

  const classes = cardStyles()

  const pointsString = completed ? points + " points earned" : "earn " + points + " points"
  const iconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
    // This ensures that the space occupied by the absent element is maintained
  const completedStringStyle = completed ? { visibility: "visible" } : { visibility: "hidden" }

  return (
    <CardOuter double={!!double} completed={!!completed} classes={classes}>
      <h6 className={classes.title}>{title}</h6>
      <Icon className={iconClasses}>stars_rounded</Icon>
      <p className={classes.pointsString}>{pointsString}</p>
      <p className={classes.completedString} style={completedStringStyle}><Icon className={classes.completedIcon}>check_circle</Icon>Completed</p>
    </CardOuter>  
  )
}

const TotalCard = props => {

  const { total, monthTotal } = props
  const classes = cardStyles()
  return (
      // completed sets the correct typogrpahy (non-disabled)
    <CardOuter completed classes={classes}>
      <h6 className={classes.totalTitle}>Rewards</h6>
      <p className={classes.totalString}><Icon className={classes.heartIcon}>favorite</Icon>{total}</p>
      <p className={classes.monthTotal} >{monthTotal}&nbsp;this month</p>
    </CardOuter>
  )
}

const RewardsView = (props) => {
  
  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = generalStyles()

  return (
    <Grid container spacing={3} className={classes.root}>
      <TotalCard total={45} monthTotal={30} />
      <CardOuter double complete classes={cardStyles()}/>
      <RewardCard title={"complete your profile"} points={5} completed/>
      <RewardCard title={"invite a friend"} completed points={15} completed />
      <RewardCard title={"add a payment option"} points={10} completed />
      <RewardCard title={"make 1 investment"} points={15} completed />
      <RewardCard title={"make 2 investments"} points={10} />
      <RewardCard title={"make 5 investments"} points={10} />
      <RewardCard title={"make 10 investments"} points={10} />
      <RewardCard title={"make 20 investments"} points={10} />
      <RewardCard title={"make 30 investments"} points={10} />
    </Grid>
  )
}

export default RewardsView