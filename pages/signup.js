import React from "react"
import { SignUpForm } from "../components/signup"
import { inject, observer } from "mobx-react"

@inject("store")
@observer
class SignUp extends React.Component {
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
      lastName,
      validFirstName,
      validLastName,
      isValidSignUp
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
