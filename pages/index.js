import React from "react"
// @material-ui/core components
import { Container } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Hero from "../components/landing/Hero/Hero"

// styles
import styles from "../pageStyles/landing.style"

// Sections for this page
import { TrailerSlider, StudioSlider, CategorySlider, ForYouSlider } from "../components/landing"

@inject("store")
@observer
class Index extends React.Component {

  componentDidMount() {
    this.props.store.userPortfolio.getWatchlist()
  }

  render() {
    const { movieStore } = this.props.store
    const { classes, store } = this.props
    const loggedIn = store.userStore.loggedIn
    return (
      <>
        <Hero loggedIn={loggedIn} />
        <Container maxWidth="xl"
          style={{
            transform: "translate(0, -32vh)"
          }}
        >
          <TrailerSlider />
          <ForYouSlider />
          <StudioSlider />
          <div style={{ marginBottom: "-32vh" }}>
            <CategorySlider />
          </div>
        </Container>
      </>
    )
  }
}

export default withStyles(styles)(Index)
