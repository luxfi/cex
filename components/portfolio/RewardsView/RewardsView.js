/* eslint-disable react/prop-types */
import React from "react"
import { inject } from 'mobx-react'
import classNames from 'classnames'
import hashSum from 'hash-sum'

import {
  Fade,
  Grid,
  Icon,
  Paper,
  Snackbar,
  Typography,
  makeStyles
} from "@material-ui/core"

import { ShareButtons } from '../../app'

import myStyles from "./RewardsView.style.js"
const styles = makeStyles(myStyles)

const dummyRewardsURL = "esx.com/rewards/invite/zachk"

const CardOuter = (props) => {

  const {
    classes,
    disabled,
    leftAligned
  } = props

  let names = []
  names.push(classes.paper)
  if (!!disabled) {
    names.push(classes.disabledPaper)
  }
  if (!!leftAligned) {
    names.push(classes.leftAlignedPaper)
  }

  return (
    <Paper className={classNames(names)}>{props.children}</Paper>
  )
}

const RewardCard = (props) => {

  const {
    title,
    completed,
    points,
    double,
  } = props

  const classes = styles()

  const pointsString = completed ? points + " points earned" : "earn " + points + " points"
  const iconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
    // This ensures that the space occupied by the absent element is maintained
  const completedStringStyle = completed ? { visibility: "visible" } : { visibility: "hidden" }

  return (
    <CardOuter disabled={!completed} classes={classes}>
      <h6 className={classes.title}>{title}</h6>
      <Icon className={iconClasses}>stars_rounded</Icon>
      <p className={classes.pointsString}>{pointsString}</p>
      <p className={classes.completedString} style={completedStringStyle}><Icon className={classes.completedIcon}>check_circle</Icon>Completed</p>
    </CardOuter>
  )
}

const TotalCard = (props) => {

  const { total, monthTotal } = props
  const classes = styles()
  return (
    <CardOuter classes={classes}>
      <h6 className={classes.totalTitle}>Rewards</h6>
      <p className={classes.totalOuter}>
        <Icon className={classes.totalIcon}>stars_rounded</Icon>
        <span className={classes.totalString}>{total}</span>
      </p>
      <p className={classes.monthTotalString} >{monthTotal}&nbsp;this month</p>
    </CardOuter>
  )
}

const ReferralCard = (props) => {

  const { rewardsURL, rewardsShareMessage, onCopy } = props
  const classes = styles()

  return (
    <CardOuter leftAligned classes={classes} >
      <Typography className={classes.totalTitle}>Earn 15 points for each friend you invite to ESX</Typography>
      <ShareButtons 
        show={['Facebook', 'Twitter', 'LinkedIn', 'Email', 'CopyURL']}
        shareURL={rewardsURL} 
        message={rewardsShareMessage}
        onCopy={onCopy}
        iconSize='large'
        orientation='horizantal'
        hideLabels
      />
    </CardOuter>
  )
}

const UrlWasCopiedSnackbar = (props) => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={1000}
      TransitionComponent={Fade}
      message={<span>copied</span>}
      onClose={props.handleSnackbarClose} // this must be supplied, or the autohide won't work.
    />
  )
}

const rewards = [
  {
    id: 1,
    title: 'complete your profile',
    completed: true,
  },
  {
    id: 2,
    title: 'invite a friend',
    completed: false,
  },
  {
    id: 3,
    title: 'add a payment option',
    completed: true,
  },
  {
    id: 4,
    title: 'make 1 investment',
    completed: true,
  },
  {
    id: 5,
    title: 'make 2 investment',
  },
  {
    id: 6,
    title: 'make 1 investment',
  },
  {
    id: 7,
    title: 'make 10 investment',
  },
  {
    id: 8,
    title: 'make 20 investment',
  },
  {
    id: 9,
    title: 'make 50 investment',
  },
]


const getMyReferals = (email) => {
  const ticketTransactions = JSON.parse(localStorage.getItem('ticketTransactions'))

  if (ticketTransactions == null) {
    return 0
  }

  const myHashSum = hashSum(email)
  let count = 0
  ticketTransactions.forEach((t) => {
    if (t.refHash === myHashSum) {
      count++
    }
  })

  return count
}


const RewardsView = inject('store')((props) => {

  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = styles()
  const { store: { userStore }} = props
  const [wasCopied, setWasCopied] = React.useState(false)

  const rewardsURL = dummyRewardsURL;
  const rewardsShareMessage = "I'm enjoying and investing on Entertainment Stock Exchange. Join me!"

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TotalCard total={45} monthTotal={30} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ReferralCard
          rewardsURL={rewardsURL}
          message={rewardsShareMessage}
          onCopy={(ignore) => {setWasCopied(true)}}
        />
      </Grid>
      {
        rewards.map(reward => {
          if (reward.title == 'invite a friend') {

            const referrals = getMyReferals(userStore.email)
            return (
              <Grid key={reward.id} item xs={12} sm={4}>
                <RewardCard title={reward.title} points={5 * referrals} completed={(referrals > 0)}/>
              </Grid>
            )
          }
          return (
            <Grid key={reward.id} item xs={12} sm={4}>
              <RewardCard title={reward.title} points={5} completed={!!reward.completed}/>
            </Grid>
          )
        })
      }
    </Grid>
    <br />
    <UrlWasCopiedSnackbar
      open={wasCopied}
      handleSnackbarClose={
        (evt, reason) => {
          if (reason === 'clickaway') {
            return
          }
          setWasCopied(false)
        }
      }
    />
    </>
  )
})

export default RewardsView
