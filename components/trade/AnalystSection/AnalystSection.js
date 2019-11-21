import { useState, useEffect } from 'react'
import { Grid, Typography, Box, Divider } from '@material-ui/core'

const historyData = [
  {
    type: 'Market Sell',
    date: 'Nov 20, 2019',
    total: '18000',
    shares: '99',
    price: '187.00',
  },
  {
    type: 'Market Buy',
    date: 'Nov 20, 2019',
    total: '108',
    shares: '2',
    price: '54.00',
  },
  {
    type: 'Market Sell',
    date: 'Nov 20, 2019',
    total: '186.44',
    shares: '1',
    price: '186.44',
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

const HistorySection = ({ book }) => {
  return (
    <Box mb={4.5} mt={6.5}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={2}>
          ANALYST RATINGS
        </Box>
      </Typography>
      <Grid justify="flex-start" container spacing={4}>
        {historyData.map((data, i) => (
          <Grid item key={i} xs={12}>
            <Box mb={2}>
              <Grid container justify="space-between">
                <Grid item xs={6} lg={3} md={3} sm={4}>
                  <Typography component="div">
                    <Box fontWeight="fontWeightBold">{data.type}</Box>
                  </Typography>
                  <Typography>{data.date}</Typography>
                </Grid>
                <Grid item xs={6} lg={3} md={3} sm={4}>
                  <Typography component="div" align="right">
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
            {historyData.length - 1 !== i && <Divider />}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HistorySection
