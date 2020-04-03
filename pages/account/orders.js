import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Box,
  withStyles,
} from '@material-ui/core'

import { TabbedNav } from '../../components/app'
import { AccountSection } from '../../components/account'
import OrdersView from '../../components/account/OrdersView'

import { googlePageView } from '../../util'
import styles from '../../styles/pages/investor.style.js'

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
      <Box>
        <AccountSection
          title={userStore.getFullName}
          style={{ marginBottom: '3em' }}
        >
          <TabbedNav tabs={AccountTabs} tab='orders' />
        </AccountSection>
        <OrdersView tabTitle='Orders' classes={classes} />
      </Box>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Orders))
