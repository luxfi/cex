import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'

const YoutubePlayer = ({
  elementId,
  videoId,
  playlist,
  autoPlay,
  handleVideoChange,
}) => {
  if (!elementId) {
    throw new Error('specify an element id the youtube player will be mounted on')
  }

  if (!videoId && !playlist) {
    throw new Error('Youtube player requires a video id or an array of video ids as playlist')
  }

  let player

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      window.onYouTubeIframeAPIReady = loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      loadVideo()
    }
  }, [])

  useEffect(() => {
    console.log(player, '---')
  }, [playlist])

  const loadVideo = () => {
    window.onYouTubePlayerAPIReady = () => {
      player = new YT.Player(elementId, {
        videoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playlist: playlist.join(','),
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      })
    }
  }

  const onPlayerStateChange = (event) => {
    const currentVideoIndex = player.getPlaylistIndex()
    if (event.data === -1) {
      handleVideoChange(currentVideoIndex)
    }
  }

  return (
    <Box className="video">
      <div id={elementId} className="video-player" />
    </Box>
  )
}

export default YoutubePlayer
