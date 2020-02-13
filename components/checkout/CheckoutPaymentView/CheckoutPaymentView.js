import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import React from 'react'
import { object, string } from 'yup'


import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'

import { creditCardFormat } from '../../../util'

import styles from './checkoutPayment.style'

const validationSchema = object().shape({
  creditCard: string()
    .required('Required')
    .matches(/[^0-9]/, 'Invalid credit card'),
  nameOnCard: string()
    .required('Required'),
  expiryMonth: string()
    .required('Required')
    .matches(/([0-9]{2})/),
  expiryYear: string()
    .required('Required')
    .matches(/([0-9]{4})/),
  postalCode: string()
    .required('Required'),
  cvc: string()
    .required('Required')
    .matches(/([0-9]{3})/),
})

const CheckoutPaymentView = ({ classes }) => {
  return (
    <Container maxWidth='sm' className={classes.outerContainer}>
      <Typography variant='h6'>Add Payment Method</Typography>
      <Box className={classes.innerContainer}>
        <Formik
          initialValues={{
            creditCard: '', expiryDate: '', expiryYear: '', postalCode: '', cvc: '',
          }}
          validate={validationSchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <Grid container justify='center' alignItems='center'>
                <VisaCard className={classes.svgIcon} />
                <MasterCard className={classes.svgIcon} />
                <DiscoverCard className={classes.svgIcon} />
                <AmericanExpress className={classes.svgIcon} />
              </Grid>
              <form onSubmit={handleSubmit}>
                <Box className={classes.paymentMethodFields}>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      id='creditCard'
                      label='Credit Card Number'
                      placeholder='XXXX-XXXX-XXXX-XXXX'
                      variant='outlined'
                      size='small'
                      value={creditCardFormat(values.creditCard)}
                      onChange={handleChange}
                      style={{ margin: '0 8px' }}
                      type='number'
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.formControl}>
                    <TextField
                      id='nameOnCard'
                      label='Name on Card'
                      variant='outlined'
                      size='small'
                      onChange={handleChange}
                      style={{ margin: '0 8px' }}
                    />
                  </FormControl>
                  <div className={classes.formControl}>
                    <TextField
                      id='expirtMonth'
                      label='Expiration Month'
                      placeholder='MM'
                      variant='outlined'
                      size='small'
                      style={{ marginRight: 5 }}
                      onChange={handleChange}
                      type='number'
                    />
                    <TextField
                      id='expiryYear'
                      label='Expiration Year'
                      placeholder='YYYY'
                      variant='outlined'
                      size='small'
                      onChange={handleChange}
                      type='number'
                    />
                  </div>
                  <div fullWidth className={classes.formControl}>
                    <TextField
                      id='cvc'
                      label='CVC'
                      placeholder='XXX'
                      variant='outlined'
                      size='small'
                      style={{ marginRight: 5 }}
                      onChange={handleChange}
                      type='number'
                    />
                    <TextField
                      id='postalCode'
                      label='Postal Code'
                      variant='outlined'
                      size='small'
                      onChange={handleChange}
                      type='number'
                    />
                  </div>
                </Box>
                <Button
                  id='credit-card-payment'
                  type='submit'
                  variant='contained'
                  className={classes.proceedButton}
                >
                  PROCEED
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default withStyles(styles)(CheckoutPaymentView)
