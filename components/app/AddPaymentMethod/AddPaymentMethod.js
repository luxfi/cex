import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import { inject, observer } from 'mobx-react'
import React from 'react'


import CustomDialog from '../CustomDialog'

import styles from './addPaymentMethod.style'

@inject('store')
@observer
class AddPaymentMethod extends React.Component {
  closeDialog = () => {
    const { store: { uiStore } } = this.props
    uiStore.closeDialog()
  }

  render() {
    const {
      store: {
        uiStore,
      },
    } = this.props

    return (
      <CustomDialog
        open={uiStore.dialog.open}
        title='Select Payment Method'
        handleClose={this.closeDialog}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Bank Account' />
            <ArrowForwardIosIcon color='disabled' />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemIcon>
              <CreditCardIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Debit Card' />
            <ArrowForwardIosIcon color='disabled' />
          </ListItem>
        </List>
      </CustomDialog>
    )
  }
}

export default withStyles(styles)(AddPaymentMethod)