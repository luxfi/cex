import React from "react"
import { inject, observer } from "mobx-react"

import {
  Grid,
  Card,
  CardContent,
  Container,
  Link,
  Divider,
  Button,
  TextField,
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

import { AddPaymentMethodForm } from "../../components/account"
import { CustomLink } from '../../components/app'

import { googlePageView } from '../../util/generic'

@inject("store")
@observer
class Account extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  state = {

  }

  componentDidMount() {
    googlePageView()
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
      addBalance,
    } = userStore

    const setErrorMessage = message => {
      store.uiStore.setErrorMessage(message)
    }

    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <AddPaymentMethodForm
                  addPaymentMethod={addPaymentMethod.bind(userStore)}
                  validateNewPaymentMethodName={validateNewPaymentMethodName.bind(userStore)}
                  validateNewPaymentMethodPublicToken={validateNewPaymentMethodPublicToken.bind(userStore)}
                  validateNewPaymentMethodMetadata={validateNewPaymentMethodMetadata.bind(userStore)}
                  isValidNewPaymentMethod={isValidNewPaymentMethod}
                  validNewPaymentMethodName={validNewPaymentMethodName}
                  validNewPaymentMethodPublicToken={validNewPaymentMethodPublicToken}
                  setValue={setValue.bind(userStore)}
                  setErrorMessage={setErrorMessage}
                  refreshSession={() => { userStore.loadSession() }}
                />
              </CardContent>
            </Card>
          </Grid>
          {
            !!account && !!account.paymentMethods ?
              <Grid item xs={12} sm={8}>
                {
                  account.paymentMethods.map((m, i) => {
                    return (
                      <Card key={`m+${i}`} style={{ marginBottom: 20 }}>
                        <CardContent>
                          <Typography variant="body1">
                            {m.name}
                          </Typography>
                          <Typography variant="body2">
                            {(m.Inputs && m.Inputs.metadata.institution) ? m.Inputs.metadata.institution.name : ""}
                          </Typography>
                          <Grid container>
                            <Grid item xs={4}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="newFunds"
                                label="Add Funds"
                                id="add-new-funds"
                                value={this.state[`${m.name}-newFunds`] || ""}
                                onChange={evt => {
                                  this.setState({
                                    [`${m.name}-newFunds`]: evt.target.value,
                                    [`${m.name}-newFunds-error`]: null
                                  })
                                }}
                                helperText={this.state[`${m.name}-newFunds-error`]}
                                error={this.state[`${m.name}-newFunds-error`] && this.state[`${m.name}-newFunds-error`].length > 0}
                              />
                            </Grid>
                          </Grid>
                          <Button
                            variant="outlined"
                            onClick={
                              () => {
                                userStore.addBalance(
                                  this.state[`${m.name}-newFunds`],
                                  () => { this.setState({ [`${m.name}-newFunds`]: "" }) },
                                  () => {
                                    this.setState({
                                      [`${m.name}-newFunds`]: "",
                                      [`${m.name}-newFunds-error`]: `Error adding funds from ${m.name}`
                                    })
                                  }
                                )
                              }
                            }
                          >
                            Add Funds
                          </Button>
                          <Divider variant="inset" style={{ marginTop: '10px' }} />
                        </CardContent>
                      </Card>
                    )
                  })
                }
              </Grid>
              : null
          }
          <Grid item xs={12} sm={4}>
            <Link component={CustomLink} href="/account/kyc">
              Check your identify verification status
            </Link>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Account
