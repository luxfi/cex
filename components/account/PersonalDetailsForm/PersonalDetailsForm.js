import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import { BirthdayPicker } from "../../app"
import { observer } from 'mobx-react'

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
})

@observer
class PersonalDetails extends React.Component {
  constructor(props) {
    super(props)
    this.updateProperty = this.updateProperty.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  updateProperty(key, value) {
    this.props.person[key] = value
  }

  onChange(event) {
    this.updateProperty(event.target.name, event.target.value)
  }

  render() {
    const {
      classes,
      firstName,
      lastName,
      phone,
      taxId,
      birthdate,
      gender,
      setValue,
      validLastName,
      validFirstName,
      validPhone,
      validTaxId
    } = this.props
    return (
      <>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            type="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            error={firstName.length >= 2 && !validFirstName}
            helperText={firstName.length >= 2 && !validFirstName && "Please enter valid first name"}
            value={firstName}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            type="lastName"
            fullWidth
            autoComplete="lname"
            error={lastName.length >= 2 && !validLastName}
            helperText={lastName.length >= 2 && !validLastName && "Please enter valid last name"}
            value={lastName}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            error={phone.length >= 2 && !validPhone}
            helperText={phone.length >= 2 && !validPhone && "Please enter a 10 digit phone number"}
            value={phone}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="taxId"
            name="taxId"
            label="SSN"
            fullWidth
            autoComplete="taxId"
            error={taxId.length >= 2 && !validTaxId}
            helperText={taxId.length >= 2 && !validTaxId && `Please enter valid last ssn "nn-nn-nnnn"`}
            value={taxId}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BirthdayPicker setValue={setValue} birthdate={birthdate}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              value={gender}
              onChange={evt => setValue(evt.target.name, evt.target.value)}
              inputProps={{
                name: "gender",
                id: "gender"
              }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
              <MenuItem value={"unspecified"}>Unspecified</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
  </>
    )
  }
}

export default withStyles(styles)(PersonalDetails)
