import App, { Container } from 'next/app';
import React from 'react'
import { Provider } from 'mobx-react'

import initializeStore from '../stores/stores';

class MyMobxApp extends App {

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    // console.log('_app.js getInitialProps', appContext)
    const mobxStore = initializeStore()
    // console.log('_app.js mobxStore', mobxStore)
    appContext.ctx.mobxStore = mobxStore
    const appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
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
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    )
  }
}
export default MyMobxApp
