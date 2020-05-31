import React from 'react'
import classNames from 'classnames'

import { MenuItem, MenuList } from '@material-ui/core'
import { Check } from '@material-ui/icons'

export default ({
  facets,
  classes,
  onClick,
  activeValues,
}) => (
  <MenuList className={classes.facetList}>
    {Object.values(facets.values).map((val) => {
      const isActive = activeValues.includes(val)
      const style = ('color' in val) ? { borderBottomColor: val.color } : { borderBottom: 'none !important' }
      return (
        <MenuItem
          onClick={() => onClick(val.key, !isActive)}
          className={classes.facetValueMenuItemOuter}
          key={val.key}
        >
          <Check className={classNames(isActive ? classes.facetValueIconActive : classes.facetValueIconInactive, classes.facetValueIcon)} />
          <span className={classes.facetValueTitle} style={style}>
            {val.key}
          </span>
        </MenuItem>
      )
    })}
  </MenuList>
)
