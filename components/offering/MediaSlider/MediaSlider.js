import React, { useEffect, useState } from 'react'
import {
  InputBase,
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Box,
  useMediaQuery,
  Link,
} from '@material-ui/core'

import { Carousel, Image } from '../../app'
import useSliderHook from './useSliderHook'

export default function MediaSlider({ youtubeIDs }) {
  const slidesPerRow = useSliderHook()
  return (
    <Carousel slidesPerRow={slidesPerRow}>
      {youtubeIDs.map((id, i) => (
        <Image
          key={i}
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          onClick={() => console.log('onClick')}
          // style={{ height: 172 }}
          // aspectRatio={1.56}
          disableSpinner
        />
      ))}
    </Carousel>
  )
}
