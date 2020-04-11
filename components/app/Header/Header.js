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

import structure from '../../../settings/navStructure'

import styles from './header.style.js'
const myStyles = makeStyles(styles)

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
  const s = myStyles()

  let appBarClass = ''
  if (showDesktopNav) {
    appBarClass = (trigger) ? s.appBarDesktopScrolled : s.appBarDesktopTop
  }
  else {
    appBarClass = s.appBarMobile
  }

  return (
    <AppBar className={classNames(s.appBarCommon, appBarClass)}>
      <Toolbar disableGutters className={s.toolbar}>
        <NextLink href='/'>
          <HeaderLogo className={s.logo} />
        </NextLink>
        {showDesktopNav ? (
          <div className={s.desktopElementsOuter}>
            <CascadingMenu structure={structure} className={s.navMenu}/>
            <DesktopUserMenu loggedIn={loggedIn} handleLogout={handleLogout} classes={s}/>
          </div>
        ) : (
          <IconButton onClick={openMobileNavMenu} className={s.hamburgerMenuButton}>
            <MenuRounded className={s.mobileHamburgerIcon} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
})