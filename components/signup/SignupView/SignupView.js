import {
  Box,
  Grid,
  Link,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { googlePageView } from '../../../util'

import NextMuiLink from '../../app/NextMuiLink'
import SignUpForm from '../SignUpForm'

@inject('store')
@observer
class SignupView extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  changeTab = () => {
    const {
      store: { uiStore },
    } = this.props

    uiStore.setTabIndexValue(0)
  }

  render() {
    const { store: { userStore, uiStore }, isModal } = this.props
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
    const setErrorMessage = (message) => {
      uiStore.setErrorMessage(message)
    }
    const urlParams = new URLSearchParams(window.location.search)
    const referralId = urlParams.get('ref')
    const ref = referralId ? `?ref=${referralId}` : ''

    const linkText = 'Sign in?'

    return (
      <Box>
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
        <Box component='div' maxWidth='xs'>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
                Already have an account?
            </Grid>
            <Grid item>
              {
                isModal ? (<button
                    type='button'
                    style={{
                      color: '#5fb8ff',
                      fontSize: 14,
                      background: 'none',
                      border: 'none',
                    }}
                    onClick={this.changeTab}
                  >
                    {linkText}
                  </button>)
                  : (
                    <Link component={NextMuiLink} href={`/login${ref}`} variant='body2'>
                      {linkText}
                    </Link>
                  )
              }
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }
}

export default SignupView
