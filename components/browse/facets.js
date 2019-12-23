import React from 'react'

import {
  Button,
  Icon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  makeStyles,
} from '@material-ui/core'

  // This module is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopper } from 'material-ui-popup-state'

import styles from './facets.style.js'
const useStyles = makeStyles(styles)

const genreFacet = {
  name: 'genre',
  titleAll: 'All Genres',
  titleSome: 'Genres',
  values: 
    [
      {
        title: 'Action',
        active: false,
      },
      {
        title: 'Adventure',
        active: true,
      },
      {
        title: 'Sci-Fi',
        active: false,
      },
    ]
} 

const Facets = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <Typography variant='body1' className={classes.facetsLabel}>Filters</Typography>
      <Facet facet={genreFacet} classes={classes} />
    </div>
  )
} 

const Facet = ({facet, classes }) => {
  
  const activeValues = facet.values.filter(f => f.active)
  const title = activeValues.length ? facet.titleSome + ':' : facet.titleAll

  return (
    <div className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => (
          <>
          <Button
            {...bindTrigger(popupState)}
            className={classes.facetDropdownButton}
            classes={{
              label: classes.facetButtonText
            }}
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
              {facet.values.map((v ) => (
                <MenuItem onClick={popupState.close} className={classes.facetMenuValueOuter}>
                  <Icon className={v.active ? classes.facetValueIconActive : classes.facetValueIconInactive}>check</Icon>
                  <span className={classes.facetMenuValueTitle}>
                    {v.title}
                  </span>
                </MenuItem>
              ))}
              </MenuList>
            </Paper>
          </Popper>
          </>
        )}
      </PopupState>
      {activeValues.map(v => (
        <div className={classes.activeFacetPill}>
          <span className={classes.activeFacetTitle}>{v.title}</span>
          <Icon className={classes.activeFacetCloseIcon}>cancel</Icon>
        </div>
      ))}
    </div>
  )
}

export default Facets
