import React from 'react'
import { useObserver } from 'mobx-react'

import { useMediaQuery, useTheme } from '@material-ui/core'

import DesktopToolbar from './DesktopToolbar/DesktopToolbar'
import MobileToolbar from './MobileToolbar/MobileToolbar'

export default ({ stockStore, classes: s }) => {

  const theme = useTheme()
  const Component = useMediaQuery(theme.breakpoints.down('sm')) ? MobileToolbar : DesktopToolbar

  return useObserver(() => (
    <Component
      stockStore={stockStore}
      tabClasses={s}
      classes={s}
      tabSelected={(tradingStatus) => {
        stockStore.setTradingStatusFilter(tradingStatus)
      }}
    />
  )) 
}