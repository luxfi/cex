import { useState } from 'react'
import NumberFormat from 'react-number-format'
import midstream from 'midstream'

const DollarFormatCustom = (props) => {
  const { inputRef, onBlur, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        const n = parseFloat(values.value)
        onBlur({
          target: {
            value: Number.isNaN(n) ? 0 : n,
          },
        })
      }}
      isNumericString
      prefix='$'
    />
  )
}

const NumberFormatCustom = (props) => {
  const { inputRef, onBlur, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        const n = parseFloat(values.value)
        onBlur({
          target: {
            value: Number.isNaN(n) ? 0 : n,
          },
        })
      }}
      isNumericString
    />
  )
}


const greaterThan0 = (v) => {
  if (v > 0) {
    return v
  }

  throw new Error('Enter a value greater than 0.')
}

// Simple hook for Midstream
const useMidstream = (config) => {
  const dst = {}
  const err = {}

  // standard force rerender hack
  const [tick, setTick] = useState(0)

  const [ms] = useState(() => (
    midstream(config, {
      dst: (name, value) => {
        dst[name] = value
        setTick(tick + 1)
      },
      // err behaves just like dst
      err: (name, value) => {
        err[name] = value
        setTick(tick + 1)
      },
    })
  ))

  return ms
}

const longDash = '—'


export {
  DollarFormatCustom,
  NumberFormatCustom,
  greaterThan0,
  useMidstream,
  longDash
}