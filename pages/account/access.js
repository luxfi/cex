import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { TabbedNav } from '../../components/app'
import { AccountSection, APIAccessView } from '../../components/account'

import AccountTabs from '../../settings/accountTabs'
import styles from '../../styles/pages/investor.style.js'
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
      <Box>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <TabbedNav tabs={AccountTabs} tab='access' />
        </AccountSection>
        <APIAccessView tabTitle='API Access' classes={classes} />
      </Box>
    )
  }
}

export default withOnDemandAuth(withStyles(styles)(Access))
