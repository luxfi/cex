import React, { useState } from "react"

import { Button, Typography, Box } from "@material-ui/core"

const VideoDescription = ({ description }) => {
  const [collapse, setCollapseState] = useState(true)

  const handleClick = () => {
    setCollapseState(!collapse)
  }

  return (
    <Box className="video-description">
      <Box className={collapse ? 'collapsed' : 'expanded'}>{ description }</Box>
      <Button
        style={{
          margin: '20px 0',
          padding: '7px 20px',
        }}
        size="small"
        variant="outlined"
        onClick={handleClick}
      >
        <Typography
          variant="body1"
          style={{
            textTransform: 'none',
            fontSize: 12,
          }}
        >
          {collapse ? 'Show More' : 'Show Less'}
        </Typography>
      </Button>
    </Box>
  );
}

export default VideoDescription
