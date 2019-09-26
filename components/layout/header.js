import React from "react"

import Form, { MuiText } from "react-referential-forms"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import Input from "@material-ui/core/Input"
import InputBase from "@material-ui/core/InputBase"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Slide from "@material-ui/core/Slide"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import SearchIcon from "@material-ui/icons/Search"
import Link from "../link"
import Router from "next/router"

import Send from "@material-ui/icons/Send"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import ExitToApp from "@material-ui/icons/ExitToApp"

import { fade, withStyles } from "@material-ui/core/styles"
import { watch } from "react-referential"
import { getIdentity, removeIdentity } from "../../src/wallet"
import { classExpression } from "babel-types"

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

@watch("header")
class Header extends React.Component {
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

  account = () => {
    this.setState({
      anchorEl: null
    })
    Router.push("/account/")
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
    this.setState({
      anchorEl: null
    })

    this.props.rootData.ref("account").clear()
    removeIdentity()
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
    let { classes, onHomePage, ...props } = this.props
    let identity = getIdentity()
    let accountLoaded = !!this.props.rootData.get("account.id") && identity

    let open = !!this.state.anchorEl

    const LoggedInNavBar = () => {
      return (
        <AppBar
          className={classes.root}
          position="fixed"
          color="default"
        ></AppBar>
      )
    }

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
          <HideOnScroll>
            <AppBar
              id="navbar"
              position="fixed"
              className={onHomePage ? classes.transparent : ""}
              color={onHomePage ? "" : "white"}
            >
              {" "}
              <Container maxWidth="lg">
                <Toolbar className={`${classes.noPadding} ${classes.toolBar}`}>
                  <Link href="/" className={classes.flex}>
                    {" "}
                    {/* get rid of inline style */}
                    <img
                      id="logo"
                      src="/static/img/logo.png"
                      alt="ESX"
                      height="60px"
                    />
                  </Link>
                  <div className={classes.grow} />
                  <div className={classes.search}>
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
                        <AccountCircle style={{ fontSize: "36" }} />
                      </IconButton>
                      <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={this.account}>
                          <AccountCircle />
                          <span style={{ padding: "15px" }}>Account</span>
                        </MenuItem>
                        <MenuItem onClick={this.deposit}>
                          <ArrowUpward />
                          <span style={{ padding: "15px" }}>Deposit</span>
                        </MenuItem>
                        {/* <MenuItem onClick={this.send}> // propbably won't need this, decide later (tyler)
                        <Send />
                        <span style={{ padding: "15px" }}>Send</span>
                      </MenuItem> */}
                        <MenuItem onClick={this.withdrawal}>
                          <ArrowDownward />
                          <span style={{ padding: "15px" }}>Withdrawal</span>
                        </MenuItem>
                        <MenuItem onClick={this.logout}>
                          <ExitToApp />
                          <span style={{ padding: "15px" }}>Logout</span>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        onClick={this.login}
                        className={classes.menuButton}
                      >
                        Login
                      </Button>
                      <Button
                        color="inherit"
                        variant="outlined"
                        onClick={this.signup}
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
        </>
      )
    }

    return <GuestNavBar />

    return pug`
        if accountLoaded
          AppBar(
            className=classes.root
            position='fixed'
            color="default"
          )
            Toolbar(className=classes.noPadding)
              Link(href='/')
                img(id="logo" className=classes.logoImg src='/static/img/logo.png')
              div(className=classes.grow)
              MuiText(
                select
                value='usd'
                className=classes.menuButton
                SelectProps={
                  MenuProps: {
                    className: classes.menu,
                  },
                }
                margin="normal"
                options=currencies
              )
              IconButton(
                aria-owns=(open ? 'menu-appbar' : undefined)
                aria-haspopup='true'
                onClick=this.handleMenu
                color='inherit'
              )
                AccountCircle(style={ fontSize: 36 })
              Menu(
                id='menu-appbar'
                anchorEl=this.state.anchorEl
                anchorOrigin={
                  vertical: 'bottom',
                  horizontal: 'right',
                }
                transformOrigin={
                  vertical: 'bottom',
                  horizontal: 'right',
                }
                open=open
                onClose=this.handleClose
              )
                MenuItem(onClick=this.account)
                  AccountCircle
                  span(style={ padding: 15}) Account
                MenuItem(onClick=this.deposit)
                  ArrowUpward
                  span(style={ padding: 15}) Deposit
                MenuItem(onClick=this.send)
                  Send
                  span(style={ padding: 15}) Send
                MenuItem(onClick=this.redeem)
                  ArrowDownward
                  span(style={ padding: 15}) Redeem
                MenuItem(onClick=this.logout)
                  ExitToApp
                  span(style={ padding: 15}) Logout
        else
          AppBar(
            className=classes.root
            position='fixed'
            color="default"
          )#navbar
            Toolbar(className=classes.noPadding)
              Link(href='/')
                img(id="logo" className=classes.logoImg src='/static/img/logo.png')
              div(className=classes.grow)

              Button(onClick=this.login style={marginRight: '20px'})
                |LOGIN

              Button(
                variant="outlined"
                className=classes.button
                onClick=this.signup)
                |SIGN UP
    `
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
    toolBar: {}
  }
}

export default withStyles(styles)(Header)
