import React from "react"
import Router from "next/router"
import { inject, observer } from "mobx-react"

import LoginForm from "../components/forms/login"

@inject("store")
@observer
class Login extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  render() {
    const { userStore } = this.props.store
    const { email, password, isValidLogin } = userStore
    return (
      <LoginForm
        setValue={(key, val) => {
          userStore.setValue(key, val)
        }}
        email={email}
        password={password}
        login={(onSuccess, onError) => {
          userStore.login(onSuccess, onError)
        }}
        validateEmail={() => {
          userStore.validateEmail()
        }}
        validatePassword={() => {
          userStore.validatePassword()
        }}
        isValidLogin={isValidLogin}
      />
    )
  }

  // commented out for mobx later...
  // constructor(props) {
  //   super(props)
  // this.emitter = new Emitter()

  // this.emitter.on('login:success', res => {
  //   this.props.rootData.set('account.token', res.token)
  //   setIdentity(res.identity)

  //   this.login()
  // })

  // this.hasIdentity = !!getIdentity()

  // if (this.hasIdentity) {
  //   this.login()
  // }
}

// login() {
//   if (!!getEncodedPrivateKey()) {
//     console.log('Pushing /portfolio')
//     Router.push('/portfolio')
//   } else {
//     console.log('Pushing /account/mnemonic')
//     Router.push('/account/mnemonic')
//   }
// }

// componentWillUnmount() {
//   this.emitter.off('login:success')
// }

//   render() {
//     return pug`
//       if !this.hasIdentity
//         main#index.hero.columns
//           .content.columns
//             .card.login.transparent
//               .card-header.rows
//                 h2 Login
//                 Link(
//                   href='/signup',
//                   underline='hover'
//                 )
//                   | Create your account
//               .card-body
//                 LoginForm(
//                   data=this.props.data
//                   emitter=this.emitter
//                 )
//     `
//   }
// }

export default Login
