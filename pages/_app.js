import App, { Container } from "next/app"
import React from "react"
import { Provider } from "mobx-react"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// core components
import Header from "../components/layout/header"
import Footer from "../components/generic/Footer"

import initializeStore from "../stores/stores"

// NEW ***********
import Router from "next/router"
import { MuiPickersUtilsProvider } from "react-referential-forms"
import RefProvider from "react-referential"
import BalanceProvider from "../src/balances"
import Loader, { startLoading, stopLoading } from "../components/app/loader"

import MomentUtils from "@date-io/moment"
import { loadLibrary } from "../src/library"
import Api from "../src/hanzo/api"
import { HANZO_KEY, HANZO_ENDPOINT } from "../src/settings.js"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// ****************

const theme = createMuiTheme({
  palette: {
    type: "dark"
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

const HANZO_PAGES = ["signup", "login", "account", "invest", "portfolio2"]

const checkHanzoPage = page => {
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
    const isServer = typeof window === "undefined"
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
    const isServer = typeof window === "undefined"
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  componentDidMount() {
    if (typeof window !== "undefined" && this.props.hanzoPage) {
      startLoading()

      let api = new Api(HANZO_KEY, HANZO_ENDPOINT)

      loadLibrary(api.client)
        .then(() => {
          stopLoading()
        })
        .catch(err => {
          console.log("library loading error", err)
          stopLoading()
        })
    } else {
      stopLoading()
    }
  }

  render() {
    const { Component, pageProps, classes } = this.props

    return (
      <>
        <CssBaseline />
        <Container>
          <Provider store={this.mobxStore}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <RefProvider>
                  <BalanceProvider>
                    <div className={classes.stickyFooterRoot}>
                      <Header />
                      <Component {...pageProps} />
                      {/* <Loader /> */}
                      <div className={classes.stickyFooter}>
                        <Footer />
                      </div>
                    </div>
                  </BalanceProvider>
                </RefProvider>
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </Provider>
        </Container>
      </>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING", error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default withStyles(styles)(MyMobxApp)
