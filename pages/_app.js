import { config } from '@fortawesome/fontawesome-svg-core'

import { CssBaseline, NoSsr, Container } from '@material-ui/core'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import { Provider, observer } from 'mobx-react'

import App from 'next/app'
import { withRouter } from 'next/router'
import Head from 'next/head'
import classNames from 'classnames'

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
import styles from '../styles/app.style.js'
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
class MobxApp extends App {
  constructor(props) {
    super(props)
    this.mobxStore = initializeStore()
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
    const isDiscoverPage = router.route === '/'
    const fullWidthHeader = router.route.startsWith('/account')

    const mainClassNames = classNames(classes.main, { [classes.discoverMain]: isDiscoverPage })
    const footerclassNames = classNames(classes.footer, { [classes.discoverFooter]: isDiscoverPage })


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
              <Container className={classes.header}>
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
                  movies={this.mobxStore.movieStore.filteredMovies}
                  fullWidth={isDiscoverPage || fullWidthHeader}
                />
              </Container>
              <MobileNavMenu
                open={this.mobxStore.uiStore.drawers.left}
                setOpen={this.mobxStore.uiStore.setLeftDrawerOpen}
              />
              <Container component='main' className={mainClassNames}>
                <Component {...pageProps} pathName={router.route} />
              </Container>
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
                  <Container className={footerclassNames}>
                    <Footer
                      isLoggedIn={this.mobxStore.userStore.loggedIn}
                      handleLogout={() => {
                        this.mobxStore.userStore.logout()
                      }}
                    />
                  </Container>) : null
              }
            </NoSsr>
          </div>
        </MuiThemeProvider>
      </Provider>
      </>
    )
  }
}

export default withWidth()(withRouter(withStyles(styles)(MobxApp)))
