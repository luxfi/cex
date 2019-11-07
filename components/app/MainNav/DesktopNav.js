import React from "react"

import NextLink from "next/link"

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from "@material-ui/core"

import {
  AccountCircle,
  ExitToApp,
  Search,
} from "@material-ui/icons"

import { withStyles } from "@material-ui/core/styles"

import { AutoCompleteSearch } from ".."

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)

export default (props) => {

  const {
    show,
    navStructure,
    handlePlaceHolder,
    handleLogout,
    isLoggedIn,
    classes
  } = props

  if (!show) {
    return ""
  }

  return (
    <>
      <Link href="/" component={CustomLink}>
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logo} height="52px" />
      </Link>
      <div className={classes.menuBarOuter}>
        <div className={classes.menuSpacer} />
        <DesktopMainNav 
          navStructure={navStructure} 
          handlePlaceHolder={handlePlaceHolder} 
          classes={classes}
        />
      </div>
      <div className={classes.accountOuter} >
        <DesktopProfileArea isLoggedIn={isLoggedIn} handleLogout={handleLogout} classes={classes} />
      </div>
    </>
  )
}

/////////////////////////////////////////////////////////////////////////////////////

const renderMainNav_Temp = (props) => {

  const {classes, openModal} = props

  return (
    <div className={classes.menuBarOuter}>
      <div className={classes.menuSpacer} />
      <Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick2}
        color="inherit"
        className={classes.menuButton}
      >
        Discover
        </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl2}
        keepMounted
        open={open2}
        onClose={handleClose2}
        className={classes.menuButton}
        style={{} /*{ marginTop: "50px", transform: "translate(-22px, 0px)" }*/}
      >
        <MenuItem onClick={() => {
          openModal("Movies")
        }}>
          <span style={{ padding: "16px" }}>Movies</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("TV Series")
        }}>
          <span style={{ padding: "16px" }}>TV Series</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("Music")
        }}>
          <span style={{ padding: "16px" }}>Music</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("Gaming")
        }}>
          <span style={{ padding: "16px" }}>Gaming</span>
        </MenuItem>
      </Menu>
      <Button
        onClick={() => {
          openModal("Shop")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Shop
                    </Button>
      <Button
        onClick={() => {
          openModal("Investors")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Investors
                    </Button>
      <Button
        onClick={() => {
          openModal("Communities")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Communities
                    </Button>
      <Button
        onClick={() => {
          openModal("Loyalty")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Loyalty
        </Button>
    </div>
  )
}



const DesktopMainNav = (props) => {

  const {
    navStructure, 
    handlePlaceHolder,
    classes
  } = props

  let result = []
  navStructure.forEach((navElement) => {

    if ('placeholder' in navElement) {
      result.push(
        <Button 
          color="inherit" 
          className={classes.menuButton}
          onClick={() => {
            handlePlaceHolder("Investors")
          }}
        >
          {navElement.title}
        </Button>
      ) 
    }
    else if ('link' in navElement) {
      result.push(
        <NextLink href={navElement.link}>
          <Button
            color="inherit"
            className={classes.menuButton}
          >
            {navElement.title}
          </Button>
        </NextLink>
      ) 
    }
    else /* menu */ {
      result.push(
        <Button color="inherit" className={classes.menuButton}>
          {"MT: " + navElement.title}
        </Button>
      )
    }
  })
  return (
    <>
      {result}
    </> 
  )
}


const DesktopProfileArea = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const {
    isLoggedIn, handleLogout, classes
  } = props

  return (<>
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
          onClick={handleClick}
        >
          <AccountCircle style={{ fontSize: "2rem" }} />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={menuOpen}
          onClose={handleClose}
          style={{ marginTop: "50px" }}
        >
          <MenuItem component={CustomLink} href={"/account"}>
            <AccountCircle />
            <span style={{ padding: "15px" }}>Account</span>
          </MenuItem>
          <MenuItem component={CustomLink} href={"/portfolio"}>
            <AccountCircle />
            <span style={{ padding: "15px" }}>Portfolio</span>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp />
            <span style={{ padding: "15px" }}>Logout</span>
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
  </>)
}

