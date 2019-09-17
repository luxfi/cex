import React from 'react'
import Router from 'next/router'
import Emitter from '../src/emitter'
import { MuiText } from 'react-referential-forms'
import TokenCard from '../components/token-card'
import Link from '../components/link'

import { watch } from 'react-referential'
import { withBalance } from '../src/balances'
import { loadable } from '../components/app/loader'
import Api from '../src/hanzo/api'
import EOSApi from '../src/eos/api'
import BigNumber from 'bignumber.js'

import {
  getIdentity,
  removeIdentity,
  getEncodedPrivateKey,
  canDecodePrivateKey,
} from '../src/wallet'
import {
  HANZO_KEY,
  HANZO_ENDPOINT,
  TOKEN_SYMBOL,
} from '../src/settings.js'

import allTokens from '../tokens'

let tokens = allTokens.filter((v) => v.invested === true)

// Calculate total balance
let totalBalance = 0
tokens.forEach((v) => totalBalance += v.count * v.price)

@watch('accountPage')
@withBalance
@loadable
class Portfolio2 extends React.Component {
  constructor(props) {
    super(props)

    if (!getEncodedPrivateKey() || !canDecodePrivateKey()) {
      this.generateMnemonic()
      return
    }

    if (!this.props.rootData.get('account.id')) {
      this.props.startLoading(' ')
      this.loading = true
    }

    this.loadAccount()
  }

  generateMnemonic() {
    Router.push('/account/mnemonic')
  }

  logout() {
    this.props.rootData.ref('account').clear()
    removeIdentity()
    Router.push('/')
  }

  loadAccount() {
    // Load profile from Hanzo
    let api = new Api( HANZO_KEY, HANZO_ENDPOINT )

    return api.client.account.get()
      .then((res) => {
        this.props.rootData.set('account', res)
        this.props.rootData.set('kycPage.kycForm.kyc', res.kyc)

        if (this.loading) {
          this.props.stopLoading()
        }

      }).catch((err) => {
        console.log('Error on account.get', err)
        this.logout()
      })
  }

  render() {
    let props = this.props

    return pug`
      main#account-index.account
        .content
          h1
            ='Hello, ' + props.rootData.get('account.firstName')
          h5 Here’s what your portfolio has been doing.
          Link(href='/account/kyc')
            | Check your identify verification status.
          br
          small PORTFOLIO BALANCE:
          h1='$' + new BigNumber(totalBalance).toFormat(0)
          Link(
            href='/account/transactions'
            underline='none'
          )
            h6 View transactions
          // .simple-balances.columns.justify-flex-start
          //   .simple-balance
          //     .columns
          //       .simple-balance-logo
          //         img(src='/static/img/eth-logo-blue.svg')
          //       p='$' + new BigNumber(props.ethBalance).toFormat(2)
          //   .simple-balance
          //     .columns
          //       .simple-balance-logo
          //         img(src='/static/img/eos-logo-blue.png')
          //       p='$' + new BigNumber(props.eosBalance).toFormat(2)
          br
          .token-cards.columns.justify-flex-start
            for token in tokens
              Link(
                href='/account/transactions'
                underline='none'
              )
                TokenCard(
                  type=token.type
                  count=new BigNumber(token.count).toFormat(0),
                  name=token.name
                  value='$' + new BigNumber(token.count * token.price).toFormat(2)
                  status=token.status
                  price='$' + new BigNumber(token.price).toFormat(2)
                )
      `
  }
}

export default Portfolio2
