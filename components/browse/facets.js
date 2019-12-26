import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import {
  Button,
  Icon,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  makeStyles,
} from '@material-ui/core'

import {
  Close,
  Cancel,
  Check,
} from '@material-ui/icons'

  // This module is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopper } from 'material-ui-popup-state'

import styles from './facets.style.js'
const useStyles = makeStyles(styles)

const Facets = ({facets, setFacetValue, getFacetValue}) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <span className={classes.facetsLabel}>Filters</span>
      <Facet 
        facet={facets[0]} 
        setFacetValue={setFacetValue} 
        getFacetValue={getFacetValue} 
        classes={classes} 
      />
    </div>
  )
} 

const Facet = observer(({facet, setFacetValue, getFacetValue, classes }) => {

  const activeValues = []
  Object.keys(facet.values).forEach( (f, i) => {
    if (getFacetValue(facet.name, facet.values[f].key)) {
      activeValues.push(facet.values[f])
    } 
  })
  const title = activeValues.length ? facet.titleSome + ':' : facet.titleAll

  return (
    <Paper className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => {
          const setFacetValue_Menu = (key, value) => {
            setFacetValue(facet.name, key, value)
            popupState.close()
          }
          return (
            <>
            <Button
              {...bindTrigger(popupState)}
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
                <MenuList>
                {Object.values(facet.values).map((val) => {
                  const isActive = activeValues.includes(val)
                  const style = ('color' in val) ? {borderBottomColor: val.color} : {borderBottom: 'none !important'}
                  return (
                    <MenuItem onClick={() => setFacetValue_Menu(val.key, !isActive)} className={classes.facetValueMenuItemOuter} key={val.key}>
                      <Check className={classNames(isActive ? classes.facetValueIconActive : classes.facetValueIconInactive, classes.facetValueIcon)} />
                      <span className={classes.facetValueTitle} style={style}>
                        {val.key}
                      </span>
                    </MenuItem>
                  )
                })}
                </MenuList>
              </Paper>
            </Popper>
            </>
          )
        }}
      </PopupState>
      {Object.values(facet.values).map((val) => {
        const isActive = activeValues.includes(val)
        const style = ('color' in val) ? {borderBottomColor: val.color} : {borderBottom: 'none !important'}
        if (isActive) {
          return (
            <div className={classes.activeFacetPill} key={val.key}>
              <div className={classes.activeFacetPillInner} >
                <span className={classes.activeFacetTitle} style={style}>{val.key}</span>
                <IconButton className={classes.activeFacetCloseButton} onClick={() => setFacetValue(facet.name, val.key, false)}>
                  <Close className={classes.activeFacetCloseButtonIcon} />
                </IconButton>
              </div>
            </div>
          )
        }
        return null
      })}
    </Paper>
  )
})

export default Facets
