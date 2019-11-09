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
import styles from './desktopNav.style.js'

const useStyles = makeStyles(styles)


export default (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  const {
    isLoggedIn, handleLogout
  } = props

  const classes = useStyles()

  return (
    <div className={classes.accountOuter}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <AutoCompleteSearch
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
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
  )
}

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)