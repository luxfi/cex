import React from 'react'
import { useObserver } from 'mobx-react'

import {
  Button,
  Paper,
  Popper,
  makeStyles,
} from '@material-ui/core'

// This module is recommended in the MUI docs themselves :)
// ( Popper is a bit awkward but ok for now ) :aa
import PopupState, { bindHover, bindPopper } from 'material-ui-popup-state'

import FacetMenuList from '../FacetMenuList'
import FacetPills from '../FacetPills'

import FACETS from '../../../settings/facets'

import styles from '../facets.style.js'
const useStyles = makeStyles(styles)

export default ({ stockStore, getActiveValues }) => {
  const s = useStyles()
  return useObserver(() => (
    <div className={s.facetsOuter}>
      <span className={s.facetsLabel}>Filters</span>
      {FACETS.map((f) => (
        <Facet
          stockStore={stockStore}
          facetDesc={f}
          classes={s}
          key={f.name}
          activeValues={getActiveValues(f, stockStore)}
        />
      ))}
    </div>
  ))
}

const Facet = ({
  stockStore,
  facetDesc,
  classes: s,
  activeValues,
}) => useObserver(() => (
  <Paper className={s.facetOuter}>
    <PopupState variant='popper' popupId='menu-popover'>
    {(popupState) => (
      <>
      <Button
        {...bindHover(popupState)}
        className={s.facetDropdownButton}
        classes={{ label: s.facetButtonText }}
      >
        {activeValues.length ? `${facetDesc.titleSome}:` : facetDesc.titleAll}
      </Button >
      <Popper
        {...bindPopper(popupState)}
        className={s.facetValuesMenu}
        transition
        placement='bottom-end'
      >
        <Paper>
          <FacetMenuList
            facets={facetDesc}
            classes={s}
            onClick={(key, value) => {
              stockStore.setFacetValue(facetDesc.name, key, value)
              popupState.close()
            }}
            activeValues={activeValues}
          />
        </Paper>
      </Popper>
      </>
    )}
    </PopupState>
    <FacetPills
      facetDesc={facetDesc}
      activeValues={activeValues}
      removeFacet={(name, value) => stockStore.setFacetValue(name, value, false)}
    />
  </Paper>
))
