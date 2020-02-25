import React from 'react'
import Router from 'next/router'

// Material Components
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import CustomLink from '../../app/CustomLink'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(12),
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayErrors: false }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  // submitLogin(e) {
  //   e.preventDefault()
  //   if (this.state.email === '' || this.password === '')
  //     return
  //   // clear errors for logic flow
  //   this.setState({ emailError: false })
  //   this.setState({ passwordError: false })
  //   let errors = false;
  //   try {
  //     isEmail(this.state.email)
  //   }
  //   catch (e) {
  //     errors = true
  //     this.setState({ emailError: e.message })
  //   }
  //   try {
  //     isPassword(this.state.password)
  //   }
  //   catch (e) {
  //     errors = true
  //     this.setState({ passwordError: e.message })
  //   }
  //   finally {
  //     if (!errors) {
  //       Router.push('/')
  //     }
  //   }
  // }

  handleKeypress(e) {
    const key = e.which || e.keyCode
    if (key === 13) {
      // 13 is enter
      document.getElementById('login-submit-button').click()
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress)
  }

  handleSubmit(login, isValidLogin, setErrorMessage) {
    if (isValidLogin) {
      login(
        () => {
          // setSuccessMessage('You have successfully logged in!')
          const referrer = Router.router.query.ref
          referrer ? Router.push(decodeURI(referrer)) : Router.push('/portfolio')
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
    } = this.props

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
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
            error={this.state.displayErrors && !validEmail}
            helperText={
              this.state.displayErrors && !validEmail
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
            error={ this.state.displayErrors && !validPassword }
            helperText={
              this.state.displayErrors && !validPassword
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
          <Grid container>
            <Grid item xs>
              {/* <Link href='#' variant='body2'> */}
              Forgot password? [NYI]
              {/* </Link> */}
            </Grid>
            <Grid item>
              <Link component={CustomLink} href='/signup' variant='body2'>
                Need an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  }
}
export default withStyles(styles)(LoginForm)
