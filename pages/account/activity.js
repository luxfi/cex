import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
} from '../../components/app'
import { ActiveSessionsView } from '../../components/account'

import { googlePageView } from '../../util'

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
      <PageSections>
        <SideMenuSection title={userStore.getFullName}>
          <TabbedNav tabs={AccountTabs} tab='activity' orientation="vertical" />
        </SideMenuSection>
        <MainContentSection>
          <ActiveSessionsView tabTitle='Account Activity' />
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Activity)
