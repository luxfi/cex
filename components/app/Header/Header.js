import React from 'react'
import { useObserver } from 'mobx-react'
import classNames from 'classnames'

import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  useScrollTrigger,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

import { MenuRounded as MenuIcon } from '@material-ui/icons'

import { CascadingMenu, StockSearchWidget, NextMuiLink } from '..'

import HeaderLogo from './HeaderLogo'
import DesktopUserMenu from './DesktopUserMenu'
import structure from '../../../settings/navStructure'

import styles from './header.style.js'
const useStyles = makeStyles(styles)

export default ({
  openMobileMenu,
  handleLogout,
  handleClose,
  loggedIn,
  searchOpen,
  onSearchClosed
}) => {

  const theme = useTheme()
  const showDesktopNav = useMediaQuery(theme.breakpoints.up('md'))

  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const s = useStyles()

  let appBarClass = ''
  if (showDesktopNav) {
    appBarClass = (trigger) ? s.appBarDesktopScrolled : s.appBarDesktopTop
  }
  else {
    appBarClass = s.appBarMobile
  }

  return useObserver(() => (
    <AppBar className={classNames(s.appBarCommon, appBarClass)}>
      <Toolbar disableGutters className={s.toolbar}>
        <div className={s.logoArea}>
          <NextMuiLink href='/' className={s.logoOuter}><HeaderLogo handleClose={handleClose} className={s.logo} /></NextMuiLink>
        </div>
        {showDesktopNav ? (
          <div className={s.desktopElementsOuter}>
            <StockSearchWidget className={s.searchWidget} minChars={3} isOpen={searchOpen} onSearchClosed={onSearchClosed}/>
            <CascadingMenu handleClose={handleClose} structure={structure} className={s.navMenu}/>
            <DesktopUserMenu loggedIn={loggedIn} handleLogout={handleLogout} classes={s}/>
          </div>
        ) : (
          <>
          <StockSearchWidget className={s.searchWidget} minChars={3} isOpen={searchOpen} onSearchClosed={onSearchClosed}/>
          <BurgerMenuButton classes={s} onClick={openMobileMenu}/>
          </>
        )}
      </Toolbar>
    </AppBar>
  ))
}

const BurgerMenuButton = ({ onClick, classes }) => (
  <IconButton onClick={onClick} className={classes.hamburgerMenuButton}>
    <MenuIcon className={classes.mobileHamburgerIcon} />
  </IconButton>
)
