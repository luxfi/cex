import React, { useState } from 'react'


import { Typography, makeStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FacetValuesMenu from '../FacetValuesMenu'

import FACETS from '../../../settings/facets'

import styles from '../facets.style.js'
const useStyles = makeStyles(styles)

export default ({ stockStore, getActiveValues }) => {

  const [expanded, setExpanded] = useState(0)
  const s = useStyles()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
    {FACETS.map((facet, i) => (
      <ExpansionPanel expanded={expanded === i} onChange={handleChange(i)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={s.heading}>{facet.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FacetValuesMenu
            classes={s}
            onFacetClicked={(facetName, value, shouldSet) => {
              stockStore.setFacet(facetName, value, shouldSet)
              popupState.close()
            }}
            stockStore={stockStore}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    </div>
  )
}
