import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'

const useStyles = makeStyles(theme => ({
  bullet: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    transform: 'scale(1.5)',
  },
  outer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

const SummarySection = ({ summaryRef }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <RootRef rootRef={summaryRef}>
      <div className={classes.outer}>
        <Typography gutterBottom variant="h5">
            Summary
        </Typography>
        <Typography gutterBottom variant="h5">
          For the first time ever, invest in the legendary horror franchise.
        </Typography>
        <Typography gutterBottom variant="body1" color="textSecondary">
          Spiral is an upcoming American horror film. The film will
          serve as the ninth installment in the Saw franchise. The film is directed
          by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete
          Goldfinger, based on a story by Chris Rock.
        </Typography>
        <Typography gutterBottom variant="body1" color="textSecondary">
          Saw was first screened on January 19, 2004, before released in
          North America on October 29, 2004 by Lionsgate Films. Compared to its low
          budget, Saw performed very well at the box office, grossing more than $100
          million worldwide and becoming, one of the most profitable
          horror films since Scream.
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          <ul>
            <li>{bull} "Spiral will keep you laughing on the edge of your seat" - Chris Rock</li>
            <li>{bull} "Utterly disgusting" - Gordon Ramsey</li>
            <li>{bull} If you like movies that keep you at the edge of your seat, go see this movie!</li>
          </ul>
        </Typography>
      </div>
    </RootRef>
  )
}

export default SummarySection
