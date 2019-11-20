import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from '@material-ui/core'

import ErrorIcon from '@material-ui/icons/Error'

const errorNotEnoughFunds = ({ total, shares, funds, ticker }) => {
  return `
Not Enough Buying Power
You don’t have enough buying power to buy 1 share of ${ticker}.

Please deposit $${total} to purchase ${shares} share at market price (5% collar included).

Market orders on ESX are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their ESX account. If you want to use your full buying power of $${funds} you can place a limit order instead.`
}

const notValid = () => {
  return `Error
  Please enter a valid number of shares.`
}

const reviewOrderText = `The quote you see may not be the price at which your order is executed.`

const BuySellWidget = ({
  classes,
  marketPrice,
  ticker,
  orderType,
  funds,
  createOrder,
}) => {
  const [shares, setShares] = useState('')
  const [quote, setQuote] = useState('')
  const submitOrder = () => {
    // Todo check if funds available at current market
    // If not, put message that market price has changed, currently insuffiecient funds
    if (!shares) return

    const order = {
      side: orderType,
      type: 'market',
      price: marketPrice,
      quantity: shares,
    }

    createOrder(order)

    setShares(0)
    setQuote('')
  }

  const reviewOrder = () => {
    // Todo check if funds available - else error
    if (!shares) return //need total funds if market order

    setQuote(marketPrice)
  }

  const isInteger = stringInput => {
    // match a digit one or more times
    const rx = new RegExp(/^\d+(?:\.\d{1,2})?$/)
    return rx.test(stringInput)
  }

  const handleInputChange = evt => {
    evt.preventDefault()
    const { value } = evt.target
    if (value === '') {
      setShares(value)
    }
    if (isInteger(value)) {
      setShares(value)
    }
  }

  const handleOrder = () => {
    quote ? submitOrder() : reviewOrder()
  }

  const handleBack = () => {
    setQuote('')
  }

  const price = quote ? quote : marketPrice
  const estimatedCost = (shares * price).toFixed(2)
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h5">Buy {ticker}</Typography>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography>Shares</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="shares"
              name="shares"
              fullWidth
              placeholder="0"
              autoComplete="shares"
              onChange={evt => handleInputChange(evt)}
              value={shares}
              variant="outlined"
              inputProps={{
                style: {
                  textAlign: 'right',
                },
              }}
              margin="dense"
            />
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item xs={6}>
            <Typography>Market Price</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right">
              <Typography>${quote ? quote : marketPrice}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item xs={6}>
            <Typography>Estimated Cost</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right">
              <Typography>${estimatedCost}</Typography>
            </Box>
          </Grid>
        </Grid>
        {quote && (
          <Grid item>
            <Typography id="info" variant="subtitle2">
              <ErrorIcon fontSize="inherit" /> {reviewOrderText}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button
            className={classes.reviewButton}
            fullWidth
            onClick={() => handleOrder()}
          >
            <Typography variant="body2" className={classes.reviewButtonText}>
              {quote ? `Buy ${estimatedCost}` : 'Review Order'}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          {quote ? (
            <Button
              className={classes.backButton}
              fullWidth
              onClick={() => handleBack()}
            >
              <Typography variant="body2" className={classes.backButtonText}>
                Back
              </Typography>
            </Button>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Typography>${funds.toFixed(2)} Buying Power Available</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget
