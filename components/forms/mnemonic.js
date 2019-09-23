import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

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
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}))

const steps = ["Your Recovery Code", "Confirm Code"]

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Code />
    case 1:
      return <Confirmation />
    default:
      throw new Error("Unknown step")
  }
}

export default function Checkout() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Password Recovery
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
        </Paper>
      </main>
    </>
  )
}

const Code = () => {
  const classes = useStyles()
  return (
    <>
      <h2>Back up your ESX Account</h2>
      <p>
        ESX does not store your unencrypted account. Copy your recovery code
        somewhere safe, you must have it to recover your account.
      </p>
      <TextField
        multiline
        rows="4"
        className={classes.textField}
        variant="outlined"
      />
    </>
  )
}

const Confirmation = () => {
  return (
    <>
      <h2>Back up your ESX Account</h2>
      <p>
        ESX does not store your unencrypted account. Copy your recovery code
        somewhere safe, you must have it to recover your account.
      </p>
    </>
  )
}

// import Form, { InputData } from 'react-referential-forms'
// import Input from '../controls/input'
// import Copy from '../controls/copy'
// import Emitter from '../../src/emitter'
// import { watch } from 'react-referential'
// import matches from '../../src/control-middlewares/matches'
// import classnames from 'classnames'
// import * as ethers from 'ethers'

// @watch('mnemonicForm')
// export default class MnemonicForm extends Form {
//   static defaultProps = {
//     emitter: new Emitter(),
//   }

//   constructor(props) {
//     super(props)

//     this.emitter = props.emitter || new Emitter()

//     this.emitter.on('mnemonic:get', () => {
//       // use hardcoded one for now
//       // this.newMnemonic
//       return this.mnemonic
//     })

//     this.newMnemonic()

//     this.inputs = {
//       mnemonic: new InputData({
//         name: 'mnemonic',
//         value: this.mnemonic,
//       }),
//       mnemonicConfirm: new InputData({
//         name: 'mnemonicConfirm',
//         middleware: [
//           matches(() => {
//             return this.inputs.mnemonic.val()
//           }, 'recover codes')
//         ],
//       }),
//     }

//     this.state = {
//       copied: false,
//       step: 1,
//     }
//   }

//   newMnemonic() {
//     this.mnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16))
//     this.mnemonic = 'good lottery carpet report chapter model digital mosquito divert battle nuclear candy'

//     return this.mnemonic
//   }

//   copy = () => {
//     this.inputs.mnemonic.emitter.trigger('copy:copy')
//     this.setState({
//       copied: true,
//     })
//   }

//   back = () => {
//     this.setState({
//       step: 1,
//     })
//   }

//   next = () => {
//     this.setState({
//       step: 2,
//     })
//   }

//   _submit = () => {
//     this.emitter.trigger('mnemonic:finish', this.mnemonic)
//   }

//   render() {
//     return pug`
//       .mnemonic-forms
//         if this.state.step == 1
//           .card.mnemonic-copy.transparent
//             .card-header.rows
//   h2 Back up your ESX Account
//   p ESX does not store your unencrypted account. Copy your recovery code somewhere safe, you must have it to recover your account.
// .card-body
//   Copy(
//     ...this.inputs.mnemonic
//     rows=2
//   )
//   .columns
//     .button.flex0(
//       onClick=this.copy
//       className=classnames({
//         copied: this.state.copied,
//       })
//     ) COPY
//     .button.flex0(onClick=this.next) NEXT

//             small You will be asked to re-enter your recovery code on the next step to finish setting up your account
//         if this.state.step == 2
//           .card.mnemonic-confirm.transparent
//             .card-header.rows
//               h2 Almost Done
//               p Enter your recovery code to finish setting up your ESX account.
//             .card-body
//               form(
//                 autoComplete=this.props.autoComplete
//                 onSubmit=this.submit
//                 className=classnames({
//                   validating: this.state.validating,
//                   loading: this.state.loading,
//                   submitted: this.state.submitted,
//                 })
//               )
//                 Input(
//                   ...this.inputs.mnemonicConfirm
//                   rows=2
//                   showErrors=false
//                   placeholder='Enter your recovery code here.'
//                 )
//                 if this.getErrorMessage()
//                   .error
//                     = this.getErrorMessage()
//                 .columns
//                   .button.flex0(onClick=this.back) BACK
//                   .button.flex0(onClick=this.submit) FINISH
//     `
//   }
// }
