import { IconButton, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import styles from './Facets.style'

const FacetPills = ({
  facet,
  activeValues,
  movieStore,
}) => {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    Object.values(facet.values).map((val) => {
      const isActive = activeValues.includes(val)
      const style = ('color' in val) ? { borderBottomColor: val.color } : { borderBottom: 'none !important' }
      if (isActive) {
        return (
        <div className={classes.activeFacetPill} key={val.key}>
          <div className={classes.activeFacetPillInner} >
            <span className={classes.activeFacetTitle} style={style}>{val.key}</span>
            <IconButton
              className={classes.activeFacetCloseButton}
              onClick={() => movieStore.setFacetValue(facet.name, val.key, false)}
            >
              <Close className={classes.activeFacetCloseButtonIcon} />
            </IconButton>
          </div>
        </div>
        )
      }
      return null
    }))
}

export default FacetPills
