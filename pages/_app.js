import App, { Container } from "next/app"
import Head from "next/head"
import React from "react"
import { Provider } from "mobx-react"

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// core components
import Header from "../components/Header"
import Footer from "../components/Footer"
import CustomSnackbar from "../components/CustomSnackbar"

import initializeStore from "../stores/stores"

// NEW ***********
import { withRouter } from "next/router"
import { MuiPickersUtilsProvider } from "react-referential-forms"
import RefProvider from "react-referential"

import MomentUtils from "@date-io/moment"

// styles
import styles from "../pageStyles/appStyle"
import {darkTheme, lightTheme} from "../components/themes"

// ****************

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
    if (!this.props.isServer) {
      // debugger
      // this.props.initialMobxState.userStore.loadSession()
    }
  }

  // getThemeForPath(pathname) {
  //   if (pathname.startsWith("/film")) {
  //     return darkTheme
  //   }
  //   return lightTheme
  // }

  render() {
    const { Component, pageProps, classes, router } = this.props
    const onHomePage = router.pathname === "/" || router.pathname === "/#"
    // const theme = this.getThemeForPath(router.pathname)

    return (
      <MuiThemeProvider theme={lightTheme}>
        <React.Fragment>
          <CssBaseline />
          <Head>
            <title>ESX | Entertainment Stock Exchange</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          </Head>
          <Provider store={this.mobxStore}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <RefProvider>
                <div className={classes.root}>
                  <div className={classes.main} component="main">
                    <Header
                      onHomePage={onHomePage}
                      darkTheme={darkTheme}
                      lightTheme={lightTheme}
                    />
                    <Component
                      {...pageProps}
                      darkTheme={darkTheme}
                      lightTheme={lightTheme}
                    />
                    {/* <Loader /> */}
                    <CustomSnackbar />
                  </div>
                  <div className={classes.stickyFooter}>
                    <MuiThemeProvider theme={darkTheme}>
                      <Footer />
                    </MuiThemeProvider>
                  </div>
                </div>
              </RefProvider>
            </MuiPickersUtilsProvider>
          </Provider>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING", error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default withRouter(withStyles(styles)(MyMobxApp))
