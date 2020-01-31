import { config } from '@fortawesome/fontawesome-svg-core'

import { CssBaseline, NoSsr } from '@material-ui/core'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import { Provider, observer } from 'mobx-react'

import App from 'next/app'
import { withRouter } from 'next/router'
import Head from 'next/head'

import React from 'react'
import ReactGA from 'react-ga'

import 'react-html5-camera-photo/build/css/index.css'

// This ensures that the icon CSS is loaded immediately before attempting
// to render icons
import '@fortawesome/fontawesome-svg-core/styles.css'
// Prevent fontawesome from dynamically adding its css since we did it
// manually above

import {
  CustomModal,
  CustomSnackbar,
  Footer,
  Header,
  MobileAccountMenu,
  MobileNavMenu,
} from '../components/app'

import initializeStore from '../stores/stores'
import styles from '../styles/app.style'
import { darkTheme } from '../styles/esxThemes'

config.autoAddCss = false

const hideFooter = (page) => {
  const noFooterPages = ['/pro']
  let hide = false
  noFooterPages.forEach((p) => {
    if (hide) return
    hide = page === p
  })
  return hide
}

@observer
class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store (nextJS DOCS)
    //

    const isServer = typeof window === 'undefined'
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

    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  componentDidMount() {
    ReactGA.initialize('UA-151184093-1')
  }

  render() {
    const {
      Component,
      pageProps,
      width,
      classes,
      router,
    } = this.props

    const showDesktopNav = isWidthUp('md', width)
    const showDesktopProfileMenu = isWidthUp('sm', width)

    return (
      <>
      <Head>
        <title>ESX | Entertainment Stock X</title>
      </Head>
      <Provider store={this.mobxStore}>
        <MuiThemeProvider theme={darkTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <NoSsr>
              <Header
                showDesktopNav={showDesktopNav}
                showDesktopProfileMenu={showDesktopProfileMenu}
                isLoggedIn={this.mobxStore.userStore.loggedIn}
                openLeftDrawer={() => (
                  this.mobxStore.uiStore.setLeftDrawerOpen(true)
                )}
                openRightDrawer={() => (
                  this.mobxStore.uiStore.setRightDrawerOpen(true)
                )}
                handleLogout={() => {
                  this.mobxStore.userStore.logout()
                }}
              />
              <MobileNavMenu
                open={this.mobxStore.uiStore.drawers.left}
                setOpen={this.mobxStore.uiStore.setLeftDrawerOpen}
              />
              <div component='main' className={classes.main}>
                <Component {...pageProps} pathName={router.route} />
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
                handleLogout={() => {
                  this.mobxStore.userStore.logout()
                }}
              />
              {
                !hideFooter(router.route) ? (
                  <Footer
                    rootClassName={classes.footer}
                    isLoggedIn={this.mobxStore.userStore.loggedIn}
                    handleLogout={() => {
                      this.mobxStore.userStore.logout()
                    }}
                  />) : null
              }
            </NoSsr>
          </div>
        </MuiThemeProvider>
      </Provider>
      </>
    )
  }

  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING: ', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
}

export default withWidth()(withRouter(withStyles(styles)(MyMobxApp)))
