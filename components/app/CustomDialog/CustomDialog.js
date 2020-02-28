import {
  Dialog, IconButton, Typography,
} from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

import { dialogContentStyles, dialogStyles, dialogTitleStyles } from './customeDialog.style'

const DialogTitle = withStyles(dialogTitleStyles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(dialogContentStyles)(MuiDialogContent)

const CustomDialog = ({
  handleClose, title, children, open,
}) => {
  return (
    <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(dialogStyles)(CustomDialog)
