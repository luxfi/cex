import App from "next/app"
import Head from "next/head"
import React from "react"
import { Provider, observer } from "mobx-react"

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import { MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// core components
import { CustomSnackbar, Header, Footer, CustomModal } from "../components/app"

import initializeStore from "../stores/stores"

// NEW ***********
import { withRouter } from "next/router"
import RefProvider from "react-referential"

// styles
import styles from "../pageStyles/app.style"
import { darkTheme, lightTheme } from "../components/themes"

// ****************
@observer
class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store (nextJS DOCS)
    //

    const isServer = typeof window === "undefined"
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore

    let pageProps = {}

    const appProps = await App.getInitialProps(appContext)
    pageProps = appProps.pageProps

    return {
      pageProps,
      isServer,
      initialMobxState: mobxStore,
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === "undefined"
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  render() {
    const { Component, pageProps, classes, router } = this.props
    const onHomePage = router.pathname === "/" || router.pathname === "/#"

    return (
        <MuiThemeProvider theme={darkTheme}>
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
            <script src="/static/datafeeds/udf/dist/polyfills.js" />
            <script src="/static/datafeeds/udf/dist/bundle.js" />
          </Head>
          <Provider store={this.mobxStore}>
            {/* <RefProvider> */}
              <div className={classes.root}>
                <div className={classes.main} component="main">
                  <Header
                    onHomePage={onHomePage}
                    darkTheme={darkTheme}
                    lightTheme={lightTheme}
                    openModal={(title, body) => this.mobxStore.uiStore.openModal(title, body)}
                  />
                  <Component
                    {...pageProps}
                    darkTheme={darkTheme}
                    lightTheme={lightTheme}
                  />
                  {/* <Loader /> */}
                  <CustomModal 
                    open={this.mobxStore.uiStore.modal.open}
                    handleClose={() => this.mobxStore.uiStore.closeModal()}
                    body={this.mobxStore.uiStore.modal.body}
                    title={this.mobxStore.uiStore.modal.title}
                  />
                  <CustomSnackbar />
                </div>
                <div className={classes.stickyFooter}>
                  <Footer openModal={(title, body) => this.mobxStore.uiStore.openModal(title, body)}/>
                </div>
              </div>
            {/* </RefProvider> */}
          </Provider>
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
