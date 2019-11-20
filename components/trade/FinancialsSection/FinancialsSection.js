import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Box,
} from '@material-ui/core'

const financialMetrics = [
  {
    name: 'Market Cap',
    value: '1.17T',
  },
  {
    name: 'Price-Earnings Ratio ',
    value: '22.12',
  },
  {
    name: 'Dividend Yield',
    value: '1.37',
  },
  {
    name: 'Average Volume',
    value: '26.15M',
  },
  {
    name: 'High Today',
    value: '$263.79',
  },
  {
    name: 'Low Today',
    value: '$260.93',
  },
  {
    name: 'Open Price',
    value: '$261.64',
  },
  {
    name: 'Volume',
    value: '26.15M',
  },
  {
    name: '52 Week High',
    value: '$262.76',
  },
  {
    name: '52 Week Low',
    value: '$140.00',
  },
]

const FinancialsSection = ({}) => {
  return (
    <Box mb={3} mt={3}>
      <Grid justify="flex-start" container spacing={4}>
        {financialMetrics.map((metric, i) => (
          <Grid key={i} item xs={6} lg={3} md={3} sm={4}>
            <Box fontWeight="fontWeightBold">
              <Typography>{metric.name}</Typography>
            </Box>
            <Typography>{metric.value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FinancialsSection