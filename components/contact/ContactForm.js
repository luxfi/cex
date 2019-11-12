import React from "react";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";

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
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid
              } = props;
              if (this.state.submitted) {
                return <p>Thanks for your inquiry. We'll respond shortly.</p>;
              }

              return (
                <form
                  name="contact"
                  method="post"
                  encType="application/x-www-form-urlencoded"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={handleChange} />
                    </label>
                  </div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="name"
                    name="name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                    margin="normal"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={errors.email && touched.email}
                    label="email"
                    name="email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                    margin="normal"
                  />
                  <TextField
                    multiline={true}
                    rows={3}
                    rowsMax={5}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="message"
                    name="message"
                    className={classes.textField}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.message && touched.message && errors.message
                    }
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!isValid || isSubmitting || !dirty}
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
