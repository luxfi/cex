import React from "react"
import Router from "next/router"
import { watch } from "react-referential"
import SignupForm from "../components/forms/signup"
import Emitter from "../src/emitter"
import { setIdentity } from "../src/wallet"
import { inject, observer } from "mobx-react"

import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import Link from "../components/link"
import { getEncodedPrivateKey } from "../src/wallet"

@observer
@inject("store")
class SignUp extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return {
      userStore: mobxStore.userStore,
      movieStore: mobxStore.movieStore,
      orderBook: mobxStore.orderBook
    }
  }

  render() {
    return <SignupForm userStore={this.props.userStore} />
  }
}
// @watch('signupPage')
// class Signup extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   constructor(props) {
//     super(props)

//     this.emitter = new Emitter()

//     this.emitter.on('signup:success', res => {
//       this.props.rootData.set('account.token', res.token)
//       setIdentity(res.identity)

//       this.signup()
//     })
//   }

//   signup() {
//     Router.push('/account/mnemonic')
//   }

//   componentWillUnmount() {
//     this.emitter.off('signup:success')
//   }

//   render() {
//     const {value} = this.state

//     return pug`
//       if !this.hasIdentity
//         main#signup.hero.columns
//           .content.columns
//             .card.signup.transparent
//               .card-header.rows
//                 h2 Sign Up
//                 Link(
//                   href='/login',
//                   underline='hover'
//                 )
//                   | Already have an account?

//                 Tabs(value=value onChange=this.handleChange)
//                   Tab(label="For investors")
//                   Tab(label="For creators")

//               .card-body
//                 if value === 0
//                   InvestorSignupForm(data=this.props.data, emitter=this.emitter)
//                 else
//                   CreatorSignupForm(data=this.props.data, emitter=this.emitter)

//     `
//   }
// }

export default SignUp
