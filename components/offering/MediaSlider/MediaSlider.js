import React, { useEffect, useState } from 'react'
import { Carousel, Image } from '../../app'
import useSliderHook from './useSliderHook'

export default function MediaSlider({ youtubeIDs, setCurrentMedia }) {
  const slidesPerRow = useSliderHook()
  return (
    <Carousel slidesPerRow={slidesPerRow}>
      {youtubeIDs.map((id, i) => (
        <Image
          key={i}
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          onClick={() => setCurrentMedia(id)}
          // style={{ height: 172 }}
          // aspectRatio={1.56}
          disableSpinner
        />
      ))}
    </Carousel>
  )
}
