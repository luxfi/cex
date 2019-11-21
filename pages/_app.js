import React from "react"
import { Provider, observer } from "mobx-react"
import { withRouter } from "next/router"
import App from "next/app"
import { withStyles } from "@material-ui/core/styles"
import "react-html5-camera-photo/build/css/index.css"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { NoSsr, CssBaseline } from '@material-ui/core'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

import {
  CustomSnackbar,
  Header,
  MobileNavMenu, 
  Footer,
  CustomModal,
  MobileAccountMenu
} from "../components/app"

import ReactGA from 'react-ga'
import initializeStore from "../stores/stores"
import { darkTheme, lightTheme } from "../styles/esxThemes"
import styles from "../styles/app.style.js"

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

  componentDidMount() {
    ReactGA.initialize('UA-151184093-1')
  }

  placeholder = (title, body) => {
    this.mobxStore.uiStore.openModal(title, body)
  }

  render() {
    const {
      Component,
      pageProps,
      width,
      classes
    } = this.props

    const showDesktopNav = isWidthUp('md', width)
    const showDesktopProfileMenu = isWidthUp('sm', width)

    return (
      <Provider store={this.mobxStore}>
        <MuiThemeProvider theme={darkTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <NoSsr>
              <Header
                showDesktopNav={showDesktopNav}
                showDesktopProfileMenu={showDesktopProfileMenu}
                handlePlaceholder={this.placeholder}
                isLoggedIn={this.mobxStore.userStore.loggedIn}
                openLeftDrawer={() => this.mobxStore.uiStore.setLeftDrawerOpen(true)}
                openRightDrawer={() => this.mobxStore.uiStore.setRightDrawerOpen(true)}
                handleLogout={() => { this.mobxStore.userStore.logout() }}
              />
              <MobileNavMenu
                open={this.mobxStore.uiStore.drawers.left}
                setOpen={this.mobxStore.uiStore.setLeftDrawerOpen}
                handlePlaceholder={this.placeholder}
              />
              <div component="main" className={classes.main}>
                <Component
                  {...pageProps}
                  darkTheme={darkTheme}
                  lightTheme={lightTheme}
                />
              </div>
              <CustomModal
                open={this.mobxStore.uiStore.modal.open}
                handleClose={() => this.mobxStore.uiStore.closeModal()}
                body={this.mobxStore.uiStore.modal.body}
                title={this.mobxStore.uiStore.modal.title}
              />

              <CustomSnackbar />
              <MobileAccountMenu
                open={this.mobxStore.uiStore.drawers.right}
                setOpen={this.mobxStore.uiStore.setRightDrawerOpen}
                isLoggedIn={this.mobxStore.userStore.loggedIn}
                handleLogout={() => { this.mobxStore.userStore.logout() }}
                handlePlaceholder={this.placeholder}
              />
              <Footer rootClassName={classes.footer} handlePlaceholder={this.placeholder} />
            </NoSsr>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING: ", error)
      // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default withWidth()(withRouter(withStyles(styles)(MyMobxApp)))
