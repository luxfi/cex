/* eslint-disable jsx-quotes */
import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core'

import { Formik } from 'formik'
import { number, object, string } from 'yup'

import { MUIRadioGroup } from '../../app/forms'

import AddressElements from './AddressElements.js'
import PersonalDetailsElements from './PersonalDetailsElements.js'
import AccountsElements from './AccountsElements.js'

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

import styles from '../account.style.js'
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
          <Grid container spacing={4} alignItems='stretch'>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <AddressElements 
                    values={values} 
                    errors={errors} 
                    onChange={handleChange} 
                    states={states} 
                    countries={countries}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <PersonalDetailsElements 
                    values={values} 
                    errors={errors} 
                    onChange={handleChange}
                    employmentGroup={employmentGroup}
                    maritalStatusGroup={maritalStatusGroup}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <AccountsElements values={values} onChange={handleChange} />
                </CardContent>
              </Card>
            </Grid> 
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant='h6'>Assets</Typography>
                  <MUIRadioGroup 
                    label={liquidGroup.groupLabel} 
                    name={liquidGroup.groupName} 
                    value={values.liquid} 
                    onChange={handleChange} 
                    values={liquidGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={netWorthGroup.groupLabel} 
                    name={netWorthGroup.groupName} 
                    value={values.netWorth} 
                    onChange={handleChange} 
                    values={netWorthGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={yearlyIncomeGroup.groupLabel} 
                    name={yearlyIncomeGroup.groupName} 
                    value={values.yearlyIncome} 
                    onChange={handleChange} 
                    values={yearlyIncomeGroup.values} 
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant='h6'>Investment Profile</Typography>
                  <MUIRadioGroup 
                    label={goalGroup.groupLabel} 
                    name={goalGroup.groupName} 
                    value={values.goal} 
                    onChange={handleChange} 
                    values={goalGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={timelineGroup.groupLabel} 
                    name={timelineGroup.groupName} 
                    value={values.timeLine} 
                    onChange={handleChange} 
                    values={timelineGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={experienceGroup.groupLabel} 
                    name={experienceGroup.groupName} 
                    value={values.experience} 
                    onChange={handleChange} 
                    values={experienceGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={riskTolerenceGroup.groupLabel} 
                    name={riskTolerenceGroup.groupName} 
                    value={values.riskTolerence} 
                    onChange={handleChange} 
                    values={riskTolerenceGroup.values} 
                  />
                  <MUIRadioGroup 
                    label={liquidityGroup.groupLabel} 
                    name={liquidityGroup.groupName} 
                    value={values.liquidity} 
                    onChange={handleChange} 
                    values={liquidityGroup.values} 
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            className={s.profileViewSaveButton}
            disabled={isSubmitting}
            size='large'
            id='submitProfileButton'
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

