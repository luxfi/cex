import App, { Container } from 'next/app';
import React from 'react'
import { Provider } from 'mobx-react'

import initializeStore from '../stores/stores'

// NEW ***********
import Router from 'next/router'
import { MuiPickersUtilsProvider } from 'react-referential-forms'
import RefProvider from 'react-referential'
import BalanceProvider from '../src/balances'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import Loader, { startLoading, stopLoading } from '../components/app/loader'

import MomentUtils from '@date-io/moment'
import { loadLibrary } from '../src/library'
import Api from '../src/hanzo/api'
import { HANZO_KEY, HANZO_ENDPOINT } from '../src/settings.js'

import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// import 'reeeset/src/reeeset.css'
// import '../styles.styl'

// ****************

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: 'rgba(29,226,160,0.7)',
    },
    background: {
      paper: '#1e2748',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: 'transparent',
        color: 'white',
      },
      outlined: {
        border: "1px solid white"
      }
    }
  }
})

const HANZO_PAGES = ['signup', 'login', 'account', 'invest', 'portfolio2']

const isHanzoPage = (page) => {
  let hanzoPage = false
  HANZO_PAGES.forEach(p => {
    if (page.toLowerCase().indexOf(p) > -1) hanzoPage = true
  })
  return hanzoPage
}

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store (nextJS DOCS)
    //

    const { route } = appContext.router
    console.log('On route', route)
    const isServer = typeof window === 'undefined'
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore

    let pageProps = {}
    const hanzoPage = isHanzoPage(route)

    if (hanzoPage) {
      console.log('On a Hanzo page!', route)
      const { Component, ctx } = appContext

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    } else {
      console.log('Not a Hanzo page')

      // calls page's `getInitialProps` and fills `appProps.pageProps`
      const appProps = await App.getInitialProps(appContext)
      pageProps = appProps.pageProps
    }

    return {
      pageProps,
      isServer,
      initialMobxState: mobxStore,
      isHanzoPage: hanzoPage
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  componentDidMount() {
    if (typeof window != 'undefined' && this.props.isHanzoPage) {
      startLoading()

      let api = new Api(HANZO_KEY, HANZO_ENDPOINT)

      loadLibrary(api.client).then(() => {
        stopLoading()
      }).catch((err) => {
        console.log('library loading error', err)
        stopLoading()
      })
    } else {
      stopLoading()
    }
  }

  render() {
    const { Component, pageProps, isHanzoPage } = this.props

    if (isHanzoPage) {
      return pug`
        Container
          MuiThemeProvider(theme=theme)
            MuiPickersUtilsProvider(utils=MomentUtils)
              RefProvider
                BalanceProvider
                  Header
                  Component
                  Footer
                  Loader
      `
    }

    return (
      <Provider store={this.mobxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default MyMobxApp

Router.events.on('routeChangeStart', () => {
  startLoading(' ')
  setTimeout(() => {
    stopLoading()
  }, 3000)
})

Router.events.on('routeChangeComplete', () => {
  stopLoading()
})

Router.events.on('routeChangeError', () => {
  stopLoading()
})
