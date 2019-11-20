import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from '@material-ui/core'

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

const BuySellWidget = ({
  classes,
  marketPrice,
  ticker,
  orderType,
  funds,
  createOrder,
}) => {
  const [shares, setShares] = useState("")
  const submitOrder = e => {
    e.preventDefault()
    // Todo check if funds available - else snackbar insufficient funds
    if (!shares) return //need total funds if market order

    const order = {
      side: orderType,
      type: 'market',
      price: marketPrice,
      quantity: shares,
    }

    createOrder(order)

    setShares(0)
  }

  const isInteger = stringInput => {
    // match a digit one or more times
    const rx = new RegExp(/^\d+(?:\.\d{1,2})?$/)
    return rx.test(stringInput)
  }

  const handleInputChange = evt => {
    evt.preventDefault()
    const { value } = evt.target
    if (value === "") {
      setShares(value)
    }
    if (isInteger(value)) {
      setShares(value)
    }
  }
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
              <Typography>${marketPrice}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item xs={6}>
            <Typography>Estimated Cost</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right">
              <Typography>${(shares * marketPrice).toFixed(2)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Button className={classes.reviewButton} fullWidth>
            <Typography variant="body2" className={classes.reviewButtonText}>
              Review Order
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>${funds.toFixed(2)} Buying Power Available</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget
