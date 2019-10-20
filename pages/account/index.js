import React from "react"
import Router from "next/router"
import { inject, observer } from "mobx-react"

import {
  Grid,
  Card,
  CardContent,
  Container,
  Box,
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

import { AddPaymentMethodForm } from "../../components/account"

@inject("store")
@observer
class Account extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  render() {
    const store = this.props.store
    const { userStore } = store
    const {
      setValue,

      account,
      addPaymentMethod,

      isValidNewPaymentMethod,
      validNewPaymentMethodName,
      validNewPaymentMethodPublicToken,
      validateNewPaymentMethodName,
      validateNewPaymentMethodPublicToken,
      validateNewPaymentMethodMetadata,
    } = userStore
    const setErrorMessage = message => {
      store.uiStore.errorMessage = message
      store.uiStore.snackBarOpen = true
    }
    return (
      <Container maxWidth="lg" style={{ marginTop: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <AddPaymentMethodForm
                  addPaymentMethod                    = {addPaymentMethod.bind(userStore)}
                  validateNewPaymentMethodName        = {validateNewPaymentMethodName.bind(userStore)}
                  validateNewPaymentMethodPublicToken = {validateNewPaymentMethodPublicToken.bind(userStore)}
                  validateNewPaymentMethodMetadata    = {validateNewPaymentMethodMetadata.bind(userStore)}
                  isValidNewPaymentMethod             = {isValidNewPaymentMethod}
                  validNewPaymentMethodName           = {validNewPaymentMethodName}
                  validNewPaymentMethodPublicToken    = {validNewPaymentMethodPublicToken}

                  setValue        = {setValue.bind(userStore)}
                  setErrorMessage = {setErrorMessage}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            { (!!account && !!account.paymentMethods && !!account.paymentMethods.map ) ? (
              account.paymentMethods.map( (method, i) => (
                <Card key={i} style={{ marginBottom: 20 }}>
                  <CardContent>
                    <Typography variant="body1">
                      { method.name }
                    </Typography>
                    <Typography variant="body2">
                      { (method.metadata && method.metadata.institution) ? method.metadata.institution.name : ""}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : null }
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Account
