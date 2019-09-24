
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Router from 'next/router'
import * as ethers from 'ethers'
import Api from '../../src/hanzo/api'

import { watch } from 'react-referential'
import { HANZO_KEY, HANZO_ENDPOINT } from '../../src/settings.js'

// import isRequired from '../../src/control-middlewares/isRequired'
import isEmail from '../../src/control-middlewares/isEmail'
import isPassword from '../../src/control-middlewares/isPassword'
// import { renderDate } from 'react-referential-forms';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
    }
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin(e) {
    e.preventDefault()
    if (this.state.email === "" || this.password === "")
      return
    // clear errors for logic flow
    this.setState({ emailError: false })
    this.setState({ passwordError: false })
    let errors = false;
    try {
      isEmail(this.state.email)
    }
    catch (e) {
      errors = true
      this.setState({ emailError: e.message })
    }
    try {
      isPassword(this.state.password)
    }
    catch (e) {
      errors = true
      this.setState({ passwordError: e.message })
    }
    finally {
      if (!errors) {
        Router.push('/')
      }
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submitLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!this.state.emailError}
              helperText={this.state.emailError && this.state.emailError}
              value={this.state.email}
              onChange={event => this.setState({ [event.target.name]: event.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!this.state.passwordError}
              helperText={this.state.passwordError && this.state.passwordError}
              value={this.state.password}
              onChange={event => this.setState({ [event.target.name]: event.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}
export default withStyles(styles)(LoginForm)

// @watch('loginForm')
// export default class LoginForm extends Form {
//   constructor(props) {
//     super(props)

//     this.inputs = {
//       email: new InputData({
//         name: 'email',
//         data: props.data,
//         middleware: [isRequired, isEmail]
//       }),
//       password: new InputData({
//         name: 'password',
//         middleware: [isRequired, isPassword]
//       }),
//       rememberMe: new InputData({
//         name: 'rememberMe',
//         data: props.data,
//         defaultValue: false
//       })
//     }

//     this.emitter = props.emitter || new Emitter()
//   }

//   _submit() {
//     let api = new Api(HANZO_KEY, HANZO_ENDPOINT)

//     return api.client.account.login({
//       email: this.inputs.email.val(),
//       password: this.inputs.password.val(),
//     }).then((res) => {
//       let p = this.inputs.password.val()

//       this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

//       let i = this.inputs.email.val() + p

//       this.emitter.trigger('login:success', {
//         identity: ethers.utils.sha256(ethers.utils.toUtf8Bytes(i)),
//         token: res.token,
//       })
//     })
//   }

//   render() {
//     return pug`
//       form.form(
//         autoComplete=this.props.autoComplete
//         onSubmit=this.submit
//         className=classnames({
//           validating: this.state.validating,
//           loading: this.state.loading,
//           submitted: this.state.submitted,
//         })
//       )
//         .form-group
//           MuiText(
//             ...this.inputs.email
//             label='Email'
//             variant='outlined'
//           )
//         .form-group
//           MuiText(
//             ...this.inputs.password
//             label='Password'
//             variant='outlined'
//             type='password'
//           )
//         MuiCheckbox(
//           ...this.inputs.rememberMe
//           label='Remember me on this device.'
//         )
//         if this.getErrorMessage()
//           .error
//             = this.getErrorMessage()
//         Button.button(type='submit')
//           | LOGIN
//         if this.state.loading || this.state.validating
//           .progress
//             .indeterminate
//     `
//   }
// }
