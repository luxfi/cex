import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import Typography from "@material-ui/core/Typography"
import { PersonalDetailsForm, PrimaryAddressForm, PhotoIDsForm } from "../"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  finalButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

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
  { phone,
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
    setValue,
    updateKYC,
    firstName,
    lastName,
    setErrorMessage,
    validFirstName,
    validLastName,
    validAddress1,
    validCity,
    validPostalCode,
  }
) {
  switch (step) {
    case 0:
      return <PersonalDetailsForm
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
    case 1:
      return <PrimaryAddressForm 
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
      />
    case 2:
      return <PhotoIDsForm />
    default:
      throw new Error("Unknown step")
  }
}

export default function KYCForm(
  { phone,
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
    setValue,
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
    setErrorMessage,
    activeStep,
    setActiveStep
  }
) {
  const classes = useStyles()
  const [currentStepDisabled, setCurrentStepDisabled] = React.useState(false)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    updateKYC(
      () => null,
      ex => {
        setErrorMessage(ex)
      })
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const checkActiveStep = (step) => {
    switch (step) {
      case 0:
        return setCurrentStepDisabled(!isValidPersonalDetails)
      case 1:
        return setCurrentStepDisabled(!isValidAddress)
      case 2:
        return <PhotoIDsForm />
      default:
        // Todo - I did not need to comment this out before..., not sure why I have to now
        // throw new Error("Unknown step")
    }
  }

  React.useEffect(() => {
    checkActiveStep(activeStep)
  }, [isValidPersonalDetails, isValidAddress, activeStep])

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Please verify your identity
          </Typography>
          {/* <h2>Please verify your identity.</h2> */}
          <p>
            Because ESX interacts directly with your bank, regulators have asked
            that we collect identity information. Your data is cryptographically
            secured and sent only to ESX's banking endpoint.
          </p>
          <br />
        </Paper>
        <Paper className={classes.paper}>
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
                  //put on click handler to sumbit info here
                  >
                    Go To Your Portfolio
                  </Button>
                </div>
              </>
            ) : (
                <>
                  {getStepContent(activeStep,
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
                      setValue,
                      updateKYC,
                      firstName,
                      lastName,
                      setErrorMessage,
                      validFirstName,
                      validLastName,
                      validAddress1,
                      validCity,
                      validPostalCode,
                      isValidAddress,
                      setErrorMessage 
                    }
                  )}
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
                      className={classes.button}
                      disabled={currentStepDisabled}
                    >
                    {activeStep === steps.length - 1 ? "Continue" : "Next"}
                    </Button>
                  </div>
                </>
              )}
          </>
        </Paper>
      </main>
    </>
  )
}