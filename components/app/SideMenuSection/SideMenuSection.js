import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '20%',
    flexBasis: '20%',
  }
}))

export default props => {
  const { 
    title,
    children,
  } = props

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
