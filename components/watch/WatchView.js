import React from "react"
import Link from "next/link"
import { toJS } from "mobx"
import { inject, observer } from "mobx-react"
import { withRouter, Router } from "next/router"
import classNames from "classnames"

import LikeAndUnlike from '../LikeAndUnlike'
import VideoDescription from './VideoDescription'
import ShowingNext from './ShowingNext'
import Comments from '../comments'

// @material-ui/core components
import { 
  Button,
  Grid,
  Typography,
  Divider,
  IconButton,
  Box,
  Switch,
  TextField,
  Avatar
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import ShareIcon from '@material-ui/icons/Share';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CustomLink from "../app/CustomLink"
// core components
import {
  CustomBreadcrumbs,
  InvestNow,
} from "../app"

import styles from "./style.js"

const ExternalLink = React.forwardRef(
  ({ className, href, hrefAs, children }, ref) => (
    <a
      className={className}
      ref={ref}
      href={href || ""}
      as={hrefAs}
      target="_blank"
    >
      {children}
    </a>
  )
)

@inject("store")
@observer
class Index extends React.Component {

  componentDidMount() {
    const { commentStore } = this.props.store
    commentStore.loadComments('trailerComment')
  }

  render() {
    const { classes, store } = this.props

    // get router slug and find article
    const { router } = this.props
    const { video: movieSlug } = router.query
    const {
      movieStore,
      userStore,
      userPortfolio,
      commentStore,
    } = this.props.store

    const movie = movieStore.getMovieBySlug(movieSlug)
    const comments = commentStore.comments;

    const addToWatchlist = t => {
      userPortfolio.addToWatchlist(t)
    }

    return (
      <>
        <Box
          className="MuiContainer-maxWidthXl"
          style={{ padding: '50px 20px'}}
        >
          <Box className={classes.watchGrid}>
            <Box className={classes.videoContainer}>
              <Box className="video">
                <iframe className="video-player" src={movie.trailer + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </Box>
            </Box>
            <Box className="video-metadata">
              <h3>FAST AND FURIOUS 9 Trailer #2 Han Returns TV Spot (NEW 2020) Vin Diesel Action Movie HD</h3>
              <Box className={classes.videoStats}>
                <Typography component="span">774,900 views</Typography>
                <Box className={classes.videoActions}>
                  <Box className={classes.rating}>
                    <LikeAndUnlike
                      likeCount="1234"
                      unlikeCount="3004"
                    />
                    <Box className={classes.likeUnderline}>
                      <Divider />
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.shareButton}
                    startIcon={<ShareIcon />}
                  >
                    Share
                  </Button>
                  <IconButton onClick={() => {}} className={classes.iconButton}>
                    <AddCircleIcon />
                  </IconButton>
                  <IconButton onClick={() => {}} className={classes.iconButton}>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box style={{ margin: '0 0 20px 0' }}>
                <Divider />
              </Box>
            </Box>
            <Box>
              <Box className={classes.videoInfoBox}>
                <img src="https://yt3.ggpht.com/a/AGF-l78o8C7mo9M3Dmcii6u_pfOt3I9dBS8n8zwVmQ=s240-c-k-c0xffffffff-no-rj-mo" className={classes.videoInfoImage} />
                <Box className={classes.videoInfo}>
                    <Typography className={classes.channelName}>FilmSpot Trailer</Typography>
                    <Typography className={classes.videoPubDate}>Sun Feb 02 2020</Typography>
                </Box>
                <Button
                  className={classes.subScribeButton}
                  size="small"
                >
                  <Typography
                    variant="body1"
                    className={classes.subScribeButtonText}
                  >
                    Subscribe 3.4M
                  </Typography>
                </Button>
                <VideoDescription />
              </Box>
              <Divider />
            </Box>
            <ShowingNext />
            <Comments type="trailerComment" />
          </Box>
        </Box>
        <Box
          className={classNames(classes.container)}
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          {!userStore.token ? <InvestNow /> : ""}
        </Box>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
