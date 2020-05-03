import {
  Box,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { SignUpForm } from '../components/app'

import styles from '../styles/pages/invite.style'
import { googlePageView } from '../util'

@inject('store')
@observer
class Invite extends React.Component {
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
    const { classes, store: { userStore, uiStore }, isModal } = this.props
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

    return (
      <Box className={classes.root}>
        <Grid container alignItems='center'>
          <Grid item xs={12} sm={7}>
            <Box className={classes.leftSideWrapper}>
              <img style={{ maxWidth: '100%', width: '100%' }} alt='img' src='https://www.indiewire.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-23-at-10.22.47-AM.png' />
              <Box className={classes.overlay}>
                  <Typography variant='h2'>You have been invited to create an account</Typography>
                  <Typography className='subtitle'>Create an account and start investing in publicly traded big production studios.</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} alignItems='center'>
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
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default withStyles(styles)(Invite)
