import React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { Container, Typography, } from '@material-ui/core'

import {  AccountSection } from '../../components/account'
import { TabbedNav } from '../../components/app'
import { APIAccessView } from '../../components/investor'

import { googlePageView } from '../../util/generic'
import AccountTabs from '../../settings/accountTabs'

import styles from '../../styles/pages/investor.style.js'

@inject("store")
@observer
class Access extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={AccountTabs} tab='access' />
        </AccountSection>
        <APIAccessView tabTitle='API Access' classes={classes} />
      </Container>
    )
  }
}

export default withStyles(styles)(Access)
