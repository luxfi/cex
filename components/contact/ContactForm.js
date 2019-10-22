import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { TextField, Button } from '@material-ui/core'

import { Formik } from 'formik';
import * as yup from 'yup';

import styles from "./contactForm.style.js"

class ContactForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      submitted: false
    }
  }

  setSubmitting(b) {
    this.setState({
      submitting: b
    })
  }

  setSubmitted(b) {
    this.setState({
      submitted: b
    })
  }

    // a renderprops function for Formik
  renderForm = (props) => {

      // Formik stuff
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    } = props;

    const classes = this.props.classes

    if (this.state.submitted) {
      return (
        <p>Thanks for your inquiry.  We'll respond shortly.</p>
      )
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.fieldsOuter}>
          <TextField
            label="name"
            name="name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.name && touched.name) && errors.name}
            margin="normal"
          />
          <TextField
            error={errors.email && touched.email}
            label="email"
            name="email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.email && touched.email) && errors.email}
            margin="normal"
          />
          <TextField
            label="comment"
            name="comment"
            multiline={true}
            rows={2}
            maxRows={6}
            className={classes.commentTextField}
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.comment && touched.comment) && errors.comment}
            margin="normal"
          />
        </div>
        <div className={classes.buttonsOuter} >
          <Button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >Reset</Button>
          <Button type="submit" disabled={isSubmitting}>Submit</Button>
        </div>
      </form>
    )
  }

  render = () => {
    return (
      <div className={this.props.classes.contactOuter}>
        <h3>Contact</h3>
        <Formik
          initialValues={{ email: '', name: '', comment: '' }}
          onSubmit={(values) => {

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

            // TEMP
            this.setSubmitted(true)
          }}

          validationSchema={yup.object().shape({
            email: yup.string()
              .email()
              .required('Required'),
            name: yup.string()
              .required('Required'),
            comment: yup.string()
              .required('Required'),
          })}

          render={this.renderForm /* reference the renderProps function, don't call it! */}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ContactForm)