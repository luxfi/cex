import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  }
}))

export default function DatePickers({ setValue, birthdate }) {
  const classes = useStyles()
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        value={birthdate}
        name="birthdate"
        onChange={evt => setValue(evt.target.name, evt.target.value)}
      />
    </form>
  )
}
