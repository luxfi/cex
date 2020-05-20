import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  AppBar,
  IconButton,
  isWidthUp,
  makeStyles,
  Toolbar,
  useScrollTrigger,
  withWidth,
} from '@material-ui/core'

import { MenuRounded as MenuIcon, Search as SearchIcon } from '@material-ui/icons'
import classNames from 'classnames'

import { CascadingMenu, MovieSearchWidget, NextMuiLink } from '..'

import HeaderLogo from './HeaderLogo'
import DesktopUserMenu from './DesktopUserMenu'
import structure from '../../../settings/navStructure'

import styles from './header.style.js'
const myStyles = makeStyles(styles)

export default withWidth()(inject('store')(observer((props) => {

  const {
    openMobileMenu,
    handleLogout,
    handleClose,
    loggedIn,
    width,
    movies,
    store,
    isBrowseModal,
  } = props
  const { uiStore } = store

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
    <AppBar className={classNames(s.appBarCommon, appBarClass, { [s.modalHeader]: isBrowseModal })}>
      <Toolbar disableGutters className={s.toolbar}>
        <div className={s.logoArea}>
          <NextMuiLink href='/'><HeaderLogo handleClose={handleClose} className={s.logo} /></NextMuiLink>
          <MovieSearchWidget className={s.searchWidget} movies={movies} isBrowseModal={isBrowseModal} />
        </div>
        {showDesktopNav ? (
          <div className={s.desktopElementsOuter}>
            <CascadingMenu handleClose={handleClose} structure={structure} className={s.navMenu}/>
            <DesktopUserMenu loggedIn={loggedIn} handleLogout={handleLogout} classes={s}/>
          </div>
        ) : (
          <BurgerMenuButton classes={s} onClick={openMobileMenu}/>
        )}
      </Toolbar>
    </AppBar>
  )
})))

const BurgerMenuButton = ({ onClick, classes }) => (
  <IconButton onClick={onClick} className={classes.hamburgerMenuButton}>
    <MenuIcon className={classes.mobileHamburgerIcon} />
  </IconButton>
)
