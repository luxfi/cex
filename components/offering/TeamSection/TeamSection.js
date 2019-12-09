import React from 'react'
import { Box, Typography, Grid, Avatar, RootRef } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 185,
    height: 185,
  },
  maxWidth: {
    maxWidth: 185,
  },
}))

const team = [
  {
    name: 'Amy Johnston',
    id: 7,
    title: 'Owner/Ceo',
    summary:
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Cindy Shephard',
    id: 37,
    title: 'Designer',
    summary:
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Will Samson',
    id: 15,
    title: 'Developer',
    summary:
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Ernest Humphrey',
    id: 39,
    title: 'Support',
    summary:
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
]

const ImageAvatars = ({ name, id, title, summary }) => {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column">
      <Avatar
        alt="Remy Sharp"
        src={`https://i.pravatar.cc/300img?=${id}`}
        className={classes.bigAvatar}
      />
      <Typography
        variant="h6"
        component="div"
        className={classes.maxWidth}
        align="center"
      >
        <Box mt={2} fontWeight="fontWeightBold">
          {name}
        </Box>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="div"
        className={classes.maxWidth}
        align="center"
      >
        <Box mb={2}>{title}</Box>
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="div"
        className={classes.maxWidth}
        align="center"
      >
        <Box mb={5}>{summary}</Box>
      </Typography>
    </Box>
  )
}

const TeamSection = ({ teamRef }) => {
  return (
    <RootRef rootRef={teamRef}>
      <Box mb={4}>
        <Typography variant="h5">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            Team
          </Box>
        </Typography>
        <Typography variant="h5">
          <Box mb={6} mt={2} fontWeight="fontWeightBold">
            The Organ Donor is an upcoming American horror film. The film will
            serve as the ninth installment in the Saw franchise. The film is
            directed by Darren Lynn Bousman, from a screenplay by Josh Stolberg
            and Pete Goldfinger, based on a story by Chris Rock.
          </Box>
        </Typography>
        <Box display="flex" justifyContent="space-between">
          {team.map((team, i) => (
            <div key={i}>
              <ImageAvatars {...team} />
            </div>
          ))}
        </Box>
      </Box>
    </RootRef>
  )
}

export default TeamSection
