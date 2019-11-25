import React from 'react'

import { ProTradeView } from '../components/trade'
import { googlePageView } from '../util/generic'

class Trade extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return <ProTradeView socket={this.socket} />
  }
}

export default Trade
