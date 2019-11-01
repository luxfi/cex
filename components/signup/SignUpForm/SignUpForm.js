import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// @material-ui/core components
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"

// Custom Link
import { CustomLink } from "../../app"

const styles = theme => ({
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

@inject("store")
@observer
class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checkedOver18: false }
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  handleKeypress(e) {
    var key = e.which || e.keyCode
    if (key === 13) {
      // 13 is enter
      document.getElementById("signup-submit-button").click()
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
    } = this.props

    const { passwordsMatch } = store.userStore
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
            id="firstName"
            name="firstName"
            type="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            error={firstName.length >= 2 && !validFirstName}
            helperText={firstName.length >= 2 && !validFirstName && "Please enter valid first name"}
            value={firstName}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            name="lastName"
            label="Last name"
            type="lastName"
            fullWidth
            autoComplete="lname"
            error={lastName.length >= 2 && !validLastName}
            helperText={lastName.length >= 2 && !validLastName && "Please enter valid last name"}
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
            autoFocus
            error={this.state.checkedOver18 && !validEmail}
            helperText={
              this.state.checkedOver18 &&
              !validEmail &&
              "please enter a valid email"
            }
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
            error={this.state.checkedOver18 && !validPassword}
            helperText={
              this.state.checkedOver18 &&
              !validPassword &&
              "please make sure password is long enough"
            }
            value={password}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password"
            type="password"
            id="passwordConfirm"
            error={
              this.state.checkedOver18 && passwordConfirm && !passwordsMatch
            }
            helperText={
              this.state.checkedOver18 &&
              passwordConfirm &&
              !passwordsMatch &&
              "passwords do not match"
            }
            value={passwordConfirm}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="over18"
                color="primary"
                name="over18"
                value={over18}
                onClick={() => this.setState({ checkedOver18: true })}
                onChange={evt => setValue(evt.target.name, evt.target.checked)}
              />
            }
            label="I am over 18."
          />
          <Button
            id="signup-submit-button"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!this.state.checkedOver18 || !isValidSignUp}
            onClick={() => {
              signUp(
                () => Router.push("/account/kyc"),
                ex => {
                  console.log("hit error callback **", ex)
                  setErrorMessage(ex)
                }
              )
            }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={CustomLink} href="/login" variant="body2">
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
