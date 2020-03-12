/* eslint-disable jsx-quotes */
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import { inject, observer } from 'mobx-react'
import { number, object, string } from 'yup'

import { ViewCard } from '../app'

const style = {
  acctWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  acctInput: {
    width: '48%',
  },
}

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
    <TableCell style={{ padding: '10px 0' }} className={classes.tableContentsColumn}>
      <FormControl style={{ width: '100%' }}>{children}</FormControl>
    </TableCell>
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

export default inject('store')(observer((props) => {
  const {
    classes,
    store: {
      userStore,
      userStore: {
        account,
        address1,
        address2,
        city,
        postalCode,
        state,
        phone,
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

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    userStore.updateAccountInfo(values)
    setSubmitting(false)
  }

  return (
    <ViewCard title={`${firstName} ${lastName}`} >
      <Formik
          enableReinitialize
          initialValues={{
            address1: address1 || '',
            address2: address2 || '',
            city: city || '',
            postalCode: postalCode || '',
            state: state || '',
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
                <Table className={classes.investorInfoTable} padding='none'>
                  <TableBody>
                    <FieldRow label='Address' classes={classes}>
                      <div style={style.acctWrapper}>
                        <TextField
                          required
                          id='address1'
                          name='address1'
                          label='Address'
                          fullWidth
                          error={!!(errors.address1)}
                          placeholder='Address e.g. 234 street lane'
                          value={values.address1}
                          onChange={handleChange}
                          style={style.acctInput}
                        />
                        <TextField
                          required
                          id='address2'
                          name='address2'
                          label='Address Line 2'
                          fullWidth
                          error={!!(errors.address2)}
                          placeholder='Address line 2 e.g. Apt 23, building 4'
                          value={values.address2}
                          onChange={handleChange}
                          style={style.acctInput}
                        />
                      </div>
                      <TextField
                        required
                        id='city'
                        name='city'
                        label='City'
                        fullWidth
                        error={!!(errors.city)}
                        placeholder='City e.g. San Jose'
                        value={values.city}
                      />
                      <TextField
                        required
                        id='state'
                        name='state'
                        label='State'
                        fullWidth
                        error={!!(errors.state)}
                        placeholder='State e.g Carlifornia'
                        value={values.state}
                        onChange={handleChange}
                      />
                      <TextField
                        required
                        id='postalCode'
                        name='postalCode'
                        label='Postal Code'
                        fullWidth
                        error={!!(errors.postalCode)}
                        placeholder='Postal Code e.g. 18796'
                        value={values.postalCode}
                        onChange={handleChange}
                      />
                    </FieldRow>
                    <FieldRow label='Phone' classes={classes}>
                      <TextField
                        required
                        id='phone'
                        name='phone'
                        label='Phone'
                        fullWidth
                        error={!!(errors.phone)}
                        placeholder='Phone e.g. 4846389012'
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </FieldRow>
                    <FieldRow label='Pattern Day Trade Protection' classes={classes}>
                      <FormControl className={classes.formControl}>
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
                    </FieldRow>
                    <FieldRow label='Account Numbers' classes={classes}>
                      <div style={style.acctWrapper}>
                        <TextField
                          required
                          id='apexAccountNumber'
                          name='APEX'
                          label='APEX'
                          fullWidth
                          placeholder='5P75152'
                          value={values.APEX}
                          onChange={handleChange}
                          inputProps={{ maxLength: 30 }}
                          style={style.acctInput}
                        />
                        <TextField
                          required
                          id='rhsAccountNumber'
                          name='RHS'
                          label='RHS'
                          fullWidth
                          placeholder='1000744308'
                          value={values.RHS}
                          onChange={handleChange}
                          inputProps={{ maxLength: 30 }}
                          style={style.acctInput}
                        />
                      </div>
                    </FieldRow>
                    <SectionTitle label='Personal Details' classes={classes} />
                    <FieldRow label='Employment' contents={employment} classes={classes}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.employment}
                          onChange={handleChange}
                          inputProps={{
                            name: 'employment',
                            id: 'employment',
                          }}
                        >
                          <MenuItem value='employed'>Employed</MenuItem>
                          <MenuItem value='unemployed'>Unemployed</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Marital Status' classes={classes}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.maritalStatus}
                          onChange={handleChange}
                          inputProps={{
                            name: 'maritalStatus',
                            id: 'maritalStatus',
                          }}
                        >
                          <MenuItem value='single'>Single</MenuItem>
                          <MenuItem value='married'>Married</MenuItem>
                          <MenuItem value='divorced'>Divorced</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Dependants' classes={classes}>
                      <TextField
                        required
                        id='dependants'
                        name='dependants'
                        label='Dependants'
                        fullWidth
                        placeholder='3'
                        error={!!(errors.dependants)}
                        value={values.dependants}
                        onChange={handleChange}
                      />
                    </FieldRow>
                    <SectionTitle label='Assets' classes={classes} />
                    <FieldRow label='Liquid' contents={liquid} classes={classes}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.liquid}
                          onChange={handleChange}
                          inputProps={{
                            name: 'liquid',
                            id: 'liquid',
                          }}
                        >
                          <MenuItem value='$50,000 to $99,999'>$50,000 to $99,999</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Net Worth' classes={classes}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.netWorth}
                          onChange={handleChange}
                          inputProps={{
                            name: 'netWorth',
                            id: 'netWorth',
                          }}
                        >
                          <MenuItem value='$200,000 to $249,999'>$200,000 to $249,999</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Yearly Income' classes={classes}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.yearlyIncome}
                          onChange={handleChange}
                          inputProps={{
                            name: 'yearlyIncome',
                            id: 'yearlyIncome',
                          }}
                        >
                          <MenuItem value='$100,000 to $199,999'>$100,000 to $199,999</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <SectionTitle label='Investment' classes={classes} />
                    <FieldRow label='Goal' classes={classes} >
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.goal}
                          onChange={handleChange}
                          inputProps={{
                            name: 'goal',
                            id: 'goal',
                          }}
                        >
                          <MenuItem value='Growth'>Growth</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Timeline' contents={timeLine} classes={classes} >
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.timeLine}
                          onChange={handleChange}
                          inputProps={{
                            name: 'timeLine',
                            id: 'timeLine',
                          }}
                        >
                          <MenuItem value='Less than 4 years'>Less than 4 years</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Experience' contents={experience} classes={classes} >
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.experience}
                          onChange={handleChange}
                          inputProps={{
                            name: 'experience',
                            id: 'experience',
                          }}
                        >
                          <MenuItem value='very little'>Very little</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Risk Tolerence' contents={riskTolerence} classes={classes} >
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.riskTolerence}
                          onChange={handleChange}
                          inputProps={{
                            name: 'riskTolerence',
                            id: 'riskTolerence',
                          }}
                        >
                          <MenuItem value='Keep all or buy more'>Keep all or buy more</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                    <FieldRow label='Liquidity' contents={liquidity} classes={classes} >
                      <FormControl className={classes.formControl}>
                        <Select
                          value={values.liquidity}
                          onChange={handleChange}
                          inputProps={{
                            name: 'liquidity',
                            id: 'liquidity',
                          }}
                        >
                          <MenuItem value='not important'>Not important</MenuItem>
                          <MenuItem value='important'>Important</MenuItem>
                          <MenuItem value='very important'>Very important</MenuItem>
                        </Select>
                      </FormControl>
                    </FieldRow>
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ margin: '20px 0 0 0' }}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
            </>
          )}
        </Formik>
    </ViewCard>
  )
}))
