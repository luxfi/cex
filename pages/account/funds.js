import React from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

import {
  Button,
  Grid,
  Divider,
  Container,
  Typography
} from '@material-ui/core'

import { AccountSection } from '../../components/account'
import { AddPaymentMethodModal } from '../../components/app'

import {
  CardCardItem,
  BankAccountItem,
  ManageFunds,
  BalanceHistoryItem,
} from '../../components/account'


import { googlePageView } from '../../util'
import AccountTabs from '../../settings/accountTabs'
import { TabbedNav } from '../../components/app'
import { withOnDemandAuth } from '../../util/HOC'

@inject('store')
@observer
class Funds extends React.Component {
  componentDidMount() {
    googlePageView()
    this.props.store.userStore.loadAccountBalance()
    this.props.store.userStore.loadBalanceHistory()
  }

  openAddPaymentMethodModal = () => {
    const { store: { uiStore } } = this.props
    uiStore.openDialog()
  }

  render() {
    const store = this.props.store
    const { userStore, uiStore } = store
    const {
      setValue,
      account,
      accountBalance,
      formattedAccounts,
      cardPaymentOptions,
      balanceHistory,
      addPaymentMethod,
      isValidNewPaymentMethod,
      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,
      validateNewPaymentMethodName,
      validateNewPaymentMethodPublicToken,
      validateNewPaymentMethodMetadata,
      handleFunds,
      newPaymentMethodName,
    } = userStore

    const setErrorMessage = message => {
      uiStore.setErrorMessage(message)
    }

    return (
      <Container
        maxWidth="lg"
        style={{ marginTop: '70px', marginBottom: '30px' }}
      >
        <AccountSection
          title={userStore.getFullName}
          style={{ marginBottom: '3em' }}
        >
          <TabbedNav tabs={AccountTabs} tab="funds" />
        </AccountSection>
        <AccountSection title="Linked Accounts" style={{ marginBottom: '3em' }}>
          <Grid container>
            <Grid item xs={8}>
              <Grid container direction="column">
                {formattedAccounts.map((a, i) => {
                  if (a.name === 'ESX') return null
                  return (
                    <BankAccountItem
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
                  )
                })}
                {cardPaymentOptions.length
                  ? cardPaymentOptions.map((cardPaymentOption) => {
                    return (
                      <CardCardItem
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
                    )
                  }) : null
                }
              </Grid>
              <Grid container style={{ marginTop: 10 }}>
                <Button
                  onClick={this.openAddPaymentMethodModal}
                  type='button'
                  variant='outlined'
                  color='primary'
                >
                  Add payment method
                </Button>
                <AddPaymentMethodModal />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column" alignItems="center">
                <ManageFunds
                  accountBalance={accountBalance}
                  accountList={formattedAccounts}
                  handleFunds={handleFunds.bind(userStore)}
                />
              </Grid>
            </Grid>
          </Grid>
        </AccountSection>
        <AccountSection title="Complete Transfers">
          <Grid container>
            <Grid item xs={8}>
              <Grid container direction="column">
                {balanceHistory && balanceHistory.length > 0 ? (
                  balanceHistory.map((r, i) => {
                    return (
                      <BalanceHistoryItem
                        key={`history_${i}`}
                        name={r.accountName}
                        amount={r.amount}
                        date={r.date}
                        deposit={r.deposit}
                      />
                    )
                  })
                ) : (
                  <Typography variant="h6">
                    No transfers have been made yet!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccountSection>
      </Container>
    )
  }
}

export default withOnDemandAuth(Funds)
