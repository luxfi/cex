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

class SignupForm extends React.Component {
  render() {
    const {
      classes,
      setValue,
      email,
      password,
      over18,
      isValidSignup,
      signUp,
      validateEmail,
      validatePassword,
      validEmail,
      validPassword
    } = this.props

    // TODO Remove form)

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="firstName"
            type="firstName"
            id="firstName"
            onBlur={validateFirstName}
            // autoComplete="current-firstName"
            // error={!validfirstName}
            // helperText={this.state.firstNameError && this.state.firstNameError}
            value={firstName}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="lastName"
            type="lastName"
            id="lastName"
            onBlur={validateLastName}
            // autoComplete="current-lastName"
            // error={!validlastName}
            // helperText={this.state.lastNameError && this.state.lastNameError}
            value={lastName}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
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
            control={
              <Checkbox
                value="over18"
                color="primary"
                name="over18"
                value={over18}
                onChange={evt => setValue(evt.target.name, evt.target.checked)}
              />
            }
            label="I am over 18."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidSignup}
            onClick={() => {
              signUp(
                () => Router.push("/account/kyc"),
                ex => {
                  console.log("hit error callback **", ex)
                }
              )
            }}
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
        </div>
      </Container>
    )
  }
}
export default withStyles(styles)(SignupForm)

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
