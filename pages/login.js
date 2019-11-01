import React from "react"
import Router from "next/router"
import { inject, observer } from "mobx-react"

import LoginForm from "../components/login/LoginForm"
import { googlePageView } from "../components/utils/generic.js"

@inject("store")
@observer
class Login extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  componentDidMount() {
    googlePageView()
  }

  render() {
    const { store } = this.props
    const { userStore } = this.props.store
    const {
      email,
      password,
      isValidLogin,
      validEmail,
      validPassword
    } = userStore
    const setErrorMessage = message => {
      store.uiStore.errorMessage = message
      store.uiStore.snackBarOpen = true
    }
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
        isValidLogin={isValidLogin}
        validEmail={validEmail}
        validPassword={validPassword}
        setErrorMessage={setErrorMessage}
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
