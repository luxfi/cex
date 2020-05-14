import React from 'react'
import Link from 'next/link'

import {
  Button,
  IconButton,
  makeStyles,
  MenuItem,
  Popover,
} from '@material-ui/core'

import { AccountCircle } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faAddressCard,
  faChartArea,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

  // This one is recommended in the MUI docs themselves :)
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'

export default ({ loggedIn, handleLogout, classes }) => (
  <div className={classes.accountOuter}>
    {loggedIn
      ? (
        <PopupState variant='popover' popupId='menu-popover'>
          {(popupState) => (
            <>
              <IconButton
                id='accountMenu'
                aria-controls='menu'
                aria-haspopup='true'
                {...bindTrigger(popupState)}
              >
                <AccountCircle className={classes.accountIcon} />
              </IconButton>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Link href='/account'>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={popupState.close}
                  >
                    <span className={classes.menuItemText}>My Account</span>
                    <FontAwesomeIcon icon={faAddressCard} size='1x' className={classes.menuItem} />
                  </MenuItem>
                </Link>
                <Link href='/portfolio'>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={popupState.close}
                  >
                    <span className={classes.menuItemText}>Portfolio</span>
                    <FontAwesomeIcon icon={faChartArea} size='1x' className={classes.menuItem} />
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={handleLogout}
                  className={classes.menuItem}
                >
                  <span className={classes.menuItemText}>Logout</span>
                  <FontAwesomeIcon icon={faSignOutAlt} size='1x' />
                </MenuItem>
              </Popover>
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
