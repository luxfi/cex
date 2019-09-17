import React from 'react'

import Form, { MuiText } from 'react-referential-forms'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from '../link'
import Router from 'next/router'

import Send from '@material-ui/icons/Send'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import ExitToApp from '@material-ui/icons/ExitToApp'

import { withStyles } from '@material-ui/core/styles'
import { watch } from 'react-referential'
import {
  getIdentity,
  removeIdentity,
} from '../../src/wallet'

let currencies = {
  usd: 'USD',
  eur: 'EUR',
  jpy: 'JPY',
}

@watch('header')
class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
    }

    this.lastScroll = null;
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(evt) {
    let identity = getIdentity()
    let accountLoaded = !!this.props.rootData.get('account.id') && identity

    if (accountLoaded) {
      return
    }

    const lastScroll = window.scrollY;

    if (lastScroll === this.lastScroll) {
      return;
    }

    const shouldShow = (this.lastScroll !== null) ?  (lastScroll < this.lastScroll) : null;

    if (shouldShow !== this.state.shouldShow) {
      this.setState((prevState, props) => ({
        ...prevState,
        shouldShow,
      }));
      if (shouldShow) {
        document.getElementById("navbar").style.transform = 'translateY(0)';
        document.getElementById("navbar").style.transition = 'transform 1s';

      }
      else if (!shouldShow) {
        document.getElementById("navbar").style.transform = 'translateY(-115px)';
        document.getElementById("navbar").style.transition = 'transform 1s';
      }
    }

    if (window.scrollY === 0) {
      document.getElementById("navbar").style.backgroundColor = 'transparent';
      document.getElementById("navbar").style.transition = 'background-color .5s';
    }
    else {
      document.getElementById("navbar").style.backgroundColor = "#1a1e3c";
    }

    this.lastScroll = lastScroll;
  }

  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  account = () => {
    this.setState({
      anchorEl: null,
    })
    Router.push('/account/')
  }

  send = () => {
    this.setState({
      anchorEl: null,
    })
    Router.push('/account/send')
  }

  deposit = () => {
    this.setState({
      anchorEl: null,
    })
    Router.push('/account/deposit')
  }

  redeem = () => {
    this.setState({
      anchorEl: null,
    })
    Router.push('/account/redeem')
  }

  logout = () => {
    this.setState({
      anchorEl: null,
    })

    this.props.rootData.ref('account').clear()
    removeIdentity()
    Router.push('/')
  }

  login = () => {
    this.setState({
      anchorEl: null,
    })

    Router.push('/')
  }

  signup = () => {
    this.setState({
      anchorEl: null,
    })

    Router.push('/signup')
  }

  render() {
    let { classes, ...props } = this.props
    let identity = getIdentity()
    let accountLoaded = !!this.props.rootData.get('account.id') && identity

    let open = !!this.state.anchorEl

    return pug`
        if accountLoaded
          AppBar(
            className=classes.root
            position='fixed'
            color="default"
          )
            Toolbar(className=classes.noPadding)
              Link(href='/')
                img(className=classes.logoImg src='/static/img/logo.svg')
              div(className=classes.grow)
              MuiText(
                select
                value='usd'
                className=classes.textField
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
                img(className=classes.logoImg src='/static/img/logo.svg')
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

const styles = (theme) => {
  return {
    root: {
      background: 'transparent',
      boxShadow: 'none',
    },
    noPadding: {
      padding: 0,
    },
    grow: {
      flexGrow: 1,
    },
    logoImg: {
      marginTop: 7,
      maxHeight: 42,
    },
    textField: {
      marginTop: -7,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    menu: {
      width: 200,
    }
  }
}

export default withStyles(styles)(Header)
