import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Box,
  withStyles,
} from '@material-ui/core'

import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
} from '../../components/app'
import OrdersView from '../../components/account/OrdersView'

import { googlePageView } from '../../util'

import AccountTabs from '../../settings/accountTabs'
import { withOnDemandAuth } from '../../util/HOC'

@inject('store')
@observer
class Orders extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store

    return (
      <PageSections>
        <SideMenuSection
          title={userStore.getFullName}
        >
          <TabbedNav tabs={AccountTabs} tab='orders' orientation="vertical" />
        </SideMenuSection>
        <MainContentSection>
          <OrdersView tabTitle='Orders' />
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Orders)
