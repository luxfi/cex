import { useState } from 'react'
import useStyles from './rewardsCard.style'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import { common } from '@material-ui/core/colors'
import { useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  InputBase,
  Tabs,
  Tab,
  Popover,
  Divider,
} from '@material-ui/core'
import { isStringInteger, formatCurrency } from '../../../util/generic'

const RewardsCard = ({
  reward,
  marketPrice,
  ticker,
  createOrder,
  redirectLogin,
  movieCategories,
  accountBalance,
  maxSell,
  book,
}) => {
  const classes = useStyles()
  const minimumInvestment = 50
  const [investmentAmount, setInvestmentAmount] = useState('')

  const handleSubmit = async () => {
    checkIfLoggedIn()
    const sufficientFunds = investmentAmount <= funds
    if (sufficientFunds) {
      await addOfferingInvestment(
        investmentAmount,
        () => {
          setSuccessMessage('Your investment was successul')
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

  const { amount, description, investorsAmount, estimatedDelivery } = reward
  const theme = useTheme()
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="space-between"
        spacing={2}
        style={{ marginTop: '-15px' }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">
            <Box mt={1} fontWeight="fontWeightBold">
              Invest {formatCurrency(amount).slice(0, -3)}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {description.map((p, i) => (
            <Typography
              key={i}
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
            >
              <Box mb={2}>{p}</Box>
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" mb={1} alignItems="center">
            <AccessibilityNewIcon
              style={{ color: common.white, marginRight: theme.spacing(1) }}
            />
            <Typography variant="h6" component="span">
              {investorsAmount}
            </Typography>
            <Typography variant="h6" component="span" color="textSecondary">
              Investors
            </Typography>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item container xs={12} spacing={1}>
          <Box mt={2} alignItems="center">
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                component="span"
                color="textSecondary"
              >
                Amount:
              </Typography>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                adornedStart: classes.adornedStart,
              }}
              required
              id="investmentAmount"
              name="investmentAmount"
              fullWidth
              placeholder="$"
              onChange={evt => handleInputChange(evt)}
              value={investmentAmount}
              variant="filled"
              inputProps={{
                style: {
                  textAlign: 'left',
                },
              }}
            />
          </Grid>
          <Grid item xs>
            <Button
              size="large"
              fullWidth
              classes={{
                root: classes.investButton,
              }}
            >
              <Typography
                variant="subtitle2"
                className={classes.investButtonText}
              >
                Invest
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography
                variant="subtitle2"
                component="span"
                color="textSecondary"
              >
                Estimated Delivery: {estimatedDelivery}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RewardsCard
