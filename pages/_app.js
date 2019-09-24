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
import CssBaseline from '@material-ui/core/CssBaseline';

// import 'reeeset/src/reeeset.css'
// import '../styles.styl'

// ****************

const theme = createMuiTheme({
  palette: {
    type: 'light',
    // primary: {
    //   main: blue[500],
    // },
    // secondary: {
    //   main: 'rgba(29,226,160,0.7)',
    // },
    // background: {
    //   paper: '#1e2748',
    // },
  },
  overrides: {
    MuiButton: {
      // root: {
      //   backgroundColor: 'transparent',
      //   color: 'white',
      //   fontSize: '12px'
      // },
      // outlined: {
      //   border: "1px solid white"
      // }
    }
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif"
  }
})

const HANZO_PAGES = ['signup', 'login', 'account', 'invest', 'portfolio2']

const checkHanzoPage = (page) => {
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
    const isServer = typeof window === 'undefined'
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore

    let pageProps = {}
    const hanzoPage = checkHanzoPage(route)

    const appProps = await App.getInitialProps(appContext)
    pageProps = appProps.pageProps

    return {
      pageProps,
      isServer,
      initialMobxState: mobxStore,
      hanzoPage
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && this.props.hanzoPage) {
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
    const { Component, pageProps, hanzoPage, isServer } = this.props

    // if (isHanzoPage) {
    // return pug`
    //   Container
    //     Provider(store=this.mobxStore)
    //       MuiThemeProvider(theme=theme)
    //         MuiPickersUtilsProvider(utils=MomentUtils)
    //           RefProvider
    //             BalanceProvider
    //               Header
    //               Component(...pageProps)
    //               Footer
    //               Loader
    // `
    // }

    // return (
    //   <Provider store={this.mobxStore}>
    //     <Component {...pageProps} />
    //   </Provider>
    // )

    const localRoute = typeof window !== 'undefined' ? window.location.href : 'no window'
    let isHanzoPage = hanzoPage
    // Hail Mary
    if (!isServer) {
      isHanzoPage = checkHanzoPage(localRoute)
    }
    console.log('Rendering _app with isHanzoPage', isHanzoPage, localRoute)

    return (
      <>
        <CssBaseline />
        <Container>
          <Provider store={this.mobxStore}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <RefProvider>
                  <BalanceProvider>
                    {isHanzoPage && <Header />}
                    <Component {...pageProps} />
                    {isHanzoPage && <Loader />}
                  </BalanceProvider>
                </RefProvider>
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </Provider>
        </Container>
        {/* The rest of your application */}
      </>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

// Router.events.on('routeChangeStart', (r) => {
//   const isHanzo = checkHanzoPage(r)
//   console.log('Starting route change', r, isHanzo)
//   if (isHanzo) {
//     startLoading(' ')
//     setTimeout(() => {
//       stopLoading()
//     }, 3000)
//   }
// })

// Router.events.on('routeChangeComplete', (r) => {
//   const isHanzo = checkHanzoPage(r)
//   console.log('Route change complete', r, isHanzo)
//   if (isHanzo) {
//     stopLoading()
//   }
// })

// Router.events.on('routeChangeError', (err, r) => {
//   console.log('Route change error', err, r)
//   stopLoading()
// })

export default MyMobxApp
