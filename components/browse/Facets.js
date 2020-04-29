
import {
  Button,
  Paper,
  Popper,
  makeStyles,
} from '@material-ui/core'

// This module is recommended in the MUI docs themselves :)
import PopupState, {
  bindHover,
  // bindTrigger,
  bindPopper, // this is a bit buggy but ok for now
} from 'material-ui-popup-state'
import { observer } from 'mobx-react'
import React from 'react'
import FacetMenuList from './FacetMenuList'
import FacetPills from './FacetPills'

import styles from './Facets.style'

const useStyles = makeStyles(styles)

const Facets = ({ facets, movieStore, getActiveValues }) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <span className={classes.facetsLabel}>Filters</span>
      {facets.map(
        (f) => (
          <Facet
            movieStore={movieStore}
            facetDesc={f}
            classes={classes}
            key={f.name}
            activeValues={getActiveValues(f, movieStore)}
          />
        ),
      )}
    </div>
  )
}

const Facet = observer(({
  facetDesc,
  movieStore,
  classes,
  activeValues,
}) => {
  const title = activeValues.length ? `${facetDesc.titleSome}:` : facetDesc.titleAll

  return (
    <Paper className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => {
          const setFacetValueMenu = (key, value) => {
            movieStore.setFacetValue(facetDesc.name, key, value)
            popupState.close()
          }
          return (
            <>
            <Button
              {...bindHover(popupState)}
              className={classes.facetDropdownButton}
              classes={{ label: classes.facetButtonText }}
            >
              {title}
            </Button >
            <Popper
              {...bindPopper(popupState)}
              className={classes.facetValuesMenu}
              transition
              placement='bottom-end'
            >
              <Paper>
                <FacetMenuList
                  facets={facetDesc}
                  classes={classes}
                  onClick={setFacetValueMenu}
                  activeValues={activeValues}
                />
              </Paper>
            </Popper>
            </>
          )
        }}
      </PopupState>
      <FacetPills
        facet={facetDesc}
        activeValues={activeValues}
        movieStore={movieStore}
      />
    </Paper>
  )
})

export default Facets
