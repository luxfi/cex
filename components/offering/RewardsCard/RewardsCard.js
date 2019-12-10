import { useState } from 'react'
import useStyles from './rewardsCard.style'
import { fade } from '@material-ui/core/styles'
import { AccessibilityNew, HelpOutline } from '@material-ui/icons'
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

  const {
    amount,
    description,
    investorsAmount,
    estimatedDelivery,
    disabled,
  } = reward
  const theme = useTheme()
  const style = disabled ? { opacity: 0.5 } : {}
  const paperStyle = disabled
    ? { backgroundColor: fade(theme.palette.background.paper, 0.5) }
    : {}

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'disabled' : undefined
  return (
    <Paper className={classes.paper} style={paperStyle}>
      <Grid
        container
        direction="column"
        justify="space-between"
        spacing={2}
        style={({ marginTop: '-15px' }, { ...style })}
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
            <AccessibilityNew
              style={{ color: common.white, marginRight: theme.spacing(1) }}
            />
            <Typography variant="h6" component="span">
              {investorsAmount}
            </Typography>
            <Box pl={0.5}>
              <Typography variant="h6" component="span" color="textSecondary">
                Investors
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        {!disabled && (
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
        )}
      </Grid>
      {disabled && (
        <Grid container direction="column" justify="space-between" spacing={2}>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Box
                mt={2}
                style={{
                  opacity: 0.5,
                }}
              >
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    adornedStart: classes.adornedStart,
                  }}
                  disable="true"
                  id="investmentAmount"
                  name="investmentAmount"
                  fullWidth
                  value={'Investment Option No Longer Available'}
                  variant="filled"
                  inputProps={{
                    style: {
                      textAlign: 'left',
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Typography
                color="secondary"
                component="span"
                aria-describedby={id}
                onClick={handleClick}
                gutterBottom
              >
                Why is this option no longer available?{' '}
                <HelpOutline fontSize="inherit" />
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam:
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Popover>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}

export default RewardsCard
