import React from 'react'
import classNames from 'classnames'

import {
  Icon,
  Paper,
  Typography,
} from "@material-ui/core"

export default (props) => {

  const {
    title,
    iconName,
    points,
    pointsPer,
    completed,
    classes
  } = props

  let pointsPerString = ''
  let pointsString = ''
  if (points) {
    pointsString = (completed) ? points + " Credits earned" : "Earn " + points + " Credits"
  }
  else {
    const earnString = (completed) ? '' : 'Earn '
    pointsPerString = earnString + pointsPer + " Credits Each"
    pointsString = (completed > 0) ? pointsPer * completed + " Credits earned" : ''
  }

  const typeIconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
  const creditsIconClasses = completed ? classes.creditIcon : classNames(classes.creditIcon, classes.disabledCreditIcon)

  return (
    <Paper className={classNames((!completed) ? classes.disabledPaper : '', classes.paper)}>
      <Typography className={classes.title}>{title}</Typography>
      <Icon className={typeIconClasses} color='secondary'>{iconName}</Icon>
      {(pointsPerString.length == 0) ? (
        <>
        <Typography className={classes.pointsString}><Icon className={creditsIconClasses} >stars_rounded</Icon>&nbsp;{pointsString}</Typography>
        <Typography className={classNames((!completed) ? classes.invisible : '', classes.completedString)}><Icon className={classNames((!completed) ? classes.invisible : '', classes.completedIcon)}>check_circle</Icon>Completed</Typography>
        </>
        ) : (
        <>
        <Typography className={classes.pointsPerString}><Icon className={creditsIconClasses}>stars_rounded</Icon>&nbsp;{pointsPerString}</Typography>
        {(completed == 0) ? '' : (
          <Typography className={classes.pointsString}><Icon className={classes.completedIcon}>check_circle</Icon>{pointsString}</Typography>
        )}
        </>
      )}
    </Paper>
  )
}
