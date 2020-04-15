import React from 'react'
import { inject, observer } from 'mobx-react'
import { Box, withStyles } from '@material-ui/core'

import { TabbedNav } from '../../components/app'
import { RewardsView, PortfolioSection } from '../../components/portfolio'

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
    const { store } = this.props
    const { userStore } = store

    return (
      <Box>
        <PortfolioSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={portfolioTabs} tab='rewards' />
        </PortfolioSection>
        <RewardsView />
      </Box>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Rewards))
