import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'

import { googlePageView } from '../util/generic'

import {
  TrailerSlider,
} from '../components/landing'

const heroMaxHeight = 800
const heroMinHeight = 600

import TerminatorHero from '../assets/images/terminator-hero.jpg'

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
      <TrailerSlider/>
    </>
  )
}))
