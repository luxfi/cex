import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
} from '../../components/app'
import { InvestorInfoView } from '../../components/account'

import { googlePageView } from '../../util'

import AccountTabs from '../../settings/accountTabs'
import { withOnDemandAuth } from '../../util/HOC'

@inject("store")
@observer
class Profile extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <PageSections>
        <SideMenuSection title={userStore.getFullName}>
          <TabbedNav tabs={AccountTabs} tab='' orientation='vertical' />
        </SideMenuSection>
        <MainContentSection>
          <InvestorInfoView tabTitle='Profile'/>
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Profile)
