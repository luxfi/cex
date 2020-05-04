import React from 'react'
import { Box, Typography, Grid, Avatar, RootRef } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 120,
    height: 120,
    [theme.breakpoints.up('sm')]: {
      width: 150,
      height: 150,
    },
    [theme.breakpoints.up('md')]: {
      width: 185,
      height: 185,
    },
  },
  maxWidth: {
    maxWidth: 185,
  },
}))

const team = [
  {
    name: 'Chris Rock',
    image: 'https://m.media-amazon.com/images/M/MV5BMTEyNjM5MjgyNzdeQTJeQWpwZ15BbWU3MDAzMzUyODc@._V1_UX214_CR0,0,214,317_AL_.jpg',
    title: 'Zeke',
    summary:
      'Spiral is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Samuel L. Jackson',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg',
    title: 'Marcus',
    summary:
      'Spiral is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Max Minghella',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ4OTEwNTcwN15BMl5BanBnXkFtZTgwNDU4MDgxMTE@._V1_UY317_CR31,0,214,317_AL_.jpg',
    title: 'William Schenk',
    summary:
      'Spiral is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
  {
    name: 'Marisol Nichols',
    image: 'https://m.media-amazon.com/images/M/MV5BMTgyNTA0ODk5Ml5BMl5BanBnXkFtZTgwNjAyMTI3NjE@._V1_.jpg',
    title: 'Capt. Angie Garza',
    summary:
      'Spiral is an upcoming American horror film. The film will serve as the ninth installment in the Saw.',
  },
]

const ImageAvatars = ({ name, image, title, summary }) => {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column">
      <Avatar
        alt="Actor"
        src={image}
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
            Team and Cast
          </Box>
        </Typography>
        <Typography variant="h6">
          <Box mb={6} mt={2}>
            Spiral will be directed by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete Goldfinger, based on a story by Chris Rock.
          </Box>
        </Typography>
        <Grid container spacing={2}>
          {team.map((team, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <ImageAvatars {...team} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </RootRef>
  )
}

export default TeamSection
