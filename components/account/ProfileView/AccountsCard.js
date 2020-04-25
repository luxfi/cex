import React from 'react'

import {
  TextField,
  Typography,
} from '@material-ui/core'


export default (props) => (
  <>
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
    required
  />
  </>
)