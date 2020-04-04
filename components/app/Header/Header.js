import React from 'react'
import NextLink from 'next/link'

import {
  AppBar,
  IconButton,
  isWidthUp,
  makeStyles,
  Toolbar,
  useScrollTrigger,
  withWidth
} from '@material-ui/core'

import { MenuRounded } from '@material-ui/icons'
import classNames from 'classnames'

import HeaderLogo from './HeaderLogo'
import CascadingMenu from '../CascadingMenu'
import DesktopUserMenu from './DesktopUserMenu'
import styles from './header.style.js'

import structure from '../../../settings/navStructure'


const useStyles = makeStyles(styles)

export default withWidth()((props) => {

  const {
    openMobileNavMenu,
    handleLogout,
    loggedIn,
    width,
    //movies,
  } = props

  const showDesktopNav = isWidthUp('md', width)

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const classes = useStyles()

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        showDesktopNav && trigger ? classes.solid : classes.translucent,
        !showDesktopNav ? classes.translucent : null
      )}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <NextLink href='/'>
          <HeaderLogo className={classes.logo} />
        </NextLink>
        {showDesktopNav ? (
          <div className={classes.desktopElementsOuter}>
            <CascadingMenu structure={structure} className={classes.navMenu}/>
            <DesktopUserMenu loggedIn={loggedIn} handleLogout={handleLogout} classes={classes}/>
          </div>
        ) : (
          <IconButton onClick={openMobileNavMenu} className={classes.hamburgerMenuButton}>
            <MenuRounded className={classes.mobileHamburgerIcon} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
})