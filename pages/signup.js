import React from "react"
import { SignUpForm } from "../components/signup"
import { inject, observer } from "mobx-react"

import { googlePageView } from "../util/generic.js"

@inject("store")
@observer
class SignUp extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  
  render() {
    const { userStore, uiStore } = this.props.store
    const {
      email,
      password,
      passwordConfirm,
      over18,
      validEmail,
      validPassword,
      firstName,
      lastName,
      validFirstName,
      validLastName,
      isValidSignUp
    } = userStore
    const setErrorMessage = message => {
      uiStore.errorMessage = message
      uiStore.snackBarOpen = true
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
        isValidSignUp={isValidSignUp}
        signUp={(onSuccess, onError) => {
          userStore.signUp(onSuccess, onError)
        }}
        validEmail={validEmail}
        validPassword={validPassword}
        firstName={firstName}
        lastName={lastName}
        validFirstName={validFirstName}
        validLastName={validLastName}
        setErrorMessage={setErrorMessage}
      />
    )
  }
}

export default SignUp
