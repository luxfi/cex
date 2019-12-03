import React, { useState } from 'react'
import { Grid, Typography, Box, Chip, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { formatCurrency } from '../../../util/generic'
import LinearProgressBar from '../../app/LinearProgressBar'
import { OfferingInput, MediaSlider } from '../'
import Icon from '@material-ui/core/Icon'

const movie = {
  title: 'SAW 9: The Organ Donor',
  highlightedTags: ['New Release'],
  tags: ['2019', 'Paramount Pictures'],
  youtubeIDs: [
    'uiisFYRu0DQ',
    '2RRkauL6Igs',
    '_3pEEpORjXo',
    'yVpDn9NSg6s',
    'BZDhyjk7LrE',
    'zEu9M1fuTxA',
    'uiisFYRu0DQ', // repeating the ids until finding more content
    '2RRkauL6Igs',
    '_3pEEpORjXo',
    'yVpDn9NSg6s',
    'BZDhyjk7LrE',
    'zEu9M1fuTxA',
  ],
  raisedAmount: 2123201.44,
  amountOfInvestors: 1614,
  daysLeft: 11,
  fundingGoal: 3000000,
}

const useTitleStyles = makeStyles(theme => ({
  chip: {
    background: grey[800],
  },
  highlightedChip: {
    background: theme.palette.secondary.main,
    color: grey[900],
  },
}))

const Title = ({ title, tags, highlightedTags }) => {
  const classes = useTitleStyles()
  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
      </Grid>
      <Grid item container xs={12} direction="row">
        {highlightedTags.map((tag, i) => (
          <Typography key={i} variant="h5" component="div">
            <Box fontWeight="fontWeightBold" mr={0.5}>
              <Chip
                size="small"
                label={tag}
                className={classes.highlightedChip}
              />
            </Box>
          </Typography>
        ))}
        {tags.map((tag, i) => (
          <Typography key={i} variant="h5" component="div">
            <Box fontWeight="fontWeightBold" mr={0.5}>
              <Chip size="small" label={tag} className={classes.chip} />
            </Box>
          </Typography>
        ))}
      </Grid>
    </Grid>
  )
}

const Trailer = ({ trailer }) => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={trailer}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

const useRaisingStyles = makeStyles(theme => ({
  spacer: {
    flexGrow: 1,
  },
}))

const RaisingInformation = ({
  raisedAmount,
  fundingGoal,
  amountOfInvestors,
  daysLeft,
}) => {
  // note, in future we will use moment(dateFundingEnds).toNow() to caculate relative time
  const percentFunded = ((raisedAmount / fundingGoal) * 100).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 0,
    },
  )
  const classes = useRaisingStyles()
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold">{formatCurrency(raisedAmount)}</Box>
        </Typography>
        <Box mt={1} mb={1}>
          <Typography variant="subtitle1">
            <Typography component="span" color="secondary">
              ({percentFunded}%)
            </Typography>{' '}
            of {fundingGoal.toLocaleString()} funded
          </Typography>
        </Box>
        <Box mt={1} mb={1}>
          <LinearProgressBar
            variant="determinate"
            value={parseInt(percentFunded)}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold">
            {amountOfInvestors.toLocaleString()}
          </Box>
        </Typography>
        <Typography variant="subtitle1">Investors support this film</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold">{daysLeft}</Box>
        </Typography>
        <Typography variant="subtitle1">Days to go</Typography>
      </Grid>
      <Box mb={2} mt={2}>
        <Divider light />
      </Box>
      <Grid item container xs={12}>
        <Typography variant="subtitle2">
          Minimum Investment: (Dollars)
        </Typography>
        <div className={classes.spacer}></div>
        <Typography variant="subtitle2" component="span" color="textSecondary">
          Estimated Cost: $0.00
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OfferingInput />
      </Grid>
      <Box mb={2} mt={3}>
        <Divider light />
      </Box>
      <Grid item container xs={12} spacing={3} justify="flex-end">
        <Grid item>
          <Typography component="span" variant="subtitle2">
            <Box component="span" pt={0.5}>
              <Icon color="disabled" fontSize="inherit" component="span">
                email_outline
              </Icon>
            </Box>
            <Box component="span" ml={1}>
              Email Me
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="span" variant="subtitle2">
            <Box component="span" pt={0.5}>
              <Icon color="disabled" fontSize="inherit" component="span">
                share
              </Icon>
            </Box>
            <Box component="span" ml={1}>
              Share
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="span" variant="subtitle2">
            <Box component="span" pt={0.5}>
              <Icon color="disabled" fontSize="inherit" component="span">
                bookmark_border
              </Icon>
            </Box>
            <Box component="span" ml={1}>
              Follow
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const OfferingHeader = () => {
  const [currentMedia, setCurrentMedia] = useState(movie.youtubeIDs[0])
  return (
    <Box mb={40}>
      <Grid justify="center" container spacing={4}>
        <Grid item xs={12} lg={10} id="offering-title">
          <Grid container direction="column" id="offering-tags-container">
            <Box mb={-1}>
              <Title
                title={movie.title}
                tags={movie.tags}
                highlightedTags={movie.highlightedTags}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Trailer trailer={'https://www.youtube.com/embed/' + currentMedia} />
          <MediaSlider
            youtubeIDs={movie.youtubeIDs}
            setCurrentMedia={setCurrentMedia}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* sidebar */}
          <RaisingInformation
            raisedAmount={movie.raisedAmount}
            fundingGoal={movie.fundingGoal}
            amountOfInvestors={movie.amountOfInvestors}
            daysLeft={movie.daysLeft}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OfferingHeader
