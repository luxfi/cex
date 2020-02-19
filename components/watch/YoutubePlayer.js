import React, { Component } from 'react'
import { Box } from '@material-ui/core'

class YoutubePlayer extends Component {
  player = null

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
    const { autoplayMovies, videoId, playlist } = this.props
    if (
      prevProps.autoplayMovies !== autoplayMovies
    ) {
      this.player.loadPlaylist([videoId, ...playlist])
    }
  }

  loadVideo = () => {
    const {
      elementId,
      videoId,
      playlist,
      autoPlay,
    } = this.props

    window.onYouTubePlayerAPIReady = () => {
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
  }

  onPlayerStateChange = (event) => {
    const { handleVideoChange } = this.props

    const currentVideoIndex = this.player.getPlaylistIndex()
    if (event.data === -1 && handleVideoChange) {
      handleVideoChange(currentVideoIndex, event.data === 0)
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
