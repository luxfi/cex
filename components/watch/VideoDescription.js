import React, { useState } from "react"

import { Button, Typography, Box } from "@material-ui/core"

const VideoDescription = () => {
  const [collapse, setCollapseState] = useState(true);

  const handleClick = () => {
    setCollapseState(!collapse);
  }

  return (
    <Box className="video-description">
      <Box className={collapse ? 'collapsed' : 'expanded'}>
        <p>Fast &amp; Furious 9 is an upcoming American action film directed by Justin Lin and written by Daniel Casey. A sequel to 2017's The Fate of the Furious, it will be the ninth installment in the Fast &amp; Furious franchise. The film will star Vin Diesel, Michelle Rodriguez, Jordana Brewster, Tyrese Gibson, Chris "Ludacris" Bridges, Nathalie Emmanuel, John Cena, Helen Mirren, Charlize Theron and Michael Rooker.</p>
        <p>Fast &amp; Furious 9 is scheduled to be theatrically released in the United States on May 22, 2020 by Universal Pictures.</p>
      </Box>
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

export default VideoDescription;
