import React from 'react'

import { OfferingView } from '../components/offering'
import { googlePageView } from '../util/generic'

class Trade extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return <OfferingView />
  }
}

export default Trade
