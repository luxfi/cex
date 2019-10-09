import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import BigNumber from 'bignumber.js'

export default class InvestCard extends React.Component {
  render() {
    let token = this.props

    let name    = token.name
    let type    = token.type
    let count   = new BigNumber(token.count).toFormat(0)
    let shares  = '$' + new BigNumber(token.shares).toFormat(0)
    let value   = '$' + new BigNumber(token.count * token.price).toFormat(0)
    let price   = '$' + new BigNumber(token.price).toFormat(2)
    let preview = 'url(/static/img/previews/' + token.preview + ')'

    return pug `
      Card.token-card
        CardActionArea
          CardContent.token-card-content(style={
              backgroundImage: preview,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
              height: 170,
            })
            h6.token-type
              = type
          CardContent.token-card-content
            h6
              = name
            br
            h6.token-value
              = shares
    `
  }
}
