import React from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Grid, withStyles } from '@material-ui/core'

import { TabbedNav, Loading } from '../../components/app'
import { PortfolioSection } from '../../components/portfolio'

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
    const { store } = this.props
    const { userStore, newsStore: { getFeedItems, loading } } = store

    return (
      <Box>
        <PortfolioSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='newsfeed' />
        </PortfolioSection>
        <Loading loading={loading}>
          <NewsFeedView feed={getFeedItems} />
        </Loading>
      </Box>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Newsfeed))
