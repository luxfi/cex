import {
  AppBar,
  IconButton,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { AccountCircle, MenuRounded } from '@material-ui/icons'

import classNames from 'classnames'
import React from 'react'

import DesktopNav from './DesktopNav'
import DesktopProfileAndSearch from './DesktopProfileAndSearch'
import styles from './header.style'

const useStyles = makeStyles(styles)

export default (props) => {
  const {
    showDesktopNav,
    showDesktopProfileMenu,
    openLeftDrawer,
    openRightDrawer,
    handleLogout,
    isLoggedIn,
  } = props

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const classes = useStyles()

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        showDesktopNav && trigger ? classes.solid : classes.transparent,
        !showDesktopNav ? classes.translucent : null,
        showDesktopProfileMenu ? classes.mobile : '',
      )}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        {showDesktopNav ? (
          <DesktopNav />
        ) : (
          <IconButton onClick={openLeftDrawer} className={classes.menuButton}>
            <MenuRounded className={classes.mobileHamburgerIcon} />
          </IconButton>
        )}
        {showDesktopProfileMenu ? (
          <DesktopProfileAndSearch
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        ) : (
          <>
            <img
              src='/static/images/esx/esx-white-logo.png'
              alt='ESX'
              className={classes.mobileLogo}
              height='26px'
            />
            <AccountMenu openAccountMenu={openRightDrawer} classes={classes} />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

const AccountMenu = (props) => {
  const { openAccountMenu, classes } = props

  return (
    <div className={classes.accountOuter}>
      <IconButton
        aria-controls='menu'
        aria-haspopup='true'
        onClick={openAccountMenu}
        className={classes.accountMenuButton}
      >
        <AccountCircle style={{ fontSize: '2rem' }} />
      </IconButton>
    </div>
  )
}
