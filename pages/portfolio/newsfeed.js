import React from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core'

import { TabbedNav, Loading } from '../../components/app'
import { NewsFeedView, PortfolioSection } from '../../components/portfolio'

import styles from '../../styles/pages/portfolio.style.js'
import portfolioTabs from '../../settings/portfolioTabs'

import { loginRequired } from '../../util'

@loginRequired
@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {

  componentDidMount() {
    this.props.store.newsStore.loadFeed()
  }

  render() {
    const { store, classes } = this.props
    const { userStore, newsStore: { getFeedItems, loading } } = store

    return (
      <div className={classes.outerContainer}>
        <PortfolioSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='newsfeed' />
        </PortfolioSection>
        <Loading loading={loading}>
          <NewsFeedView feed={getFeedItems} />
        </Loading>
      </div>
    )
  }
}