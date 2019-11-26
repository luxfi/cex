import { useState, useEffect } from 'react'
import { pluralize } from '../../../util/generic'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  Tabs,
  Tab,
  Popover,
  Divider,
} from '@material-ui/core'
import {
  Error as ErrorIcon,
  HelpOutline as HelpOutlineIcon,
} from '@material-ui/icons/'
import useStyles from './buySellWidget.style'
import { isStringInteger } from '../../../util/generic'
import {
  errorNotEnoughFunds,
  errorNotEnoughShares,
  validNumberOfShares,
  QUOTE_NOT_MARKET_WARNING,
} from './widgetMessages'
import { formatCurrency } from '../../../util/generic'

const useMarketPriceStyles = makeStyles(theme => ({
  container: {
    width: '291px',
  },
  divider: {
    marginLeft: '12px',
    marginRight: '12px',
  },
}))

const MarketPrice = ({ ticker, book }) => {
  const classes = useMarketPriceStyles()

  let highestBid = 0
  let lowestAsk = 0
  if (book.orderBook) {
    const bids = book.orderBook.bids
    const asks = book.orderBook.asks
    highestBid = bids[0][0]
    lowestAsk = asks[asks.length - 1][0]
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'market-price' : undefined
  return (
    <>
      <Typography
        color="secondary"
        component="span"
        aria-describedby={id}
        onClick={handleClick}
      >
        Market Price <HelpOutlineIcon fontSize="inherit" />
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} className={classes.container}>
          <Grid
            container
            direction="column"
            justify="space-between"
            spacing={3}
          >
            <Grid item xs>
              <Box mt={2} mb={2}>
                <Typography component="p" variant="body2" gutterBottom>
                  <Box mb={2} component="span">
                    The consolidated real-time market data for {ticker} across
                    all US stock exchanges is:
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Divider />
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Last Sale</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>{formatCurrency(book.lastPrice)}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Bid</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>{formatCurrency(highestBid)}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid item xs container justify="space-between">
              <Grid item xs={6}>
                <Typography>Ask</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign="right">
                  <Typography>{formatCurrency(lowestAsk)}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid item xs>
              <Box mt={2} mb={2}>
                <Typography component="p" variant="caption" gutterBottom>
                  <Box mb={2} component="span">
                    The market price on the previous screen may be different
                    because it represents the last trade reported on the
                    exchange. Learn more about market data on our help center.
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </>
  )
}

const BuySellWidget = ({
  marketPrice,
  ticker,
  createOrder,
  redirectLogin,
  movieCategories,
  accountBalance,
  maxSell,
  book,
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

  const insufficientFunds = totalCost => {
    if (parseFloat(totalCost) > parseFloat(accountBalance)) {
      const message = errorNotEnoughFunds(totalCost, shares, ticker)
      setErrorMessage(message)
      return true
    }
    return false
  }

  const sharesNotValid = () => {
    if (!shares) {
      const message = validNumberOfShares()
      setErrorMessage(message)
      return true
    }
    return false
  }

  const notEnoughShares = () => {
    if (shares > maxSell) {
      const message = errorNotEnoughShares(maxSell, ticker)
      setErrorMessage(message)
      return true
    }
    return false
  }

  const submitOrder = async () => {
    if (sharesNotValid()) return
    const price = parseFloat(marketPrice)
    const totalCost = (price * shares).toFixed(2)
    if (orderType === 'bid') {
      if (insufficientFunds(totalCost)) return
    } else {
      if (notEnoughShares()) return
    }
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
    if (sharesNotValid()) return
    const price = parseFloat(marketPrice)
    const totalCost = (price * shares).toFixed(2)
    if (orderType === 'bid') {
      if (insufficientFunds(totalCost)) return
    } else {
      if (notEnoughShares()) return
    }
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
    <Paper
      className={classes.paper}
      style={{ paddingLeft: '12px', paddingRight: '12px' }}
    >
      <Grid
        container
        direction="column"
        justify="space-between"
        spacing={3}
        style={{ marginTop: '-15px' }}
      >
        {/* <Grid item xs>
          <Typography variant="h5" component="div">
            <Box fontWeight="fontWeightBold">BUY {ticker}</Box>
          </Typography>
        </Grid> */}
        <Grid item xs style={{ padding: '0px' }}>
          <Tabs
            value={mode}
            onChange={handleModeChange}
            className={classes.tabs}
          >
            <Tab label="Buy" className={classes.tab} />
            <Tab label="Sell" className={classes.tab} />
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
                <MarketPrice ticker={ticker} book={book} />
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
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                <Box component="span" mr={0.5}>
                  <ErrorIcon fontSize="inherit" />
                </Box>
                <Box component="span" fontWeight="fontWeightBold">
                  {errorMessage.title}
                </Box>
              </Typography>
              {errorMessage.body.map((text, i) => (
                <Typography key={i} component="p" variant="body2" gutterBottom>
                  <Box mb={2} component="span">
                    {text}
                  </Box>
                </Typography>
              ))}
            </Box>
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
            {orderType === 'bid' ? (
              <>
                ${parseFloat(accountBalance).toFixed(2)} Buying Power Available{' '}
                <HelpOutlineIcon fontSize="inherit" />
              </>
            ) : (
              <>
                You currently own {maxSell} {pluralize(maxSell, 'share')}
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BuySellWidget
