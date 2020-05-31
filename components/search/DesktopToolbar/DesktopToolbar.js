import React from 'react'
import { useObserver } from 'mobx-react'

import {
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'

import tradingStatus from '../../../settings/tradingStatus'
import Facets from './Facets'

export default ( { stockStore, classes: s, getActiveValues }) => useObserver(() => (

  <Toolbar className={s.toolbar}>
    <Tabs 
      value={stockStore.tradingStatusFilter.index} 
      onChange={(ignore, i) => { stockStore.setTradingStatusFilter(tradingStatus.byIndex(i)) }} 
      classes={s.tabGroupClasses}
    >
    {tradingStatus.STATUSES.map((status) => (
      <Tab label={status.title} disableRipple key={status.key} classes={s.tabClasses}/>
    ))}
    </Tabs>
    <Facets stockStore={stockStore} getActiveValues={getActiveValues} />
  </Toolbar>
))
