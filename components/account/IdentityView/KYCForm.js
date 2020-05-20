import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import Typography from "@material-ui/core/Typography"
import classNames from 'classnames'

import PersonalDetailsForm from './PersonalDetailsForm'
import PrimaryAddressForm from './PrimaryAddressForm'
import PhotoIDsForm from './PhotoIDsForm'

import styles from '../account.style'

const useStyles = makeStyles(styles)

const steps = ["Personal Details", "Primary Address", "Photo IDs"]

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children }, ref) => (
    <Link ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </Link>
  )
)

function getStepContent(
  step,
  {
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
    firstName,
    lastName,
    validFirstName,
    validLastName,
    validAddress1,
    validCity,
    validPostalCode,
    setValue,
    setErrorMessage,
  }
) {
  switch (step) {
    case 0:
      return (
        <PersonalDetailsForm
          setValue={setValue}
          gender={gender}
          firstName={firstName}
          lastName={lastName}
          birthdate={birthdate}
          validFirstName={validFirstName}
          validLastName={validLastName}
          setErrorMessage={setErrorMessage}
          phone={phone}
          taxId={taxId}
          validPhone={validPhone}
          validTaxId={validTaxId}
        />
      )
    case 1:
      return (
        <PrimaryAddressForm
          setValue={setValue}
          validAddress1={validAddress1}
          validCity={validCity}
          validPostalCode={validPostalCode}
          address1={address1}
          address2={address2}
          city={city}
          postalCode={postalCode}
          country={country}
          state={state}
          countries={countries}
          states={states}
          setErrorMessage={setErrorMessage}
          countries={countries}
        />
      )
    case 2:
      return (
        <PhotoIDsForm
          documents0={documents0}
          documents1={documents1}
          documents2={documents2}
          setValue={setValue}
        />
      )
    default:
      throw new Error("Unknown step")
  }
}

const KYCForm = (props) => {

  const classes = useStyles()
  const [currentStepDisabled, setCurrentStepDisabled] = useState(false)

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
    activeStep,
    setErrorMessage,
    setValue,
    setActiveStep,
    updateKYC,
    updateKYCPhotoDocuments,
  } = props

  const handleNext = async () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      await updateKYCPhotoDocuments()
    }
    await updateKYC(
      () => null,
      ex => {
        setErrorMessage(ex)
      }
    )
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const checkActiveStep = step => {
    switch (step) {
      case 0:
        return setCurrentStepDisabled(!isValidPersonalDetails)
      case 1:
        return setCurrentStepDisabled(!isValidAddress)
      case 2:
        return setCurrentStepDisabled(!isValidPhotoIDs)
      default:
      throw new Error("Unknown step")
    }
  }

  useEffect(() => {
    checkActiveStep(activeStep)
  }, [isValidPersonalDetails, isValidAddress, isValidPhotoIDs, activeStep])


  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Identity Verification
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you
            </Typography>
            <Typography variant="subtitle1">
              We are verifying your account and will send you an update when
              completed.
            </Typography>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={ButtonLink}
                href={"/portfolio"}
                className={classes.finalButton}
                // TODO put on click handler to sumbit info here
              >
                Go To Your Portfolio
              </Button>
            </div>
          </>
        ) : (
          <>
            {
              getStepContent( activeStep, {
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
                firstName,
                lastName,
                validFirstName,
                validLastName,
                validAddress1,
                validCity,
                validPostalCode,
                setValue,
                setErrorMessage,
              })
            }
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classNames(classes.button, 'kycSubmitButton')}
                disabled={currentStepDisabled}
              >
                {activeStep === steps.length - 1 ? "Continue" : "Next"}
              </Button>
            </div>
          </>
        )}
      </>
    </>
  )
}

export default KYCForm
