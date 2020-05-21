import React from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  withStyles
} from '@material-ui/core'

import { 
  AddCircle as AddCircleIcon, 
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'

import Link from '../app/Link'

import { 
  Comments, 
  InvestNow, 
  ShareWidget 
} from '../app'

import LikeAndUnlike from '../LikeAndUnlike'
import ShowingNext from './ShowingNext'
import VideoDescription from './VideoDescription'
import YoutubePlayer from './YoutubePlayer'

import { formatNumber, renderDate } from '../../util'

import styles from './style.js'

@withRouter
@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {

  state = {
    nextMovieIndex: 1,
  }

  componentDidMount() {
    const {
      router: { query: { video: movieSlug, trailerId } },
      store: { trailerStore, movieStore },
    } = this.props

    if (!movieSlug || !trailerId) {
      return this.renderInvalidMovieMessage(movieSlug, trailerId)
    }

    const movie = movieStore.getMovieBySlug(movieSlug)

    this.getUpdatedRelatedMovies(movieSlug)
    trailerStore.setMovieTrailerDetails(movie)
    trailerStore.loadRelatedMovieTrailers(movie, trailerId)
  }

  componentDidUpdate(prevProps) {
    const {
      router: { query: { video: prevMovieSlug, trailerId: prevTrailerId } },
    } = prevProps
    const {
      router: { query: { video: nextMovieSlug, trailerId: nextTrailerId } },
      store: { movieStore, trailerStore },
    } = this.props

    // handles prop change by updating related and autoplaymovies movies when the browser's back or forward button is clicked
    window.onpopstate = () => {
      this.getUpdatedRelatedMovies(movieSlug)
    }

    const movie = movieStore.getMovieBySlug(nextMovieSlug)
    if (prevMovieSlug !== nextMovieSlug) {
      trailerStore.setMovieTrailerDetails(movie)
    }

    if (prevTrailerId !== nextTrailerId) {
      trailerStore.loadRelatedMovieTrailers(movie, nextTrailerId)
    }
  }

  getUpdatedRelatedMovies = (movieSlug, updateAutoplay = true) => {
    const { store: { trailerStore } } = this.props
    trailerStore.getRelatedMovies(movieSlug, updateAutoplay)
  }

  handleVideoChange = (currentVideoIndex) => {
    const {
      store: { trailerStore },
      router: { query: { trailerId } },
    } = this.props

    if (currentVideoIndex <= trailerStore.relatedMovieTrailers.length) {
      const href = `/watch?video=${trailerStore.relatedMovieTrailers[currentVideoIndex].movieSlug}&trailerId=${trailerId}`
      Router.push(href, href, { shallow: true })
      this.getUpdatedRelatedMovies(trailerStore.relatedMovieTrailers[currentVideoIndex].movieSlug, false)
    }

    if (trailerStore.relatedMovieTrailers.length >= currentVideoIndex + 1) {
      this.setState({
        nextMovieIndex: currentVideoIndex + 1,
      })
    } else {
      this.setState({
        nextMovieIndex: null,
      })
    }
  }

  handleReactionClick = (movie, type) => {
    const {
      store: {
        uiStore,
        trailerStore,
        userStore: { loggedIn, id },
      },
    } = this.props

    if (!loggedIn) {
      uiStore.openAuthModal()
      return
    }

    trailerStore.setMovieReaction(movie, id, type)
  }

  renderInvalidMovieMessage = () => (
    <Box>
      <Typography variant='h4'>Invalid movie or Trailer</Typography>
    </Box>
  )

  render() {
    const {
      classes,
      store: {
        movieStore,
        userStore,
        trailerStore: {
          relatedMovies,
          autoPlaySet,
          subscribers,
          reaction,
          relatedMovieTrailers,
        },
        uiStore: { authModalOpen, tabIndexValue },
      },
      router,
    } = this.props
    const { video: movieSlug, trailerId } = router.query

    if (!movieSlug || !trailerId) {
      return this.renderInvalidMovieMessage(movieSlug, trailerId)
    }

    const movie = movieStore.getMovieBySlug(movieSlug)
    const { nextMovieIndex } = this.state

    const autoPlay = autoPlaySet === 'true' || autoPlaySet === true

    const relatedMovieTrailerIds = relatedMovieTrailers.map((relatedMovieTrailer) => relatedMovieTrailer.trailerId)

    const shareURL = `${window.location.origin}/ticketing/${movie.movieSlug}`
    const sharePrompt = `I just bought tickets for ${movie.name}! Please watch it too!`

    return (
      <>
        <Box
          className='MuiContainer-maxWidthXl'
        >
          <Grid className={classes.watchGrid} container spacing={2} justify='flex-start'>
            <Grid item xs={12} md={8} >
              <Grid item className={classes.videoContainer}>
                {
                  (trailerId && relatedMovieTrailerIds.length) ? <YoutubePlayer
                  elementId='trailerVideo'
                  videoId={trailerId}
                  movieSlug={movieSlug}
                  autoPlay={autoPlay}
                  playlist={autoPlay ? relatedMovieTrailerIds : []}
                  autoplayMovies={relatedMovieTrailerIds}
                  handleVideoChange={this.handleVideoChange}
                  pauseVideo={authModalOpen}
                /> : null
                }
              </Grid>
              <Grid item xs={12}>
                <Box className='video-metadata'>
                  <Link
                    href='/film/[id]'
                    as={`/film/${movie.movieSlug}`}
                    className={classes.aTag}
                  >
                    <h3>{movie.name}</h3>
                  </Link>
                  <Grid container spacing={2} className={classes.videoStats}>
                    <Grid item xs={6} sm={3} lg={5}>
                      <Typography component='span'>{`${movie.trailerDetails.views.toLocaleString()} views`}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3}>
                      <LikeAndUnlike
                        likeCount={reaction.likeCount}
                        unlikeCount={reaction.unlikeCount}
                        hasReaction={reaction.hasReaction}
                        reactionType={reaction.reactionType}
                        handleLikeClick={() => this.handleReactionClick(movie, 'like')}
                        handleUnlikeClick={() => this.handleReactionClick(movie, 'unlike')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5} lg={4} className={classes.buttonSection}>
                      <Box className={classes.buttonContainer}>
                        <ShareWidget shareUrl={shareURL} message={sharePrompt} emailToCredit={userStore.email}/>
                      </Box>
                      <Box className={classes.buttonContainer}>
                        {
                          movie.trading ? (
                            <Link
                              id='tradeButton'
                              className={classes.linkBackLink}
                              href='/trade/[id]'
                              as={`/trade/${movie.movieSlug}`}
                            >
                              <Button className={classes.linkBackButton}>Trade</Button>
                            </Link>
                          ) : (
                            <Link
                              id='offeringButton'
                              className={classes.linkBackLink}
                              href='/offering/[slug]'
                              as={`/offering/${movie.movieSlug}`}
                            >
                              <Button className={classes.linkBackButton}>Invest</Button>
                            </Link>
                          )
                        }
                      </Box>
                      <Box>
                        <Link
                          id='buyTicketButton'
                          className={classes.linkBackLink}
                          href='/ticketing/[id]'
                          as={`/ticketing/${movie.movieSlug}`}
                        >
                          <Button className={classes.linkBackButton}>Buy Tickets</Button>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box style={{ margin: '0 0 20px 0' }}>
                    <Divider />
                  </Box>
                </Box>
                <Box className={classes.videoInfoBox}>
                  <Grid container className={classes.movieInfoContainer}>
                    <Grid container wrap='nowrap' className={classes.movieInfo}>
                      <img src={movie.distributorImg} className={classes.videoInfoImage} alt={movie.distributors[0]} />
                      <Box className={classes.videoInfo}>
                        <Typography className={classes.channelName}>
                          <Link
                            id='distributorName'
                            className={classes.aTag}
                            href={`/browse?facet=distributors&value=${movie.distributors[0]}`}
                          >
                            {movie.distributors[0]}
                          </Link>
                        </Typography>
                        <Typography className={classes.videoPubDate}>{renderDate(movie.trailerDetails.createdAt, 'dddd MMM Do YYYY')}</Typography>
                      </Box>
                    </Grid>
                    <Grid container className={classes.subShare} alignItems='center'>
                      <IconButton onClick={() => {}} className={classes.iconButton}>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton onClick={() => {}} className={classes.iconButton}>
                        <MoreHorizIcon />
                      </IconButton>
                      <Button
                        className={classes.subScribeButton}
                        size='small'
                      >
                        {`SUBSCRIBE ${formatNumber(subscribers, 1)}`}
                      </Button>
                    </Grid>
                  </Grid>
                  <Box>
                    <VideoDescription description={movie.longDescription} />
                  </Box>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.mobileShowNextSection}>
                <ShowingNext
                  onClick={this.getUpdatedRelatedMovies}
                  nextMovieIndex={nextMovieIndex}
                  relatedMovies={relatedMovies}
                  autoPlaySet={autoPlaySet}
                  relatedMovieTrailers={relatedMovieTrailers}
                />
              </Grid>
              <Grid className={classes.commentSection}>
                <Comments identifierId={movie.id} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.deskTopShowNextSection}>
              <ShowingNext
                onClick={this.getUpdatedRelatedMovies}
                nextMovieIndex={nextMovieIndex}
                relatedMovies={relatedMovies}
                autoPlaySet={autoPlaySet}
                relatedMovieTrailers={relatedMovieTrailers}
              />
            </Grid>
          </Grid>
        </Box>
        <Box >
          {!userStore.token ? <InvestNow /> : ''}
        </Box>
      </>
    )
  }
}

