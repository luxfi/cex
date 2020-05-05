import { Typography, makeStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useState } from 'react'
import FacetMenuList from '../FacetMenuList'

import styles from '../Facets.style'

const Facet = (props) => {
  const {
    facetDesc,
    movieStore,
    classes,
    activeValues,
  } = props

  const setFacetValue = (key, value) => {
    movieStore.setFacetValue(facetDesc.name, key, value)
  }

  return (
    <FacetMenuList
      facets={facetDesc}
      classes={classes}
      onClick={setFacetValue}
      activeValues={activeValues} />
  )
}

const Facets = ({ facets, movieStore, getActiveValues }) => {
  const [expanded, setExpanded] = useState(0)
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      {facets.map(
        (facet, i) => (
          <ExpansionPanel expanded={expanded === i} onChange={handleChange(i)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{facet.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Facet
                movieStore={movieStore}
                facetDesc={facet}
                classes={classes}
                key={facet.name}
                activeValues={getActiveValues(facet, movieStore)}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ),
      )}
    </div>
  )
}

export default Facets
