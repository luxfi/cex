import React from "react"
import router from "next/router"

// @material-ui/core components
import { Box, Typography } from "@material-ui/core"
import Slider from '../ESXSlider'

const STUDIOS = [
  {
    name: 'Disney',
    img: '/static/images/studio/Disney.png',
  },
  {
    name: 'Fox',
    img: '/static/images/studio/Fox.png',
  },
  {
    name: 'Lionsgate',
    img: '/static/images/studio/Lionsgate.png',
  },
  {
    name: 'Netflix',
    img: '/static/images/studio/Netflix.png',
  },
  {
    name: 'Paramount',
    img: '/static/images/studio/Paramount.png',
  },
  {
    name: 'STX',
    img: '/static/images/studio/STX.png',
  },
  {
    name: 'Universal',
    img: '/static/images/studio/Universal.jpg',
  },
  {
    name: 'Amazon',
    img: '/static/images/studio/Amazon.jpg',
  },
]

export default (props) => (
  <div id="studio-slider" style={{marginTop: '30px'}}>
    <Typography variant="h5" gutterBottom>
      <Box fontWeight={100} fontSize={20}>
        BROWSE BY STUDIO
      </Box>
    </Typography>
    <div className="container" >
      <Slider>
      {STUDIOS.map((studio, i) => (
        <Slider.StudioItem 
          studio={studio} 
          key={studio.name}
          onClick={studio => router.push(`/browse?facet=distributors&value=${studio.name}`)}
        />
      ))}
      </Slider>
    </div>
  </div >
)
