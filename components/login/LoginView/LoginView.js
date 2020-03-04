import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
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

  changeTab = () => {
    const {
      store: { uiStore },
    } = this.props

    uiStore.setTabIndexValue(1)
  }

  render() {
    const { store, isModal } = this.props
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
    const linkText = 'Need an account? Sign Up'

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
        <Container component='div' maxWidth='xs'>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              Forgot password? [NYI]
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
                  <Link component={CustomLink} href='/signup' variant='body2'>
                    {linkText}
                  </Link>
                )
            }
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}
export default LoginView
