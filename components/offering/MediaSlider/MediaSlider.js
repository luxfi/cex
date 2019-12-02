import React, { useEffect, useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  InputBase,
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Box,
  useMediaQuery,
} from '@material-ui/core'

import { Carousel } from '../../app'

export default function MediaSlider() {
  const theme = useTheme()
  const matchesExtraSmall = useMediaQuery(theme => theme.breakpoints.up('xs'))
  const matchesSmall = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const matchesMedium = useMediaQuery(theme => theme.breakpoints.up('md'))
  const matchesLarge = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const matchesExtraLarge = useMediaQuery(theme => theme.breakpoints.up('xl'))
  const [slidesPerRow, setSlidesPerRow] = useState(5)
  useEffect(() => {
    console.log(Reducer())
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
  // padding: 0px 2px;
  // width: 100%
  return (
    <Carousel slidesPerRow={slidesPerRow}>
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
    </Carousel>
  )
}
