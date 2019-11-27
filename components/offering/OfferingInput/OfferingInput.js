import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  InputBase,
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Box,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '64px',
    paddingRight: '160px', // hack until figure out a better way
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  currency: {
    padding: 10,
  },
  button: {
    height: 64,
    paddingRight: theme.spacing(7),
    paddingLeft: theme.spacing(7),
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
  },
  container: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius,
  },
}))

export default function CustomizedInputBase() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.currency}
          aria-label="$"
        >
          <Box fontWeight="fontWeightBold">$</Box>
        </Typography>
        <InputBase
          placeholder="1,000"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Paper>
      <Button color="secondary" variant="contained" className={classes.button}>
        <Typography variant="subtitle1">Invest</Typography>
      </Button>
    </div>
  )
}
