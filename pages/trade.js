import React from "react"

import { TradeView } from "../components/trade"
import { googlePageView } from '../util/generic'

class Trade extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <TradeView socket={this.socket} />
    )
  }
}

export default Trade