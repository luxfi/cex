import React from 'react'
import ReactGA from 'react-ga'
import { Provider, observer } from 'mobx-react'

import App from 'next/app'
import { withRouter } from 'next/router'
import Head from 'next/head'

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
      classes,
      router,
    } = this.props

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
              <Header
                isLoggedIn={this.mobxStore.userStore.loggedIn}
                movies={this.mobxStore.movieStore.filteredMovies}
                openMobileNavMenu={() => (
                  this.mobxStore.uiStore.setLeftDrawerOpen(true)
                )}
                openMobileAccountMenu={() => (
                  this.mobxStore.uiStore.setRightDrawerOpen(true)
                )}
                handleLogout={() => {
                  this.mobxStore.userStore.logout()
                }}
              />
              <MobileNavMenuDrawer
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
              <MobileAccountMenuDrawer
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

export default withRouter(withStyles(styles)(MobxApp))
