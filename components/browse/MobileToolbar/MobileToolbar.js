import {
  Button,
  IconButton,
  Modal,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Tune from '@material-ui/icons/Tune'
import React, { Component } from 'react'
import facets from '../../../settings/facets'
import tradingStatus from '../../../settings/tradingStatus'
import FacetPills from '../FacetPills'
import Facets from './Facets'
import styles from './MobileToolbar.style'

class MobileToolbar extends Component {
  state = {
    modalOpen: false,
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false })
  }

  toggleModal = () => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  render() {
    const {
      tabClasses,
      classes,
      store: { movieStore },
      tabSelected,
      getActiveValues,
    } = this.props

    const combinedClasses = { ...classes, ...tabClasses }

    const { modalOpen } = this.state

    return (
      <>
        <Modal
          open={modalOpen}
          onClose={this.handleModalClose}
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
                  onClick={this.handleModalClose}
                >
                  Done
                </Button>
              </div>
              <div className={combinedClasses.modalContent}>
                <Facets facets={facets} movieStore={movieStore} getActiveValues={getActiveValues} />
              </div>
              <div className={combinedClasses.modalFooter}>
                {
                  facets.map((facet) => (
                    <div className={combinedClasses.selectedFacetContainer}>
                      <Typography className={combinedClasses.facetName}>{facet.name}</Typography>
                      <div className={combinedClasses.selectedFacets}>
                        <FacetPills
                          facet={facet}
                          activeValues={getActiveValues(facet, movieStore)}
                          movieStore={movieStore}
                          key={facet.name}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Fade>
        </Modal>
        <Toolbar className={combinedClasses.mobileToolbarContainer}>
          <Tabs value={movieStore.tradingStatusFilter.index} onChange={(ignore, i) => { tabSelected(tradingStatus.byIndex(i)) }} classes={combinedClasses.tabGroupClasses}>
          {tradingStatus.values.map((status) => <Tab label={status.title} disableRipple key={status.key} classes={combinedClasses.tabClasses}/>)}
            <IconButton onClick={this.toggleModal}>
              <Tune />
            </IconButton>
          </Tabs>
        </Toolbar>
      </>
    )
  }
}

export default withStyles(styles)(MobileToolbar)
