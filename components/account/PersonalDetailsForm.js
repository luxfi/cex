import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import { BirthdayPicker } from "../app"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function PersonalDetails() {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    gender: ""
  })

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, [])

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }))
  }

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
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ssn"
            name="ssn"
            label="SSN"
            fullWidth
            autoComplete="ssn"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="birthday"
            name="birthday"
            label="Birthday"
            fullWidth
            autoComplete="bday"
          /> */}
          <BirthdayPicker />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              value={values.gender}
              onChange={handleChange}
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
