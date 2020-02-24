import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'

import styles from './style.js'

// @material-ui/core components
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import classNames from 'classnames'

// core components
import {
  InvestNow,
} from '../app'

import Comments from '../comments'
import LikeAndUnlike from '../LikeAndUnlike'
import ShowingNext from './ShowingNext'
import VideoDescription from './VideoDescription'
import YoutubePlayer from './YoutubePlayer'
import Share from './Share'

import { isAuthenticated } from '../../util/helpers'

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
      router,
      store: {
        trailerStore,
        userStore: { loggedIn, currentUser, id },
      },
    } = this.props
    if (isAuthenticated(loggedIn, `/watch?video=${router.query.video}`, router)) {
      trailerStore.setMovieReaction(movie, id, type)
    }
  }

  render() {
    const { classes, store } = this.props

    const { router } = this.props
    const { video: movieSlug } = router.query
    const {
      movieStore,
      userStore,
      userPortfolio,
      trailerStore,
    } = store

    const { nextMovieIndex } = this.state

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


    const addToWatchlist = t => {
      userPortfolio.addToWatchlist(t)
    }

    // eslint-disable-next-line consistent-return
    return (
      <>
        <Box
          className="MuiContainer-maxWidthXl"
          style={{ padding: '50px 20px' }}
        >
          <Box className={classes.watchGrid}>
            <Box className={classes.videoContainer}>
              {
                (videoId && relatedMoviesIds.length) && <YoutubePlayer
                elementId='trailerVideo'
                videoId={videoId}
                autoPlay={autoPlay}
                playlist={autoPlay ? relatedMoviesIds : []}
                autoplayMovies={autoplayMoviesIds}
                handleVideoChange={this.handleVideoChange}
                key={autoplayMovies}
              />
              }
            </Box>
            <Box className='video-metadata'>
              <h3>{movie.name}</h3>
              <Box className={classes.videoStats}>
                <Typography component='span'>{`${movie.trailerDetails.views.toLocaleString()} views`}</Typography>
                <Box className={classes.videoActions}>
                  <Box className={classes.rating}>
                    <LikeAndUnlike
                      likeCount={reaction.likeCount}
                      unlikeCount={reaction.unlikeCount}
                      hasReaction={reaction.hasReaction}
                      reactionType={reaction.reactionType}
                      handleLikeClick={() => this.handleReactionClick(movie, 'like')}
                      handleUnlikeClick={() => this.handleReactionClick(movie, 'unlike')}
                    />
                    <Box className={classes.likeUnderline}>
                      <Divider />
                    </Box>
                  </Box>
                  <Share classes={classes} shareUrl={`http://localhost:3000/film/${movie.movieSlug}`} message={movie.longDescription} />
                  <Link href={`/film/${movie.movieSlug}`}>
                    <a className={classes.linkBackLink}>
                      <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText}>Movie Page</Typography></Button>
                    </a>
                  </Link>
                  <Link href={`/offering/${movie.movieSlug}`}>
                    <a className={classes.linkBackLink}>
                    <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText}>Invest</Typography></Button>
                    </a>
                  </Link>
                  <Link href={`/trade/${movie.movieSlug}`}>
                    <a className={classes.linkBackLink}>
                    <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText}>Trade</Typography></Button>
                    </a>
                  </Link>
                  <Link href={`/ticketing/${movie.movieSlug}`}>
                    <a className={classes.linkBackLink}>
                    <Button className={classes.linkBackButton}><Typography className={classes.linkBackButtonText}>Buy Tickets</Typography></Button>
                    </a>
                  </Link>
                </Box>
              </Box>
              <Box style={{ margin: '0 0 20px 0' }}>
                <Divider />
              </Box>
            </Box>
            <Box>
              <Box className={classes.videoInfoBox}>
                <img src={movie.distributorImg} className={classes.videoInfoImage} alt={movie.distributors[0]} />
                <Box className={classes.videoInfo}>
                  <Typography className={classes.channelName}>{movie.distributors[0]}</Typography>
                  <Typography className={classes.videoPubDate}>{renderDate(movie.trailerDetails.createdAt, 'dddd MMM Do YYYY')}</Typography>
                </Box>
                <Box className={classes.subShare}>
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
                      variant='body1'
                      className={classes.subScribeButtonText}
                    >
                      {`SUBSCRIBE ${formatNumber(subscribers, 1)}`}
                    </Typography>
                  </Button>
                </Box>
                <VideoDescription description={movie.longDescription} />
              </Box>
              <Divider />
            </Box>
            <ShowingNext
              onClick={this.getUpdatedRelatedMovies}
              nextMovieIndex={nextMovieIndex}
            />
            <Comments identifierId={movie.id} />
          </Box>
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
