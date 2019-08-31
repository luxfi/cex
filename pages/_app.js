import App from 'next/app';
import React from 'react'
import { Provider } from 'mobx-react'

import initializeStore from '../stores/stores';

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store (nextJS DOCS)
    //

    const isServer = typeof window === 'undefined'
    const mobxStore = initializeStore(isServer)
    appContext.ctx.mobxStore = mobxStore

    const appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      isServer,
      initialMobxState: mobxStore,
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider {...this.mobxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}
export default MyMobxApp
