import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'

import { TradeView } from '../components/trade'
import { googlePageView, slugFromPath } from '../util'

@withRouter
@inject('store')
@observer
export default class extends React.Component {
  componentDidMount() {
    const { store, router } = this.props
    const slug = router.query.slug || slugFromPath()
    const { uiStore } = store

    if (false && uiStore.trading === 'pro') {
      Router.replace(`/pro/${slug}`)
    } 
    else {
      googlePageView()
    }
  }

  render() {
    return <TradeView socket={this.socket} />
  }
}
