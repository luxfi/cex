import React, { useEffect, useState } from 'react'
import { Carousel, Image } from '..'
import useSliderHook from '../MediaSlider/useSliderHook'
import { observer, inject } from 'mobx-react';
import { useRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles'

import Link from '../../app/Link'

import { getYoutubeId, slugFromPath } from '../../../util'

import styles from './trailers.style';


function Trailers({ store, classes }) {
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
            <Link key={i} href={`/watch?video=${movieSlug}&trailerId=${getYoutubeId(trailerInfo.trailer)}`}>
              <Image
                src={trailerInfo.thumbnail}
                disableSpinner
                className={classes.image}
              />
            </Link>
          ))
          : null
      }
    </Carousel>
  )
}

export default inject('store')(observer(withStyles(styles)(Trailers)));