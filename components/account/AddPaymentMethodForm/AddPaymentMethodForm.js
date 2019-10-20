import React from "react"
import NextLink from "next/link"
import Router from "next/router"
import PlaidLink from "react-plaid-link"

// Material Components
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

import { PLAID_PUBLIC_KEY } from "../../../src/settings.js"

class AddPaymentMethodForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayErrors: false }
  }

  handleSubmit(addPaymentMethod, isValidNewPaymentMethod, setErrorMessage) {
    if (isValidNewPaymentMethod) {
      addPaymentMethod(
        () => {

        },
        ex => {
          setErrorMessage(ex)
        }
      )
    } else {
      this.setState({ displayErrors: true })
    }
  }

  onSuccess(publicToken, metadata) {
    const {
      setValue,
      validateNewPaymentMethodPublicToken,
      validateNewPaymentMethodMetadata,
    } = this.props
    setValue('newPaymentMethodPublicToken', publicToken)
    validateNewPaymentMethodPublicToken()
    setValue('newPaymentMethodMetadata', metadata)
    validateNewPaymentMethodMetadata()
  }

  render() {
    const {
      classes,

      setValue,

      addPaymentMethod,
      validateNewPaymentMethodName,
      isValidNewPaymentMethod,

      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,

      setErrorMessage
    } = this.props

    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Payment Method
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="newPaymentMethodName"
          label="Name"
          id="payment-method-name"
          onBlur={validateNewPaymentMethodName}
          onChange={evt => setValue(evt.target.name, evt.target.value)}
          error={this.state.displayErrors && !validNewPaymentMethodName}
          helperText={
            this.state.displayErrors && !validNewPaymentMethodName
              ? "please enter a name for this payment method"
              : ""
          }
        />
        <br />
        <br />
        <PlaidLink
          clientName="ESX"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey={PLAID_PUBLIC_KEY}
          onSuccess={this.onSuccess.bind(this)}
        >
          <Typography component="p" variant="body2">
            {
              validNewPaymentMethodPublicToken
                ? "Link a Different Bank Account"
                : "+Link a Bank Account"
            }
          </Typography>
        </PlaidLink>
        <br />
        <Button
          id="add-payment-method-submit-button"
          fullWidth
          variant="contained"
          color="primary"
          // disabled={}
          onClick={() =>
            this.handleSubmit(addPaymentMethod, isValidNewPaymentMethod, setErrorMessage)
          }
        >
          Save Payment Method
        </Button>
      </Container>
    )
  }
}

export default AddPaymentMethodForm

