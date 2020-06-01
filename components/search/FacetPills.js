import React from 'react'
import { useObserver } from 'mobx-react'

import { IconButton, makeStyles } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import styles from './facets.style.js'
const useStyles = makeStyles(styles)

export default ({
  facet,
  stockStore,
}) => {
  const s = useStyles()

  return useObserver(() => (facet.values.map(( { color, key }) => {
    const style = (color && color.length ) ? { borderBottomColor: color } : { borderBottom: 'none !important' }
    return stockStore.isFacetValueSelected(facet.name, key) ? (
      <div className={s.activeFacetPill} key={key}>
        <div className={s.activeFacetPillInner} >
          <span className={s.activeFacetTitle} style={style}>{key}</span>
          <IconButton
            className={s.activeFacetCloseButton}
            onClick={() => {stockStore.setFacet(facet.name, key, false)}}
          >
            <CloseIcon className={s.activeFacetCloseButtonIcon} />
          </IconButton>
        </div>
      </div>
    ) : null
  })))
}
