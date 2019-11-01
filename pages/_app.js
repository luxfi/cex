import React from "react"
import App from "next/app"
import { Provider, observer } from "mobx-react"
import { withRouter } from "next/router"

import ReactGA from 'react-ga'

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

// @material-ui/core components
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles"
import NoSsr from '@material-ui/core/NoSsr'
import CssBaseline from "@material-ui/core/CssBaseline"

// core components
import { CustomSnackbar, Header, Footer, CustomModal } from "../components/app"

import initializeStore from "../stores/stores"

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

  componentDidMount () {
    ReactGA.initialize('UA-151184093-1')
  }

  render() {
    const { Component, pageProps, classes, router } = this.props
    const onHomePage = router.pathname === "/" || router.pathname === "/#"

    return (
        <MuiThemeProvider theme={darkTheme}>
          <CssBaseline />
          <NoSsr>
            <Provider store={this.mobxStore}>
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
            </Provider>
          </NoSsr>
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
