import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import {
  InputBase,
  Paper,
  Button,
  Typography,
  Box,
} from '@material-ui/core'

import { isStringUSCurrency } from '../../../util'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '64px',
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
    width: '100%',
  },
  inputText: {
    fontSize: 'inherit',
    color: theme.palette.common.white,
    '&::placeholder': { opacity: 1 },
  },
}))

export default inject('store')(observer(function CustomizedInputBase({
  funds,
  addOfferingInvestment,
  setErrorMessage,
  setSuccessMessage,
  store: { uiStore,  userStore },
}) {
  const classes = useStyles()
  const minimumInvestment = 50
  const [investmentAmount, setInvestmentAmount] = useState('')

  const { loggedIn } = userStore

  const handleSubmit = async () => {
    // ondemand login
    if (!loggedIn) {
      return uiStore.openAuthModal()
    }
    const sufficientFunds = investmentAmount <= funds
    if (sufficientFunds) {
      await addOfferingInvestment(
        investmentAmount,
        () => {
          setSuccessMessage('Your investment was successful')
        },
        ex => {
          setErrorMessage(ex)
        },
      )
      setInvestmentAmount('')
    } else if (investmentAmount < minimumInvestment) {
      setErrorMessage('Please enter the miminum investment amount or greater')
    } else {
      setErrorMessage('Insufficient funds')
    }
  }

  const handleInputChange = evt => {
    evt.preventDefault()
    const { value } = evt.target
    if (value === '') {
      setInvestmentAmount(value)
    }
    if (isStringUSCurrency(value)) {
      setInvestmentAmount(parseFloat(value))
    }
  }

  return (
    <>
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
          <Typography variant="h5">
            <Box fontWeight="fontWeightBold">
              <InputBase
                placeholder={minimumInvestment.toString()}
                classes={{
                  root: classes.inputText,
                  input: classes.inputText,
                }}
                onChange={evt => handleInputChange(evt)}
                value={investmentAmount}
                id='investInput'
              />
            </Box>
          </Typography>
        </Paper>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          onClick={() => handleSubmit()}
          id='investmentSubmit'
        >
          <Typography variant="h6">Invest</Typography>
        </Button>
      </div>
    </>
  )
}))
