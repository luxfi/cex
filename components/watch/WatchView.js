import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'

import styles from './style.js'

// @material-ui/core components
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'


import { withStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import classNames from 'classnames'

// core components
import {
  AuthModal,
  InvestNow,
} from '../app'

import { Comments, ShareWidget } from '../app'
import LikeAndUnlike from '../LikeAndUnlike'
import ShowingNext from './ShowingNext'
import VideoDescription from './VideoDescription'
import YoutubePlayer from './YoutubePlayer'

import { formatNumber, renderDate } from './utils'

@inject("store")
@observer
class Index extends React.Component {
  state = {
    nextMovieIndex: 1,
  }

  componentDidMount() {
    const {
      router: { query: { video: movieSlug } },
      store: { trailerStore, movieStore },
    } = this.props
    const movie = movieStore.getMovieBySlug(movieSlug)

    this.getUpdatedRelatedMovies(movieSlug)
    trailerStore.setMovieTrailerDetails(movie)
  }

  componentDidUpdate(prevProps) {
    const {
      router: { query: { video } },
    } = prevProps
    const {
      router: { query: { video: movieSlug } },
      store: { movieStore, trailerStore },
    } = this.props

    // handles prop change by updating related and autoplaymovies movies when the browser's back or forward button is clicked
    window.onpopstate = () => {
      this.getUpdatedRelatedMovies(movieSlug)
    }

    if (video !== movieSlug) {
      const movie = movieStore.getMovieBySlug(movieSlug)
      trailerStore.setMovieTrailerDetails(movie)
    }
  }

  getMovieIdFromMovieSlug = (trailerUrl) => {
    const videoUrlArray = trailerUrl.split('/')
    return videoUrlArray[videoUrlArray.length - 1]
  }

  getUpdatedRelatedMovies = (movieSlug, updateAutoplay = true) => {
    const { store: { trailerStore } } = this.props
    trailerStore.getRelatedMovies(movieSlug, updateAutoplay)
  }

  handleVideoChange = (currentVideoIndex) => {
    const {
      store: { trailerStore },
    } = this.props

    if (currentVideoIndex <= trailerStore.autoplayMovies.length) {
      const href = `/watch?video=${trailerStore.autoplayMovies[currentVideoIndex].movieSlug}`
      Router.push(href, href, { shallow: true })
      this.getUpdatedRelatedMovies(trailerStore.autoplayMovies[currentVideoIndex].movieSlug, false)
    }

    if (trailerStore.autoplayMovies.length >= currentVideoIndex + 1) {
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
        userStore: { loggedIn, currentUser, id },
      },
    } = this.props

    if (!loggedIn) {
      uiStore.openAuthModal()
      return
    }

    trailerStore.setMovieReaction(movie, id, type)
  }

  render() {
    const { classes, store, router } = this.props
    const { video: movieSlug } = router.query
    const {
      movieStore,
      userStore,
      userPortfolio,
      trailerStore,
      uiStore: { authModalOpen, tabIndexValue },
    } = store

    const { nextMovieIndex } = this.state

    // :aa ??
    if (!movieSlug) {
      return
    }

    const {
      relatedMovies,
      autoplayMovies,
      autoPlaySet,
      subscribers,
      reaction,
    } = trailerStore

    const movie = movieStore.getMovieBySlug(movieSlug)
    const autoPlay = autoPlaySet === 'true' || autoPlaySet === true

    const videoId = this.getMovieIdFromMovieSlug(movie.trailer)
    const relatedMoviesArray = [...relatedMovies]
    const autoplayMoviesArray = [...autoplayMovies]
    const relatedMoviesIds = relatedMoviesArray.map((relatedMovie) => this.getMovieIdFromMovieSlug(relatedMovie.trailer))
    const autoplayMoviesIds = autoplayMoviesArray.map((autoPlayMovie) => this.getMovieIdFromMovieSlug(autoPlayMovie.trailer))

    const shareURL = `${window.location.origin}/ticketing/${movie.movieSlug}`
    const sharePrompt = `I just bought tickets for ${movie.name}! Please watch it too!`

    const addToWatchlist = t => {
      userPortfolio.addToWatchlist(t)
    }

    // eslint-disable-next-line consistent-return
    return (
      <>
        <AuthModal authModalOpen={authModalOpen} tabIndexValue={tabIndexValue} />
        <Box
          className="MuiContainer-maxWidthXl"
        >
          <Grid className={classes.watchGrid} container spacing={2} justify="flex-start">
            <Grid item xs={12}  md={8} >
              <Grid item className={classes.videoContainer}>
                {
                  (videoId && relatedMoviesIds.length) && <YoutubePlayer
                  elementId='trailerVideo'
                  videoId={videoId}
                  autoPlay={autoPlay}
                  playlist={autoPlay ? relatedMoviesIds : []}
                  autoplayMovies={autoplayMoviesIds}
                  handleVideoChange={this.handleVideoChange}
                  key={autoplayMovies}
                  pauseVideo={authModalOpen}
                />
                }
              </Grid>
              <Grid item xs={12} className={classes.mobileShowNextSection}>
                <ShowingNext
                  onClick={this.getUpdatedRelatedMovies}
                  nextMovieIndex={nextMovieIndex}
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Link href={`/film/${movie.movieSlug}`}>
                    <a className={classes.aTag}>
                      <h3>{movie.name}</h3>
                    </a>
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
                            <Link href={`/trade/${movie.movieSlug}`}>
                              <a className={classes.linkBackLink}>
                                <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText} noWrap>Trade</Typography></Button>
                              </a>
                            </Link>
                          ) : (
                            <Link href={`/offering/${movie.movieSlug}`}>
                              <a className={classes.linkBackLink}>
                                <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText} noWrap>Invest</Typography></Button>
                              </a>
                            </Link>
                          )
                        }
                      </Box>
                      <Box>
                        <Link href={`/ticketing/${movie.movieSlug}`}>
                          <a className={classes.linkBackLink}>
                            <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText} noWrap>Buy Tickets</Typography></Button>
                          </a>
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
                    <Grid item wrap="nowrap" className={classes.movieInfo}>
                      <img src={movie.distributorImg} className={classes.videoInfoImage} alt={movie.distributors[0]} />
                      <Box className={classes.videoInfo}>
                        <Typography className={classes.channelName}>
                          <Link href={`/browse?facet=distributors&value=${movie.distributors[0]}`}>
                            <a className={classes.aTag}>{movie.distributors[0]}</a>
                          </Link>
                        </Typography>
                        <Typography className={classes.videoPubDate}>{renderDate(movie.trailerDetails.createdAt, 'dddd MMM Do YYYY')}</Typography>
                      </Box>
                    </Grid>
                    <Grid item className={classes.subShare} alignItems="center">
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
                        <Typography
                          noWrap
                          className={classes.subScribeButtonText}
                        >
                          {`SUBSCRIBE ${formatNumber(subscribers, 1)}`}
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Box>
                    <VideoDescription description={movie.longDescription} />
                  </Box>
                  <Divider />
                </Box>
              </Grid>
              <Grid className={classes.commentSection}>
                <Comments identifierId={movie.id} />
              </Grid>
            </Grid>
            <Grid item xs={12}  md={4} className={classes.deskTopShowNextSection}>
              <ShowingNext
                onClick={this.getUpdatedRelatedMovies}
                nextMovieIndex={nextMovieIndex}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          className={classNames(classes.container)}
          style={{ paddingLeft: '0px', paddingRight: '0px' }}
        >
          {!userStore.token ? <InvestNow /> : ''}
        </Box>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
