import React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import io from 'socket.io-client'

import { TradeView } from "../components/trade"
import { googlePageView } from '../util/generic'

class Trade extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    const { darkTheme } = this.props
    return (
      <MuiThemeProvider theme={darkTheme}>
        <TradeView socket={this.socket} />
      </MuiThemeProvider>
    )
  }
}

export default Trade
