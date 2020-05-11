import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { inject, observer } from 'mobx-react'
import React from 'react'
import LargeScreenToolbar from './LargeScreenToolbar'
import MobileToolbar from './MobileToolbar'

const FacetsToolbar = (props) => {
  const {
    store,
    store: { movieStore },
    classes,
  } = props
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const tabSelected = (tradingStatus) => {
    movieStore.setTradingStatusFilter(tradingStatus)
  }

  const getActiveValues = (facet, movieStore) => {
    const activeValues = []
    Object.keys(facet.values).forEach((value) => {
      if (movieStore.getFacetValue(facet.name, facet.values[value].key)) {
        activeValues.push(facet.values[value])
      }
    })
    return activeValues
  }

  const renderFacets = smallScreen ? (
    <MobileToolbar
      store={store}
      tabClasses={classes}
      tabSelected={tabSelected}
      getActiveValues={getActiveValues}
    />
  ) : (
    <LargeScreenToolbar
      store={store}
      classes={classes}
      tabSelected={tabSelected}
      getActiveValues={getActiveValues}
    />
  )

  return renderFacets
}

export default inject('store')(observer(FacetsToolbar))
