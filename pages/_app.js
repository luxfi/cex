import React from 'react'
import { Provider, observer } from 'mobx-react'

import NextApp from 'next/app'
import Router, { withRouter } from 'next/router'
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
import '../styles/esxThemeTouchups.scss'

import '../components/app/MovieSlider/modified-slick.css'
import * as GA from '../util/GA' 

config.autoAddCss = false

Router.events.on('routeChangeComplete', url => GA.logPageView(url))

@withRouter
@withStyles(styles)
@observer
export default class extends NextApp {
  constructor(props) {
    super(props)
    this.stores = initializeStores()
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
                loggedIn={this.stores.userStore.loggedIn}
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
              <Container component='main' className={classNames({ [classes.main]: true,  [classes.container]: true, [classes.fullScreenContainer]: fullScreen })}>
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
                <Footer 
                  loggedIn={this.stores.userStore.loggedIn} 
                  handleLogout={this.stores.userStore.logout} 
                  className ={classNames({ [classes.footer]: true,  [classes.container]: true, [classes.fullScreenContainer]: fullScreen })}
                />
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
  return (
    route === '/' 
    || 
    route === '/pro'
    ||
    route.startsWith('/browse')
  )
}

const showFullSearchWidget = (route) => {
  return route.startsWith('/browse')
}

//export default withRouter(withStyles(styles)(ESXApp))
