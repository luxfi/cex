import React from 'react'

import { PickSeatsView } from '../components/checkout'

class PickSeats extends React.Component {
  render() {
    return (
      <PickSeatsView socket={this.socket} />
    )
  }
}

export default PickSeats
