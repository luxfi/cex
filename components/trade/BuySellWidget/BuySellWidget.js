import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  reviewButton: {
    color: '#000',
    backgroundColor: '#FBC43E',
    padding: '12px 24px',
  },
  reviewButtonText: {
    color: '#000',
  },
  backButton: {
    color: 'transparent',
    border: '1px solid #FBC43E',
    padding: '11px 24px',
  },
  backButtonText: {
    color: '#FBC43E',
  },
}))

import ErrorIcon from '@material-ui/icons/Error'

const errorNotEnoughFunds = ({ total, shares, funds, ticker }) => {
  const addPlural = parseInt(shares) > 1 ? 's' : ''
  return `
Not Enough Buying Power
You don’t have enough buying power to buy 1 share of ${ticker}.

Please deposit $${total} to purchase ${shares} share${addPlural} at market price (5% collar included).

Market orders on ESX are placed as limit orders up to 5% above the market price in order to protect customers from spending more than they have in their ESX account.`
}

const notValid = () => {
  return `Error
  Please enter a valid number of shares.`
}

const reviewOrderText = `The quote you see may not be the price at which your order is executed.`

const BuySellWidget = ({
  marketPrice,
  ticker,
  orderType,
  funds,
  createOrder,
}) => {
  const [shares, setShares] = useState('')
  const [quote, setQuote] = useState('')
  const [sharesPurchased, setSharesPurchased] = useState(0)
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0)
  const [activeStep, setActiveStep] = React.useState('initial')
  const classes = useStyles()
  useEffect(() => {
    console.log('activeStep', activeStep)
  }, [activeStep])
  const submitOrder = async () => {
    // Todo check if funds available at current market
    // If not, put message that market price has changed, currently insuffiecient funds
    if (!shares) return
    const price = parseFloat(marketPrice)
    const order = {
      side: orderType,
      type: 'market',
      price,
      quantity: shares,
    }

    await createOrder(order)
    setSharesPurchased(shares)
    setTotalPurchasePrice((price * shares).toFixed(2))
    setShares(0)
    setQuote('')
    setActiveStep('success')
  }

  const reviewOrder = () => {
    // Todo check if funds available - else error
    if (!shares) return //need total funds if market order

    setQuote(marketPrice)
    setActiveStep('review')
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
      setShares(parseInt(value))
    }
  }

  const handleOrder = () => {
    if (activeStep === 'review') {
      submitOrder()
    } else if (activeStep === 'initial') {
      reviewOrder()
    }
  }

  // if there is a 'quote' we are in 'Review Mode'
  const price = quote ? quote : marketPrice
  const estimatedCost = (shares * price).toFixed(2)
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item xs>
          <Typography variant="h5">Buy {ticker}</Typography>
        </Grid>

        {activeStep === 'initial' && (
          <>
            <Grid item xs container justify="space-between" alignItems="center">
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
                  // disable input if we are in review mode or showing successful order message
                  // disabled={activeStep !== 'initial'}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Market Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>${marketPrice}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Estimated Cost</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>${estimatedCost}</Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
        {activeStep === 'review' && (
          <>
            <Grid item xs container justify="space-between" alignItems="center">
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
                  // disable input if we are in review mode or showing successful order message
                  // disabled={activeStep !== 'initial'}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Quote Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>${quote}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Estimated Cost</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>${estimatedCost}</Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
        {/* show buy or review button if not showing successful order message */}
        {activeStep === 'initial' && (
          <Grid item xs>
            <Button
              className={classes.reviewButton}
              fullWidth
              onClick={() => handleOrder()}
            >
              <Typography variant="body2" className={classes.reviewButtonText}>
                {'Review Order'}
              </Typography>
            </Button>
          </Grid>
        )}
        {activeStep === 'review' && (
          <>
            <Grid item xs>
              <Typography id="info" variant="subtitle2">
                <ErrorIcon fontSize="inherit" /> {reviewOrderText}
              </Typography>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.reviewButton}
                fullWidth
                onClick={() => handleOrder()}
              >
                <Typography
                  variant="body2"
                  className={classes.reviewButtonText}
                >
                  {`Buy $${estimatedCost}`}
                </Typography>
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.backButton}
                fullWidth
                onClick={() => setActiveStep('initial')}
              >
                <Typography variant="body2" className={classes.backButtonText}>
                  Back
                </Typography>
              </Button>
            </Grid>
          </>
        )}
        {activeStep === 'success' && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                You have successfully purchased {sharesPurchased} shares of{' '}
                {ticker} for ${totalPurchasePrice}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.backButton}
                fullWidth
                onClick={() => setActiveStep('initial')}
              >
                <Typography variant="body2" className={classes.backButtonText}>
                  Back
                </Typography>
              </Button>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography>${funds.toFixed(2)} Buying Power Available</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget
