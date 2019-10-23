import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default function PrimaryAddress({
  validAddress1,
  validCity,
  validPostalCode,
  address1,
  address2,
  city,
  postalCode,
  country,
  state,
  setErrorMessage,
  setValue
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Primary Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            error={address1.length >= 2 && !validAddress1}
            helperText={address1.length >= 2 && !validAddress1 && "Please enter valid street address"}
            value={address1}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={address2}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            error={city.length >= 2 && !validCity}
            helperText={city.length >= 2 && !validCity && "Please enter valid City"}
            value={city}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="postalCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            error={postalCode.length >= 2 && !validPostalCode}
            helperText={postalCode.length >= 2 && !validPostalCode && "Please enter valid Postal code"}
            value={postalCode}
            onChange={evt => setValue(evt.target.name, evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
      </Grid>
    </>
  );
}
