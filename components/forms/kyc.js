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
import PersonalDetails from "./PersonalDetails"
import PrimaryAddress from "./PrimaryAddress"
import PhotoIDs from "./PhotoIDs"

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
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDetails />
    case 1:
      return <PrimaryAddress />
    case 2:
      return <PhotoIDs />
    default:
      throw new Error("Unknown step")
  }
}

export default function Checkout() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

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
                <Button
                  variant="contained"
                  color="primary"
                  component={ButtonLink}
                  href={"/portfolio"}
                  className={classes.finalButton}
                >
                  Go To Your Portfolio
                </Button>
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

// import Form,
// {
//   InputData,
//   MuiText,
//   MuiPhone,
//   MuiTaxId,
//   MuiDatePicker,
//   MuiCountry,
//   MuiState,
//   WebcamCapture,
// } from 'react-referential-forms'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import Api from '../../src/hanzo/api'
// import Emitter from '../../src/emitter'

// import { watch } from 'react-referential'
// import { withBalance } from '../../src/balances'
// import { HANZO_KEY, HANZO_ENDPOINT } from '../../src/settings.js'
// import BigNumber from 'bignumber.js'
// import classnames from 'classnames'

// import isRequired from '../../src/control-middlewares/isRequired'
// import isPhone from '../../src/control-middlewares/isPhone'

// let genderOpts = {
//   male: 'Male',
//   female: 'Female',
//   other: 'Other',
//   unspecified: 'Unspecified',
// }

// @watch('kycForm')
// @withBalance
// export default class KYCForm extends Form {
//   constructor(props) {
//     super(props)

//     this.inputs = {
//       firstName: new InputData({
//         name: 'firstName',
//         data: props.data,
//         value: this.props.rootData.get('account.firstName'),
//         middleware: [isRequired],
//       }),
//       middleName: new InputData({
//         name: 'middleName',
//         data: props.data,
//       }),
//       lastName: new InputData({
//         name: 'lastName',
//         data: props.data,
//         value: this.props.rootData.get('account.lastName'),
//         middleware: [isRequired],
//       }),
//       phone: new InputData({
//         name: 'kyc.phone',
//         data: props.data,
//         middleware: [isRequired, isPhone],
//       }),
//       taxId: new InputData({
//         name: 'kyc.taxId',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       birthdate: new InputData({
//         name: 'kyc.birthdate',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       gender: new InputData({
//         name: 'kyc.gender',
//         data: props.data,
//         value: 'unspecified',
//         middleware: [isRequired],
//         options: genderOpts,
//       }),
//       addressLine1: new InputData({
//         name: 'kyc.address.line1',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       addressLine2: new InputData({
//         name: 'kyc.address.line2',
//         data: props.data,
//       }),
//       city: new InputData({
//         name: 'kyc.address.city',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       postalCode: new InputData({
//         name: 'kyc.address.postalCode',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       country: new InputData({
//         name: 'kyc.address.country',
//         data: props.data,
//         value: 'US',
//         middleware: [isRequired],
//       }),
//       state: new InputData({
//         name: 'kyc.address.state',
//         data: props.data,
//         value: 'CA',
//         middleware: [isRequired],
//       }),
//       kycFace: new InputData({
//         name: 'kyc.documents.0',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       kycIdFront: new InputData({
//         name: 'kyc.documents.1',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//       kycIdBack: new InputData({
//         name: 'kyc.documents.2',
//         data: props.data,
//         middleware: [isRequired],
//       }),
//     }

//     this.emitter = props.emitter || new Emitter()
//   }

//   componentDidMount() {
//     this.props.data.set('kyc', this.props.rootData.get('account.kyc'))
//   }

//   _submit() {
//     let api = new Api(HANZO_KEY, HANZO_ENDPOINT)

//     let opts = this.props.data.get()
//     opts.kyc.taxId = '' + opts.kyc.taxId
//     opts.kyc.phone = '' + opts.kyc.phone
//     opts.kyc.ethereumAddress = this.props.ethKey.address
//     opts.kyc.eosPublicKey = this.props.eosKey.publicKey

//     return api.client.account.update(opts).then((res) => {
//       this.emitter.trigger('kyc:success', res)
//     })
//   }

//   render() {
//     let { classes } = this.props

//     return pug`
//       form.form(
//         autoComplete=this.props.autoComplete
//         onSubmit=this.submit
//         className=classnames({
//           validating: this.state.validating,
//           loading: this.state.loading,
//           submitted: this.state.submitted,
//         })
//       )
//         h5 Please verify your identity.
//         p Because ESX interacts directly with your bank, regulators have asked that we collect identity information. Your data is cryptographically secured and sent only to ESX's banking endpoint.
//         br
//         p PERSONAL DETAILS
//         Card
//           CardContent.form-content
//             .form-group.columns
//               MuiText.flex2(
//                 ...this.inputs.firstName
//                 label='First Name'
//                 variant='outlined'
//               )
//               MuiText(
//                 ...this.inputs.middleName
//                 label='Middle Name'
//                 variant='outlined'
//               )
//               MuiText.flex2(
//                 ...this.inputs.lastName
//                 label='Last Name'
//                 variant='outlined'
//               )
//             .form-group.columns
//               MuiPhone(
//                 ...this.inputs.phone
//                 label='Phone'
//                 variant='outlined'
//               )
//               MuiTaxId(
//                 ...this.inputs.taxId
//                 label='SSN'
//                 variant='outlined'
//               )
//             .form-group.columns
// MuiDatePicker(
//   ...this.inputs.birthdate
//   label='Birthday'
//   variant='outlined'
// )
// MuiText(
//   ...this.inputs.gender
//   label='Gender'
//   variant='outlined'
// )
//         br
//         p PRIMARY ADDRESS
//         Card
//           CardContent.form-content
//             .form-group.columns
//               MuiText(
//                 ...this.inputs.addressLine1
//                 label='Street Address'
//                 variant='outlined'
//               )
//             .form-group.columns
//               MuiText(
//                 ...this.inputs.addressLine2
//                 label='Apartment/Suite Number'
//                 variant='outlined'
//               )
//             .form-group.columns
//               MuiText.flex3(
//                 ...this.inputs.city
//                 label='City'
//                 variant='outlined'
//               )
//               MuiText.flex2(
//                 ...this.inputs.postalCode
//                 label='Postal Code'
//                 variant='outlined'
//               )
//             .form-group.columns
//               MuiCountry(
//                 ...this.inputs.country
//                 label='Country'
//                 variant='outlined'
//               )
//               MuiState(
//                 ...this.inputs.state
//                 label='State'
//                 variant='outlined'
//                 country=this.inputs.country.val()
//               )

//         br
//         p PHOTO IDS
//         Card.photos
//           CardContent.form-content
//             .form-group.columns
//               .photo
//                 WebcamCapture(...this.inputs.kycFace)
//                 div Face
//               .photo
//                 WebcamCapture(
//                   ...this.inputs.kycIdFront
//                   videoConstraints={
//                     facingMode: { exact: 'environment' }
//                   }
//                 )
//                 div ID Front
//               .photo
//                 WebcamCapture(
//                   ...this.inputs.kycIdBack
//                   videoConstraints={
//                     facingMode: { exact: 'environment' }
//                   }
//                 )
//                 div ID Back
//         br
//         if this.getErrorMessage()
//           .error
//             = this.getErrorMessage()

//         .button(onClick=this.submit)
//           | CONTINUE
//       `
//   }
// }
