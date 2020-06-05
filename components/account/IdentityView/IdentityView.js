import React from "react"
import { Paper, withStyles, Card, CardContent, Typography } from "@material-ui/core"
import { inject, observer } from "mobx-react"

import KYCForm from './KYCForm'

import { APP_NAME } from '../../../service/common'

import styles from '../account.style'

@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {

  render() {
    const { store, classes } = this.props
    const { userStore, uiStore } = store

    const {
      phone,
      taxId,
      validPhone,
      validTaxId,
      birthdate,
      gender,
      address1,
      address2,
      city,
      postalCode,
      country,
      state,
      countries,
      states,
      documents0,
      documents1,
      documents2,
      isValidKYC,
      firstName,
      lastName,
      validFirstName,
      validLastName,
      isValidPersonalDetails,
      isValidPhotoIDs,
      validAddress1,
      validCity,
      validPostalCode,
      isValidAddress,
      activeStep
    } = userStore

    const setErrorMessage = message => {
      uiStore.setErrorMessage(message)
    }
  
    const setValue = (key, val) => {
      userStore.setValue(key, val)
    }
  
    const setActiveStep= (step) => {
      userStore.setActiveStep(step)
    }
  
    const updateKYC = (onSuccess, onError) => {
      userStore.updateKYC(onSuccess, onError)
    }
  
    const updateKYCPhotoDocuments = (onSuccess, onError) => {
      userStore.updateKYCPhotoDocuments(onSuccess, onError)
    }


    return (
      <Paper className={classes.root}>
        <Card elevation={2} className={classes.cardContainer}>
          <CardContent>
            <Typography component="h1" variant="h5" align="left">
                Please verify your identity
              </Typography>
              <p>
                Because {APP_NAME} interacts directly with your bank, regulators have asked
                that we collect identity information. Your data is cryptographically
                secured and sent only to {APP_NAME}'s banking endpoint.
              </p>
              <br />
          </CardContent>
        </Card>
        <Card elevation={2} className={classes.cardContainer}>
          <CardContent>
            <KYCForm
              phone={phone}
              taxId={taxId}
              validPhone={validPhone}
              validTaxId={validTaxId}
              birthdate={birthdate}
              gender={gender}
              address1={address1}
              address2={address2}
              city={city}
              postalCode={postalCode}
              country={country}
              state={state}
              countries={countries}
              states={states}
              documents0={documents0}
              documents1={documents1}
              documents2={documents2}
              isValidKYC={isValidKYC}
              firstName={firstName}
              lastName={lastName}
              validFirstName={validFirstName}
              validLastName={validLastName}
              isValidPersonalDetails={isValidPersonalDetails}
              isValidPhotoIDs={isValidPhotoIDs}
              validAddress1={validAddress1}
              validCity={validCity}
              validPostalCode={validPostalCode}
              isValidAddress={isValidAddress}
              activeStep={activeStep}
              setErrorMessage={setErrorMessage}
              setValue={setValue}
              setActiveStep={setActiveStep}
              updateKYC={updateKYC}
              updateKYCPhotoDocuments={updateKYCPhotoDocuments}
            />
          </CardContent>
        </Card>
      </Paper>
    )
  }
}

