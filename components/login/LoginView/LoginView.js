import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { googlePageView } from '../../../util'

import CustomLink from '../../app/CustomLink'
import LoginForm from '../LoginForm'

@inject('store')
@observer
class LoginView extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { store } = this.props
    const { userStore, uiStore } = store
    const {
      email,
      password,
      isValidLogin,
      validEmail,
      validPassword,
    } = userStore
    const setErrorMessage = (message) => {
      uiStore.setErrorMessage(message)
    }
    const setSuccessMessage = (message) => {
      uiStore.setSuccessMessage(message)
    }
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
        />
        <Grid container maxWidth='xs'>
          <Grid item xs>
            Forgot password? [NYI]
          </Grid>
          <Grid item>
            <Link component={CustomLink} href='/signup' variant='body2'>
              Need an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </>
    )
  }
}
export default LoginView
