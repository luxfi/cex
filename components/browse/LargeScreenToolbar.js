import {
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import React from 'react'
import facets from '../../settings/facets'
import tradingStatus from '../../settings/tradingStatus'
import Facets from './Facets'

const LargeScreenToolbar = (props) => {
  const {
    store: { movieStore },
    scrollTrigger,
    classes,
    tabSelected,
    getActiveValues,
  } = props

  return (
    <Toolbar className={classNames(
      classes.toolbar,
      scrollTrigger ? classes.solid : classes.transparent,
    )}>
      <Tabs value={movieStore.tradingStatusFilter.index} onChange={(ignore, i) => { tabSelected(tradingStatus.byIndex(i)) }} classes={classes.tabGroupClasses}>
      {tradingStatus.values.map((status) => <Tab label={status.title} disableRipple key={status.key} classes={classes.tabClasses}/>)}
      </Tabs>
      <Facets movieStore={movieStore} facets={facets} getActiveValues={getActiveValues} />
    </Toolbar>
  )
}

export default inject('store')(observer(LargeScreenToolbar))
