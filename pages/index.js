import React, { useEffect } from "react"
import { inject, observer } from "mobx-react"

import { makeStyles } from "@material-ui/core/styles"

import {
  Hero,
  TrailerSlider,
  StudioSlider,
  CategorySlider,
  ForYouSlider
} from "../components/landing"

import { googlePageView } from '../util/generic'

const heroMaxHeight = 800
const heroMinHeight = 600

const useStyles = makeStyles((theme) => {
  return {
    hero: {
      height: '90vh',
      maxHeight: heroMaxHeight,
      minHeight: heroMinHeight,
    }
  }
})

export default inject("store")(observer((props) => {
  const classes = useStyles()
  const { store } = props
  // const loggedIn = store.userStore.loggedIn

  useEffect(() => {
    props.store.userPortfolio.getWatchlist()
    googlePageView()
  }, [])

  return (
    <>
      <Hero className={classes.hero} maxHeight={heroMaxHeight} minHeight={heroMinHeight}/>
      <div style={{ marginTop: -80, position: 'relative' }}>
        <TrailerSlider/>
        <ForYouSlider />
        <StudioSlider />
        <CategorySlider />
      </div>
    </>
  )
}))

/*
      <div
        style={{
          transform: "translate(0, -52vh)"
        }}
      >
        <TrailerSlider />
        <ForYouSlider />
        <StudioSlider />
        <div style={{ marginBottom: "-52vh" }}>
          <CategorySlider />
        </div>
      </div>
*/
