import React from "react"
import NextLink from "next/link"

import {
  Button,
  Menu,
  MenuItem,
  Link,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import styles from './desktopNav.style.js'

const useStyles = makeStyles(styles)


export default (props) => {

  const {
    navStructure,
    handlePlaceholder,
    handleLogout,
    isLoggedIn
  } = props

  const classes = useStyles()

  return (
    <>
      <Link href="/" component={CustomLink}>
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logo} height="52px" />
      </Link>
      <div className={classes.menuBarOuter}>
        <div className={classes.menuSpacer} />
        <DesktopMainNav
          navStructure={navStructure}
          handlePlaceholder={handlePlaceholder}
          classes={classes}
        />
      </div>
    </>
  )
}


const MainNavDropdown = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  const {
    menuDefinition,
    handlePlaceholder,
    classes
  } = props

  return (<>
    
    < Button color="inherit" className={classes.menuButton} onClick={handleMenuOpen} >
      {menuDefinition.title}
    </Button >
    <Menu
      id="menu"
      anchorEl={anchorEl}
      keepMounted
      open={menuOpen}
      onClose={handleMenuClose}
      className={classes.menu}
    >
      {menuDefinition.items.map(
        (item) => {
          return ('link' in item)
            ? (
              <NextLink href={item.link} key={item.link} >
                <MenuItem ><span className={classes.subMenuItemText}>{item.title}</span></MenuItem>
              </NextLink>
            ) : (
              <MenuItem key={item.placeholder} onClick={() => {
                handlePlaceholder(item.placeholder)
                handleMenuClose()
              }}>
                <span className={classes.subMenuItemText}>{item.title}</span>
              </MenuItem>
            )
        }
      )}
    </Menu>
  </>)
}

const DesktopMainNav = (props) => {

  const {
    navStructure, 
    handlePlaceholder,
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
            handlePlaceholder(navElement.placeholder)
          }}
          key={navElement.placeholder}
        >
          {navElement.title}
        </Button>
      ) 
    }
    else if ('link' in navElement) {
      result.push(
        <NextLink href={navElement.link} key={navElement.placeholder}>
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
        <MainNavDropdown 
          classes={classes} 
          menuDefinition={navElement} 
          handlePlaceholder={handlePlaceholder}
        />
      )
    }
  })
  return (
    <>
      {result}
    </> 
  )
}



const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)

/////////////////////////////////////////////////////////////////////////////////////
/*
const renderMainNav_Temp = (props) => {

  const { classes, openModal } = props

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
        style={{ marginTop: "50px", transform: "translate(-22px, 0px)" }}
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

*/