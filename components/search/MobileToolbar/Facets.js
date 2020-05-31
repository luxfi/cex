import React, { useState } from 'react'


import { Typography, makeStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FacetMenuList from '../FacetMenuList'

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
          <FacetMenuList
            facets={facet}
            classes={s}
            onClick={(key, value) => {
              stockStore.setFacetValue(facetDesc.name, key, value)
            }}
            activeValues={getActiveValues(facet, stockStore)} 
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    </div>
  )
}
