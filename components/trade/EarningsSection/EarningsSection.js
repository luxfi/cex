import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import React, { PureComponent } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

function LightCircle(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="rgba(250, 195, 77, 0.5)"
        width="19.544100476116796"
        height="19.544100476116796"
        transform="translate(9.772, 9.772)"
        d="M9.772050238058398,0A9.772050238058398,9.772050238058398,0,1,1,-9.772050238058398,0A9.772050238058398,9.772050238058398,0,1,1,9.772050238058398,0"
      ></path>
    </SvgIcon>
  )
}

function Circle(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#FAC34D"
        width="19.544100476116796"
        height="19.544100476116796"
        transform="translate(9.772, 9.772)"
        d="M9.772050238058398,0A9.772050238058398,9.772050238058398,0,1,1,-9.772050238058398,0A9.772050238058398,9.772050238058398,0,1,1,9.772050238058398,0"
      ></path>
    </SvgIcon>
  )
}

import { Typography, Box, Grid, Icon } from '@material-ui/core'

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
]

const estimatedData = [
  {
    financialQuarter: 0,
    earnings: 3.23,
  },
  {
    financialQuarter: 1,
    earnings: 2.09,
  },
  {
    financialQuarter: 2,
    earnings: 2.49,
  },
  {
    financialQuarter: 3,
    earnings: 3.37,
  },
  {
    financialQuarter: 4,
    earnings: 3.23,
  },
  {
    financialQuarter: 5,
    earnings: 3.55,
  },
  {
    financialQuarter: 6,
    earnings: 2.83,
  },
]

const actualData = [
  {
    financialQuarter: 0,
    earnings: 3.28,
  },
  {
    financialQuarter: 1,
    earnings: 2.69,
  },
  {
    financialQuarter: 2,
    earnings: 2.59,
  },
  {
    financialQuarter: 3,
    earnings: 2.99,
  },
  {
    financialQuarter: 4,
    earnings: 3.21,
  },
  {
    financialQuarter: 5,
    earnings: 3.1,
  },
  {
    financialQuarter: 6,
    earnings: 2.89,
  },
]

const financialQuarters = [
  {
    financialQuarter: 'Q1 2018',
  },
  {
    financialQuarter: 'Q2 2018',
  },
  {
    financialQuarter: 'Q3 2018',
  },
  {
    financialQuarter: 'Q4 2018',
  },
  {
    financialQuarter: 'Q1 2019',
  },
  {
    financialQuarter: 'Q2 2019',
  },
  {
    financialQuarter: 'Q3 2019',
  },
]

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {}
        </text>
      </g>
    )
  }
}

class CustomizedXAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#fff"
          transform="translate(-25)"
        >
          {formatCurrency.format(payload.value)}
        </text>
      </g>
    )
  }
}

const EarningsSection = () => {
  return (
    <Box mt={6} mb={6.5}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={2}>
          EARNINGS
        </Box>
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          // width={400}
          // height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis
            type="number"
            dataKey={'financialQuarter'}
            axisLine={false}
            tickLine={false}
            tick={<CustomizedAxisTick />}
            minTickGap={1}
            domain={[0, 6]}
          />
          <YAxis
            type="number"
            dataKey={'earnings'}
            axisLine={false}
            domain={[1.9, 3.78]}
            tickLine={false}
            tick={<CustomizedXAxisTick />}
          />
          {/* <Legend /> */}
          <ZAxis range={[300]} />
          <Scatter
            name="Estimated Earnings"
            data={estimatedData}
            fill="#FAC34D"
          />
          <Scatter
            name="Actual Earnings"
            data={actualData}
            fill="rgba(250, 195, 77, 0.5)"
          />
          {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
        </ScatterChart>
      </ResponsiveContainer>
      <Grid
        container
        justify="space-between"
        style={{
          marginLeft: '3.5vw',
          paddingRight: '2.5vw',
        }}
      >
        {financialQuarters.map((data, i) => (
          <Grid key={i} item xs={1}>
            <Typography component="div">
              <Box fontWeight="fontWeightBold">{data.financialQuarter}</Box>
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Grid
          container
          justify="flex-start"
          style={{
            marginLeft: '3.5vw',
            paddingRight: '2.5vw',
          }}
          spacing={3}
        >
          <Grid item xs={3}>
            <Grid container direction="row" alignItems="left" spacing={1}>
              <Grid item>
                <Box mt={0.5}>
                  <LightCircle />
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold">Estimated</Box>
                </Typography>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold">$2.83 per share</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="row" alignItems="left" spacing={1}>
              <Grid item>
                <Box mt={0.5}>
                  <Circle />
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold">Actual</Box>
                </Typography>
                <Typography component="div">
                  <Box fontWeight="fontWeightBold">$3.03 per share</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default EarningsSection
