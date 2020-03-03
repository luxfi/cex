import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { number, object, string } from 'yup'

import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'

import { creditCardFormat } from '../../../util'

import styles from './cardPaymentForm.style'

const formValidationSchema = object().shape({
  creditCard: number()
    .positive('Invalid card number'),
  nameOnCard: string(),
  expiryMonth: number()
    .positive('Invalid expiry month'),
  expiryYear: number()
    .positive('Invalid expiry year'),
  postalCode: number()
    .positive('Invalid postal code'),
  cvc: number()
    .positive('Invalid CVC'),
})

@inject('store')
@observer
class CardPaymentForm extends React.Component {
  closeDialog = () => {
    const { store: { uiStore, userStore } } = this.props
    userStore.resetPaymentMethod()
    userStore.resetEditedCard()
    uiStore.closeDialog()
  }

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    const { store: { userStore } } = this.props

    if (userStore.cardEditingMode) {
      userStore.editDebitCard(values)
    } else {
      userStore.addDebitCard(values)
    }
    // simulate asyn operation of adding card
    // TODO replace with real API
    if (userStore.isValidCard) {
      setTimeout(() => {
        this.closeDialog()
        resetForm()
        setSubmitting(false)
      }, 3000)
    } else {
      resetForm()
      setSubmitting(false)
    }
  }

  render() {
    const {
      classes,
      store: { userStore: { isValidCard, editedCard, cardEditingMode } },
    } = this.props

    return (
      <Box className={classes.innerContainer}>
          <Formik
            initialValues={{
              creditCard: '',
              nameOnCard: '',
              expiryMonth: '',
              expiryYear: '',
              postalCode: '',
              cvc: '',
              ...editedCard,
            }}
            validationSchema={formValidationSchema}
            onSubmit={this.handleSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <>
                  <Grid container justify='center' alignItems='center' className={classes.creditCardIconContainer}>
                    <VisaCard className={classes.svgIcon} />
                    <MasterCard className={classes.svgIcon} />
                    <DiscoverCard className={classes.svgIcon} />
                    <AmericanExpress className={classes.svgIcon} />
                  </Grid>
                  <Grid container justify='center'>
                    {isValidCard === false && (<Typography color='error'>Invalid card details, try again</Typography>)}
                  </Grid>
                  <form onSubmit={handleSubmit}>
                      <Box className={classes.paymentMethodFields}>
                        <FormControl margin='normal'>
                          <TextField
                            id='creditCard'
                            name='creditCard'
                            label='Credit Card Number'
                            variant='outlined'
                            size='small'
                            value={creditCardFormat(values.creditCard)}
                            onChange={handleChange}
                            style={{ margin: '0 8px' }}
                            inputProps={{ maxLength: 19 }}
                            error={!!(errors.creditCard)}
                          />
                        </FormControl>
                        <FormControl margin='normal'>
                          <TextField
                            id='nameOnCard'
                            name='nameOnCard'
                            label='Name on Card'
                            variant='outlined'
                            size='small'
                            value={values.nameOnCard}
                            onChange={handleChange}
                            style={{ margin: '0 8px' }}
                            error={!!(errors.nameOnCard)}
                          />
                        </FormControl>
                        <FormControl margin='normal' >
                          <TextField
                            id='expiryMonth'
                            name='expiryMonth'
                            label='Expiration Month'
                            placeholder='MM'
                            variant='outlined'
                            size='small'
                            style={{ margin: '0 8px' }}
                            value={values.expiryMonth}
                            onChange={handleChange}
                            inputProps={{ maxLength: 2 }}
                            error={!!(errors.expiryMonth)}
                          />
                        </FormControl>
                        <FormControl margin='normal'>
                          <TextField
                            id='expiryYear'
                            name='expiryYear'
                            label='Expiration Year'
                            placeholder='YYYY'
                            variant='outlined'
                            size='small'
                            style={{ margin: '0 8px' }}
                            value={values.expiryYear}
                            onChange={handleChange}
                            inputProps={{ maxLength: 4 }}
                            error={!!(errors.expiryYear)}
                          />
                        </FormControl>
                        <FormControl margin='normal'>
                          <TextField
                            id='cvc'
                            name='cvc'
                            label='CVC'
                            placeholder='XXX'
                            variant='outlined'
                            size='small'
                            style={{ margin: '0 8px' }}
                            value={values.cvc}
                            onChange={handleChange}
                            inputProps={{ maxLength: 3 }}
                            error={!!(errors.cvc)}
                          />
                        </FormControl>
                        <FormControl margin='normal'>
                          <TextField
                            id='postalCode'
                            name='postalCode'
                            label='Postal Code'
                            variant='outlined'
                            size='small'
                            style={{ margin: '0 8px' }}
                            value={values.postalCode}
                            onChange={handleChange}
                            error={!!(errors.postalCode)}
                          />
                        </FormControl>
                        <FormControl margin='normal'>
                          <Button
                            id='credit-card-payment'
                            type='submit'
                            variant='contained'
                            className={classes.proceedButton}
                            color='secondary'
                            size='small'
                            disabled={
                              isSubmitting
                              || !values.creditCard
                              || !values.nameOnCard
                              || !values.cvc
                              || !values.expiryMonth
                              || !values.expiryYear
                              || !values.postalCode
                              || errors.creditCard
                              || errors.nameOnCard
                              || errors.cvc
                              || errors.expiryMonth
                              || errors.expiryYear
                              || errors.postalCode
                            }
                          >
                            {isSubmitting ? 'Processing...' : cardEditingMode ? 'Edit Card' : 'Add Card'}
                          </Button>
                        </FormControl>
                      </Box>
                  </form>
                </>
              )
            }}
          </Formik>
        </Box>
    )
  }
}

export default withStyles(styles)(CardPaymentForm)
