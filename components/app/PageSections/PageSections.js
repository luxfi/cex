import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%',
    flexBasis: '100%',
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
