/* eslint-disable react/prop-types */
import React from 'react'
import { inject, observer } from 'mobx-react'
import hashSum from 'hash-sum'

import {
  Fade,
  Grid,
  Snackbar,
  makeStyles
} from "@material-ui/core"

import ReferralCard from './ReferralCard'
import TotalsCard from './TotalsCard'
import RewardCard from './RewardCard'
import MovieRewardsCard from './MovieRewardsCard'

import myStyles from './RewardsView.style.js'
const styles = makeStyles(myStyles)

export default inject('store')(observer((props) => {

  const { tabIdx, index } = props
    // Not me! Don't render
  if (tabIdx !== index) return null

  const { store: { userStore, movieStore }} = props
  const [wasCopied, setWasCopied] = React.useState(false)

  const rewardsURL = userStore.referrerId && `${window.location.origin}/invite?ref=${userStore.referrerId}`
  const rewardsShareMessage = "I'm watching and investing on Entertainment Stock Exchange. Join me!"

  const referrals = getMyReferals(userStore.email)
  let totalCredits = 10 // to start (profile + payment method = 10)
  totalCredits += referrals.total * 5

  const classes = styles()

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <ReferralCard
          rewardsURL={rewardsURL}
          message={rewardsShareMessage}
          onCopy={() => {setWasCopied(true)}}
          classes={classes}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TotalsCard total={totalCredits} monthTotal={totalCredits} classes={classes}/>
      </Grid>
      {rewards.map(reward => {
          // 'Refer a friend'
        if (reward.id == 3) {
          return (
            <Grid key={reward.id} item xs={12} sm={3}>
              <RewardCard {...reward} completed={referrals.total} classes={classes}/>
            </Grid>
          )
        }
        return (
          <Grid key={reward.id} item xs={12} sm={3}>
            <RewardCard {...reward} classes={classes}/>
          </Grid>
        )
      })}
      {Object.keys(referrals.byFilm).map((slug, i) => {
        const movie = movieStore.getMovieBySlug(slug)
        if (!movie) return null
        return (
          <Grid key={slug} item xs={12}>
            <MovieRewardsCard movie={movie} referrals={referrals.byFilm[slug]} classes={classes}/>
          </Grid>
        )
      })}
    </Grid>
    <UrlWasCopiedSnackbar
      open={wasCopied}
      handleSnackbarClose={(evt, reason) => {
          if (reason === 'clickaway') return
          setWasCopied(false)
      }}
    />
    </>
  )
}))

const rewards = [
  {
    id: 1,
    title: 'Complete your Profile',
    iconName: 'account_box',
    points: 5,
    completed: true,  // hard code
  },
  {
    id: 2,
    title: 'Add a Payment Option',
    iconName: 'credit_card',
    points: 5,
    completed: true, // hard code
  },
  {
    id: 3,
    title: 'Refer a Friend',
    iconName: 'person_add',
    pointsPer: 5,
      // no hard code, see code
  },
  {
    id: 4,
    title: 'Make an Investment',
    iconName: 'shop',
    pointsPer: 5,
    completed: 0, // hard code
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

const UrlWasCopiedSnackbar = (props) => (
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
