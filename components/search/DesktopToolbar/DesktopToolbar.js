import React from 'react'
import { useObserver } from 'mobx-react'
import classNames from 'classnames'

import {
  Divider,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'

import {
  FormatListBulleted as ListIcon,
  Apps as GridIcon,
  Close as CloseIcon
} from '@material-ui/icons'

import tradingStatus from '../../../settings/tradingStatus'
import FacetsMenu from './FacetsMenu'

import FacetPills from '../FacetPills'

import FACETS from '../../../settings/facets'


export default ({ 
  stockStore, 
  classes: s, 
  currentView, 
  setCurrentView, 
  closeSearch 
}) => useObserver(() => (
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
      <div className={s.facetsAreaOuter}>
        <FacetsMenu stockStore={stockStore} />
        <ViewSelector classes={s} setCurrentView={setCurrentView} currentView={currentView} />
        <CloseButton classes={s} close={closeSearch} />
      </div>
    </div>
    <Divider />
    <SelectedFacetPills stockStore={stockStore} className={s.facetPillsOuter}/>
  </Toolbar>
))

const SelectedFacetPills = ({ stockStore, className }) => (
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

const ViewSelector = ( {classes: s, setCurrentView, currentView }) => (
  <>
  <IconButton 
    onClick={() => {(currentView !== 'list' && setCurrentView('list'))}} 
    className={classNames(s.viewButton, {[s.selectedView]: currentView === 'list'})}
  ><ListIcon /></IconButton>
  <IconButton 
    onClick={() => {(currentView !== 'grid' && setCurrentView('grid'))}} 
    className={classNames(s.viewButton, {[s.selectedView]: currentView === 'grid'})}
  ><GridIcon /></IconButton>
  </>
)

const CloseButton = ( {classes: s, close }) => (
  <IconButton 
    onClick={() => {close()}} 
    className={classNames(s.viewButton, s.closeButton)}
  ><CloseIcon /></IconButton>
)

