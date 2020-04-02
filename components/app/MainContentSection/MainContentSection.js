import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    flexBasis: '80%',
  }
}))

export default ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}
