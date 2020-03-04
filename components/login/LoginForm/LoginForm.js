// Material Components
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import React from 'react'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperWithModal: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

@inject('store')
@observer
@withRouter
@withStyles(styles)
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayErrors: false }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress)
  }

  handleKeypress = (e) => {
    const key = e.which || e.keyCode
    if (key === 13) {
      // 13 is enter
      document.getElementById('login-submit-button').click()
    }
  }

  handleSubmit = (login, isValidLogin, setErrorMessage) => {
    const { router, isModal, store: { uiStore } } = this.props

    if (isValidLogin) {
      login(
        () => {
          // setSuccessMessage('You have successfully logged in!')
          if (isModal) {
            uiStore.closeAuthModal()
          } else {
            router.push('/portfolio')
          }
        },
        (ex) => {
          setErrorMessage(ex)
        },
      )
    } else {
      this.setState({ displayErrors: true })
    }
  }

  render() {
    const {
      classes,
      setValue,
      email,
      password,
      isValidLogin,
      validEmail,
      validPassword,
      login,
      setErrorMessage,
      setSuccessMessage,
      isModal,
    } = this.props

    const { displayErrors } = this.state

    return (
      <Container component='div' maxWidth='xs'>
        <CssBaseline />
        <div className={isModal ? classes.paperWithModal : classes.paper}>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoFocus
            error={displayErrors && !validEmail}
            helperText={
              displayErrors && !validEmail
                ? 'please enter valid email address'
                : ''
            }
            value={email}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            error={ displayErrors && !validPassword }
            helperText={
              displayErrors && !validPassword
                ? 'please make sure the password is long enough'
                : ''
            }
            value={password}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            id='login-submit-button'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            // disabled={}
            onClick={() => (
              this.handleSubmit(
                login,
                isValidLogin,
                setErrorMessage,
                setSuccessMessage,
              )
            )}
          >
            Sign In
          </Button>
        </div>
      </Container>
    )
  }
}

export default LoginForm
