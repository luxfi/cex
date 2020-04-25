import React from 'react'

import {
  MenuItem,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'

export default ({values, errors, onChange, states, countries}) => {

  const s = myStyles()
  return (
    <>
    <Typography variant='h6'>Address</Typography>
    <TextField
      required
      name='address1'
      label='Address 1'
      error={!!(errors.address1)}
      placeholder='123 Main St.'
      value={values.address1}
      onChange={onChange}
    />
    <TextField
      name='address2'
      label='Address 2'
      error={!!(errors.address2)}
      placeholder='Apt. 23'
      value={values.address2}
      onChange={onChange}
    />
    <TextField
      required
      name='city'
      label='City'
      error={!!(errors.city)}
      placeholder='San Jose'
      value={values.city}
      onChange={onChange}
    />
    <div className={s.stateAndZip}>
      <NativeSelect 
        name='state' 
        label='State'
        value={values.state}
        values={states.map((s, i) => ({value: s.code, label: s.code}))}
        onChange={onChange}
        required
      />
      <TextField
        required
        name='postalCode'
        label='Postal Code'
        error={!!(errors.postalCode)}
        placeholder='12345'
        value={values.postalCode}
        onChange={onChange}
      />
    </div>
    <TextField
      required
      name='country'
      label='Country'
      value={values.country}
      onChange={onChange}
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
      onChange={onChange}
    />
    </>
  )
}


const myStyles = makeStyles((theme) => ({

  stateAndZip: {
    margin: `${theme.spacing(1)} 0`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  
    '& .MuiFormControl-root:first-child': {
      width: '40%',
      paddingRight: '4%',
    },
    '& .MuiFormControl-root.MuiTextField-root': {
      width: 'auto !important',
      marginTop: '0 !important'
    },
  },
  
}))
