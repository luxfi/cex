import { useState, useEffect } from 'react'
import { Grid, Typography, Box, Divider } from '@material-ui/core'

const historyData = [
  {
    type: 'Market Sell',
    date: 'June 21 2018',
    total: '18000',
    shares: '2',
    price: '39000',
  },
  {
    type: 'Market Sell',
    date: 'June 21 2018',
    total: '18000',
    shares: '2',
    price: '39000',
  },
  {
    type: 'Market Sell',
    date: 'June 21 2018',
    total: '18000',
    shares: '2',
    price: '39000',
  },
]

// pluralize(0, 'apple'); // 'apples'
// pluralize(1, 'apple'); // 'apple'
// pluralize(2, 'apple'); // 'apples'
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if (typeof val === 'object')
    return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const HistorySection = ({}) => {
  return (
    <Box mb={3} mt={3}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={2}>
          HISTORY
        </Box>
      </Typography>
      <Grid justify="flex-start" container spacing={4}>
        {historyData.map((data, i) => (
          <Grid item key={i} xs={12}>
            <Box mb={2}>
              <Grid container justify="space-between">
                <Grid item xs={6} lg={3} md={3} sm={4}>
                  <Typography>
                    <Box fontWeight="fontWeightBold">{data.type}</Box>
                  </Typography>
                  <Typography>{data.date}</Typography>
                </Grid>
                <Grid item xs={6} lg={3} md={3} sm={4}>
                  <Typography align="right">
                    <Box fontWeight="fontWeightBold">
                      {formatCurrency.format(data.total)}
                    </Box>
                  </Typography>
                  <Typography align="right">
                    {data.shares} {pluralize(data.shares, 'share')} at{' '}
                    {formatCurrency.format(data.price)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HistorySection
