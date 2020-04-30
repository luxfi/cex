import {
  Link,
  Typography,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import CustomLink from '../CustomLink'
import SignUpForm from './SignUpForm'

const styles = (theme) => ({
  linksContainer: {
    maxWidth: theme.spacing(60),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const SignupView = ({ store, isModal, classes }) => {

  const { userStore, uiStore } = store

  const changeTab = () => {
    uiStore.setTabIndexValue(0)
  }

  const setErrorMessage = (message) => {
    uiStore.setErrorMessage(message)
  }

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
    isValidSignUp,
  } = userStore

  const urlParams = new URLSearchParams(window.location.search)
  const referralId = urlParams.get('ref')
  const ref = referralId ? `?ref=${referralId}` : ''

  const linkText = 'Sign in?'

  return (
    <div>
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
        isModal={isModal}
      />
      <div className={classes.linksContainer}>
          <Typography variant="subtitle2">Already have an account?</Typography>
          <div>
            {
              isModal ? (<button
                  type='button'
                  style={{
                    color: '#5fb8ff',
                    fontSize: 14,
                    background: 'none',
                    border: 'none',
                  }}
                  onClick={changeTab}
                >
                  {linkText}
                </button>)
                : (
                  <Link component={CustomLink} href={`/login${ref}`} variant='body2'>
                    {linkText}
                  </Link>
                )
            }
          </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(inject('store')(observer(SignupView)))
