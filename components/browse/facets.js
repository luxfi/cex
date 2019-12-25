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

const genreFacet = {
  name: 'genre',
  titleAll: 'All Genres',
  titleSome: 'Genre',
  values: {
    action: {
      title: 'Action',
      color: '#2676ee',
      gradient: 'linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)',
      active: false,
    },
    comedy: {
      title: 'Comedy',
      color: '#24c6ea',
      gradient: 'linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)',
      active: true,
    },
    documentary: {
      title: 'Documentary',
      color: '#47d4ba',
      gradient: 'linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)',
      active: false,
    },
    drama: {
      title: 'Drama',
      color: '#76dd7b',
      gradient: 'linear-gradient(90deg, #6bc959 0%, #80f09b 100%)',
      active: false,
    },
    romance: {
      title: 'Romance',
      color: '#f3913d',
      gradient: 'linear-gradient(90deg, #e77718 0%, #ffaa61 100%)',
      active: true,
    },
    scifi: {
      title: 'Sci-Fi',
      color: '#ef4343',
      gradient: 'linear-gradient(90deg, #e01717 0%, #fe7070 100%)',
      active: false,
    },
    thriller: {
      title: 'Thriller',
      color: '#ad4bc3',
      gradient: 'linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)',
      active: false,
    },
  }
} 

const Facets = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.facetsOuter}>
      <span className={classes.facetsLabel}>Filters</span>
      <Facet facet={genreFacet} classes={classes} />
    </div>
  )
} 

const Facet = ({facet, toggleFacetFn, classes }) => {
  
  let activeValues = []
  Object.keys(facet.values).forEach( (f, i) => {
    if (facet.values[f].active) {
      activeValues.push(facet.values[f])
    } 
  })

  const title = activeValues.length ? facet.titleSome + ':' : facet.titleAll

  return (
    <Paper className={classes.facetOuter}>
      <PopupState variant='popper' popupId='menu-popover'>
        {(popupState) => {

          const toggleFacet = () => {
            //toggleFacetFn()
            popupState.close()
          }

          const valueMarkup = []
          Object.keys(facet.values).forEach((v, i) => {
            const val = facet.values[v]
            valueMarkup.push(
              <MenuItem onClick={toggleFacet} className={classes.facetValueMenuItemOuter} key={val.title}>
                <Check className={classNames(val.active ? classes.facetValueIconActive : classes.facetValueIconInactive, classes.facetValueIcon)} />
                <span className={classes.facetValueTitle} style={{borderBottomColor: val.color}}>
                  {val.title}
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
        <div className={classes.activeFacetPill} key={v.title}>
          <div className={classes.activeFacetPillInner} >
            <span className={classes.activeFacetTitle} style={{borderBottomColor: v.color}}>{v.title}</span>
            <IconButton className={classes.activeFacetCloseButton} onClick={toggleFacetFn}>
              <Close className={classes.activeFacetCloseButtonIcon} />
            </IconButton>
          </div>
        </div>
      ))}
    </Paper>
  )
}

export default Facets
