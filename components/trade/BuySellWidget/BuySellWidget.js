import {useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
} from '@material-ui/core'

const BuySellWidget = ({ classes, marketPrice, movieTicker }) => {
  const [shares, setShares] = useState(0)
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h5">Buy SAW9</Typography>
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