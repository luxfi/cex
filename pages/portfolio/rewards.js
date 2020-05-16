import React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'

import { TabbedNav } from '../../components/app'
import { RewardsView, PortfolioSection } from '../../components/portfolio'

import styles from '../../styles/pages/portfolio.style.js'

import portfolioTabs from '../../settings/portfolioTabs'
import { withOnDemandAuth } from '../../util/HOC'

export default withOnDemandAuth(withStyles(styles)(inject('store')(observer(
  ({store, classes}) => (
    <div className={classes.outerContainer}>
      <PortfolioSection title={store.userStore.getFullName} style={{ marginBottom: '3em' }}>
        <TabbedNav tabs={portfolioTabs} tab='rewards' />
      </PortfolioSection>
      <RewardsView />
    </div>
  )
))))
