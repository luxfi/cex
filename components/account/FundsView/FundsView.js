import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core'

import RemoveCardElements from './RemoveCardElements'
import BankAccountElements from './BankAccountElements'
import ManageFundsElements from './ManageFundsElements'
import BalanceHistoryElements from './BalanceHistoryElements'

import { AddPaymentMethodModal } from '../../app'

import { APP_NAME } from '../../../service/common'

import styles from '../account.style.js'

@withStyles(styles)
@inject('store')
@observer
export default class extends React.Component {
  
  componentDidMount() {
    this.props.store.userStore.loadAccountBalance()
    this.props.store.userStore.loadBalanceHistory()
  }

  openAddPaymentMethodModal = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  render() {
    const { store, classes } = this.props
    const { userStore } = store
    const {
      accountBalance,
      formattedAccounts,
      cardPaymentOptions,
      balanceHistory,
      handleFunds,
    } = userStore

    return (
      <Paper className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card elevation={2} classes={{root: classes.linkedAccountsCard}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Linked Accounts</Typography>
                {formattedAccounts.map((a, i) => ((a.name === APP_NAME) ? null : (
                  <BankAccountElements
                    key={`account_${i}`}
                    accountName={a.name}
                    accountNumber={a.account.mask}
                    accountType={a.account.type}
                    institution={a.institution.name}
                    subtype={a.account.subtype}
                    removeAccount={() => {
                      alert("Remove doesn't work in dev mode!")
                      console.log('Removing the account!', a.id)
                    }}
                  />
                )))}
                {cardPaymentOptions.map((cardPaymentOption) => (
                  <RemoveCardElements
                    key={cardPaymentOption.creditCard}
                    nameOnCard={cardPaymentOption.nameOnCard}
                    creditCardNumber={cardPaymentOption.creditCard}
                    cardType={cardPaymentOption.type}
                    expiryMonth={cardPaymentOption.expiryMonth}
                    expiryYear={cardPaymentOption.expiryYear}
                    removeAccount={() => {
                      alert("Remove doesn't work in dev mode!")
                    }}
                  />
                ))}
                <Button
                onClick={this.openAddPaymentMethodModal}
                type='button'
                variant='outlined'
                color='primary'
                id='addPaymentMethodButton'
              >
                Add payment method
              </Button>
              <AddPaymentMethodModal />
            </CardContent>
            </Card>
            <Card elevation={2}>
              <CardContent >
                <Typography variant="h6">Complete Transfers</Typography>
                {(balanceHistory && balanceHistory.length > 0) ? (
                  balanceHistory.map((r, i) => (
                  <BalanceHistoryElements
                    key={`history_${i}`}
                    name={r.accountName}
                    amount={r.amount}
                    date={r.date}
                    deposit={r.deposit}
                  />
                ))
                ) : (
                <Typography variant="h6">
                  No transfers have been made yet!
                </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={2}>
              <CardContent>
                <ManageFundsElements
                  accountBalance={accountBalance}
                  accountList={formattedAccounts}
                  handleFunds={handleFunds.bind(userStore)}
                />
              </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
