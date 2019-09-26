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
// import { renderDate } from 'react-referential-forms'

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
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false
    }
    this.submitLogin = this.submitLogin.bind(this)
  }

  submitLogin(e) {
    e.preventDefault()
    // if (this.state.email === "" || this.password === "") return
    // // clear errors for logic flow
    // this.setState({ emailError: false })
    // this.setState({ passwordError: false })
    // let errors = false
    // try {
    //   isEmail(this.state.email)
    // } catch (e) {
    //   errors = true
    //   this.setState({ emailError: e.message })
    // }
    // try {
    //   isPassword(this.state.password)
    // } catch (e) {
    //   errors = true
    //   this.setState({ passwordError: e.message })
    // } finally {
    //   if (!errors) {
    //     Router.push("/account/mnemonic")
    //   }
    // }
  }

  render() {
    const { classes, store } = this.props
    const { userStore } = store
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
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
              // autoComplete="email"
              autoFocus
              error={!!this.state.emailError}
              helperText={this.state.emailError && this.state.emailError}
              value={userStore.email}
              onChange={event => {
                userStore.setValue(event.target.name, event.target.value)
              }}
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
              // autoComplete="current-password"
              error={!!this.state.passwordError}
              helperText={this.state.passwordError && this.state.passwordError}
              value={userStore.password}
              onChange={event => {
                userStore.setValue(event.target.name, event.target.value)
              }}
            />
            <FormControlLabel
              control={<Checkbox value="over18" color="primary" />}
              label="I am over 18."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Sign in?
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

// @watch('signupForm')
// export default class LoginForm extends Form {
//   constructor(props) {
//     super(props)

//     this.inputs = {
//       firstName: new InputData({
//         name: 'firstName',
//         data: props.data,
//         middleware: [ isRequired ],
//       }),
//       lastName: new InputData({
//         name: 'lastName',
//         data: props.data,
//         middleware: [ isRequired ],
//       }),
//       email: new InputData({
//         name: 'email',
//         data: props.data,
//         middleware: [isRequired, isEmail]
//       }),
//       password: new InputData({
//         name: 'password',
//         middleware: [isRequired, isPassword]
//       }),
//       passwordConfirm: new InputData({
//         name: 'passwordConfirm',
//         middleware: [isRequired, isPassword,
//           matches(() => {
//             return this.inputs.password.val()
//           }, 'passwords')
//         ]
//       }),
//       over18: new InputData({
//         name: 'rememberMe',
//         data: props.data,
//         defaultValue: false,
//         middleware: [isRequired]
//       })
//     }

//     this.emitter = props.emitter || new Emitter()
//   }

//   _submit() {
//     let api = new Api( HANZO_KEY, HANZO_ENDPOINT )

//     return api.client.account.create({
//       email: this.inputs.email.val(),
//       firstName: this.inputs.firstName.val(),
//       lastName: this.inputs.lastName.val(),
//       password: this.inputs.password.val(),
//       passwordConfirm: this.inputs.passwordConfirm.val(),
//     }).then((res) => {
//       let p = this.inputs.password.val()

//       this.inputs.password.val(this.inputs.password.val().replace(/./g, '•'))

//       let i = this.inputs.email.val() + p

//       this.emitter.trigger('signup:success', {
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
//         .form-group.columns
//           MuiText(
//             ...this.inputs.firstName
//             label='First Name'
//             variant='outlined'
//           )
//           MuiText(
//             ...this.inputs.lastName
//             label='Last Name'
//             variant='outlined'
//           )
//         .form-group.columns
//           MuiText(
//             ...this.inputs.email
//             label='Email'
//             variant='outlined'
//           )
//         .form-group.columns
//           MuiText(
//             ...this.inputs.password
//             label='Password'
//             type='password'
//             variant='outlined'
//           )
//         .form-group.columns
//           MuiText(
//             ...this.inputs.passwordConfirm
//             label='Confirm Password'
//             type='password'
//             variant='outlined'
//           )
//         MuiCheckbox(
//           ...this.inputs.over18
//           label='I am over 18.'
//         )
//         if this.getErrorMessage()
//           .error
//             = this.getErrorMessage()
//         Button.button(type='submit')
//           | REGISTER
//         if this.state.loading || this.state.validating
//           .progress
//             .indeterminate
//     `
//   }
// }
