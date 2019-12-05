import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({}))

const DealTermsSection = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Box mb={4}>
      <Typography variant="h5">
        <Box mb={2} mt={4} fontWeight="fontWeightBold">
          Summary
        </Box>
      </Typography>
      <Typography variant="h5">
        <Box mb={2} mt={2} fontWeight="fontWeightBold">
          A good logo works in the simplest form. It sis a memeorable
          represention of your brand and inspires confidence in your customers.{' '}
        </Box>
      </Typography>
    </Box>
  )
}

export default DealTermsSection
