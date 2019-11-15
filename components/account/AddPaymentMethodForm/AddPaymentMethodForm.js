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

  handleSubmit(token, meta, addPaymentMethod, isValidNewPaymentMethod, setErrorMessage, refreshSession) {
    if (isValidNewPaymentMethod) {
      addPaymentMethod(
        token,
        meta,
        () => {
          refreshSession()
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
      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,
      setErrorMessage,
      refreshSession
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
          onSuccess={(pub_token, meta) => {
            this.handleSubmit(pub_token, meta, addPaymentMethod, true, setErrorMessage, refreshSession)
          }}
        >
          <Typography component="p" variant="body2">
            {
              validNewPaymentMethodPublicToken
                ? "Link a Different Bank Account"
                : "+Link a Bank Account"
            }
          </Typography>
        </PlaidLink>
      </Container>
    )
  }
}

export default AddPaymentMethodForm

