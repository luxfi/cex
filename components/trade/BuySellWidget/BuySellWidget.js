import { useState, useEffect } from 'react'
import Router from 'next/router'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  Tabs,
  Tab,
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import useStyles from './buySellWidget.style'
import { isStringInteger } from '../../../util/generic'
import {
  errorNotEnoughFunds,
  VALID_SHARES_ERROR,
  QUOTE_NOT_MARKET_WARNING,
} from './widgetMessages'

const BuySellWidget = ({
  marketPrice,
  ticker,
  createOrder,
  redirectLogin,
  movieCategories,
  accountBalance
}) => {
  const [mode, setMode] = useState(0)
  const [orderType, setOrderType] = useState('bid')
  const [shares, setShares] = useState('')
  const [quote, setQuote] = useState('')
  const [sharesPurchased, setSharesPurchased] = useState('')
  const [totalPurchasePrice, setTotalPurchasePrice] = useState('')
  const [activeStep, setActiveStep] = React.useState('initial')
  const [errorMessage, setErrorMessage] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    mode === 0 ? setOrderType('bid') : setOrderType('ask')
  }, [mode])

  const insufficientFunds = (totalCost) => {
    if (totalCost > accountBalance) {
      const message = errorNotEnoughFunds(totalCost, shares, ticker)
      setErrorMessage(message)
      return true
    }
    return false
  }

  const submitOrder = async () => {
    if (!shares) return
    const price = parseFloat(marketPrice)
    const totalCost = price * shares
    if (insufficientFunds(totalCost)) return
    const order = {
      side: orderType,
      type: 'market',
      price,
      quantity: shares,
      categories: movieCategories,
    }

    await createOrder(order)
    setSharesPurchased(shares)
    setTotalPurchasePrice(totalCost)
    setActiveStep('success')
    setShares(0)
    setQuote('')
    setErrorMessage(null)
  }

  const reviewOrder = () => {
    if (!shares) return
    const price = parseFloat(marketPrice)
    const totalCost = price * shares
    if (insufficientFunds(totalCost)) return
    setQuote(price)
    setActiveStep('review')
    setErrorMessage(null)
  }

  const handleInputChange = evt => {
    evt.preventDefault()
    const { value } = evt.target
    if (value === '') {
      setShares(value)
    }
    if (isStringInteger(value)) {
      setShares(parseInt(value))
    }
  }

  const handleOrder = () => {
    redirectLogin()
    if (activeStep === 'review') {
      submitOrder()
    } else if (activeStep === 'initial') {
      reviewOrder()
    }
  }

  const handleModeChange = (event, newValue) => {
    setMode(newValue)
  }

  // if there is a 'quote' we are in 'Review Mode'
  const price = quote ? quote : marketPrice
  const estimatedCost = (shares * price).toFixed(2)
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item xs>
          <Typography variant="h5" component="div">
            <Box fontWeight="fontWeightBold">{ticker}</Box>
          </Typography>
        </Grid>
        <Grid item xs>
          <Tabs value={mode} onChange={handleModeChange} variant="fullWidth">
            <Tab label="BUY" />
            <Tab label="SELL" />
          </Tabs>
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
                <Typography color="secondary">Market Price</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography> ${marketPrice}</Typography>
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
        {errorMessage && (
          <Grid item xs>
            <Typography>{errorMessage.title}</Typography>
            {errorMessage.body.map((text, i) => (
              <Typography component='p'>
                {text}
              </Typography>
            ))}
          </Grid>
        )}
        {activeStep === 'initial' && (
          <Grid item xs>
            <Button
              className={classes.reviewButton}
              fullWidth
              onClick={() => handleOrder()}
              classes={{
                label: classes.label,
              }}
            >
              <Typography
                variant="subtitle1"
                className={classes.reviewButtonText}
              >
                Review Order
              </Typography>
            </Button>
          </Grid>
        )}
        {activeStep === 'review' && (
          <>
            <Grid item xs>
              <Typography id="info" variant="subtitle2">
                <ErrorIcon fontSize="inherit" /> {QUOTE_NOT_MARKET_WARNING}
              </Typography>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.reviewButton}
                fullWidth
                onClick={() => handleOrder()}
                classes={{
                  label: classes.label,
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.reviewButtonText}
                >
                  {`${orderType === 'bid' ? 'Buy' : 'Sell'} $${estimatedCost}`}
                </Typography>
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.backButton}
                fullWidth
                onClick={() => setActiveStep('initial')}
                classes={{
                  label: classes.label,
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.backButtonText}
                >
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
                <div></div>
                You have successfully{' '}
                {orderType === 'bid' ? 'purchased' : 'sold'} {sharesPurchased}{' '}
                shares of {ticker} for ${totalPurchasePrice}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.backButton}
                fullWidth
                onClick={() => setActiveStep('initial')}
                classes={{
                  label: classes.label,
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.backButtonText}
                >
                  Back
                </Typography>
              </Button>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography color="secondary">
            ${parseFloat(accountBalance).toFixed(2)} Buying Power Available
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget
