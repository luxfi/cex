// TODO Delete/update
// This needs to become "Settings" rather than "Account"
// Most of this info is visible in the "Portfolio" now
import { inject, observer } from "mobx-react"
import React from "react"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"

import { 
  AccountSection,
  AccountTabs
} from "../../components/account"
import { CustomLink } from '../../components/app'

import { KYCForm } from "../../components/account"
import { googlePageView } from '../../util/generic'

@inject("store")
@observer
class KYC extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { store } = this.props
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
        store.uiStore.setErrorMessage(message)
    }
    return (
      <Container maxWidth="lg" style={{ marginTop: '70px', marginBottom: '30px' }}>
        <AccountSection title={userStore.getFullName} style={{ marginBottom: '3em' }}>
          <AccountTabs tab='kyc' />
        </AccountSection>
        <AccountSection title="KYC" style={{ marginBottom: '3em' }}>
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
            updateKYC={(onSuccess, onError) =>
              userStore.updateKYC(onSuccess, onError)
            }
            updateKYCPhotoDocuments={(onSuccess, onError) =>
              userStore.updateKYCPhotoDocuments(onSuccess, onError)
            }
            firstName={firstName}
            lastName={lastName}
            validFirstName={validFirstName}
            validLastName={validLastName}
            setErrorMessage={setErrorMessage}
            isValidPersonalDetails={isValidPersonalDetails}
            isValidPhotoIDs={isValidPhotoIDs}
            validAddress1={validAddress1}
            validCity={validCity}
            validPostalCode={validPostalCode}
            isValidAddress={isValidAddress}
            setValue={(key, val) => {
              userStore.setValue(key, val)
            }}
            activeStep={activeStep}
            setActiveStep={step => userStore.setActiveStep(step)}
          />
        </AccountSection>
      </Container>
    )
  }
}

export default KYC
