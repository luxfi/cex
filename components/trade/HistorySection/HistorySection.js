import { useState, useEffect } from 'react'
import { Grid, Typography, Box, Divider } from '@material-ui/core'
import { pluralize } from '../../../util/generic'
import moment from 'moment-timezone'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

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

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})


const formatType = (type, side) => {
  const orderType = side === 'bid' ? 'Buy' : 'Sell'
  return `${capitalize(type)} ${orderType}`
}

const formatDate = date => {
  return moment(date).format('LL')
}

const formatTotal = (price, quantity) => {
  return (price * quantity).toFixed(2)
}


const formatTransaction = transaction => {
  // incoming data
  // date: 'November 26, 2019 10:45 AM'
  // price: 126.44
  // quantity: 1
  // side: 'bid'
  // type: 'market'

  // desired formatted data
  // type: 'Market Sell',
  // date: 'Nov 20, 2019',
  // total: '186.44',
  // shares: '1',
  // price: '186.44',

  const { type, side, date, quantity, price } = transaction
  const formattedType = formatType(type, side)
  const formattedDate = formatDate(date)
  const formattedTotal = formatTotal(price, quantity)
  return {
    type: formattedType,
    date: formattedDate,
    total: formattedTotal,
    shares: quantity,
    price: price.toFixed(2)
  }
}

const formatHistory = history => history.map(t => formatTransaction(t))

const HistorySection = ({ investmentHistory, ticker }) => {
  const historyData = investmentHistory
    ? formatHistory(investmentHistory)
    : null
  return (
    <Box mb={4.5} mt={6.5}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={2}>
          HISTORY
        </Box>
      </Typography>
      <Grid justify="flex-start" container spacing={4}>
        {!investmentHistory ? (
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography component="div" variant="subtitle2" gutterBottom>
                <Box fontWeight="fontWeightBold" mb={2}>
                  You currently own 0 shares of {ticker}
                </Box>
              </Typography>
            </Box>
          </Grid>
        ) : (
          historyData.slice(0,5).map((data, i) => (
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
          ))
        )}
      </Grid>
    </Box>
  )
}

export default HistorySection
