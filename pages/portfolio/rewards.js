import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, withStyles } from '@material-ui/core'

import { TabbedNav, AccountSection } from '../../components/app'
import { RewardsView } from '../../components/portfolio'

import { googlePageView } from '../../util'
import styles from '../../styles/pages/portfolio.style.js'

import portfolioTabs from '../../settings/portfolioTabs'
import { withOnDemandAuth } from '../../util/HOC'

@inject("store")
@observer
class Rewards extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='rewards' />
        </AccountSection>
        <RewardsView />
      </Container>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Rewards))
