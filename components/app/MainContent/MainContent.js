import React from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}))

export default ({ children, title }) => {
  const classes = useStyles()

  return (
      <Box className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
  );
}
