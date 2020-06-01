import React from 'react'
import { useObserver } from 'mobx-react'
import classNames from 'classnames'

import { MenuItem, MenuList } from '@material-ui/core'
import { Check as CheckIcon } from '@material-ui/icons'

export default ({ stockStore, classes, onFacetClicked, facet }) => useObserver(() => (
  <MenuList className={classes.facetList}>
    {facet.values.map(( {key, color}) => {
      const isActive = stockStore.isFacetValueSelected(facet.name, key)
      const style = (color && color.length) ? { borderBottomColor: color } : { borderBottom: 'none !important' }
      return (
        <MenuItem
          onClick={() => onFacetClicked(facet.name, key, !isActive)}
          className={classes.facetValueMenuItemOuter}
          key={key}
        >
          <CheckIcon className={classNames((isActive ? classes.facetValueIconActive : classes.facetValueIconInactive), classes.facetValueIcon)} />
          <span className={classes.facetValueTitle} style={style}>{key}</span>
        </MenuItem>
      )
    })}
  </MenuList>
))
