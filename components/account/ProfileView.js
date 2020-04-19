/* eslint-disable jsx-quotes */
import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'

import { Formik } from 'formik'
import { number, object, string } from 'yup'

import styles from '../../styles/pages/account.style.js'
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

  const { metadata, firstName, lastName } = account || {}
  
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
    <Paper  >
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
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Address</Typography>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Personal Details</Typography>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Employment</InputLabel>
                      <RadioGroup className={s.radioGroup} name='employment' value={values.employment} onChange={handleChange}>
                        <FormControlLabel value='employed' control={<Radio />} label='Employed' />
                        <FormControlLabel value='unemployed' control={<Radio />} label='Unemployed' />
                      </RadioGroup>
                    </FormControl>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Marital Status</InputLabel>
                      <RadioGroup className={s.radioGroup} name='maritalStatus' value={values.maritalStatus} onChange={handleChange}>
                        <FormControlLabel value='single' control={<Radio />} label='Single' />
                        <FormControlLabel value='married' control={<Radio />} label='Married' />
                        <FormControlLabel value='divorced' control={<Radio />} label='Divorced' />
                      </RadioGroup>
                    </FormControl>
                    <FormControl className={s.formControl}>
                      <TextField
                        id='dependants'
                        name='dependants'
                        label='Dependants'
                        error={!!(errors.dependants)}
                        value={values.dependants}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Accounts</Typography>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
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
                    </FormControl>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Pattern Day Trade Protection</InputLabel>
                      <Select
                        value={values.dayTradeProtection ? 'yes' : 'no'}
                        onChange={handleChange}
                        inputProps={{
                          name: 'dayTradeProtection',
                          id: 'dayTradeProtection',
                        }}
                      >
                        <MenuItem value='yes'>Yes</MenuItem>
                        <MenuItem value='no'>no</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid> 
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2}>
                    <Typography variant='h6'>Assets</Typography>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Liquid</InputLabel>
                      <Select
                        value={values.liquid}
                        onChange={handleChange}
                        inputProps={{
                          name: 'liquid',
                          id: 'liquid',
                        }}
                      >
                        <MenuItem value='50000-99999'>$50,000 to $99,999</MenuItem>
                        <MenuItem value='100000-199999'>$100,000 to $199,999</MenuItem>
                        <MenuItem value='200000-299999'>$200,000 to $299,999</MenuItem>
                        <MenuItem value='400000-499999'>$400,000 to $499,999</MenuItem>
                        <MenuItem value='500000-999999'>$500,000 to $999,999</MenuItem>
                        <MenuItem value='1000000-4999999'>$1,000,000 to $4,999,999</MenuItem>
                        <MenuItem value='5000000-max'>$5,000,000 or higher</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Net Worth</InputLabel>
                      <Select
                        value={values.netWorth}
                        onChange={handleChange}
                        inputProps={{
                          name: 'netWorth',
                          id: 'netWorth',
                        }}
                      >
                        <MenuItem value='50000-99999'>$50,000 to $99,999</MenuItem>
                        <MenuItem value='100000-199999'>$100,000 to $199,999</MenuItem>
                        <MenuItem value='200000-299999'>$200,000 to $299,999</MenuItem>
                        <MenuItem value='400000-499999'>$400,000 to $499,999</MenuItem>
                        <MenuItem value='500000-999999'>$500,000 to $999,999</MenuItem>
                        <MenuItem value='1000000-4999999'>$1,000,000 to $4,999,999</MenuItem>
                        <MenuItem value='5000000-max'>$5,000,000 or higher</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={s.formControl}>
                      <InputLabel shrink>Yearly Income</InputLabel>
                      <Select
                        value={values.yearlyIncome}
                        onChange={handleChange}
                        inputProps={{
                          name: 'yearlyIncome',
                          id: 'yearlyIncome',
                        }}
                      >
                        <MenuItem value='75000-99999'>$75,000 to $99,999</MenuItem>
                        <MenuItem value='100000-199999'>$100,000 to $199,999</MenuItem>
                        <MenuItem value='200000-299999'>$200,000 to $299,999</MenuItem>
                        <MenuItem value='300000-499999'>$300,000 to $499,999</MenuItem>
                        <MenuItem value='500000-1999999'>$500,000 to $1,199,999</MenuItem>
                        <MenuItem value='1200000-max'>$1,200,000 or Higher</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper elevation={2}>

                  <Typography variant='h6'>Investment Profile</Typography>
                  <FormControl className={s.formControl}>
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
                  <FormControl className={s.formControl}>
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
                  <FormControl className={s.formControl}>
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
                  <FormControl className={s.formControl}>
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
                  <FormControl className={s.formControl}>
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
                className={s.largeButton}
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

/*
                    <FieldRow label='Address' classes={s}>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <FormControl className={s.formControl}>
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
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FieldRow>

                        <FormControl className={s.formControl}>
                          <InputLabel shrink>Pattern Day Trade Protection</InputLabel>
                          <Select
                            value={values.dayTradeProtection ? 'yes' : 'no'}
                            onChange={handleChange}
                            inputProps={{
                              name: 'dayTradeProtection',
                              id: 'dayTradeProtection',
                            }}
                          >
                            <MenuItem value='yes'>Yes</MenuItem>
                            <MenuItem value='no'>no</MenuItem>
                          </Select>
                        </FormControl>
                    <SectionTitle label='Personal Details' classes={s} />
                    <FieldRow contents={employment} classes={s}>
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          <FormControl className={s.formControl}>
                            <InputLabel shrink>Employment</InputLabel>
                            <RadioGroup className={s.radioGroup} name='employment' value={values.employment} onChange={handleChange}>
                              <FormControlLabel value='employed' control={<Radio />} label='Employed' />
                              <FormControlLabel value='unemployed' control={<Radio />} label='Unemployed' />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <FormControl className={s.formControl}>
                            <InputLabel shrink>Marital Status</InputLabel>
                            <RadioGroup className={s.radioGroup} name='maritalStatus' value={values.maritalStatus} onChange={handleChange}>
                              <FormControlLabel value='single' control={<Radio />} label='Single' />
                              <FormControlLabel value='married' control={<Radio />} label='Married' />
                              <FormControlLabel value='divorced' control={<Radio />} label='Divorced' />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <FormControl className={s.formControl}>
                            <TextField
                              id='dependants'
                              name='dependants'
                              label='Dependants'
                              error={!!(errors.dependants)}
                              value={values.dependants}
                              onChange={handleChange}
                              InputLabelProps={{ shrink: true }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FieldRow>


*/

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


const FieldRow = ({
  label,
  classes,
  children,
}) => (
  <TableRow>
    <TableCell fixedHeader={false} style={{ width: '25%', tableLayout: 'auto' }} size='small' className={classes.tableLabelColumn}>{label}</TableCell>
    <TableCell style={{ padding: '10px 0' }} className={classes.tableContentsColumn}>{children}</TableCell>
  </TableRow>
)

const SectionTitle = ({
  label,
  classes,
}) => (
  <TableRow className={classes.tableSectionRow}>
    <TableCell colSpan="2" >{label}</TableCell>
  </TableRow>
)

