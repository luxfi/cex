import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, withStyles } from '@material-ui/core'

import { TabbedNav, AccountSection } from '../../components/app'

import { NewsFeedView } from '../../components/portfolio'

import { googlePageView } from '../../util'
import styles from '../../styles/pages/portfolio.style.js'
import portfolioTabs from '../../settings/portfolioTabs'
import { withOnDemandAuth } from '../../util/HOC'

@inject("store")
@observer
class Newsfeed extends React.Component {
  componentDidMount() {
    this.props.store.newsStore.loadFeed()
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore, newsStore } = store

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='newsfeed' />
        </AccountSection>
        <NewsFeedView feed={newsStore.getFeedItems} />
      </Container>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Newsfeed))
