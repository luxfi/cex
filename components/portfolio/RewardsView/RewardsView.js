/* eslint-disable react/prop-types */
import React from "react"
import { inject } from 'mobx-react'
import classNames from 'classnames'
import hashSum from 'hash-sum'

import {
  Box,
  Button,
  Fade,
  Grid,
  Icon,
  InputBase,
  Paper,
  Snackbar,
  Typography,
  makeStyles
} from "@material-ui/core"

import Image from 'material-ui-image'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faClipboard } from "@fortawesome/free-solid-svg-icons"

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ShareButtons } from '../../app'

import myStyles from "./RewardsView.style.js"
const styles = makeStyles(myStyles)

const CardOuter = (props) => {


  const classes = styles()

  const {
    disabled,
    leftAligned,
    className
  } = props

  let names = []
  names.push(classes.paper)
  names.push(className)
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
    iconName
  } = props

  const classes = styles()

  const pointsString = completed ? points + " Credits earned" : "Earn " + points + " Credits"
  const typeIconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
  const creditsIconClasses = completed ? classes.creditIcon : classNames(classes.creditIcon, classes.disabledCreditIcon)
    // This ensures that the space occupied by the absent element is maintained
  const completedStringStyle = completed ? { visibility: "visible" } : { visibility: "hidden" }

  return (
    <CardOuter disabled={!completed}>
      <h6 className={classes.title}>{title}</h6>
      <Icon className={typeIconClasses} color='secondary'>{iconName}</Icon>
      <p className={classes.pointsString}><Icon className={creditsIconClasses} >stars_rounded</Icon>&nbsp;{pointsString}</p>
      <p className={classes.completedString} style={completedStringStyle}><Icon className={classes.completedIcon}>check_circle</Icon>Completed</p>
    </CardOuter>
  )
}

const MovieReferralsCard = (props) => {

  const {
    movie,
    referrals,
  } = props

  const classes = styles()

  let icons = []
  for (let i = 0; i< referrals; i++) {
    icons.push(<Icon className={classes.movieReferralIcon} color='secondary'>contact_mail</Icon>)
  }

  const pointsString = (referrals * 5) + " Credits earned"

  return (
    <CardOuter className={classes.referalCard}>
      <img src={movie.posterImg} width='auto' height='100%'/>
      <div className={classes.referalCardContentArea}>
        <Typography className={classes.referalCardTitle}>{movie.name}</Typography>
        <div className={classes.rewardIconsRow}>
          <Typography className={classes.referalCardReferralLabel}>Referrals:&nbsp;&nbsp;</Typography>{icons}
        </div>
        <p className={classes.referalCardPointsString}><Icon className={classes.referalCardCreditsIcon} >stars_rounded</Icon>&nbsp;{pointsString}</p>
      </div>
    </CardOuter>
  )
}


const TotalCard = (props) => {

  const { total, monthTotal } = props
  const classes = styles()
  return (
    <CardOuter>
      <Typography className={classes.totalTitle}>Total Credits</Typography>
      <Box className={classes.totalOuter}>
        <Icon className={classes.totalIcon}>stars_rounded</Icon>
        <span className={classes.totalString}>{total}</span>
      </Box>
      <p className={classes.monthTotalString} >{monthTotal}&nbsp;this month</p>
    </CardOuter>
  )
}

const ReferralCard = (props) => {

  const { rewardsURL, rewardsShareMessage, onCopy } = props
  const classes = styles()

  return (
    <CardOuter leftAligned >
      <Typography className={classes.totalTitle}>Refer a friend to ESX</Typography>
      <Box className={classes.urlCopyOuter}>
        <InputBase
          value={rewardsURL}
          className={classes.urlField}
          readOnly
        />
        <CopyToClipboard text={rewardsURL} onCopy={onCopy}>
          <Button variant="outlined">
            <FontAwesomeIcon className={classes.clipboardIcon} icon={faClipboard} />&nbsp;Copy
          </Button>
        </CopyToClipboard>
      </Box>
      <ShareButtons 
        show={['Facebook', 'Twitter', 'LinkedIn', 'Email']}
        shareURL={rewardsURL} 
        message={rewardsShareMessage}
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
    title: 'Complete your Profile',
    iconName: 'account_box',
    completed: true,
  },
  {
    id: 2,
    title: 'Add a Payment Option',
    iconName: 'payment',
    completed: true,
  },
  {
    id: 3,
    title: 'Refer a Friend',
    iconName: 'person_add',
    completed: true,
  },
  {
    id: 4,
    title: 'Make an Investment',
    iconName: 'shop',
    completed: false,
  },
 ]


const getMyReferals = (email) => {
  const ticketTransactions = JSON.parse(localStorage.getItem('ticketTransactions'))

  let result = {
    total: 0,
    byFilm: {}
  }
  if (ticketTransactions == null) {
    return result
  }

  const myHashSum = hashSum(email)
  ticketTransactions.forEach((t) => {
    if ('refHash' in t && t.refHash === myHashSum) {
      if (t.movieSlug in result.byFilm) {
        result.byFilm[t.movieSlug] += t.numberOfSeats
      }
      else {
        result.byFilm[t.movieSlug] = t.numberOfSeats
      }
      result.total += t.numberOfSeats
    }
  })
  return result
}


const RewardsView = inject('store')((props) => {

  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = styles()
  const { store: { userStore, movieStore }} = props
  const [wasCopied, setWasCopied] = React.useState(false)

  const rewardsURL = `${window.location.origin}/invite?ref=${hashSum(userStore.email)}`
  const rewardsShareMessage = "I'm watching and investing on Entertainment Stock Exchange. Join me!"


  const referrals = getMyReferals(userStore.email)
  let totalCredits = 10 // to start
  totalCredits += referrals.total * 5
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <ReferralCard
          rewardsURL={rewardsURL}
          message={rewardsShareMessage}
          onCopy={(ignore) => {setWasCopied(true)}}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TotalCard total={totalCredits} monthTotal={totalCredits} />
      </Grid>
      {rewards.map(reward => {
          //'Refer a friend'
        if (reward.id == 3) {
          const referralsPoints = referrals.total * 5
          return (
            <Grid key={reward.id} item xs={12} sm={3}>
              <RewardCard title={reward.title} points={referralsPoints} iconName={reward.iconName} completed={(referralsPoints > 0)}/>
            </Grid>
          )
        }
        return (
          <Grid key={reward.id} item xs={12} sm={3}>
            <RewardCard title={reward.title} points={5}  iconName={reward.iconName} completed={!!reward.completed}/>
          </Grid>
        )
      })}
      {Object.keys(referrals.byFilm).map((slug, i) => {
        console.log("SEARCHING FOR " + slug)
        const movie = movieStore.getMovieBySlug(slug)
        if (!movie) return null
        return (
          <Grid key={slug} item xs={12}>
            <MovieReferralsCard movie={movie} referrals={referrals.byFilm[slug]} />
          </Grid>
        )
      })}
    </Grid>
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
