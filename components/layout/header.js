import React from "react"
import { inject, observer } from "mobx-react"

// Material components
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import InputBase from "@material-ui/core/InputBase"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Slide from "@material-ui/core/Slide"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Link from "@material-ui/core/Link"

// Material icons
import SearchIcon from "@material-ui/icons/Search"
import ExitToApp from "@material-ui/icons/ExitToApp"

// Material styles
import { fade, withStyles, MuiThemeProvider } from "@material-ui/core/styles"

// Core components
import AutoCompleteSearch from "../AutoCompleteSearch"

import NextLink from "next/link"
import Router from "next/router"

let currencies = {
  usd: "USD",
  eur: "EUR",
  jpy: "JPY"
}

// replace custom code to use material native hideonscroll
function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </NextLink>
  )
)

@inject("store")
@observer
class Header extends React.Component {
  // static async getInitialProps({ mobxStore }) {
  //   return { ...mobxStore }
  // }

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  portfolio = () => {
    this.setState({
      anchorEl: null
    })
    Router.push("/portfolio")
  }

  send = () => {
    this.setState({
      anchorEl: null
    })
    Router.push("/account/send")
  }

  deposit = () => {
    this.setState({
      anchorEl: null
    })
    Router.push("/account/deposit")
  }

  withdrawal = () => {
    this.setState({
      anchorEl: null
    })
    Router.push("/account/withdrawal")
  }

  logout = () => {
    this.props.store.userStore.logout()
    Router.push("/")
  }

  login = () => {
    this.setState({
      anchorEl: null
    })

    Router.push("/login")
  }

  signup = () => {
    this.setState({
      anchorEl: null
    })

    Router.push("/signup")
  }

  render() {
    let { classes, store, onHomePage, darkTheme, lightTheme } = this.props
    // let accountLoaded = !!this.props.rootData.get("account.id") && identity
    let accountLoaded = store.userStore.loggedIn

    let open = !!this.state.anchorEl

    const GuestNavBar = () => {
      const [anchorEl, setAnchorEl] = React.useState(null)
      const open = Boolean(anchorEl)

      function handleClick(event) {
        setAnchorEl(event.currentTarget)
      }

      function handleClose() {
        setAnchorEl(null)
      }
      return (
        <>
          <MuiThemeProvider theme={onHomePage ? darkTheme : lightTheme}>
            <HideOnScroll>
              <AppBar
                id="navbar"
                position="fixed"
                color="inherit"
                className={
                  onHomePage ? classes.transparent : classes.whiteBackground
                }
              >
                {" "}
                <Container maxWidth="lg">
                  <Toolbar
                    className={`${classes.noPadding} ${classes.toolBar}`}
                  >
                    <Link
                      href="/"
                      className={classes.flex}
                      component={CustomLink}
                    >
                      {" "}
                      {/* get rid of inline style */}
                      <img
                        id="logo"
                        src="/static/img/logo.png"
                        alt="ESX"
                        height="60px"
                      />
                    </Link>
                    <Typography variant="subtitle2">
                      Entertainment Stock Exchange
                    </Typography>
                    <div className={classes.grow} />
                    {/* <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </div> */}
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
                        {/* <MuiText
                        select
                        value="usd"
                        className={`${classes.menuButton} ${classes.select}`}
                        margin="normal"
                        options={currencies}
                      /> */}
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
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem component={CustomLink} href={"/portfolio"}>
                            <AccountCircle />
                            <span style={{ padding: "15px" }}>Portfolio</span>
                          </MenuItem>
                          {/* <MenuItem onClick={this.deposit}>
                          <ArrowUpward />
                          <span style={{ padding: "15px" }}>Deposit</span>
                        </MenuItem>
                        {/* <MenuItem onClick={this.send}> // propbably won't need this, decide later (tyler)
                        <Send />
                        <span style={{ padding: "15px" }}>Send</span>
                      </MenuItem> */}
                          {/* <MenuItem onClick={this.withdrawal}>
                          <ArrowDownward />
                          <span style={{ padding: "15px" }}>Withdrawal</span>
                        </MenuItem> */}
                          <MenuItem onClick={this.logout}>
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
                          // onClick={this.login}
                          className={classes.menuButton}
                        >
                          Login
                        </Button>
                        <Button
                          component={CustomLink}
                          color="inherit"
                          variant="outlined"
                          href={"/signup"}
                          // onClick={this.signup}
                          className={classes.menuButton}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </Toolbar>
                </Container>
              </AppBar>
            </HideOnScroll>
            <Toolbar />
          </MuiThemeProvider>
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
    transparent: {
      background: "transparent !important",
      boxShadow: "none",
      color: "#FFFFFF",
      paddingTop: "25px"
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
    toolBar: {},
    white: {
      color: "white"
    },
    whiteBackground: {
      backgroundColor: "white"
    }
  }
}

export default withStyles(styles)(Header)
