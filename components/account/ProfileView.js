/* eslint-disable jsx-quotes */
import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'

import { Formik } from 'formik'
import { number, object, string } from 'yup'

import styles from './profileView.style.js'
const myStyles = makeStyles(styles)


export default inject('store')(observer((props) => {

  const s = myStyles()
  const {
    store: {
      uiStore,
      userStore,
      userStore: {
        account,
        address1,
        address2,
        city,
        postalCode,
        state,
        country,
        phone,
        countries,
        states = [],
      },
    },
  } = props

  const { metadata } = account || {}
  
  const {
    accountNumbers: {
      APEX,
      RHS,
    } = {},
    dayTradeProtection,
    personalDetails: {
      employment,
      maritalStatus,
      dependants,
    } = {},
    assets: {
      liquid,
      netWorth,
      yearlyIncome,
    } = {},
    investment: {
      goal,
      timeLine,
      experience,
      riskTolerence,
      liquidity,
    } = {},
  } = metadata || {}

  const onSuccess = () => {
    uiStore.setSuccessMessage('Profile updated successfully')
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    userStore.updateAccountInfo(values, onSuccess)
    setSubmitting(false)
  }

  return (
    <Paper className={s.root}>
      <Formik
          enableReinitialize
          initialValues={{
            address1: address1 || '',
            address2: address2 || '',
            city: city || '',
            postalCode: postalCode || '',
            state: state || '',
            country: country || '',
            phone: phone || '',
            dayTradeProtection: dayTradeProtection || null,
            APEX: APEX || '',
            RHS: RHS || '',
            employment: employment || '',
            maritalStatus: maritalStatus || '',
            dependants: dependants || '',
            liquid: liquid || '',
            netWorth: netWorth || '',
            yearlyIncome: yearlyIncome || '',
            goal: goal || '',
            experience: experience || '',
            timeLine: timeLine || '',
            riskTolerence: riskTolerence || '',
            liquidity: liquidity || '',
          }}
          validationSchema={formValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Address</Typography>
                    <TextField
                      required
                      id='address1'
                      name='address1'
                      label='Address Line 1'
                      error={!!(errors.address1)}
                      placeholder='234 street lane'
                      value={values.address1}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      required
                      id='address2'
                      name='address2'
                      label='Address Line 2'
                      error={!!(errors.address2)}
                      placeholder='Apt 23, building 4'
                      value={values.address2}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      required
                      id='city'
                      name='city'
                      label='City'
                      error={!!(errors.city)}
                      placeholder='San Jose'
                      value={values.city}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      id='state'
                      name='state'
                      label='State'
                      error={!!(errors.state)}
                      placeholder='e.g Carlifornia'
                      value={values.state}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      select
                      required
                    >
                      {states.map((option, index) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      required
                      id='postalCode'
                      name='postalCode'
                      label='Postal Code'
                      error={!!(errors.postalCode)}
                      placeholder='18796'
                      value={values.postalCode}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      required
                      id='country'
                      name='country'
                      label='Country'
                      value={values.country}
                      onChange={handleChange}
                      error={!!(errors.country)}
                      InputLabelProps={{ shrink: true }}
                      select
                    >
                      {countries.map((option, index) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      required
                      id='phone'
                      name='phone'
                      label='Phone'
                      error={!!(errors.phone)}
                      placeholder='4846389012'
                      value={values.phone}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Personal Details</Typography>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Employment</FormLabel>
                      <RadioGroup className={s.radioGroup} name='employment' value={values.employment} onChange={handleChange}>
                        <FormControlLabel value='employed' control={<Radio />} label='Employed' />
                        <FormControlLabel value='unemployed' control={<Radio />} label='Unemployed' />
                      </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Marital Status</FormLabel>
                      <RadioGroup className={s.radioGroup} name='maritalStatus' value={values.maritalStatus} onChange={handleChange}>
                        <FormControlLabel value='single' control={<Radio />} label='Single' />
                        <FormControlLabel value='married' control={<Radio />} label='Married' />
                        <FormControlLabel value='divorced' control={<Radio />} label='Divorced' />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      id='dependants'
                      name='dependants'
                      label='Dependants'
                      error={!!(errors.dependants)}
                      value={values.dependants}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Accounts</Typography>
                      <TextField
                        required
                        id='apexAccountNumber'
                        name='APEX'
                        label='APEX'
                        placeholder='5P75152'
                        value={values.APEX}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        disabled
                      />
                      <TextField
                        id='rhsAccountNumber'
                        name='RHS'
                        label='RHS'
                        placeholder='1000744308'
                        value={values.RHS}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        disabled
                      />
                    <FormControl component="fieldset">
                      <InputLabel htmlFor="dayTradeProtection">Pattern Day Trade Protection</InputLabel>
                      <Select
                        value={values.dayTradeProtection ? 'yes' : 'no'}
                        onChange={handleChange}
                        inputProps={{
                          name: 'dayTradeProtection',
                          id: 'dayTradeProtection',
                        }}
                      >
                        <option aria-label='None' value='' />
                        <option value='yes'>Yes</option>
                        <option value='no'>no</option>
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid> 
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Assets</Typography>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Liquid</FormLabel>
                      <RadioGroup className={s.radioGroup} name='employment' value={values.liquid} onChange={handleChange} inputProps={{
                          name: 'liquid',
                          id: 'liquid',
                        }}>
                        <FormControlLabel value='50000-99999' control={<Radio />} label='$50,000 to $99,999'/>
                        <FormControlLabel value='100000-199999' control={<Radio />} label='$100,000 to $199,999'/>
                        <FormControlLabel value='200000-299999' control={<Radio />} label='$200,000 to $299,999'/>
                        <FormControlLabel value='300000-399999' control={<Radio />} label='$300,000 to $399,999'/>
                        <FormControlLabel value='400000-499999' control={<Radio />} label='$400,000 to $499,999'/>
                        <FormControlLabel value='500000-999999' control={<Radio />} label='$500,000 to $999,999'/>
                        <FormControlLabel value='1000000-4999999' control={<Radio />} label='$1,000,000 to $4,999,999'/>
                        <FormControlLabel value='5000000-max' control={<Radio />} label='$5,000,000 or higher'/>
                      </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                      <FormLabel component="legend">Net Worth</FormLabel>
                      <RadioGroup className={s.radioGroup} name='employment' value={values.netWorth} onChange={handleChange} inputProps={{
                          name: 'netWorth',
                          id: 'netWorth',
                        }}>

                        <FormControlLabel value='50000-99999' control={<Radio />} label='$50,000 to $99,999'/>
                        <FormControlLabel value='100000-199999' control={<Radio />} label='$100,000 to $199,999'/>
                        <FormControlLabel value='200000-299999' control={<Radio />} label='$200,000 to $299,999'/>
                        <FormControlLabel value='300000-399999' control={<Radio />} label='$300,000 to $399,999'/>
                        <FormControlLabel value='400000-499999' control={<Radio />} label='$400,000 to $499,999'/>
                        <FormControlLabel value='500000-999999' control={<Radio />} label='$500,000 to $999,999'/>
                        <FormControlLabel value='1000000-4999999' control={<Radio />} label='$1,000,000 to $4,999,999'/>
                        <FormControlLabel value='5000000-max' control={<Radio />} label='$5,000,000 or higher'/>
                      </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Yearly Income</FormLabel>
                      <RadioGroup className={s.radioGroup} name='yearlyIncome' id='yearlyIncome' value={values.yearlyIncome} onChange={handleChange} >
                        <FormControlLabel value='75000-99999' control={<Radio />} label='$75,000 to $99,999'/>
                        <FormControlLabel value='100000-199999' control={<Radio />} label='$100,000 to $199,999'/>
                        <FormControlLabel value='200000-299999' control={<Radio />} label='$200,000 to $299,999'/>
                        <FormControlLabel value='300000-499999' control={<Radio />} label='$300,000 to $499,999'/>
                        <FormControlLabel value='500000-1199999' control={<Radio />} label='$500,000 to $1,199,999'/>
                        <FormControlLabel value='1200000-max' control={<Radio />} label='$1,200,000 or Higher'/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Investment Profile</Typography>
                    <FormControl>
                      <InputLabel shrink>Goal</InputLabel>
                      <Select
                        value={values.goal}
                        onChange={handleChange}
                        inputProps={{
                          name: 'goal',
                          id: 'goal',
                        }}
                      >
                        <MenuItem value='preserveMySavings'>Preserve my savings</MenuItem>
                        <MenuItem value='growth'>Growth</MenuItem>
                        <MenuItem value='sourceOfIncome'>A source of income</MenuItem>
                        <MenuItem value='speculationTrading'>Speculation Trading</MenuItem>
                        <MenuItem value='somethingElse'>Something else</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink>Timeline</InputLabel>
                      <Select
                        value={values.timeLine}
                        onChange={handleChange}
                        inputProps={{
                          name: 'timeLine',
                          id: 'timeLine',
                        }}
                      >
                        <MenuItem value='0-3'>Less than 4 years</MenuItem>
                        <MenuItem value='4-7'>4 to 7 years</MenuItem>
                        <MenuItem value='8-max'>7 or more years</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink>Experience</InputLabel>
                      <Select
                        value={values.experience}
                        onChange={handleChange}
                        inputProps={{
                          name: 'experience',
                          id: 'experience',
                        }}
                      >
                        <MenuItem value='none'>None</MenuItem>
                        <MenuItem value='notMuch'>Not much</MenuItem>
                        <MenuItem value='knowMuch'>I know what I'm doing</MenuItem>
                        <MenuItem value='expert'>I'm an expert</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink>Risk Tolerence</InputLabel>
                      <Select
                        value={values.riskTolerence}
                        onChange={handleChange}
                        inputProps={{
                          name: 'riskTolerence',
                          id: 'riskTolerence',
                        }}
                      >
                        <MenuItem value='sellAll'>Sell all your investment</MenuItem>
                        <MenuItem value='sellSome'>Sell some</MenuItem>
                        <MenuItem value='keepAll'>Keep all or buy more</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink>Liquidity</InputLabel>
                      <Select
                        value={values.liquidity}
                        onChange={handleChange}
                        inputProps={{
                          name: 'liquidity',
                          id: 'liquidity',
                        }}
                      >
                        <MenuItem value='notImportant'>Not important</MenuItem>
                        <MenuItem value='somewhatImportant'>Somewhat important</MenuItem>
                        <MenuItem value='veryImportant'>Very important</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>

              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                className={s.mainButton}
                disabled={isSubmitting}
                size='large'
              >
                Save
              </Button>
            </>
          )}
        </Formik>
    </Paper>
  )
}))


const formValidationSchema = object().shape({
  dependants: number().positive('Invalid number entered for dependants'),
  address1: string(),
  address2: string(),
  city: string(),
  state: string(),
  postalCode: number()
    .positive('Invalid postal code'),
  phone: number()
    .positive('Invalid phone number'),
})