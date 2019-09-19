import React from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import YouTube from 'react-youtube'
import BigNumber from 'bignumber.js'

import Add from '@material-ui/icons/Add'
import Share from '@material-ui/icons/Share'

import {
  MuiText,
} from 'react-referential-forms'

import { withStyles } from '@material-ui/core/styles'
import { watch } from 'react-referential'
import { loadable } from '../../components/app/loader'
import {withRouter} from 'next/router'

import {
  getEncodedPrivateKey,
  canDecodePrivateKey,
} from '../../src/wallet'

import tokens from '../../tokens'

@watch('sendPage')
@loadable
class Deal extends React.Component {
  constructor(props) {
    super(props)

    if (!getEncodedPrivateKey() || !canDecodePrivateKey()) {
      this.logout()
    }

    this.state = {}
  }

  logout() {
    this.props.rootData.ref('account').clear()
    Router.push('/')
  }

  render() {
    let { href, classes, router } = this.props
    let token = tokens.filter((v) => v.slug == router.query.slug)[0]

    let opts = {
      width:  '640',
      height: '390',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        modestbranding: 1,
        controls:       0,
        showinfo:       0,
        rel:            0,
        autoplay:       0,
      }
    }

    let count    = new BigNumber(token.count).toFormat(0)
    let goal   = '$' + new BigNumber(token.shares).toFormat(0)
    let funded   = '$' + new BigNumber(token.funded).toFormat(0)
    let percent  = new BigNumber(token.funded / token.shares * 100).toFormat(0) + '% funded'
    let value    = '$' + new BigNumber(token.count * token.price).toFormat(0)
    let price    = '$' + new BigNumber(token.price).toFormat(2)
    let minimum  = '$' + new BigNumber(token.minimum).toFormat(0)
    let daysLeft = Math.round((token.closeDate - (new Date)) / (1000 * 60 * 60 * 24))

    return pug`
      main#invest-deal.account

        h1= token.name
        p(style={color: 'white'})= token.producers
        .content.columns.align-flex-start
          .column.flex3
            .details-header
              YouTube(videoId=token.trailer, opts=opts)
            .details-header-bg
              img(src='/static/img/previews/' + token.preview)

          .column
            .details-info
              h2 #{funded}
              h5 #{percent}

              p(style={color: '#888'}) From
              h3 #{token.investors} investors

              p(style={color: '#888'}) Time left to invest
              h3 #{daysLeft} days

              br
              MuiText(
                label='Amount'
                value=minimum
                variant='outlined'
              )
              br
              Button(variant='contained', style={width: '100%'})
                | INVEST

              br
              br

              Button(variant='outlined', style={width: '48%'})
                | Follow
                Add

              Button(variant='outlined', style={width: '48%', float: 'right'})
                | Share
                Share

        Paper.details-bar
          Toolbar
            Button About
            Button FAQ
            Button Discussion
            Button Updates
        .content.columns.align-flex-start
          br
          .column.flex3
            br
            p= token.synopsis
            br
            h6 Directors
            p= token.directors
            h6 Writers
            p= token.writers
            h6 Stars
            p= token.stars
            h6 Genre
            p= token.genres
            h6 MPAA Rating
            p= token.mpaa

            // br
            // h3 FAQ

            // br
            // h3 Discussion

            // br
            // h3 Updates

          .column
            br
            .details-levels
              Card
                CardContent
                  p Funding goal
                  h5= goal
                CardContent
                  p Minimum Investment
                  h5= minimum
                CardContent
                  p Instrument
                  h5= token.security[0].toUpperCase() + token.security.substring(1)
                CardContent
                  p Regulation
                  h5= token.regulation
                if token.discount > 0
                  CardContent
                    p Discount
                    h5= discount
                if token.interest
                  CardContent
                    p Interest
                    h5= token.interest
                CardContent
                  p Deadline
                  h5 #{token.closes}, 11:59 (PDT)
      `
  }
}

const styles = (theme) => {
  return {
    rotated: {
      transform: 'rotate(-45deg)',
      position: 'relative',
      left: '3px',
    },
  }
}

export default withRouter(withStyles(styles)(Deal))
