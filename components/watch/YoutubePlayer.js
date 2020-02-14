import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'

const YoutubePlayer = ({ elementId, videoId, playlist, autoPlay, onVideoComplete }) => {
  if (!elementId) {
    throw new Error('specify an element id the youtube player will be mounted on')
  }
  
  if (!videoId && !playlist ) {
    throw new Error('Youtube player requires a video id or an array of video ids as playlist')
  }

  let player
  
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
  })

  useEffect(() => {
    loadVideo();
  }, [playlist])

  useEffect(() => {
    loadVideo();
  }, [videoId])

  const loadVideo = () => {
    window.onYouTubePlayerAPIReady = () => {
      player = new YT.Player(elementId, {
        videoId,
        playerVars: {
          autoPlay,
          rel: 0,
          modestbranding: 1,
          playlist: playlist.join(','),
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    }
  };

  const onPlayerReady = event => {
    event.target.playVideo()
  };

  const onPlayerStateChange = event => {
    if (event.data === 0 ) {
      if (onVideoComplete) {
        onVideoComplete()
      }  
    }
  }

  return (
    <Box className="video">
      <div id={elementId} className="video-player"></div>
    </Box>
  )

}

export default YoutubePlayer