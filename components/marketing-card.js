import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

export default class MarketCard extends React.Component {
  render() {
    let props = this.props

    return pug `
      Grid(item sm)
        Card.market-card
          CardActionArea
            CardContent.market-card-content
              img(src=props.img)
              h5.market-title
                = props.title
              p
                = props.content
    `
  }
}
