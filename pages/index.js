import React from "react"
import { inject, observer } from "mobx-react"

import { withStyles } from "@material-ui/core/styles"

import {
  Hero,
  TrailerSlider,
  StudioSlider,
  CategorySlider,
  ForYouSlider
} from "../components/landing"

import { googlePageView } from '../util/generic'

import styles from "../styles/pages/landing.style.js"

@inject("store")
@observer
class Index extends React.Component {

  componentDidMount() {
    this.props.store.userPortfolio.getWatchlist()
    googlePageView()
  }

  render() {
    const { store } = this.props
    const loggedIn = store.userStore.loggedIn
    return (
      <>
        <Hero loggedIn={loggedIn} />
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
      </>
    )
  }
}

export default withStyles(styles)(Index)
