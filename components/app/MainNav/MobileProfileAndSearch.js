import React from "react"
import NextLink from "next/link"

import { AutoCompleteSearch } from ".."

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core"

import {
  AccountCircle,
  ExitToApp,
  Search,
} from "@material-ui/icons"


import { makeStyles } from "@material-ui/core/styles"
import mainStyles from './mobileProfile.style.js'
import searchStyles from './searchWidget.style.js'

const useMainStyles = makeStyles(mainStyles)
const useSearchStyles = makeStyles(searchStyles)


export default (props) => {

  const {
    isLoggedIn, 
    handleLogout,
    openRightDrawer
  } = props

  const classes = useMainStyles()
  const searchClasses = useSearchStyles()

  return (
    <div className={classes.accountOuter}>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={openRightDrawer}
      >
        <AccountCircle style={{ fontSize: "2rem" }} />
      </IconButton>
    </div>

/*
    <div className={classes.accountOuter}>
      <div className={searchClasses.search}>
        <Search className={searchClasses.searchIcon} />
        <AutoCompleteSearch
          placeholder="Search…"
          classes={searchClasses}
        />
      </div>
      {isLoggedIn ? (
      <>
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <AccountCircle style={{ fontSize: "2rem" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={menuOpen}
          onClose={handleMenuClose}
          className={classes.menu}
        >
          <MenuItem component={CustomLink} href={"/account"}>
            <AccountCircle />
            <span className={classes.subMenuItemText}>Account</span>
          </MenuItem>
          <MenuItem component={CustomLink} href={"/portfolio"}>
            <AccountCircle />
            <span className={classes.subMenuItemText}>Portfolio</span>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp />
            <span className={classes.subMenuItemText}>Logout</span>
          </MenuItem>
        </Menu>
      </>
      ) : (
        <>
          <Button
            component={CustomLink}
            href={"/login"}
            color="inherit"
            className={classes.menuButton}
          >
            Login
          </Button>
          <Button
            component={CustomLink}
            color="inherit"
            variant="outlined"
            href={"/signup"}
            className={classes.menuButton}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
*/

  )
}
