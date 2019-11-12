import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Button, Container, Typography, TextField } from "@material-ui/core";

import { Formik, Field } from "formik";
import * as yup from "yup";

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
});

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitted: false
    };
  }

  setSubmitting(b) {
    this.setState({
      submitting: b
    });
  }

  setSubmitted(b) {
    this.setState({
      submitted: b
    });
  }

  render = () => {
    const { classes } = this.props;
    const values = { name: "", email: "", confirmPassword: "", password: "" };
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact
          </Typography>
          <Formik
            initialValues={{ email: "", name: "", message: "" }}
            onSubmit={values => {
              this.setSubmitting(true); // wait state

                /*  FOR EXAMPLE ...something like
              fetch.post(contactFormEndpoint,
                values,
                {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                  }
                },
              ).then((resp) => {
                this.setSubmitted(true)
                this.setSubmitting(false)
              }
              )
              */

              /* According to Netlify docs for posting the form submission */

              fetch("/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encode({ "form-name": "contact", ...values })
              })
                .then(resp => {
                  this.setSubmitted(true);
                  this.setSubmitting(false);
                  // TODO: link snackbar success here...
                })
                .catch(error => {
                  // TODO: link snackbar success here...
                  console.log(error);
                });
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string("Enter your email")
                .email("Enter a valid email")
                .required("Email is required"),
              name: yup.string("Enter a name").required("Name is required"),
              message: yup
                .string("Enter a message")
                .required("Message is required")
            })}
          >
            {props => {
              const {
                touched,
                errors,
                isSubmitting,
                isValid,
                handleSubmit
              } = props;
              debugger;
              if (this.state.submitted) {
                return <p>Thanks for your inquiry. We'll respond shortly.</p>;
              }

              return (
                <form onSubmit={handleSubmit} className={classes.formItself}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="name"
                    name="name"
                    helperText={errors.name && touched.name && errors.name}
                    component={TextField}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={errors.email && touched.email}
                    label="email"
                    name="email"
                    helperText={errors.email && touched.email && errors.email}
                    component={TextField}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="message"
                    name="message"
                    multiline={true}
                    className={classes.messageTextField}
                    helperText={
                      errors.message && touched.message && errors.message
                    }
                    component={TextField}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!isValid || isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    );
  };
}

export default withStyles(styles)(ContactForm);
