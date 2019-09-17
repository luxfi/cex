import React from 'react'
import Router from 'next/router'
import Emitter from '../../src/emitter'
import { MuiText } from 'react-referential-forms'
import TokenCard from '../../components/token-card'
import InvestCard from '../../components/invest-card'
import Link from '../../components/link'

import { watch } from 'react-referential'
import { withBalance } from '../../src/balances'
import { loadable } from '../../components/app/loader'
import Api from '../../src/hanzo/api'
import EOSApi from '../../src/eos/api'
import BigNumber from 'bignumber.js'

import {
  getIdentity,
  removeIdentity,
  getEncodedPrivateKey,
  canDecodePrivateKey,
} from '../../src/wallet'

import {
  HANZO_KEY,
  HANZO_ENDPOINT,
  TOKEN_SYMBOL,
} from '../../src/settings.js'

import tokens from '../../tokens'

// Calculate total balance
let totalBalance = 0
tokens.forEach((v) => totalBalance += v.count * v.price)

@watch('investPage')
@withBalance
@loadable
class Invest extends React.Component {
  constructor(props) {
    super(props)

    if (!getEncodedPrivateKey() || !canDecodePrivateKey()) {
      this.logout()
      return
    }

    if (!this.props.rootData.get('account.id')) {
      this.props.startLoading(' ')
      this.loading = true
    }

    this.loadAccount()

    this.state = {}
  }

  logout() {
    this.props.rootData.ref('account').clear()
    removeIdentity()
    Router.push('/')
  }

  loadAccount() {
    // Load profile from Hanzo
    let api = new Api(HANZO_KEY, HANZO_ENDPOINT)

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
    console.log('Found tokens', tokens)
    return pug`
      main#account-index.account
        .content
          h1 Projects raising
          h5 Invest in entertainment and media projects from the best studios.
          h5 All projects are rigorously screened & pass due diligence.
          Link(href='/account/kyc')
            | Check your identify verification status.

          br
          br
          .token-cards.columns.justify-flex-start
            for token in tokens
              Link(
                href='/invest/deal?slug=assassination-nation'
                hrefAs='/invest/assassination-nation'
                underline='none'
              )
                InvestCard(...token)
      `
  }
}

export default Invest
