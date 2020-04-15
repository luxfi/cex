import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import React from 'react'

import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
} from '../../components/app'
import { APIAccessView } from '../../components/account'

import AccountTabs from '../../settings/accountTabs'
import { googlePageView } from '../../util'
import { withOnDemandAuth } from '../../util/HOC'


@inject('store')
@observer
class Access extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <PageSections>
        <SideMenuSection title={userStore.getFullName}>
          <TabbedNav tabs={AccountTabs} tab='access' orientation="vertical" />
        </SideMenuSection>
        <MainContentSection>
          <APIAccessView tabTitle='API Access' />
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Access)
