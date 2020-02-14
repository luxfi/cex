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
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { number, object, string } from 'yup'



import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'

import { creditCardFormat, slugFromPath } from '../../../util'

import styles from './checkoutPayment.style'

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

const CheckoutPaymentView = ({ classes }) => {
  const router = useRouter();
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  const movieSlug = router.query.slug || slugFromPath()


  return (
    <Container maxWidth='sm' className={classes.outerContainer}>
      <Typography variant='h6'>Add Payment Method</Typography>
      <Box className={classes.innerContainer}>
        <Formik
          initialValues={{
            creditCard: '', nameOnCard: '', expiryMonth: '', expiryYear: '', postalCode: '', cvc: '',
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <Grid container justify='center' alignItems='center' className={classes.creditCardIconContainer}>
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
                      placeholder='XXXX XXXX XXXX XXXX'
                      variant='outlined'
                      size='small'
                      value={creditCardFormat(values.creditCard)}
                      onChange={handleChange}
                      style={{ margin: '0 8px' }}
                      inputProps={{ maxLength: 19 }}
                      error={!!(errors.creditCard)}
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
                      error={!!(errors.nameOnCard)}
                    />
                  </FormControl>
                  <div className={classes.formControl}>
                    <TextField
                      id='expiryMonth'
                      label='Expiration Month'
                      placeholder='MM'
                      variant='outlined'
                      size='small'
                      style={{ marginRight: 5 }}
                      onChange={handleChange}
                      inputProps={{ maxLength: 2 }}
                      error={!!(errors.expiryMonth)}
                    />
                    <TextField
                      id='expiryYear'
                      label='Expiration Year'
                      placeholder='YYYY'
                      variant='outlined'
                      size='small'
                      onChange={handleChange}
                      inputProps={{ maxLength: 4 }}
                      error={!!(errors.expiryYear)}
                    />
                  </div>
                  <div className={classes.formControl}>
                    <TextField
                      id='cvc'
                      label='CVC'
                      placeholder='XXX'
                      variant='outlined'
                      size='small'
                      style={{ marginRight: 5 }}
                      onChange={handleChange}
                      inputProps={{ maxLength: 3 }}
                      error={!!(errors.cvc)}
                    />
                    <TextField
                      id='postalCode'
                      label='Postal Code'
                      variant='outlined'
                      size='small'
                      onChange={handleChange}
                      error={!!(errors.postalCode)}
                    />
                  </div>
                </Box>
                <Link
                  href='/confirmPayment'
                  as={`/confirmPayment/${movieSlug}?id=${id}`}
                >
                  <Button
                    id='credit-card-payment'
                    type='submit'
                    variant='contained'
                    className={classes.proceedButton}
                    color='secondary'
                  >
                    PROCEED
                  </Button>
                </Link>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Container>
  )
}

export default withStyles(styles)(CheckoutPaymentView)
