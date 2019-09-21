import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import PersonalDetails from '../../components/forms/PersonalDetails'
import PrimaryAddress from '../../components/forms/PrimaryAddress'
import PhotoIDs from '../../components/forms/PhotoIDs'
import PickBank from '../../components/forms/pick-bank'
import PickAmount from '../../components/forms/pick-amount'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Linked Accounts', 'Deposit Amount'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PickBank />
    case 1:
      return <PickAmount />
    default:
      throw new Error('Unknown step')
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you
                </Typography>
                <Typography variant="subtitle1">
                  Your transaction is being processed.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
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
                      {activeStep === steps.length - 1 ? 'Continue' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}


// import React from 'react'
// import Router from 'next/router'
// import PickBank from '../../components/forms/pick-bank'
// import PickToken from '../../components/forms/pick-token'
// import PickAddress from '../../components/forms/pick-address'
// import PickAmount from '../../components/forms/pick-amount'
// import ArrowUpward from '@material-ui/icons/ArrowUpward'
// import Container from '@material-ui/core/Container'
// import Emitter from '../../src/emitter'

// import { watch } from 'react-referential'
// import { loadable } from '../../components/app/loader'
// import {
//   getEncodedPrivateKey,
//   canDecodePrivateKey,
// } from '../../src/wallet'

// @watch('depositPage')
// @loadable
// export default class Account extends React.Component {
//   constructor(props) {
//     super(props)

//     // if (!getEncodedPrivateKey() || !canDecodePrivateKey()) {
//     //   this.logout()
//     // }

//     this.emitter = new Emitter()

//     this.emitter.on('pick-bank:submit', (bank) => {
//       this.setState({
//         bank: bank,
//         step: 2,
//       })
//     })

//     this.emitter.on('pick-token:submit', (token) => {
//       this.setState({
//         token: token,
//         step: 3,
//       })
//     })

//     this.emitter.on('pick-address:submit', (address) => {
//       this.setState({
//         address: address,
//         step: 4,
//       })
//     })

//     this.emitter.on('pick-amount:submit', (amount) => {
//       this.setState({
//         amount: amount,
//         step: 5,
//       })
//     })

//     this.emitter.on('pick-bank:back', () => {
//       this.back()
//     })

//     this.emitter.on('pick-token:back', () => {
//       this.back()
//     })

//     this.emitter.on('pick-address:back', () => {
//       this.back()
//     })

//     this.emitter.on('pick-amount:back', () => {
//       this.back()
//     })

//     this.state = {
//       bank: null,
//       token: null,
//       address: null,
//       amount: null,
//       step: 1,
//     }
//   }

//   componentWillUnmount() {
//     this.emitter.off('pick-bank:submit')
//     this.emitter.off('pick-bank:back')
//     this.emitter.off('pick-token:submit')
//     this.emitter.off('pick-token:back')
//     this.emitter.off('pick-address:submit')
//     this.emitter.off('pick-address:back')
//     this.emitter.off('pick-amount:submit')
//     this.emitter.off('pick-amount:back')
//   }

//   back() {
//     if (this.state.step == 1) {
//       Router.push('/')
//     }
//     this.setState({ step: this.state.step - 1 })
//   }

//   logout() {
//     this.props.rootData.ref('account').clear()
//     removeIdentity()
//     Router.push('/')
//   }

//   done = () => {
//     Router.push('/')
//   }
//   render() {
//     let { classes } = this.props
//     let { step } = this.state

//     // return (
//     //   <main id="account-deposit" className="account">
//     //     <Container maxWidth="md">
//     //     </Container>
//     //   </main>
//     // )

//     return pug`
//       main#account-deposit.account
//         .content
//           if step != 5
//             .icon
//               ArrowUpward(style={ fontSize: 100 })
//               br
//           if step == 1
//             PickBank(data=this.props.data emitter=this.emitter)
//           if step == 2
//             PickToken(data=this.props.data emitter=this.emitter)
//           if step == 3
//             PickAddress(data=this.props.data emitter=this.emitter)
//           if step == 4
//             PickAmount(data=this.props.data emitter=this.emitter)
//           if step == 5
//             .confirmation
//               img(src='/static/img/big-check.svg')
//               br
//               h3.action-instruction Your transaction is being processed.
//               br
//               .button(onClick=this.done)
//                 | CONTINUE
//       `
//   }
// }
