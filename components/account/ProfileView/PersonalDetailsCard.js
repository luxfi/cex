import React from 'react'

import {
  Typography,
} from '@material-ui/core'

export default ({ values, errors, onChange }) => (
  <>
  <Typography variant='h6'>Personal Details</Typography>
  <MUIRadioGroup 
    label={employmentGroup.groupLabel} 
    name={employmentGroup.groupName} 
    value={values.employment} 
    onChange={onChange} 
    values={employmentGroup.values} 
  />
  <MUIRadioGroup 
    label={maritalStatusGroup.groupLabel} 
    name={maritalStatusGroup.groupName} 
    value={values.maritalStatus} 
    onChange={onChange} 
    values={maritalStatusGroup.values} 
  />
  <RowTextField
    name='dependants'
    label='Dependants'
    error={!!(errors.dependants)}
    value={values.dependants}
    onChange={onChange}
  />
  </>
)

