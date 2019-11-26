import React from 'react'
import { Grid } from '@material-ui/core'

const OfferingHeader = () => {
  return (
    <>
      <Grid justify="center" container spacing={4}>
        <Grid item xs={12}>
          {/* title */}
        </Grid>
        <Grid item xs={12} lg={7}>
          {/* trailers */}
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* sidebar */}
          <Grid container direction="column">
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default OfferingHeader
