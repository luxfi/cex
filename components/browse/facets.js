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
import PopupState, { 
  bindHover, 
  //bindTrigger, 
  bindPopper, // this is a bit buggy but ok for now
} from 'material-ui-popup-state'


import styles from './facets.style.js'
const useStyles = makeStyles(styles)


const Facets = ({facetDescriptions, movieStore}) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <span className={classes.facetsLabel}>Filters</span>
      {Object.keys(facetDescriptions).map(
        (key, i) => (
          <Facet 
            movieStore={movieStore} 
            facetDesc={facetDescriptions[key]}
            classes={classes} 
            key={key}
          />
        )
      )}
    </div>
  )
} 

const Facet = observer(({facetDesc, movieStore, classes }) => {

  const activeValues = []
  Object.keys(facetDesc.values).forEach( (value, i) => {
    if (movieStore.getFacetValue(facetDesc.name, facetDesc.values[value].key)) {
      activeValues.push(facetDesc.values[value])
    } 
  })
  const title = activeValues.length ? facetDesc.titleSome + ':' : facetDesc.titleAll

  return (
    <Paper className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => {
          const setFacetValue_Menu = (key, value) => {
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
                <MenuList>
                {Object.values(facetDesc.values).map((val) => {
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
      {Object.values(facetDesc.values).map((val) => {
        const isActive = activeValues.includes(val)
        const style = ('color' in val) ? {borderBottomColor: val.color} : {borderBottom: 'none !important'}
        if (isActive) {
          return (
            <div className={classes.activeFacetPill} key={val.key}>
              <div className={classes.activeFacetPillInner} >
                <span className={classes.activeFacetTitle} style={style}>{val.key}</span>
                <IconButton className={classes.activeFacetCloseButton} onClick={() => movieStore.setFacetValue(facetDesc.name, val.key, false)}>
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
