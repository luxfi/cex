import React, { useState } from 'react'

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"

import styles from '../account.style.js'
const useStyles = makeStyles(styles)

const steps = ["Linked Accounts", "Deposit Amount"]


function getStepContent(step) {
  switch (step) {
    case 0:
      return <div>PICK BANK PLACEHOLDER</div>
    case 1:
      return <div>PICK AMOUNT PLACEHOLDER</div>
    default:
      throw new Error("Unknown step")
  }
}

export default (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <div>
      <Typography component="h1" variant="h4" align="center">
        Account
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
              Your transaction is being processed.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
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
              >
                {activeStep === steps.length - 1 ? "Continue" : "Next"}
              </Button>
            </div>
          </>
        )}
      </>
    </div>
  )
}
