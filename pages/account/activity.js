import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container,
  Typography,
  withStyles,
} from "@material-ui/core"

import { TabbedNav } from '../../components/app'
import { AccountSection, ActiveSessionsView } from '../../components/account'

import { googlePageView } from '../../util'

import styles from '../../styles/pages/investor.style.js'

import AccountTabs from '../../settings/accountTabs'
import { withOnDemandAuth } from '../../util/HOC'

@inject("store")
@observer
class Activity extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={AccountTabs} tab='activity' />
        </AccountSection>
        <ActiveSessionsView tabTitle='Account Activity' classes={classes} />
      </Container>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Activity))
