import React from "react"
import { SignUpForm } from "../components/signup"
import { inject, observer } from "mobx-react"

@inject("store")
@observer
class SignUp extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  render() {
    const { userStore } = this.props.store
    const {
      email,
      password,
      passwordConfirm,
      over18,
      validEmail,
      validPassword,
      firstName,
      lastName
    } = userStore
    const setErrorMessage = message => {
      store.uiStore.errorMessage = message
      store.uiStore.snackBarOpen = true
    }
    return (
      <SignUpForm
        setValue={(key, val) => {
          userStore.setValue(key, val)
        }}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        over18={over18}
        isValidSignup={userStore.isValidSignup}
        signUp={(onSuccess, onError) => {
          userStore.signUp(onSuccess, onError)
        }}
        validateEmail={() => {
          userStore.validateEmail()
        }}
        validatePassword={() => {
          userStore.validatePassword()
        }}
        validEmail={validEmail}
        validPassword={validPassword}
        firstName={firstName}
        lastName={lastName}
        validateFirstName={() => {
          userStore.validateFirstName()
        }}
        validateLastName={() => {
          userStore.validateLastName()
        }}
        setErrorMessage={setErrorMessage}
      />
    )
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
