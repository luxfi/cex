import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

import React, { useEffect } from 'react'

import {
  CategorySlider,
  ForYouSlider,
  Hero,
  StudioSlider,
  TrailerSlider,
} from '../components/landing'

import { googlePageView } from '../util/generic'

const heroMaxHeight = 800
const heroMinHeight = 600

const useStyles = makeStyles(() => ({
  hero: {
    height: '90vh',
    maxHeight: heroMaxHeight,
    minHeight: heroMinHeight,
  },
}))

export default inject('store')(observer((props) => {
  const classes = useStyles()

  useEffect(() => {
    props.store.userPortfolio.getWatchlist()
    googlePageView()
  }, [])

  return (
    <>
      <Hero
        className={classes.hero}
        maxHeight={heroMaxHeight}
        minHeight={heroMinHeight}
      />
      <div style={{ marginTop: -120, position: 'relative' }}>
        <TrailerSlider/>
        <ForYouSlider />
        <StudioSlider />
        <CategorySlider />
      </div>
    </>
  )
}))
