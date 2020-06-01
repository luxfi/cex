import React from 'react'
import { useObserver } from 'mobx-react'

import {
  Divider,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'

import tradingStatus from '../../../settings/tradingStatus'
import FacetsMenu from './FacetsMenu'

import FacetPills from '../FacetPills'

import FACETS from '../../../settings/facets'


export default ( { stockStore, classes: s }) => useObserver(() => (

  <Toolbar className={s.toolbar} disableGutters>
    <div className={s.toolbarInner} >
      <Tabs 
        value={stockStore.tradingStatusFilter.index} 
        onChange={(ignore, i) => { stockStore.setTradingStatusFilter(tradingStatus.byIndex(i)) }} 
        classes={s.tabGroupClasses}
        indicatorColor='primary'
      >
      {tradingStatus.STATUSES.map((status) => (
        <Tab label={status.title} disableRipple key={status.key} classes={s.tabClasses}/>
      ))}
      </Tabs>
      <FacetsMenu stockStore={stockStore} />
    </div>
    <Divider />
    <SelectedFacetPills stockStore={stockStore} className={s.facetPillsOuter}/>
  </Toolbar>
))

const SelectedFacetPills = ({ stockStore, className }) => {

  return (
    <div className={className} >
    {FACETS.map((facet) => (
      <FacetPills
        facet={facet}
        stockStore={stockStore}
        key={facet.name}
      />
    ))}
    </div>
  )
}
