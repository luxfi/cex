import React from 'react'
import {
  //Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import classNames from 'classnames'

import styles from './MovieCard.style.js'
const useStyles = makeStyles(styles)

export default ({movie, onClick, height, className}) => {
  const classes = useStyles()
  const style = (height) ? { height: height, width: 'auto' } : {} 

  const auxContent = (movie.trading) ? 
  (
    <span> trading stuff</span>
  ) : (
    <span> funding stuff</span>
  )

  return (
    <Card className={classNames(classes.card, className)} onClick={() => {onClick(movie)}}>
      <CardMedia src={movie.posterImg} className={classes.cardMedia} component='img' style={style}/>
      <CardContent className={classes.cardContent}>
        <Box className={classes.innerCardContent}>
          <Typography className={classes.title} variant="body2">{movie.name}</Typography>
          <Box className={classes.hoverContent}>
            <Typography className={classes.status} variant="body2"><span className={classes.label}>Status: </span>{movie.trading ? 'Trading' : 'Funding'}</Typography>
            {auxContent}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
} 


