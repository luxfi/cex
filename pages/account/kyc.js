// TODO Delete/update
// This needs to become "Settings" rather than "Account"
// Most of this info is visible in the "Portfolio" now
import { inject, observer } from "mobx-react"
import React from "react"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"

import { KYCForm } from "../../components/account"

@inject("store")
@observer
class KYC extends React.Component {
  render() {
    const { store } = this.props
    window.store = store
    const { userStore } = this.props.store
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
      updateKYC,
      firstName,
      lastName,
      validFirstName,
      validLastName,
      isValidPersonalDetails,
      validAddress1,
      validCity,
      validPostalCode,
      isValidAddress,
      activeStep
    } = userStore
    const setErrorMessage = message => {
      store.uiStore.errorMessage = message
      store.uiStore.snackBarOpen = true
    }
    return (
      <main className="account" id="account-index">
        <Container maxWidth="md">
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
            updateKYC={(onSuccess, onError) => userStore.updateKYC(onSuccess, onError)}
            firstName={firstName}
            lastName={lastName}
            validFirstName={validFirstName}
            validLastName={validLastName}
            setErrorMessage={setErrorMessage}
            isValidPersonalDetails={isValidPersonalDetails}
            validAddress1={validAddress1}
            validCity={validCity}
            validPostalCode={validPostalCode}
            isValidAddress={isValidAddress}
            setValue={(key, val) => {
              userStore.setValue(key, val)
            }}
            activeStep={activeStep}
            setActiveStep={(step) => userStore.setActiveStep(step)}
              />
        </Container>
      </main>
    )
  }
}

export default KYC
