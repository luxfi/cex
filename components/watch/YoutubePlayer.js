import React, { Component } from 'react'
import { Box } from '@material-ui/core'

class YoutubePlayer extends Component {
  player = null
  state = {}

  componentDidMount() {
    const { elementId, videoId, playlist } = this.props
    if (!elementId) {
      throw new Error('specify an element id the youtube player will be mounted on')
    }

    if (!videoId && !playlist) {
      throw new Error('Youtube player requires a video id or an array of video ids as playlist')
    }

    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      window.onYouTubeIframeAPIReady = this.loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      this.loadVideo()
    }
  }

  componentDidUpdate(prevProps) {
    const { autoplayMovies, videoId, autoPlay } = this.props
    if (
      (prevProps.autoplayMovies[0] !== autoplayMovies[0])
      || prevProps.autoPlay !== autoPlay
    ) {
      // force the component to re-render when updated autoplayMovies props are recieved then play new videos
      this.setState({
        autoplayMovies,
      }, () => this.playNewVideo(autoPlay, this.player, videoId, autoplayMovies))
    }
  }

  playNewVideo = (autoPlay, player, videoId, autoplayMovies) => {
    if (!player) {
      return this.loadVideo()
    }

    setTimeout(() => {
      if (autoPlay) {
        player.loadPlaylist(autoplayMovies)
      } else {
        player.cueVideoById(videoId)
      }
    }, 50)
  }

  loadVideo = () => {
    const {
      elementId,
      videoId,
      playlist,
      autoPlay,
    } = this.props

    this.player = new YT.Player(elementId, {
      videoId,
      playerVars: {
        autoplay: autoPlay ? 1 : 0,
        rel: 0,
        modestbranding: 1,
        playlist: playlist.join(','),
      },
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    })
  }

  onPlayerStateChange = (event) => {
    const { handleVideoChange, autoPlay } = this.props

    if (event.data === -1 && handleVideoChange && autoPlay) {
      const currentVideoIndex = this.player.getPlaylistIndex()
      handleVideoChange(currentVideoIndex)
    }
  }

  render() {
    const { elementId } = this.props
    return (
      <Box className='video'>
        <div id={elementId} className='video-player' />
      </Box>
    )
  }
}

export default YoutubePlayer
