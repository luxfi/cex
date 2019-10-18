import React from "react"
import { inject, observer } from "mobx-react"

// Material components
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Container from "@material-ui/core/Container"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Link from "@material-ui/core/Link"

// Material icons
import SearchIcon from "@material-ui/icons/Search"
import ExitToApp from "@material-ui/icons/ExitToApp"

// Material styles
import { fade, withStyles } from "@material-ui/core/styles"

// Core components
import { AutoCompleteSearch } from "../"

import NextLink from "next/link"

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)


const StyledMenu = withStyles({
  paper: {
    backgroundColor: "#0000009e",
  },
})(props => (
  <Menu
    // elevation={0}
    // getContentAnchorEl={null}
    // anchorOrigin={{
    //   vertical: 'bottom',
    //   horizontal: 'center',
    // }}
    // transformOrigin={{
    //   vertical: 'top',
    //   horizontal: 'center',
    // }}
    {...props}
  />
));

@inject("store")
@observer
class Header extends React.Component {

  render() {
    let { classes, store, onHomePage, darkTheme, lightTheme, openModal } = this.props
    let accountLoaded = store.userStore.loggedIn

    const GuestNavBar = () => {
      const [anchorEl, setAnchorEl] = React.useState(null)
      const [anchorEl2, setAnchorEl2] = React.useState(null)
      const open = Boolean(anchorEl)
      const open2 = Boolean(anchorEl2)

      function handleClick(event) {
        setAnchorEl(event.currentTarget)
      }

      function handleClose() {
        setAnchorEl(null)
      }

      function handleClick2(event) {
        setAnchorEl2(event.currentTarget)
      }

      function handleClose2() {
        setAnchorEl2(null)
      }

      const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true, });
      return (
        <>
          <AppBar
            id="navbar"
            position="fixed"
            color="inherit"
            className={
              `${classes.appBar} ${
              !trigger ? classes.transparent : classes.translucent
              }`
            }
          >
            {" "}
            <Container maxWidth="xl">
              <Toolbar
                className={`${classes.noPadding} ${classes.toolBar}`}
              >
                <Link
                  href="/"
                  className={classes.flex}
                  component={CustomLink}
                >
                  <img
                    id="logo"
                    src="/static/images/esx/esx-white-logo.png"
                    alt="ESX"
                    style={{ marginTop: "-15px" }}
                    height="52px"
                  />
                </Link>
                <div style={{ marginLeft: "128px" }}>
                  <Button
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={handleClick2}
                    color="inherit"
                    className={classes.menuButton}
                  >
                    Discover
                  </Button>
                  <StyledMenu
                    id="menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={open2}
                    onClose={handleClose2}
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
                  </StyledMenu>
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
                <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <AutoCompleteSearch
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                {accountLoaded ? (
                  <>
                    <IconButton
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <AccountCircle style={{ fontSize: "2rem" }} />
                    </IconButton>
                    <StyledMenu
                      id="menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      style={{ marginTop: "50px" }}
                    >
                      <MenuItem component={CustomLink} href={"/portfolio"}>
                        <AccountCircle />
                        <span style={{ padding: "15px" }}>Portfolio</span>
                      </MenuItem>
                      <MenuItem onClick={this.logout}>
                        <ExitToApp />
                        <span style={{ padding: "15px" }}>Logout</span>
                      </MenuItem>
                    </StyledMenu>
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
              </Toolbar>
            </Container>
          </AppBar>
          <Toolbar />
        </>
      )
    }

    return <GuestNavBar />
  }
}

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    grow: {
      flexGrow: 1,
      display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "block"
      // },
      display: "block"
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        display: "inline"
      },
      marginRight: theme.spacing(2),
      display: "none"
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    },
    flex: {
      display: "flex"
    },
    appBar: {
      height: "80px",
      boxShadow: "none",
    },
    transparent: {
      background: "transparent !important",
      transition: "background 0.25s ease-in-out"
    },
    translucent: {
      background: "rgba(17, 17, 17, 0.847)",
      transition: "background 0.25s ease-in-out"
    },
    select: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        display: "inline"
      },
      marginRight: theme.spacing(2),
      display: "none"
    },
    toolBar: {
      minHeight: "80px"
    },
  }
}

export default withStyles(styles)(Header)
