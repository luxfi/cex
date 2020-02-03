import React from 'react'
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

import styles from './MovieCard.style.js'
const useStyles = makeStyles(styles)

export default ({movie, onClick, height}) => {
  const classes = useStyles()
  const style = (height) ? { height: height, width: 'auto' } : {} 
  return (
    <Card className={classes.card} onClick={() => {onClick(movie)}}>
      <CardMedia src={movie.posterImg} className={classes.cardMedia} component='img' style={style}/>
      <CardContent className={classes.cardContent}>
        <Typography variant="body2">Name: <span className={classes.stat}>{movie.name}</span></Typography>
        <Typography variant="body1">Ticker: <span className={classes.stat}>{movie.ticker}</span></Typography>
      </CardContent>
    </Card>
  )
} 


