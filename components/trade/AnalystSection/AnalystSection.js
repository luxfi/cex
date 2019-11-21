import { useState, useEffect } from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Grid, Typography, Box, Divider } from '@material-ui/core'

const analystRatings = [
  {
    type: 'Buy',
    rating: '51',
  },
  {
    type: 'Hold',
    rating: '37',
  },
  {
    type: 'Sell',
    rating: '12',
  },
]

const hello = makeStyles(theme => {
  console.log('theme', theme)
  return {}
})

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 20,
  },
}))(LinearProgress)

const BorderLinearProgressWhite = withStyles(theme => ({
  root: {
    height: 10,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
}))(LinearProgress)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const AnalystSection = ({}) => {
  const classes = useStyles()
  const c = hello()
  return (
    <Box mb={4.5} mt={6.5}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={2}>
          ANALYST RATINGS
        </Box>
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Typography component="div" variant="h2">
            <Box fontWeight="fontWeightBold" mt={1.5}>
              51%
            </Box>
          </Typography>
          <Typography component="div" variant="subtitle2">
            <Box fontWeight="fontWeightBold">of 43 ratings</Box>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={0}>
            {analystRatings.map((data, i) => {
              const color = data.type === 'Buy' ? 'secondary' : 'inherit'
              return (
                <Grid item key={i} xs={12}>
                  <Box display="flex">
                    <Box p={1}>
                      <Typography
                        component="div"
                        display="inline"
                        color={color}
                      >
                        <Box
                          fontWeight="fontWeightBold"
                          style={{ width: '32px' }}
                        >
                          {data.type}
                        </Box>
                      </Typography>
                    </Box>
                    <Box p={1} flexGrow={1}>
                      {data.type === 'Buy' ? (
                        <BorderLinearProgress
                          className={classes.margin}
                          variant="determinate"
                          color={color}
                          value={parseInt(data.rating)}
                        />
                      ) : (
                        <BorderLinearProgressWhite
                          className={classes.margin}
                          variant="determinate"
                          color={color}
                          value={parseInt(data.rating)}
                        />
                      )}
                    </Box>
                    <Box p={1}>
                      <Typography
                        component="div"
                        align="right"
                        display="inline"
                        color={color}
                      >
                        <Box fontWeight="fontWeightBold">{data.rating}%</Box>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AnalystSection
