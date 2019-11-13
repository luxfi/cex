import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  }
}))
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment/moment.js'

const BirthdatePicker = ({ setValue, birthdate }) => {
  const classes = useStyles()
  const EighteenYearsAgo = moment().subtract(18, 'years')
  const AWhileAgo = moment().subtract(120, 'years')
  // setValue("birthdate", EighteenYearsAgo)
  // initialize store with max valid birthdate
  console.log('birthdat', birthdate)
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        clearable 
          value={birthdate}
          onChange={date => setValue("birthdate", date ? date.format() : null)}
          className={classes.textField}
          disableFuture
          openTo="month"
          format="MM/DD/YYYY"
          label="Date of birth"
          views={["month", "date", "year"]}
          maxDate={EighteenYearsAgo}
          maxDateMessage="Must be 18 years or older"
          initialFocusedDate={EighteenYearsAgo}
          minDate={AWhileAgo}
          minDateMessage="Please choose an appropriate date of birth"
          // onError="TODO"
        />
     
    </MuiPickersUtilsProvider>
  )
}

export default BirthdatePicker