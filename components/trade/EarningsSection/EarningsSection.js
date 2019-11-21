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

import { Typography, Box } from '@material-ui/core'

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
    earnings: 2.83,
  },
  {
    financialQuarter: 5,
    earnings: 2.83,
  },
  {
    financialQuarter: 6,
    earnings: 2.83,
  },
  {
    financialQuarter: 7,
    earnings: 2.03,
  },
  {
    financialQuarter: 8,
    earnings: 3.23,
  },
]

const actualData = [
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
    earnings: 3.49,
  },
  {
    financialQuarter: 5,
    earnings: 3.49,
  },
  {
    financialQuarter: 6,
    earnings: 2.89,
  },
  {
    financialQuarter: 7,
    earnings: 2.39,
  },
  {
    financialQuarter: 8,
    earnings: 3.28,
  },
]

const finacialQuarters = [
  {
    finacialQuarter: 'Q1 2018',
  },
  {
    finacialQuarter: 'Q2 2018',
  },
  {
    finacialQuarter: 'Q3 2018',
  },
  {
    finacialQuarter: 'Q4 2018',
  },
  {
    finacialQuarter: 'Q1 2019',
  },
  {
    finacialQuarter: 'Q2 2019',
  },
  {
    finacialQuarter: 'Q3 2019',
  },
  {
    finacialQuarter: 'Q4 2019',
  },
]

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
        >
          {}
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
          Earnings
        </Box>
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          // width={400}
          // height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
        >
          <XAxis
            type="number"
            dataKey={'financialQuarter'}
            axisLine={false}
            tickLine={false}
            tick={<CustomizedAxisTick />}
            minTickGap={1}
          />
          <YAxis
            type="number"
            dataKey={'earnings'}
            axisLine={false}
            domain={[1.9, 3.78]}
            tickLine={false}
            tick={<CustomizedAxisTick />}
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
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default EarningsSection
