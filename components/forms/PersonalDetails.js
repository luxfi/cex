import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function PersonalDetails() {
  return (
    <React.Fragment>
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
          <TextField
            required
            id="birthday"
            name="birthday"
            label="Birthday"
            fullWidth
            autoComplete="bday"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            autoComplete="gender"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
