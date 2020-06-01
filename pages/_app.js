import React from 'react'
import { autorun } from 'mobx'
import { Provider, observer, batchingForReactDom } from 'mobx-react'

import NProgress from 'nprogress'

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
import AuthModal from '../components/app/AuthModal'

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
import theme from '../styles/muiTheme'

import '../styles/globalTouchups.scss'
import '../styles/footerFix.scss'
import '../styles/responsivePadding.scss'
import '../styles/nprogress.scss'

import '../components/app/MovieSlider/modified-slick.css'
import * as GA from '../util/GA' 

config.autoAddCss = false

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', url => {
  GA.logPageView(url)
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done());

@withRouter
@withStyles(styles)
@observer
export default class extends NextApp {
  constructor(props) {
    super(props)
    this.stores = initializeStores()
    autorun(() => {
      if (this.stores.stockStore.resultSet.length > 0 && props.router.pathname !== '/search') {
        props.router.push('/search')
      } 
    })
    
  }

  leaveSearch = () => {
    //console.log("PATH: " + this.props.router.pathname)
    if (this.props.router.pathname === '/search') {
      this.props.router.back()
    }
  }
  

  render() {
    const {
      Component,
      pageProps,
      classes,
      router,
    } = this.props

    const { uiStore } = this.stores

    const fullScreen = isFullScreen(router.route)

    return (
      <>
      <NextHead>
        <title>ESX | Entertainment Stock X</title>
      </NextHead>
      <Provider store={this.stores} value={this.stores} >
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <NoSsr>
            <div className={classNames(classes.root, mainRouteClass(router.route), 'sass-root')}>
              <Header
                loggedIn={this.stores.userStore.loggedIn}
                openMobileMenu={() => {this.stores.uiStore.setRightDrawerOpen(true)}}
                handleLogout={() => {this.stores.userStore.logout()}}
                onSearchClosed={() => {this.leaveSearch()}}
              />
              <MobileNavMenuDrawer
                open={this.stores.uiStore.drawers.left}
                setOpen={this.stores.uiStore.setLeftDrawerOpen}
              />
              <Container component='main' className={classNames({ [classes.main]: true, 'fullScreenContainer': fullScreen })}>
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
              <AuthModal authModalOpen={this.stores.uiStore.authModalOpen} tabIndexValue={this.stores.uiStore.tabIndexValue} />
              {hideFooter(router.route) ? null : (
                <Footer 
                  loggedIn={this.stores.userStore.loggedIn} 
                  handleLogout={this.stores.userStore.logout} 
                  className ={classNames({ [classes.footer]: true, 'fullScreenContainer': fullScreen })}
                />
              )}
            </div>
          </NoSsr>
        </MuiThemeProvider>
      </Provider>
      </>
    )
  }
}





  // tag main with a classname from the first part of the route
const mainRouteClass = (path) => {
  const pathArray = path.split('/') 
  if (pathArray.length >= 2) {
    return (pathArray[1].length > 0) ? `on-route-${pathArray[1]}` : 'root-route'
  }
  return '' // couldn't make sense of the path
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
    route.startsWith('/pro/')
    ||
    route.startsWith('/browse')
  )
}
