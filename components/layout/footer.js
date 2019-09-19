import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Router from 'next/router'
import Link from '../link'

import { withStyles } from '@material-ui/core/styles'
import { watch } from 'react-referential'
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet'
import LocalMovies from '@material-ui/icons/LocalMovies'
import TableChart from '@material-ui/icons/TableChart'
import { getIdentity } from '../../src/wallet'

@watch('footer')
class Footer extends React.Component {
  render() {
    let { classes, ...props } = this.props
    let identity = getIdentity()

    let accountLoaded = !!this.props.rootData.get('account.id') && identity

    return pug`
        if accountLoaded
          footer
            Toolbar(className=classes.noPadding)
              div(className=classes.flex1)
                Link(
                  className=classes.blockLink
                  href='/invest'
                  color= Router.route.includes('/invest') ? 'white' : 'primary'
                  underline='none'
                )
                  LocalMovies
                  .command Invest

              div(className=classes.flex1)
                Link(
                  className=classes.blockLink
                  href='/portfolio'
                  color= Router.route == '/portfolio' ? 'white' : 'primary'
                  underline='none'
                )
                  AccountBalanceWallet(className=classes.rotated)
                  .command Portfolio

              div(className=classes.flex1)
                Link(
                  className=classes.blockLink
                  href='/trade'
                  color= Router.route == '/trade' ? 'white' : 'primary'
                  underline='none'
                )
                  TableChart
                  .command Trade
    `
  }
}

const styles = (theme) => {
  return {
    flex1: {
      flex: 1,
      textAlign: 'center',
      padding: 2 * theme.spacing.unit,
    },
    noPadding: {
      padding: 0,
    },
    rotated: {
      transform: 'rotate(-45deg)',
      position: 'relative',
      left: '3px',
    },
    blockLink: {
      display: 'block',
    },
  }
}

export default withStyles(styles)(Footer)

