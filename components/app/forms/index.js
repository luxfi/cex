/* eslint-disable jsx-quotes */
import React from 'react'

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core'


// As per MUI docs
const MUIRadioGroup = ({label, name, value, onChange, values, required}) => (
  <FormControl component="fieldset">
    <FormLabel component="legend" required={!!required} >{label}</FormLabel>
    <RadioGroup name={name} value={value} onChange={onChange} >
    {values.map((v, i) => (
      <FormControlLabel value={v.value} control={<Radio color='inherit'/>} label={v.label} key={`${v.label}-${i}`}/>
    ))}
    </RadioGroup>
  </FormControl>
)

const NativeSelect = ({name, label, value, values, onChange, required}) => (
  <FormControl >
    <InputLabel id={`label-id-${name}`} required={!!required}>{label}</InputLabel>
    <Select
      native
      labelId={`label-id-${name}`}
      value={value}
      onChange={onChange}
      inputProps={{name: name}}
    >
    {values.map((v, i) => (
      ('ariaLabel' in v) 
      ? 
      <option value={v.value} aria-label={v.ariaLabel} key={`${v.value}-${i}`}/>
      :
      <option value={v.value} key={`${v.value}-${i}`}>{v.label}</option>
    ))}
    </Select>
  </FormControl> 
)

const MUISelect = ({name, label, value, values, onChange, required}) => (
  <FormControl >
    <InputLabel id={`label-id-${name}`} required={!!required}>{label}</InputLabel>
    <Select
      labelId={`label-id-${name}`}
      value={value}
      onChange={onChange}
      inputProps={{name: name}}
    >
    {values.map((v, i) => (
      ('ariaLabel' in v) 
      ? 
      <MenuItem value={v.value} aria-label={v.ariaLabel} key={`${v.value}-${i}`}/>
      :
      <MenuItem value={v.value} key={`${v.value}-${i}`}>{v.label}</MenuItem>
    ))}
    </Select>
  </FormControl> 
)

const RowTextField = (props) => (
  <TextField className='row-text-field-esx-theme-touchups' {...props} />  
)
  
export {
  MUIRadioGroup,
  NativeSelect,
  MUISelect,
  RowTextField
}