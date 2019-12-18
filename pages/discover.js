import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'

import { googlePageView } from '../util/generic'

import {
  CategorySlider,
  ForYouSlider,
  StudioSlider,
  TrailerSlider,
} from '../components/landing'

const heroMaxHeight = 800
const heroMinHeight = 600

const useStyles = makeStyles(() => ({
  /*
  hero: {
    height: '90vh',
    maxHeight: heroMaxHeight,
    minHeight: heroMinHeight,
  },
  */
}))

export default inject('store')(observer((props) => {
  const classes = useStyles()

  useEffect(() => {
    props.store.userPortfolio.getWatchlist()
    googlePageView()
  }, [])

  return (
    <>
      <div style={{ /*marginTop: -120,*/ position: 'relative' }}>
        <TrailerSlider/>
        <ForYouSlider />
        <StudioSlider />
        <CategorySlider />
      </div>
    </>
  )
}))
