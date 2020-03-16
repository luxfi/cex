import React, { useEffect, useState } from 'react'
import { Carousel, Image } from '../../app'
import useSliderHook from '../../offering/MediaSlider/useSliderHook'
import { observer, inject } from 'mobx-react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import { slugFromPath } from '../../../util'


function Trailers({ store }) {
  const router = useRouter()
  const slidesPerRow = useSliderHook()

  const movieSlug = router.query.slug || slugFromPath()

  const trailers = store.movieStore.getMovieTrailersBySlug(movieSlug)

  const getMovieIdFromMovieSlug = (trailerUrl) => {
    const videoUrlArray = trailerUrl.split('/')
    return videoUrlArray[videoUrlArray.length - 1]
  }

  return (
    <Carousel slidesPerRow={slidesPerRow}>
      {
        trailers.length
          ? trailers.map((trailerInfo, i) => (
            <Link key={i} href={`/watch?video=${movieSlug}&trailerId=${getMovieIdFromMovieSlug(trailerInfo.trailer)}`}>
              <a>
                <Image
                  src={trailerInfo.thumbnail}
                  disableSpinner
                  style={{ cursor: 'pointer', margin: 'auto 5px', border: '1px solid #5a5a5a' }}
                />
              </a>
            </Link>
          ))
          : null
      }
    </Carousel>
  )
}

export default inject('store')(observer(Trailers));