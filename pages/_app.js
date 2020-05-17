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
import BrowseMoviesModal from '../components/browse'

import { isNullQuery } from '../util'

import initializeStores from '../stores/stores'


import styles from '../styles/app.style.js'
import theme from '../styles/muiTheme'

import '../styles/globalTouchups.scss'
import '../styles/footerFix.scss'

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

  componentDidMount() {
    const params = new URLSearchParams(location.search)	
    const modalQuery = params.get('modal')
    
    if (modalQuery === 'browse') {
      this.stores.uiStore.openBrowseMovieModal()
    }
  }

  openBrowseModal = () => {
    const { router } = this.props
    this.stores.uiStore.openBrowseMovieModal()

    const href = `${router.asPath}?modal=browse`

    router.push(router.route, href, { shallow: true })
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
      <Provider store={this.stores}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <NoSsr>
            <div className={classes.root}>
              <Header
                loggedIn={this.stores.userStore.loggedIn}
                movies={this.stores.movieStore.filteredMovies}
                openMobileMenu={() => {this.stores.uiStore.setRightDrawerOpen(true)}}
                handleLogout={() => {this.stores.userStore.logout()}}
                openBrowseModal={this.openBrowseModal}
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
              <BrowseMoviesModal open={uiStore.browseMovieModalOpen} />
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
