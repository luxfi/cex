import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default props => {
  const { 
    title,
    children
  } = props

  return (
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Grid>
        {children}
      </Grid>
  );
}
