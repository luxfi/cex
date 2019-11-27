import React from 'react'
import { Grid, Typography, Box, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const movie = {
  title: 'SAW 9: The Organ Donor',
  highlightedTags: ['New Release'],
  tags: [ '2019', 'Paramount Pictures'],
  media: [
    'https://www.youtube.com/embed/uiisFYRu0DQ',
    'https://www.youtube.com/embed/rSn6TIfbOj8',
    'https://www.youtube.com/embed/2RRkauL6Igs',
    'https://www.youtube.com/embed/_3pEEpORjXo',
    'https://www.youtube.com/embed/yVpDn9NSg6s',
    'https://www.youtube.com/embed/BZDhyjk7LrE',
    'https://www.youtube.com/embed/zEu9M1fuTxA',
  ],
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  chip: {
    background: grey[800],
  },
  highlightedChip: {
    background: theme.palette.secondary.main,
    color: grey[900],
  },
}))

const Title = ({ title, tags, highlightedTags }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h5">
        <Box fontWeight="fontWeightBold">{title}</Box>
      </Typography>
      {highlightedTags.map((tag, i) => (
        <Typography key={i} variant="h5" component="div">
          <Box fontWeight="fontWeightBold">
            <Chip size="small" label={tag} className={classes.highlightedChip} />
          </Box>
        </Typography>
      ))}
      {tags.map((tag, i) => (
        <Typography key={i} variant="h5" component="div">
          <Box fontWeight="fontWeightBold">
            <Chip size="small" label={tag} className={classes.chip} />
          </Box>
        </Typography>
      ))}
    </div>
  )
}

const OfferingHeader = () => {
  return (
    <>
      <Grid justify="center" container spacing={4}>
        <Grid item xs={12} id="offering-title">
          <Grid container direction="column" id="offering-tags-container">
            <Title title={movie.title} tags={movie.tags} highlightedTags={movie.highlightedTags} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          {/* trailers */}
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* sidebar */}
          <Grid container direction="column">
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default OfferingHeader
