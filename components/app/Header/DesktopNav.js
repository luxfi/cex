import React from 'react'
import NextLink from 'next/link'

import {
  Button,
  Popover,
  MenuItem,
  makeStyles
} from '@material-ui/core'

  // This one is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import styles from './desktopNav.style.js'
const useStyles = makeStyles(styles)

import navStructure from '../../../settings/navStructure'

export default () => {
  const classes = useStyles()

  return (
    <>
      <NextLink href='/'>
        <img src='/static/images/esx/esx-white-logo.png' alt='ESX' className={classes.logo} height='42px' />
      </NextLink>
      <div className={classes.navOuter}>
        <div className={classes.navSpacer} />
        <DesktopMainNav
          nav={navStructure}
          classes={classes}
        />
      </div>
    </>
  )
}

const MainNavDropdown = ({ menuDefinition, classes }) => (
  <PopupState variant='popover' popupId='menu-popover'>
    {(popupState) => (
      <>
      <Button
        {...bindTrigger(popupState)}
        className={classes.navButton}
      >
        {menuDefinition.title}
      </Button >
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className={classes.menu}
      >
        {menuDefinition.items.map(
          (item) => {
            const href = ('link' in item)
              ? item.link
              : ({
                pathname: '/placeholder',
                query: { title: item.placeholder },
              })
            return (
              <NextLink href={href} key={item.title}>
                <MenuItem onClick={popupState.close}>
                  <span className={classes.subMenuItemText}>
                    {item.title}
                  </span>
                </MenuItem>
              </NextLink>
            )
          },
        )}
      </Popover>
      </>
    )}
  </PopupState>
)

const DesktopMainNav = ({ nav, classes }) => (
  nav.map((navElement) => {
    let href = null
    if ('placeholder' in navElement) {
      href = { pathname: '/placeholder', query: { title: navElement.title } }
    } else if ('link' in navElement) {
      href = navElement.link
    }

    if (href) {
      return (
        <NextLink href={href} key={`link+${navElement.title}`}>
          <Button
            className={classes.navButton}
          >
            {navElement.title}
          </Button>
        </NextLink>
      )
    }

    return (
      <MainNavDropdown
        classes={classes}
        menuDefinition={navElement}
        key={`dropdown+${navElement.title}`}
      />
    )
  })
)
