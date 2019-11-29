import { Component, useState } from "react"
import Link from 'next/link'
import moment from 'moment-timezone'

// nodejs library that concatenates classes
import classNames from "classnames"
import ContentLoader from "react-content-loader"

// @material-ui/core components
import {
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"

import { Table } from "../../app"

import styles from "../../landing/InvestorTopPicks/InvestorTopPicks.style.js"

const MyLoader = (props) => {
  return (
    <ContentLoader
      height={props.h}
      width={props.w}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="3" ry="3" width={props.w} height={props.h} />
    </ContentLoader>
  )
}

const renderCurrency = (v) => '$' + parseFloat(v).toFixed(2)

const columns = [
  {
    title: 'Position',
    field: 'ticker',
  },
  {
    title: 'Last Price',
    render: (row) => renderCurrency(parseFloat(row.price))
  },
  {
    title: 'Current Value',
    render: (row) => renderCurrency((parseFloat(row.price) * parseFloat(row.quantity)).toFixed(2))
  },
  {
    title: 'P/L Day',
    render: (row) => row.plday ? 0 : (row.plday < 0 ? '-0' : '+0')
  },
  {
    title: 'P/L Open',
    render: (row) => row.plopen ? 0 : (row.plopen < 0 ? '-0' : '+0')
  },
  {
    title: 'Cost Basis',
    render: (row) => row.transactions ? renderCurrency(row.transactions.reduce((asc, transaction) => asc += parseFloat(transaction.price) * parseFloat(transaction.quantity), 0)) : 0
  },
]

const historyColumns = [
  {
    title: 'Date',
    render: (row) => row.date ? row.date : moment().format('LLL')
  },
  {
    title: 'Action',
    render: (row) => row.side == 'bid' ? 'BUY' : 'SELL'
  },
  {
    title: 'Fill Price',
    render: (row) => renderCurrency(parseFloat(row.price))
  },
  {
    title: 'Quantity',
    render: (row) => parseInt(row.quantity)
  },
]


class ActivePositions extends Component {
  state = {
    investmentIdx: 0,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { investments, findMovieByTicker, classes } = this.props
    // const imageClasses = classNames(classes.imgCardTop)

    const investment = investments[this.state.investmentIdx] || {
      transactions: []
    }

    return (
      <>
        <Typography className={classes.title} style={{ textAlign: "left" }} variant='h5'>
          Active Positions
        </Typography>
        <Table
          opts={{}}
          columns={columns}
          data={investments}
          title=''
        />
        <Typography className={classes.title} style={{ textAlign: "left" }} variant='h5'>
          Trade History
        </Typography>
        <Select
          value={this.state.investmentIdx}
          onChange={(v) => this.setState({investmentIdx: parseInt(v.target.value, 10)})}
        >{
          investments.map((investment, k) =>
            <MenuItem key={k} value={k}>{investment.ticker}</MenuItem>
          )
        }</Select>
        <br />
        <br />
        <Table
          opts={{}}
          columns={historyColumns}
          data={investment.transactions || []}
          title=''
        />
        <br />
        <br />
      </>
    )
  }
}

export default withStyles(styles)(ActivePositions)
