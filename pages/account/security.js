import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container,
  Typography,
  withStyles,
} from '@material-ui/core'

import { TabbedNav } from '../../components/app'
import { AccountSection } from '../../components/account'
import { SecurityView } from '../../components/investor'

import { googlePageView } from '../../util/generic'
import styles from '../../styles/pages/investor.style.js'

import AccountTabs from '../../settings/accountTabs'

@inject("store")
@observer
class Security extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={AccountTabs} tab='security' />
        </AccountSection>
        <SecurityView tabTitle='Security' classes={classes} />
      </Container>
    )
  }
}

export default withStyles(styles)(Security)
