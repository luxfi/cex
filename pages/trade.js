import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import React from 'react'

import { TradeView } from '../components/trade'
import { googlePageView } from '../util/generic'

@inject('store')
@observer
class Trade extends React.Component {
  componentDidMount() {
    const { store, router } = this.props
    const { slug } = router.query
    const { uiStore } = store

    if (uiStore.trading === 'pro') {
      Router.replace(`/pro/${slug}`)
    } else {
      googlePageView()
    }
  }

  render() {
    return <TradeView socket={this.socket} />
  }
}

export default withRouter(Trade)
