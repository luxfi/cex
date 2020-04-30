import { Link, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import CustomLink from '../CustomLink'
import LoginForm from './LoginForm'

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

const LoginView = ({ store, isModal, classes }) => {

  const { userStore, uiStore } = store

  const changeTab = () => {
    uiStore.setTabIndexValue(1)
  }

  const setErrorMessage = (message) => {
    uiStore.setErrorMessage(message)
  }

  const setSuccessMessage = (message) => {
    uiStore.setSuccessMessage(message)
  }

  const {
    email,
    password,
    isValidLogin,
    validEmail,
    validPassword,
  } = userStore

  const linkText = 'Need an account? Sign Up'
  const urlParams = new URLSearchParams(window.location.search)
  const referralId = urlParams.get('ref')
  const ref = referralId ? `?ref=${referralId}` : ''

  return (
    <>
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
        setSuccessMessage={setSuccessMessage}
        isModal={isModal}
      />
      <div className={classes.linksContainer}>
          <Typography variant="subtitle2">Forgot password? [NYI]</Typography>
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
                <Link component={CustomLink} href={`/signup${ref}`} variant='body2'>
                  {linkText}
                </Link>
              )
          }
          </div>
      </div>
    </>
  )
}

export default withStyles(styles)(inject('store')(observer(LoginView)))
