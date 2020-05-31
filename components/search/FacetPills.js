import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import styles from './facets.style.js'
const useStyles = makeStyles(styles)

export default ({
  facetDesc,
  activeValues,
  removeFacet,
}) => {
  const s = useStyles()

  return facetDesc.values.map((val) => {
    const style = ('color' in val && val.color && val.color.length) ? { borderBottomColor: val.color } : { borderBottom: 'none !important' }
    return activeValues.includes(val) ? (
      <div className={s.activeFacetPill} key={val.key}>
        <div className={s.activeFacetPillInner} >
          <span className={s.activeFacetTitle} style={style}>{val.key}</span>
          <IconButton
            className={s.activeFacetCloseButton}
            onClick={() => removeFacet(facet.name, val.key)}
          >
            <CloseIcon className={s.activeFacetCloseButtonIcon} />
          </IconButton>
        </div>
      </div>
    ) : null
  })
}

