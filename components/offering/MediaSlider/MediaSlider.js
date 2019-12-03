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

export default function MediaSlider({ youtubeIDs }) {
  const matchesExtraSmall = useMediaQuery(theme => theme.breakpoints.up('xs'))
  const matchesSmall = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const matchesMedium = useMediaQuery(theme => theme.breakpoints.up('md'))
  const matchesLarge = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const matchesExtraLarge = useMediaQuery(theme => theme.breakpoints.up('xl'))
  const [slidesPerRow, setSlidesPerRow] = useState(5)
  useEffect(() => {
    setSlidesPerRow(Reducer())
  }, [
    matchesExtraSmall,
    matchesSmall,
    matchesMedium,
    matchesLarge,
    matchesExtraLarge,
  ])
  const Reducer = exp => {
    if (matchesExtraLarge) return 6
    if (matchesLarge) return 5
    if (matchesMedium) return 6
    if (matchesSmall) return 4
    if (matchesExtraSmall) return 2
  }
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
