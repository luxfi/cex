import React from 'react'
import ReactGA from 'react-ga'
import { Provider, observer } from 'mobx-react'

import NextApp from 'next/app'
import { withRouter } from 'next/router'
import NextHead from 'next/head'

import {
  Container,
  CssBaseline,
  MuiThemeProvider,
  NoSsr,
  withStyles,
} from '@material-ui/core'

// This ensures that the icon CSS is loaded immediately before attempting
// to render icons
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

// Prevent fontawesome from dynamically adding its css since we did it
// manually above
import 'react-html5-camera-photo/build/css/index.css'

import {
  CustomModal,
  CustomSnackbar,
  Footer,
  Header,
  MobileAccountMenuDrawer,
  MobileNavMenuDrawer,
} from '../components/app'

import initializeStores from '../stores/stores'
import styles from '../styles/app.style.js'
import theme from '../styles/esxTheme'

config.autoAddCss = false
@observer
class ESXApp extends NextApp {
  constructor(props) {
    super(props)
    this.stores = initializeStores()
  }

  componentDidMount() {
    ReactGA.initialize('UA-151184093-1')
  }

  render() {
    const {
      Component,
      pageProps,
      classes,
      router,
    } = this.props

    const fullScreen = isFullScreen(router.route)

    return (
      <>
      <NextHead>
        <title>ESX | Entertainment Stock X</title>
      </NextHead>
      <Provider store={this.stores}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <NoSsr>
              <Header
                isLoggedIn={this.stores.userStore.loggedIn}
                movies={this.stores.movieStore.filteredMovies}
                openMobileMenu={() => {this.stores.uiStore.setRightDrawerOpen(true)}}
                handleLogout={() => {this.stores.userStore.logout()}}
                handleSearch={() => { router.push('/browse') }}
                showFullSearchWidget={showFullSearchWidget(router.route)}
              />
              <MobileNavMenuDrawer
                open={this.stores.uiStore.drawers.left}
                setOpen={this.stores.uiStore.setLeftDrawerOpen}
              />
              <Container component='main' className={classNames({ [classes.main]: true, [classes.fullScreenMain]: fullScreen })}>
                <Component {...pageProps} pathName={router.route} />
              </Container>
              <CustomModal
                open={this.stores.uiStore.modal.open}
                handleClose={() => this.stores.uiStore.closeModal()}
                body={this.stores.uiStore.modal.body}
                title={this.stores.uiStore.modal.title}
              />

              <CustomSnackbar />
              <MobileAccountMenuDrawer
                open={this.stores.uiStore.drawers.right}
                setOpen={this.stores.uiStore.setRightDrawerOpen}
                isLoggedIn={this.stores.userStore.loggedIn}
                handleLogout={() => {
                  this.stores.userStore.logout()
                }}
              />
              {hideFooter(router.route) ? null : (
                <Container className={classNames({ [classes.footer]: true, [classes.fullScreenFooter]: fullScreen })}>
                  <Footer
                    isLoggedIn={this.stores.userStore.loggedIn}
                    handleLogout={() => {
                      this.stores.userStore.logout()
                    }}
                  />
                </Container>
              )}
            </NoSsr>
          </div>
        </MuiThemeProvider>
      </Provider>
      </>
    )
  }
}

const hideFooter = (page) => {
  const noFooterPages = ['/pro']
  let hide = false
  noFooterPages.forEach((p) => {
    if (hide) return
    hide = page === p
  })
  return hide
}

const isFullScreen = (route) => {
  return route === '/' || route.startsWith('/browse')
}

const showFullSearchWidget = (route) => {
  return route.startsWith('/browse')
}

export default withRouter(withStyles(styles)(ESXApp))
