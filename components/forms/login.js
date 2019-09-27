import React from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Router from "next/router"
import * as ethers from "ethers"
import Api from "../../src/hanzo/api"

import { watch } from "react-referential"
import { HANZO_KEY, HANZO_ENDPOINT } from "../../src/settings.js"

// import isRequired from '../../src/control-middlewares/isRequired'
import isEmail from "../../src/control-middlewares/isEmail"
import isPassword from "../../src/control-middlewares/isPassword"
// import { renderDate } from 'react-referential-forms';

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  // submitLogin(e) {
  //   e.preventDefault()
  //   if (this.state.email === "" || this.password === "")
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
    var key = e.which || e.keyCode
    if (key === 13) {
      // 13 is enter
      document.getElementById("login-submit-button").click()
    }
  }

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeypress)
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeypress)
  }

  render() {
    const {
      classes,
      setValue,
      email,
      password,
      validatePassword,
      validateEmail,
      isValidLogin,
      login
    } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onBlur={validateEmail}
            // autoComplete="email"
            autoFocus
            // error={!validEmail}
            // helperText={this.state.emailError && this.state.emailError}
            value={email}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
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
            onBlur={validatePassword}
            // autoComplete="current-password"
            // error={!validPassword}
            // helperText={this.state.passwordError && this.state.passwordError}
            value={password}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            id="login-submit-button"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidLogin}
            onClick={() => {
              login(
                () => Router.push("/profile"),
                ex => {
                  console.log("hit error callback **", ex)
                }
              )
            }}
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
