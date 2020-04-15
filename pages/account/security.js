import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Box,
  Typography,
  withStyles,
} from '@material-ui/core'

import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
} from '../../components/app'
import { SecurityView } from '../../components/account'

import { googlePageView } from '../../util'

import AccountTabs from '../../settings/accountTabs'
import { withOnDemandAuth } from '../../util/HOC'

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
      <PageSections>
        <SideMenuSection title={userStore.getFullName}>
          <TabbedNav tabs={AccountTabs} tab='security' orientation="vertical" />
        </SideMenuSection>
        <MainContentSection>
          <SecurityView tabTitle='Security' />
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Security)
