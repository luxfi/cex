import React from 'react'
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

const Facets = ({facets, setFacet}) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <span className={classes.facetsLabel}>Filters</span>
      <Facet facet={facets[0]} setFacet={setFacet} classes={classes} />
    </div>
  )
} 

const Facet = ({facet, setFacet, classes }) => {
  
  let activeValues = []
  Object.keys(facet.values).forEach( (f, i) => {
    if (facet.values[f].value) {
      activeValues.push(facet.values[f])
    } 
  })

  const title = activeValues.length ? facet.titleSome + ':' : facet.titleAll

  return (
    <Paper className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => {

          const toggleFacet = (key, value) => {
            setFacet(facet.name, key, value)
            popupState.close()
          }

          const valueMarkup = []
          Object.keys(facet.values).forEach((v, i) => {
            const val = facet.values[v]
            valueMarkup.push(
              <MenuItem onClick={() => toggleFacet(val.key, !val.value)} className={classes.facetValueMenuItemOuter} key={val.key}>
                <Check className={classNames(val.value ? classes.facetValueIconActive : classes.facetValueIconInactive, classes.facetValueIcon)} />
                <span className={classes.facetValueTitle} style={{borderBottomColor: val.color}}>
                  {val.key}
                </span>
              </MenuItem>
            )
          })
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
                  {valueMarkup}
                </MenuList>
              </Paper>
            </Popper>
            </>
          )
        }}
      </PopupState>
      {activeValues.map(v => (
        <div className={classes.activeFacetPill} key={v.key}>
          <div className={classes.activeFacetPillInner} >
            <span className={classes.activeFacetTitle} style={{borderBottomColor: v.color}}>{v.key}</span>
            <IconButton className={classes.activeFacetCloseButton} onClick={() => setFacet(facet.name, v.key, false)}>
              <Close className={classes.activeFacetCloseButtonIcon} />
            </IconButton>
          </div>
        </div>
      ))}
    </Paper>
  )
}

export default Facets
