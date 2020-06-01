import React, { useState } from 'react'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Grid, Typography, Box, Chip, Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Icon from '@material-ui/core/Icon'
import { BookmarkBorder } from '@material-ui/icons'
import classNames from 'classnames'

import Link from '../../app/Link'
import { OfferingInput } from '../'
import { ESXLinearProgressBar, ShareWidget, MediaSlider } from '../../app'
import { formatCurrency, slugFromPath } from '../../../util'

const useOfferingHeaderStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down('md')]: {
      //paddingRight: theme.spacing(3),
      //paddingLeft: theme.spacing(3)
    }
  },
}))

const useTitleStyles = makeStyles(theme => ({
  chip: {
    background: grey[800],
  },
  highlightedChip: {
    background: theme.palette.primary.main,
    color: grey[900],
  },
  aTag: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  movieName: {
    fontWeight: 'bold',
  },
}))

const Title = ({ movie, highlightedTags }) => {
  const classes = useTitleStyles()
  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          <Link href='/film/[id]' as={`/film/${movie.movieSlug}`} className={classNames(classes.aTag, classes.movieName)}>
            {movie.name}
          </Link>
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
        {movie.tags.map((tag, i) => {
           // TODO:  may need to be tested :aa
          const link = <Link href={`/search?facet=distributors&value=${tag}`} className={classes.aTag}>
            {tag}
          </Link>

          return (
            <Typography key={i} variant="h5" component="div">
              <Box fontWeight="fontWeightBold" mr={0.5}>
                <Chip
                  size="small"
                  label={movie.distributors.includes(tag) ? link : tag}
                  className={classes.chip}
                />
              </Box>
            </Typography>
          )
        })
        }
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
  /*
  followButton: {
    background: '#fff',
    '&:hover': {
      background: '#FBC43E',
    },
  },
  */
}))

const RaisingInformation = withRouter(inject('store')(observer(({
  raisedAmount,
  fundingGoal,
  amountOfInvestors,
  daysLeft,
  addOfferingInvestment,
  funds,
  setErrorMessage,
  setSuccessMessage,
  router,
  store,
  movie,
}) => {
  // note, in future we will use moment(dateFundingEnds).toNow() to caculate relative time
  const percentFunded = ((raisedAmount / fundingGoal) * 100).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 0,
    },
  )
  const classes = useRaisingStyles()

  const { userStore } = store

  const shareURL = `${window.location.origin}/offering/${movie.movieSlug}`
  const sharePrompt = movie ? `I just placed an offering for ${movie.name}! Go check it out!` : ''

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">
          <Box fontWeight="fontWeightBold">{formatCurrency(raisedAmount, 'USD', false)}</Box>
        </Typography>
        <Box mt={1} mb={1}>
          <Typography variant="subtitle1">
            <Typography component="span" color="primary">
              ({percentFunded}%)
            </Typography>{' '}
            of ${fundingGoal.toLocaleString()} funded
          </Typography>
        </Box>
        <Box mt={1} mb={1}>
          <ESXLinearProgressBar
            variant="determinate"
            value={parseInt(percentFunded)}
          />
        </Box>
      </Grid>
      <Grid item container>
        <Grid item xs={6} sm={12}>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold">
              {amountOfInvestors.toLocaleString()}
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            Investors support this film
          </Typography>
        </Grid>
        <Grid item xs={6} sm={12}>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold">{daysLeft}</Box>
          </Typography>
          <Typography variant="subtitle1">Days to go</Typography>
        </Grid>
      </Grid>
      <Box mb={2} mt={2}>
        <Divider light />
      </Box>
      <Grid item xs={12}>
        <OfferingInput
          addOfferingInvestment={addOfferingInvestment}
          funds={funds}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </Grid>
      <Box mb={2} mt={3}>
        <Divider light />
      </Box>
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <ShareWidget shareUrl={shareURL} message={sharePrompt} />
        <Button size='small' startIcon={<BookmarkBorder/>} style={{ marginLeft: '8px' }}>Follow</Button>
      </Grid>
    </Grid>
  )
})))

const OfferingHeader = ({
  funds,
  addOfferingInvestment,
  setErrorMessage,
  setSuccessMessage,
  movie,
}) => {
  const [currentMedia, setCurrentMedia] = useState(movie.trailers[0].trailer)
  const classes = useOfferingHeaderStyles()

  return (
    <Grid justify="center" container spacing={4} className={classes.card}>
      <Grid item xs={12} id="offering-title">
        <Grid container direction="column" id="offering-tags-container">
          <Box mb={-1}>
            <Title
              movie={movie}
              highlightedTags={movie.highlightedTags}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Trailer trailer={currentMedia} />
        <MediaSlider
          trailers={movie.trailers}
          setCurrentMedia={setCurrentMedia}
        />
      </Grid>
      <Grid item lg={3} md={6} sm={8} xs={12}>
        {/* sidebar */}
        <RaisingInformation
          movie={movie}
          raisedAmount={movie.raisedAmount}
          fundingGoal={movie.fundingGoal}
          amountOfInvestors={movie.amountOfInvestors}
          daysLeft={movie.daysLeft}
          addOfferingInvestment={addOfferingInvestment}
          funds={funds}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </Grid>
    </Grid>
  )
}

export default OfferingHeader
