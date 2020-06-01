import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import HelpIcon from '@material-ui/icons/Help';
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
  address1: string(),
  address2: string(),
  city: string(),
  state: string(),
  country: string(),
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
      store: { userStore: { isValidCard, editedCard, cardEditingMode, states, countries } },
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
              address1: '',
              address2: '',
              city: '',
              state: '',
              country: '',
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
                        <FormControl margin='normal' className={classes.formControl}>
                          <TextField
                            id='nameOnCard'
                            name='nameOnCard'
                            label='Name on Card'
                            variant='outlined'
                            size='small'
                            value={values.nameOnCard}
                            onChange={handleChange}
                            error={!!(errors.nameOnCard)}
                            required
                          />
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <TextField
                            id='creditCard'
                            name='creditCard'
                            label='Credit Card Number'
                            variant='outlined'
                            size='small'
                            value={creditCardFormat(values.creditCard)}
                            onChange={handleChange}
                            inputProps={{ maxLength: 19 }}
                            error={!!(errors.creditCard)}
                            required
                          />
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl} >
                          <Grid container>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id='expiryMonth'
                                name='expiryMonth'
                                label='Exp Month'
                                placeholder='MM'
                                variant='outlined'
                                size='small'
                                value={values.expiryMonth}
                                onChange={handleChange}
                                inputProps={{ maxLength: 2 }}
                                error={!!(errors.expiryMonth)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id='expiryYear'
                                name='expiryYear'
                                label='Exp Year'
                                placeholder='YYYY'
                                variant='outlined'
                                size='small'
                                value={values.expiryYear}
                                onChange={handleChange}
                                inputProps={{ maxLength: 4 }}
                                error={!!(errors.expiryYear)}
                                required
                              />
                            </Grid>
                            <Grid container item xs={12} sm={4} alignItems='center'>
                              <Grid item xs={10}>
                                <TextField
                                  id='cvc'
                                  name='cvc'
                                  label='CVC'
                                  placeholder='XXX'
                                  variant='outlined'
                                  size='small'
                                  value={values.cvc}
                                  onChange={handleChange}
                                  inputProps={{ maxLength: 3 }}
                                  error={!!(errors.cvc)}
                                  required
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <Tooltip title={<span className={classes.toolTip}>The three numbers at the back of your card</span>} arrow placement='top'>
                                  <HelpIcon />
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </Grid>
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <TextField
                            id='address1'
                            name='address1'
                            label='Address Line 1'
                            variant='outlined'
                            size='small'
                            value={values.address1}
                            onChange={handleChange}
                            error={!!(errors.address1)}
                            required
                          />
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <TextField
                            id='address2'
                            name='address2'
                            label='Address Line 2'
                            variant='outlined'
                            size='small'
                            value={values.address2}
                            onChange={handleChange}
                            error={!!(errors.address2)}
                          />
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <TextField
                            id='city'
                            name='city'
                            label='City'
                            variant='outlined'
                            size='small'
                            value={values.city}
                            onChange={handleChange}
                            error={!!(errors.city)}
                            required
                          />
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <Grid container>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id='state'
                                name='state'
                                label='State'
                                variant='outlined'
                                size='small'
                                value={values.state}
                                onChange={handleChange}
                                error={!!(errors.state)}
                                select
                                required
                              >
                                {states.map((option, index) => (
                                  <MenuItem key={option.code} value={option.code}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                required
                                id='postalCode'
                                name='postalCode'
                                label='Postal Code'
                                variant='outlined'
                                size='small'
                                value={values.postalCode}
                                onChange={handleChange}
                                error={!!(errors.postalCode)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                required
                                id='country'
                                name='country'
                                label='Country'
                                variant='outlined'
                                size='small'
                                value={values.country}
                                onChange={handleChange}
                                error={!!(errors.country)}
                                select
                              >
                                {countries.map((option, index) => (
                                  <MenuItem key={option.code} value={option.code}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </FormControl>
                        <FormControl margin='normal' className={classes.formControl}>
                          <Button
                            id='credit-card-payment'
                            type='submit'
                            variant='contained'
                            className={classes.proceedButton}
                            color='primary'
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
                              || errors.address1
                              || errors.address2
                              || errors.city
                              || errors.state
                              || errors.country
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
