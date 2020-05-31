import React, { useState } from 'react'
import { useObserver } from 'mobx-react'

import {
  Button,
  Fade,
  IconButton,
  Modal,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core'

import { 
  CheckCircle as CheckCircleIcon, 
  Tune as TuneIcon
} from '@material-ui/icons'

import FACETS from '../../../settings/facets'
import tradingStatus from '../../../settings/tradingStatus'

import FacetPills from '../FacetPills'
import Facets from './Facets'

import styles from './mobileToolbar.style.js'
const useStyles = makeStyles(styles)

export default ({ tabClasses, stockStore, getActiveValues }) => {

  const [modalOpen, setModalOpen] = useState(false)
  const classes = useStyles()
  const combinedClasses = { ...classes, ...tabClasses }

  return useObserver(() => (
    <>
    <Modal
      open={modalOpen}
      onClose={() => {setModalOpen(false)}}
      closeAfterTransition
    >
      <Fade in={modalOpen}>
        <div className={combinedClasses.modal}>
          <div className={combinedClasses.modalHeader}>
            <h2>Filter</h2>
            <Button
              variant='outlined'
              size='small'
              className={combinedClasses.doneButton}
              endIcon={<CheckCircleIcon />}
              onClick={() => {setModalOpen(false)}}
            >
              Done
            </Button>
          </div>
          <div className={combinedClasses.modalContent}>
            <Facets stockStore={stockStore} getActiveValues={getActiveValues} />
          </div>
          <div className={combinedClasses.modalFooter}>
          {FACETS.map((facet) => (
            <div className={combinedClasses.selectedFacetContainer}>
              <Typography className={combinedClasses.facetName}>{facet.name}</Typography>
              <div className={combinedClasses.selectedFacets}>
                <FacetPills
                  facet={facet}
                  activeValues={getActiveValues(facet, stockStore)}
                  stockStore={stockStore}
                  key={facet.name}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
      </Fade>
    </Modal>
    <Toolbar className={combinedClasses.mobileToolbarContainer}>
      <Tabs 
        value={stockStore.tradingStatusFilter.index} 
        onChange={(ignore, i) => { stockStore.setTradingStatusFilter(tradingStatus.byIndex(i)) }} 
        classes={combinedClasses.tabGroupClasses}
      >
      {tradingStatus.STATUSES.map((status) => (
        <Tab label={status.title} disableRipple key={status.key} classes={combinedClasses.tabClasses}/>
      ))}
        <IconButton onClick={() => {setModalOpen(!modalOpen)}}><TuneIcon /></IconButton>
      </Tabs>
    </Toolbar>
    </>
  ))
}
