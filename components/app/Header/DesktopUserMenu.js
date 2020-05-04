import React from 'react'
import Link from 'next/link'

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'

import { AccountCircle } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAddressCard,
  faChartArea,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

  // This one is recommended in the MUI docs themselves :)
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'

import { NextMuiLink } from '..'

export default ({ loggedIn, handleLogout, classes }) => (
  <div className={classes.accountOuter}>
    {loggedIn
      ? (
        <PopupState variant='popover' popupId='menu-popover'>
          {(popupState) => (
            <>
              <IconButton
                aria-controls='menu'
                aria-haspopup='true'
                {...bindTrigger(popupState)}
              >
                <AccountCircle className={classes.accountIcon} />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                className={classes.menu}
                variant='menu'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                getContentAnchorEl={null}
                disableAutoFocusItem
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={popupState.close}
                >
                  <NextMuiLink href='/account'>
                    <FontAwesomeIcon icon={faAddressCard} size='1x' />
                    <span className={classes.menuItemText}>My Account</span>
                  </NextMuiLink>
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={popupState.close}
                >
                  <NextMuiLink href='/portfolio'>
                    <FontAwesomeIcon icon={faChartArea} size='1x' />
                    <span className={classes.menuItemText}>Portfolio</span>
                  </NextMuiLink>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className={classes.menuItem}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} size='1x' />
                  <span className={classes.menuItemText}>Logout</span>
                </MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      ) : (
        <>
          <Link href='/login' >
            <Button className={classes.navButton}>
              Login
            </Button>
          </Link>
          <Link href='/signup' >
            <Button variant='outlined' className={classes.navButton}>
              Sign Up
            </Button>
          </Link>
        </>
      )
    }
  </div>
)
