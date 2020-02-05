import React from "react"
import Link from "next/link"
import { toJS } from "mobx"
import { inject, observer } from "mobx-react"
import { withRouter, Router } from "next/router"
import classNames from "classnames"

import VideoDescription from './VideoDescription'

// @material-ui/core components
import { Button, Grid, Typography, Switch, Divider, IconButton } from "@material-ui/core"
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
  BasicTrader,
  InvestNow,
  ProTrader,
} from "../app"

import styles from "./style.js"

import { isObservableArray } from "mobx"

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
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "about",
      selectedTrader: "basic",
    }
  }

  render() {
    const { classes, store } = this.props

    // get router slug and find article
    const { router } = this.props
    const { slug } = router.query
    const {
      movieStore,
      userStore,
      userPortfolio
    } = this.props.store
    const movie = movieStore.getMovieBySlug(slug)

    const addToWatchlist = t => {
      userPortfolio.addToWatchlist(t)
    }

    return (
      <>
        <div
          className="MuiContainer-maxWidthXl"
          style={{ padding: '50px 20px'}}
        >
          <div className={classes.watchGrid}>
            <div className={classes.videoContainer}>
                <div className="video">
                  <iframe className="video-player" src={movie.trailer + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="video-metadata">
                <h3>FAST AND FURIOUS 9 Trailer #2 Han Returns TV Spot (NEW 2020) Vin Diesel Action Movie HD</h3>
                <div className={classes.videoStats}>
                  <span>774,900 views</span>
                  <div className={classes.videoActions}>
                      <div className={classes.rating}>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.likeButton}
                          startIcon={<ThumbUpAltIcon />}
                        >
                          12K
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          className={classes.likeButton}
                          startIcon={<ThumbDownIcon />}
                        >
                          488
                        </Button>
                        <Divider />

                      </div>
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
                  </div>
                </div>
                <div className="ui divider"></div>
            </div>
            <div>
                <div className={classes.videoInfoBox}>
                  <img src="https://yt3.ggpht.com/a/AGF-l78o8C7mo9M3Dmcii6u_pfOt3I9dBS8n8zwVmQ=s240-c-k-c0xffffffff-no-rj-mo" className={classes.videoInfoImage} />
                  <div className={classes.videoInfo}>
                      <div className="channel-name">FilmSpot Trailer</div>
                      <div className={classes.videoPubDate}>Sun Feb 02 2020</div>
                  </div>
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
                </div>
                <Divider />
            </div>
            <div className={classes.relatedVideos}>
                <div className="next-up-container">
                  <h4>Up next</h4>
                  <div className="up-next-toggle">
                      <span>Autoplay</span>
                      <div className="ui checked fitted toggle checkbox"><input className="hidden" tabIndex="0" type="checkbox" value="" checked="" /><label></label></div>
                  </div>
                </div>
                <a href="/watch?v=6BLnOGpDk70">
                  <div className="video-preview horizontal ">
                      <div className="image-container">
                        <img src="https://i.ytimg.com/vi/6BLnOGpDk70/mqdefault.jpg" className="ui image" />
                        <div className="time-label"><span>6:13</span></div>
                      </div>
                      <div className="video-info">
                        <div className="semi-bold show-max-two-lines ">The Best SUPER BOWL Movie Trailers 2020</div>
                        <div className="video-preview-metadata-container">
                            <div className="channel-title">KinoCheck International</div>
                            <div className="view-and-time">313K views • a day ago</div>
                            <div className="show-max-two-lines"></div>
                        </div>
                      </div>
                  </div>
                </a>
                <div className="ui divider"></div>
                <a href="/watch?v=HLQ9DRPuYXU">
                  <div className="video-preview horizontal ">
                      <div className="image-container">
                        <img src="https://i.ytimg.com/vi/HLQ9DRPuYXU/mqdefault.jpg" className="ui image" />
                        <div className="time-label"><span>3:10</span></div>
                      </div>
                      <div className="video-info">
                        <div className="semi-bold show-max-two-lines ">TOP GUN 2 MAVERICK Trailer #3 Official (NEW 2020) Tom Cruise Action Movie HD</div>
                        <div className="video-preview-metadata-container">
                            <div className="channel-title">FilmSpot Trailer</div>
                            <div className="view-and-time">35K views • a day ago</div>
                            <div className="show-max-two-lines"></div>
                        </div>
                      </div>
                  </div>
                </a>
            </div>
            <div>
                <div className="comments-header">
                  <h4>1097 Comments</h4>
                  <button className="ui basic compact icon left labeled button"><i aria-hidden="true" className="align left icon"></i>Sort by</button>
                </div>
                <div className="add-comment">
                  <img src="http://via.placeholder.com/48x48" className="ui circular image user-image" />
                  <form className="ui form">
                      <div className="field"><textarea placeholder="Add a public comment" rows="3"></textarea></div>
                  </form>
                </div>
                <div className="comment">
                  <img src="https://yt3.ggpht.com/a/AGF-l7-p9SFzNRQ3p9NhtvFXwgFTTsZ9bH0XamJ2vw=s48-c-k-c0xffffffff-no-rj-mo" className="ui circular image user-image" />
                  <div>
                      <div className="user-name">Bubl Bodies</div>
                      <span>My nigga if ur gonna hate on the movie just don’t watch the previews n shit</span>
                      <div className="comment-actions">
                        <div className="rating">
                            <div><i aria-hidden="true" className="thumbs outline up icon"></i><span></span></div>
                            <div><i aria-hidden="true" className="thumbs outline down icon"></i><span></span></div>
                        </div>
                        <button className="ui mini compact button">REPLY</button>
                      </div>
                  </div>
                </div>
                <div className="comment">
                  <img src="https://yt3.ggpht.com/a/AGF-l78b5GeGFkc5FXiMGib0C_gBEIVr99k_QEY2Jw=s48-c-k-c0xffffffff-no-rj-mo" className="ui circular image user-image" />
                  <div>
                      <div className="user-name">Edwin Piercin</div>
                      <span>Fuck it. Han is back I am sold. Even tho it's physically impossible for them to swing that car over the bridge that way.</span>
                      <div className="comment-actions">
                        <div className="rating">
                            <div><i aria-hidden="true" className="thumbs outline up icon"></i><span></span></div>
                            <div><i aria-hidden="true" className="thumbs outline down icon"></i><span></span></div>
                        </div>
                        <button className="ui mini compact button">REPLY</button>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(classes.container)}
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          {!userStore.token ? <InvestNow /> : ""}
        </div>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
