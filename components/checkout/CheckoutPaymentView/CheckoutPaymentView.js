import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Box,
  Grid,
  Switch,
  TextField,
  FormControl,
  Button,
} from '@material-ui/core'
import { Formik } from 'formik'
import { string, object } from 'yup'

import styles from './checkoutPayment.style'

import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'


const validationSchema = object().shape({
  creditCard: string()
    .required('Required')
    .matches(/([0-9]{2})\/([0-9]{2})/, 'Invalid credit card'),
  expiryDate: string()
    .required('Required'),
  expiryYear: string()
    .required('Required'),
  postalCode: string()
    .required('Required'),
  cvv: string()
    .required('Required'),
});

class CheckoutPaymentView extends React.Component {
  render() {
    const { classes } = this.props;
  
    return (
      <Container maxWidth="sm" className={classes.outerContainer}>
        <Typography variant="h6">Add Payment Method</Typography>
        <Box className={classes.innerContainer}>
          <Formik
            initialValues={{ creditCard: '', expiryDate: '', expiryYear: '', postalCode: '', cvv: ''  }}
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
                <Grid container justify="center" alignItems="center">
                  <VisaCard className={classes.svgIcon} />
                  <MasterCard className={classes.svgIcon} />
                  <DiscoverCard className={classes.svgIcon} />
                  <AmericanExpress className={classes.svgIcon} />
                </Grid>
                <form onSubmit={handleSubmit}>
                  <Box className={classes.paymentMethodFields}>
                    <FormControl fullWidth className={classes.formControl}>
                      < TextField
                        id="outlined-textarea"
                        label="Credit Card Number"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        multiline
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <TextField
                        id="outlined-textarea"
                        label="Expiration Month"
                        placeholder="MM"
                        multiline
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <TextField
                        id="outlined-textarea"
                        label="Expiration Year"
                        placeholder="YYYY"
                        multiline
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <TextField
                        id="outlined-textarea"
                        label="CVV"
                        placeholder="XXX"
                        multiline
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <TextField
                        id="outlined-textarea"
                        label="Postal Code"
                        multiline
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                  </Box>
                  <Button
                    id="credit-card-payment"
                    type="submit"
                    variant="contained"
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
}

export default withStyles(styles)(CheckoutPaymentView)
