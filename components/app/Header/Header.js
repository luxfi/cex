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

import { MenuRounded as MenuIcon, Search as SearchIcon } from '@material-ui/icons'
import classNames from 'classnames'

import { CascadingMenu, MovieSearchWidget } from '..'

import HeaderLogo from './HeaderLogo'
import DesktopUserMenu from './DesktopUserMenu'
import structure from '../../../settings/navStructure'

import styles from './header.style.js'
const myStyles = makeStyles(styles)

export default withWidth()((props) => {

  const {
    openMobileMenu,
    handleLogout,
    handleSearch,
    loggedIn,
    width,
    movies,
    showFullSearchWidget
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
        <div className={s.logoArea}>
          <NextLink href='/'><HeaderLogo className={s.logo} /></NextLink>
          {(showFullSearchWidget) ? (<MovieSearchWidget className={s.searchWidget} movies={movies} />) : null}
        </div>
        {showDesktopNav ? (
          <div className={s.desktopElementsOuter}>
            {(!showFullSearchWidget) ? (<SearchButton onClick={handleSearch} classes={s} />) : null}
            <CascadingMenu structure={structure} className={s.navMenu}/>
            <DesktopUserMenu loggedIn={loggedIn} handleLogout={handleLogout} classes={s}/>
          </div>
        ) : (
          <BurgerMenuButton classes={s} onClick={openMobileMenu}/>
        )}
      </Toolbar>
    </AppBar>
  )
})

const BurgerMenuButton = ({ onClick, classes }) => (
  <IconButton onClick={onClick} className={classes.hamburgerMenuButton}>
    <MenuIcon className={classes.mobileHamburgerIcon} />
  </IconButton>
)

const SearchButton = ({ onClick, classes }) => (
  <IconButton onClick={onClick} className={classes.searchButton}>
    <SearchIcon className={classes.searchButtonIcon} />
  </IconButton>
)