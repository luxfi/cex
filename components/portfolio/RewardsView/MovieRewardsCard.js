import React from 'react'
import classNames from 'classnames'

import {
  Icon,
  Paper,
  Typography,
  useTheme
} from "@material-ui/core"

import { SVGIcon } from '../../app'

export default (props) => {

  const { movie, referrals, classes } = props
  const theme = useTheme()

  let icons = []
  for (let i = 0; i< referrals; i++) {
    icons.push(<SVGIcon icon='movieTicket' key={i} fill={theme.palette.secondary.main} width={30} height={37}/>)
  }
  const pointsString = (referrals * 5) + " Credits earned"
  return (
    <Paper className={classNames(classes.movieRewardsCard, classes.paper)}>
      <img src={movie.posterImg} width='auto' height='100%'/>
      <div className={classes.movieCardContentArea}>
        <Typography className={classes.movieCardTitle}>{movie.name}</Typography>
        <div className={classes.rewardIconsRow}>
          <Typography className={classes.movieCardReferralLabel}>Tickets bought by friends:&nbsp;&nbsp;</Typography>{icons}
          <Typography className={classes.referalCardPointsString}>(<Icon className={classes.referalCardCreditsIcon} >stars_rounded</Icon>&nbsp;{pointsString})</Typography>
        </div>
      </div>
    </Paper>
  )
}