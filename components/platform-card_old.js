import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

export default class MarketCard extends React.Component {
  render() {
    let props = this.props

    return pug `
      Grid(item sm)
        img(src=props.img, style={height: '100%',width: '100%'})
    `
  }
}
