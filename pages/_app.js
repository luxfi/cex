import React from "react"
import { Provider, observer } from "mobx-react"
import { withRouter } from "next/router"
import App from "next/app"

import ReactGA from 'react-ga'

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

import { MuiThemeProvider } from "@material-ui/core/styles"
import NoSsr from '@material-ui/core/NoSsr'
import CssBaseline from "@material-ui/core/CssBaseline"

import {
  Root,
  Content,
  Footer,
  presets,
} from 'mui-layout'

import { 
  CustomSnackbar, 
  Header, 
  MobileNav,
  FooterEx, 
  CustomModal 
} from "../components/app"

import initializeStore from "../stores/stores"

import { darkTheme, lightTheme } from "../styles/esxThemes"

const trackGA = () => {
  ReactGA.initialize('UA-151184093-1')
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const muiLayoutConfig = presets.createStandardLayout()
muiLayoutConfig.navWidth = {
  "xs": "85vw",   // mobile:  take "most of it"
  "sm": "400px"   // all else: take "what's needed"
}

muiLayoutConfig.navVariant = {
  "xs": "temporary",
  "sm": "temporary",
}
muiLayoutConfig.collapsible = {
  "xs": false,
}
muiLayoutConfig.headerPosition = "sticky"

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
    if (!isServer) {
      trackGA()
    }

    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  placeholder = (title, body) => {
    this.mobxStore.uiStore.openModal(title, body)
  }

  render() {
    const { Component, pageProps} = this.props

    return (
        <Provider store={this.mobxStore}>
        <MuiThemeProvider theme={darkTheme}>
          <CssBaseline />
          <NoSsr>
            <Root config={muiLayoutConfig}>
              <Header 
                handlePlaceholder={this.placeholder} 
                isLoggedIn={this.mobxStore.userStore.loggedIn}
                handleLogout={() => {this.mobxStore.userStore.logout()}}
              />
              <MobileNav handlePlaceholder={this.placeholder} />
              <Content>
                <Component
                  {...pageProps}
                  darkTheme={darkTheme}
                  lightTheme={lightTheme}
                />
                <CustomModal
                  open={this.mobxStore.uiStore.modal.open}
                  handleClose={() => this.mobxStore.uiStore.closeModal()}
                  body={this.mobxStore.uiStore.modal.body}
                  title={this.mobxStore.uiStore.modal.title}
                />
                <CustomSnackbar />
              </Content>
              <Footer>
                <FooterEx openModal={this.openModal} />
              </Footer>
            </Root>
        </NoSsr>
      </MuiThemeProvider>
      </Provider>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING", error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default withRouter(MyMobxApp)