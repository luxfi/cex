import React from "react"
import Link from "next/link"

import {
  Button,
  IconButton,
  Popover,
  MenuItem,
} from "@material-ui/core"

import {
  AccountCircle,
  Search,
} from "@material-ui/icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faAddressCard,
  faChartArea,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"

import { AutoCompleteSearch } from ".."


  // This one is recommended in the MUI docs themselves :)
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import { makeStyles } from "@material-ui/core/styles"

import mainStyles from './desktopNav.style.js'
import searchStyles from './searchWidget.style.js'

const useMainStyles = makeStyles(mainStyles)
const useSearchStyles = makeStyles(searchStyles)

export default (props) => {

  const {
    isLoggedIn, handleLogout
  } = props

  const classes = useMainStyles()
  const searchClasses = useSearchStyles()

  return (
    <div className={classes.accountOuter}>
      <div className={searchClasses.search}>
        <Search className={searchClasses.searchIcon}/>
        <AutoCompleteSearch
          placeholder="Search…"
          classes={searchClasses}
        />
      </div>
      {isLoggedIn ? (
        <PopupState variant="popover" popupId="menu-popover">
          { (popupState) => {
            return (
            <>
            <IconButton
              aria-controls="menu"
              aria-haspopup="true"
              {...bindTrigger(popupState)}
            >
              <AccountCircle className={classes.accountIcon}/>
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Link href="/account">
                <MenuItem className={classes.menuItem} onClick={popupState.close}>
                  <span className={classes.menuItemText}>Account</span>
                  <FontAwesomeIcon icon={faAddressCard} size="1x" className={classes.menuItem} />
                </MenuItem>
              </Link>
              <Link href="/portfolio">
                <MenuItem className={classes.menuItem} onClick={popupState.close}>
                  <span className={classes.menuItemText}>Portfolio</span>
                  <FontAwesomeIcon icon={faChartArea} size="1x" className={classes.menuItem} />
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout} className={classes.menuItem} >
                <span className={classes.menuItemText}>Logout</span>
                <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
              </MenuItem>
            </Popover>
            </>
            )
          }
        }
        </PopupState>
      ) : (
      <>
        <Link href={"/login"} >
          <Button color="inherit" className={classes.navButton}>
            Login
          </Button>
        </Link>
        <Link href={"/signup"} >
          <Button color="inherit" variant="outlined" className={classes.navButton}>
            Sign Up
          </Button>
        </Link>
      </>
      )}
    </div>
  )
}
