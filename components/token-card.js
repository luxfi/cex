import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

export default class TokenCard extends React.Component {
  render() {
    let props = this.props

    return pug `
      Card.token-card
        CardActionArea
          CardContent.token-card-content
            h6.token-type
              = props.type
            h1.token-count
              = props.count
            h6.token-name
              = props.name
              p
                = props.status
          CardContent.token-card-content
            h6.token-value
              = props.value + ' @ ' + props.price
    `
  }
}
