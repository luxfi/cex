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

import FacetValuesMenu from '../FacetValuesMenu'

import FACETS from '../../../settings/facets'

import styles from '../facets.style.js'
const useStyles = makeStyles(styles)

export default ({ stockStore }) => {
  const s = useStyles()
  return (
    <div className={s.facetsOuter}>
      <span className={s.facetsLabel}>filter by</span>
      {FACETS.map((f) => (<Facet stockStore={stockStore} facet={f} classes={s} key={f.name} />))}
    </div>
  )
}

const Facet = ({
  stockStore,
  facet,
  classes: s
}) => useObserver(() => (
  <PopupState variant='popper' popupId='menu-popover'>
  {(popupState) => (
    <>
    <Button
      {...bindHover(popupState)}
      className={s.facetDropdownButton}
      classes={{ label: s.facetButtonText }}
    >
      {stockStore.getSelectedFacetValuesCount(facet.name)
        ? 
        `${facet.titleSome} (${stockStore.getSelectedFacetValuesCount(facet.name)})` 
        : 
        facet.titleAll
      }
    </Button >
    <Popper
      {...bindPopper(popupState)}
      className={s.facetValuesMenu}
      transition
      placement='bottom-end'
    >
      <Paper elevation={2}>
        <FacetValuesMenu
          facet={facet}
          classes={s}
          onFacetClicked={(facetName, value, shouldSet) => {
            stockStore.setFacet(facetName, value, shouldSet)
            popupState.close()
          }}
          stockStore={stockStore}
        />
      </Paper>
    </Popper>
    </>
  )}
  </PopupState>
))
