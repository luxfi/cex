// @material-ui/core components
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'

const styles = (theme) => ({
  root: {
    maxWidth: theme.spacing(60),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    marginTop: theme.spacing(8),
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
@withStyles(styles)
@withRouter
class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checkedOver18: false }
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
      document.getElementById('signup-submit-button').click()
    }
  }

  handleSubmit = (signUp, isValidLogin, setErrorMessage) => {
    const { router, setValue, isModal, store: { uiStore } } = this.props
    const urlParams = new URLSearchParams(window.location.search)
    const referralId = urlParams.get('ref')

    if (referralId) {
      setValue('referralId', referralId)
    }

    signUp(
      () => {
        if (isModal) {
          uiStore.closeAuthModal()
        } else {
          router.push('/account/identity')
        }
      },
      (ex) => {
        console.log('hit error callback **', ex)
        setErrorMessage(ex)
      },
    )
  }

  render() {
    const {
      classes,
      setValue,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      over18,
      isValidSignUp,
      signUp,
      validFirstName,
      validLastName,
      validEmail,
      validPassword,
      store,
      setErrorMessage,
      router,
      isModal,
    } = this.props
    const { checkedOver18 } = this.state

    const { passwordsMatch } = store.userStore
    // TODO Remove form)
    return (
      <Box className={classes.root}>
        <CssBaseline />
        <div className={isModal ? classes.paperWithModal : classes.paper}>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='firstName'
            name='firstName'
            type='firstName'
            label='First name'
            autoComplete='fname'
            error={firstName.length >= 2 && !validFirstName}
            helperText={firstName.length >= 2 && !validFirstName && 'Please enter valid first name'}
            value={firstName}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='lastName'
            name='lastName'
            label='Last name'
            type='lastName'
            autoComplete='lname'
            error={lastName.length >= 2 && !validLastName}
            helperText={lastName.length >= 2 && !validLastName && 'Please enter valid last name'}
            value={lastName}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoFocus
            error={checkedOver18 && !validEmail}
            helperText={
              checkedOver18
              && !validEmail
              && 'please enter a valid email'
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
            error={checkedOver18 && !validPassword}
            helperText={
              checkedOver18
              && !validPassword
              && 'please make sure password is long enough'
            }
            value={password}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='passwordConfirm'
            label='Password'
            type='password'
            id='passwordConfirm'
            error={
              checkedOver18 && passwordConfirm && !passwordsMatch
            }
            helperText={
              checkedOver18
              && passwordConfirm
              && !passwordsMatch
              && 'passwords do not match'
            }
            value={passwordConfirm}
            onChange={(evt) => setValue(evt.target.name, evt.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                name='over18'
                value={over18}
                onClick={() => this.setState({ checkedOver18: true })}
                onChange={(evt) => setValue(evt.target.name, evt.target.checked)}
              />
            }
            label='I am over 18.'
          />
          <Button
            id='signup-submit-button'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={!checkedOver18 || !isValidSignUp}
            onClick={() => (this.handleSubmit(signUp))}
          >
            Sign Up
          </Button>
        </div>
      </Box>
    )
  }
}
export default SignupForm
