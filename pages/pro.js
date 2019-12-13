import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import React from 'react'

import { ProTradeView } from '../components/trade'
import { googlePageView } from '../util/generic'

@inject('store')
@observer
class ProTrade extends React.Component {
  componentDidMount() {
    const { store, router } = this.props
    const { slug } = router.query
    const { uiStore } = store

    if (uiStore.trading === 'basic') {
      Router.replace(`/trade/${slug}`)
    } else {
      googlePageView()
    }
  }

  render() {
    return <ProTradeView socket={this.socket} />
  }
}

export default withRouter(ProTrade)
