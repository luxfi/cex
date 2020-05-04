import React, { useState, useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'

const useSliderHook = () => {
  const [slidesPerRow, setSlidesPerRow] = useState(5)
  const matchesExtraSmall = useMediaQuery(theme => theme.breakpoints.up('xs'))
  const matchesSmall = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const matchesMedium = useMediaQuery(theme => theme.breakpoints.up('md'))
  const matchesLarge = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const matchesExtraLarge = useMediaQuery(theme => theme.breakpoints.up('xl'))
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
  return slidesPerRow
}
export default useSliderHook
