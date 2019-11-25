import { useState, useEffect } from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Grid, Typography, Box, Card, CardContent } from '@material-ui/core'

const truncate = input =>
  Array.from(input).length > 110 ? `${Array.from(input).slice(0,110).join('')}...` : input

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

const analystSummary = [
  {
    title: 'Buy Summary',
    text:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat. ',
  },
  {
    title: 'Hold Summary',
    text:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
  },
  {
    title: 'Sell Summary',
    text:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
  },
]

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main,
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
              // TODO: Figure out how to fix this with themes
              // const color = data.type === 'Buy' ? 'secondary' : 'inherit'
              const color = 'secondary'
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
                          value={parseInt(data.rating)}
                        />
                      ) : (
                        <BorderLinearProgressWhite
                          className={classes.margin}
                          variant="determinate"
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
      <Box mt={4}>
        <Grid container spacing={2} direction="row">
          {analystSummary.map((summary, i) => {
            return (
              <Grid item key={i} xs={12} sm={2} md={4}>
                <Card
                  style={{
                    height: '200px',
                  }}
                >
                  <CardContent>
                    <Typography
                      component="div"
                      variant="subtitle1"
                      gutterBottom
                    >
                      <Box fontWeight="fontWeightBold" mb={2}>
                        {summary.title}
                      </Box>
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="textPrimary"
                    >
                      <Box
                        style={{
                          color: 'grey',
                        }}
                        mb={2}
                        textOverflow="ellipsis"
                        component="div"
                      >
                        {truncate(summary.text)}
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default AnalystSection
