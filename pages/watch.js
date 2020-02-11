import React from 'react'
import io from 'socket.io-client'

import WatchView from '../components/watch'
import { googlePageView } from '../util'

class Watch extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <WatchView />
    )
  }
}

export default Watch;
