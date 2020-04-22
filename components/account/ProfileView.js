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
        states = [], // Why is this in UserStore??
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
                      name='address1'
                      label='Address 1'
                      error={!!(errors.address1)}
                      placeholder='123 Main St.'
                      value={values.address1}
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      name='address2'
                      label='Address 2'
                      error={!!(errors.address2)}
                      placeholder='Apt. 23'
                      value={values.address2}
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      name='city'
                      label='City'
                      error={!!(errors.city)}
                      placeholder='San Jose'
                      value={values.city}
                      onChange={handleChange}
                    />
                    <div className={s.stateAndZip}>
                      <NativeSelect 
                        name='state' 
                        label='State'
                        value={values.state}
                        values={states.map((s, i) => ({value: s.code, label: s.code}))}
                        onChange={handleChange}
                      />
                      <TextField
                        required
                        name='postalCode'
                        label='Postal Code'
                        error={!!(errors.postalCode)}
                        placeholder='12345'
                        value={values.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <TextField
                      required
                      name='country'
                      label='Country'
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
                    <TextField
                      required
                      name='phone'
                      label='Phone'
                      error={!!(errors.phone)}
                      placeholder='9999999999'
                      value={values.phone}
                      onChange={handleChange}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Personal Details</Typography>
                    <RadioGroupEx 
                      label={employmentGroup.groupLabel} 
                      name={employmentGroup.groupName} 
                      value={values.employment} 
                      onChange={handleChange} 
                      values={employmentGroup.values} 
                    />
                    <RadioGroupEx 
                      label={maritalStatusGroup.groupLabel} 
                      name={maritalStatusGroup.groupName} 
                      value={values.maritalStatus} 
                      onChange={handleChange} 
                      values={maritalStatusGroup.values} 
                    />
                    <TextField
                      name='dependants'
                      label='Dependants'
                      error={!!(errors.dependants)}
                      value={values.dependants}
                      onChange={handleChange}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Accounts</Typography>
                      <TextField
                        required
                        name='APEX'
                        label='APEX'
                        placeholder='5P75152'
                        value={values.APEX}
                        onChange={handleChange}
                        disabled
                      />
                      <TextField
                        name='RHS'
                        label='RHS'
                        placeholder='1000744308'
                        value={values.RHS}
                        onChange={handleChange}
                        disabled
                      />
                    <NativeSelect
                      label='Pattern Day Trade Protection'
                      name={dayTradeProtection}
                      value={values.dayTradeProtection ? 'yes' : 'no'}
                      onChange={handleChange}
                      values={[
                        { value: '', ariaLabel: 'None'},
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' }
                      ]}
                    />
                  </Paper>
                </Grid> 
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Assets</Typography>
                    <RadioGroupEx 
                      label={liquidGroup.groupLabel} 
                      name={liquidGroup.groupName} 
                      value={values.liquid} 
                      onChange={handleChange} 
                      values={liquidGroup.values} 
                    />
                    <RadioGroupEx 
                      label={netWorthGroup.groupLabel} 
                      name={netWorthGroup.groupName} 
                      value={values.netWorth} 
                      onChange={handleChange} 
                      values={netWorthGroup.values} 
                    />
                    <RadioGroupEx 
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
                    <RadioGroupEx 
                      label={goalGroup.groupLabel} 
                      name={goalGroup.groupName} 
                      value={values.goal} 
                      onChange={handleChange} 
                      values={goalGroup.values} 
                    />
                    <RadioGroupEx 
                      label={timelineGroup.groupLabel} 
                      name={timelineGroup.groupName} 
                      value={values.timeLine} 
                      onChange={handleChange} 
                      values={timelineGroup.values} 
                    />
                    <RadioGroupEx 
                      label={experienceGroup.groupLabel} 
                      name={experienceGroup.groupName} 
                      value={values.experience} 
                      onChange={handleChange} 
                      values={experienceGroup.values} 
                    />
                    <RadioGroupEx 
                      label={riskTolerenceGroup.groupLabel} 
                      name={riskTolerenceGroup.groupName} 
                      value={values.riskTolerence} 
                      onChange={handleChange} 
                      values={riskTolerenceGroup.values} 
                    />
                    <RadioGroupEx 
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
  dependants: number().positive('Number dependants is invalid'),
  address1: string(),
  address2: string(),
  city: string(),
  state: string(),
  postalCode: number()
    .positive('Invalid postal code'),
  phone: number()
    .positive('Invalid phone number'),
})

const RadioGroupEx = ({label, name, value, onChange, values}) => (
  <FormControl component="fieldset">
    <InputLabel required >{label}</InputLabel>
    <RadioGroup name={name} value={value} onChange={onChange} >
    {values.map((v, i) => (
      <FormControlLabel value={v.value} control={<Radio />} label={v.label}/>
    ))}
    </RadioGroup>
  </FormControl>
)

const NativeSelect = ({name, label, value, values, onChange}) => (
  <FormControl component="fieldset">
    <InputLabel htmlFor={name} required >{label}</InputLabel>
    <Select
      native
      value={value}
      onChange={onChange}
      inputProps={{
        name: name,
        id: name,
      }}
    >
    {values.map((v, i) => (
      ('ariaLabel' in v) 
      ? 
      <option value={v.value} aria-label={v.ariaLabel} />
      :
      <option value={v.value}>{v.label}</option>
    ))}
    </Select>
  </FormControl> 
)

/*
                      label='Pattern Day Trade Protection'
                      name={dayTradeProtection}
                      value={values.dayTradeProtection ? 'yes' : 'no'}
                      onChange={handleChange}
                      values={[
                        {
                          value: '',
                          ariaLabel: 'None'
                        },
                        {
                          value: 'yes',
                          label: 'Yes'
                        },
                        {
                          value: 'no',
                          label: 'No'
                        }
                      ]}
                    />
*/




/*

                      <TextField
                        name='state'
                        label='State'
                        error={!!(errors.state)}
                        placeholder=''
                        value={values.state}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        select
                        required
                      >
                      {states.map((option, index) => (
                        <option key={option.code} value={option.code}>
                          {option.code}
                        </option>
                      ))}
                      </TextField>

                      */