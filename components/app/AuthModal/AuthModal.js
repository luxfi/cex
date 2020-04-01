import {
  Box,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { LoginView } from '../../login'
import { SignupView } from '../../signup'
import CustomDialog from '../CustomDialog'

import styles from './authModal.style'

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props

  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

@inject('store')
@observer
@withStyles(styles)
class AuthModal extends React.Component {
  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeAuthModal()
  }

  render() {
    const {
      classes,
      authModalOpen,
      tabIndexValue,
    } = this.props

    return (
      <Box>
        <CustomDialog
          open={authModalOpen}
          handleClose={this.closeDialog}
        >
          <div className={classes.root}>
            <TabPanel value={tabIndexValue} index={0}>
              <LoginView isModal/>
            </TabPanel>
            <TabPanel value={tabIndexValue} index={1}>
              <SignupView isModal />
            </TabPanel>
          </div>
        </CustomDialog>
      </Box>
    )
  }
}

export default AuthModal
