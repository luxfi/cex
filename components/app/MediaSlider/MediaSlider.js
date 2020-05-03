import React, { useEffect, useState } from 'react'
import { Carousel, Image } from '..'
import useSliderHook from './useSliderHook'

export default function MediaSlider({ trailers, setCurrentMedia }) {
  const slidesPerRow = useSliderHook()
  return (
    <Carousel slidesPerRow={slidesPerRow}>
      {trailers.map((movieTrailer, i) => (
        <Image
          key={i}
          src={movieTrailer.thumbnail}
          onClick={() => setCurrentMedia(movieTrailer.trailer)}
          disableSpinner
        />
      ))}
    </Carousel>
  )
}
