import React from "react"
import PlaidLink from "react-plaid-link"

// Material Components
import {
  Grid,
  TextField,
  Typography,
  Button
} from '@material-ui/core'

import { PLAID_PUBLIC_KEY } from "../../../settings"

class AddPaymentMethodForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { displayErrors: false }
    this.plaidRef = React.createRef()
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
      setValue,
      addPaymentMethod,
      validateNewPaymentMethodName,
      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,
      setErrorMessage,
      refreshSession,
      newPaymentMethodName
    } = this.props

    return (
      <Grid container item xs={12} alignItems="center" justify="center" spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h6">
            Add Payment Method
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPaymentMethodName"
            label="Name"
            id="payment-method-name"
            value={newPaymentMethodName}
            onBlur={validateNewPaymentMethodName}
            onChange={evt => {
              setValue(evt.target.name, evt.target.value)
              validateNewPaymentMethodName(newPaymentMethodName)
            }}
            error={this.state.displayErrors && !validNewPaymentMethodName}
            helperText={
              this.state.displayErrors && !validNewPaymentMethodName
                ? "please enter a name for this payment method"
                : ""
            }
          />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            disabled={!newPaymentMethodName || !validNewPaymentMethodName}
            id='addBankPaymentMethod'
            onClick={() => {
              this.plaidRef.current.handleOnClick()
            }}
          >
            {
              validNewPaymentMethodPublicToken
                ? "Add a Different Account"
                : "Add Account"
            }
          </Button>
          <PlaidLink
            clientName="ESX"
            env="sandbox"
            ref={this.plaidRef}
            style={{ display: 'none' }}
            className='plaid-comp'
            product={["auth", "transactions"]}
            publicKey={PLAID_PUBLIC_KEY}
            onSuccess={(pub_token, meta) => {
              this.handleSubmit(pub_token, meta, addPaymentMethod, true, setErrorMessage, refreshSession)
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default AddPaymentMethodForm

