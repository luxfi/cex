import React from 'react'
import Router from 'next/router'
import { watch } from 'react-referential'
import LoginForm from '../components/forms/login'
import Emitter from '../src/emitter'
import { setIdentity } from '../src/wallet'

import Link from '../components/link'
import {
  getIdentity,
  getEncodedPrivateKey,
} from '../src/wallet'

import 'reeeset/src/reeeset.css'
import '../styles.styl'

@watch('indexPage')
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.emitter = new Emitter()

    this.emitter.on('login:success', res => {
      this.props.rootData.set('account.token', res.token)
      setIdentity(res.identity)

      this.login()
    })

    this.hasIdentity = !!getIdentity()

    if (this.hasIdentity) {
      this.login()
    }
  }

  login() {
    if (!!getEncodedPrivateKey()) {
      Router.push('/invest')
    } else {
      Router.push('/account/mnemonic')
    }
  }

  componentWillUnmount() {
    this.emitter.off('login:success')
  }

  render() {
    return pug`
      if !this.hasIdentity
        main#index.hero.columns
          .content.columns
            .card.login.transparent
              .card-header.rows
                h2 Login
                Link(
                  href='/signup',
                  underline='hover'
                )
                  | Create your account
              .card-body
                LoginForm(
                  data=this.props.data
                  emitter=this.emitter
                )
    `
  }
}

export default Login
