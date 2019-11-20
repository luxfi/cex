import {useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from '@material-ui/core'

const errorNotEnoughFunds = ({total, shares, funds }) => {
  return 
  `
Not Enough Buying Power
You don’t have enough buying power to buy 1 share of AAPL.

Please deposit $${total} to purchase ${shares} share at market price (5% collar included).

Market orders on ESX are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their ESX account. If you want to use your full buying power of $${funds} you can place a limit order instead.`
}

const BuySellWidget = ({ classes, marketPrice, ticker, orderType, funds }) => {
  const [shares, setShares] = useState(0)
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
              onChange={evt => setShares(evt.target.value)}
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
              <Typography>${shares * marketPrice}</Typography>
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
          <Typography>$0.00 Buying Power Available</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget