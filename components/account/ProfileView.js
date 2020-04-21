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

import {
  liquidGroup,
  netWorthGroup,
  yearlyIncomeGroup,
  employmentGroup,
  maritalStatusGroup,
  goalGroup,
  timelineGroup,
  experienceGroup,
  riskTolerenceGroup,
  liquidityGroup,
} from './profileValues'


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
                    <RadioGroupFull 
                      label={employmentGroup.groupLabel} 
                      name={employmentGroup.groupName} 
                      value={values.employment} 
                      onChange={handleChange} 
                      values={employmentGroup.values} 
                    />
                    <RadioGroupFull 
                      label={maritalStatusGroup.groupLabel} 
                      name={maritalStatusGroup.groupName} 
                      value={values.maritalStatus} 
                      onChange={handleChange} 
                      values={maritalStatusGroup.values} 
                    />

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
                    <RadioGroupFull 
                      label={liquidGroup.groupLabel} 
                      name={liquidGroup.groupName} 
                      value={values.liquid} 
                      onChange={handleChange} 
                      values={liquidGroup.values} 
                    />
                    <RadioGroupFull 
                      label={netWorthGroup.groupLabel} 
                      name={netWorthGroup.groupName} 
                      value={values.netWorth} 
                      onChange={handleChange} 
                      values={netWorthGroup.values} 
                    />
                    <RadioGroupFull 
                      label={yearlyIncomeGroup.groupLabel} 
                      name={yearlyIncomeGroup.groupName} 
                      value={values.yearlyIncome} 
                      onChange={handleChange} 
                      values={yearlyIncomeGroup.values} 
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Investment Profile</Typography>
                    <RadioGroupFull 
                      label={goalGroup.groupLabel} 
                      name={goalGroup.groupName} 
                      value={values.goal} 
                      onChange={handleChange} 
                      values={goalGroup.values} 
                    />
                    <RadioGroupFull 
                      label={timelineGroup.groupLabel} 
                      name={timelineGroup.groupName} 
                      value={values.timeLine} 
                      onChange={handleChange} 
                      values={timelineGroup.values} 
                    />
                    <RadioGroupFull 
                      label={experienceGroup.groupLabel} 
                      name={experienceGroup.groupName} 
                      value={values.experience} 
                      onChange={handleChange} 
                      values={experienceGroup.values} 
                    />
                    <RadioGroupFull 
                      label={riskTolerenceGroup.groupLabel} 
                      name={riskTolerenceGroup.groupName} 
                      value={values.riskTolerence} 
                      onChange={handleChange} 
                      values={riskTolerenceGroup.values} 
                    />
                    <RadioGroupFull 
                      label={liquidityGroup.groupLabel} 
                      name={liquidityGroup.groupName} 
                      value={values.liquidity} 
                      onChange={handleChange} 
                      values={liquidityGroup.values} 
                    />
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

const RadioGroupFull = ({label, name, value, onChange, values}) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup name={name} value={value} onChange={onChange} >
    {values.map((v, i) => (
      <FormControlLabel value={v.value} control={<Radio />} label={v.label}/>
    ))}
    </RadioGroup>
  </FormControl>
)







