import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import { inject, observer } from 'mobx-react'
import React from 'react'

import AddPaymentMethodForm from './AddPaymentMethodForm'

import CardPaymentForm from '../CardPaymentForm'
import CustomDialog from '../CustomDialog'

const CARD_TYPE = 'card'
const BANK_TYPE = 'bank'

@inject('store')
@observer
class AddPaymentMethodModal extends React.Component {

  componentDidMount() {
    this.props.store.userStore.loadAccountBalance()
    this.props.store.userStore.loadBalanceHistory()
  }

  closeDialog = () => {
    const { store: { uiStore, userStore } } = this.props
    userStore.resetPaymentMethod()
    userStore.resetEditedCard()
    uiStore.closeDialog()
  }

  selectPaymentMethod = (paymentMethod) => () => {
    const { store: { userStore } } = this.props
    userStore.selectPaymentMethod(paymentMethod)
  }

  renderPaymentOptions = () => (
    <List>
      <ListItem button onClick={this.selectPaymentMethod('bank')}>
        <ListItemIcon>
          <AccountBalanceIcon color='primary' />
        </ListItemIcon>
        <ListItemText id='bankAccountButton' primary='Bank Account' />
        <ArrowForwardIosIcon color='disabled' fontSize='small' />
      </ListItem>
      <Divider light />
      <ListItem button onClick={this.selectPaymentMethod('card')}>
        <ListItemIcon>
          <CreditCardIcon color='primary' />
        </ListItemIcon>
        <ListItemText id='debitCardButton' primary='Debit Card' />
        <ArrowForwardIosIcon color='disabled' fontSize='small' />
      </ListItem>
    </List>
  )

  renderAddPaymentMethodForm = () => {
    const { store: { userStore, uiStore } } = this.props

    const {
      setValue,
      addPaymentMethod,
      isValidNewPaymentMethod,
      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,
      validateNewPaymentMethodName,
      validateNewPaymentMethodPublicToken,
      validateNewPaymentMethodMetadata,
      newPaymentMethodName,
    } = userStore

    const setErrorMessage = (message) => {
      uiStore.setErrorMessage(message)
    }
    return (
      <AddPaymentMethodForm
        addPaymentMethod={addPaymentMethod.bind(userStore)}
        validateNewPaymentMethodName={validateNewPaymentMethodName.bind(
          userStore,
        )}
        validateNewPaymentMethodPublicToken={validateNewPaymentMethodPublicToken.bind(
          userStore,
        )}
        validateNewPaymentMethodMetadata={validateNewPaymentMethodMetadata.bind(
          userStore,
        )}
        isValidNewPaymentMethod={isValidNewPaymentMethod}
        validNewPaymentMethodName={validNewPaymentMethodName}
        validNewPaymentMethodPublicToken={
          validNewPaymentMethodPublicToken
        }
        setValue={setValue.bind(userStore)}
        setErrorMessage={setErrorMessage}
        refreshSession={() => {
          userStore.loadSession()
        }}
        newPaymentMethodName={newPaymentMethodName}
      />
    )
  }

  render() {
    const {
      store: {
        uiStore,
        userStore: {
          selectedPaymentMethod,
          cardEditingMode,
        },
      },
    } = this.props

    let title

    if (cardEditingMode && selectedPaymentMethod === CARD_TYPE) {
      title = 'Edit Debit Card'
    } else if (!cardEditingMode && selectedPaymentMethod === CARD_TYPE) {
      title = 'Add Debit Card'
    } else if (selectedPaymentMethod === BANK_TYPE) {
      title = 'Add Payment Using Bank Method'
    } else {
      title = 'Select Payment Method'
    }

    return (
      <CustomDialog
        open={uiStore.dialog.open}
        title={title}
        handleClose={this.closeDialog}
      >
        {selectedPaymentMethod === CARD_TYPE && <CardPaymentForm />}
        {selectedPaymentMethod === BANK_TYPE && this.renderAddPaymentMethodForm()}
        {!selectedPaymentMethod && this.renderPaymentOptions()}
      </CustomDialog>
    )
  }
}

export default AddPaymentMethodModal
