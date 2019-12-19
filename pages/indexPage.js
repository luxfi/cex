import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'


import { googlePageView } from '../util/generic'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.1) !important',
      cursor: 'pointer',
    },
    '&:hover $cardContent': {
      visibility: 'visible',
    }

  },
  media: {
  },
  cardMedia: {
    objectFit: 'cover'
  },
  cardContent: {
    visibility: 'hidden',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#222',
    opacity: '0.8'
  },
  stat: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  }
}))

export default inject('store')(observer((props) => {
  const classes = useStyles()

  useEffect(() => {
    googlePageView()
  }, [])

  return (
    <Container>
      <Grid container spacing={3}>
      {props.store.movieStore.movies.map((m, i) => (
        <Grid xs={12} sm={6} md={3} lg={2} item key={m.movieSlug + i}>
          <Card className={classes.card} onClick={() => {Router.push(`/film/${m.movieSlug}`)}}>
            <CardMedia src={m.posterImg} className={classes.cardMedia} component='img'/>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">Ticker: <span className={classes.stat}>{m.ticker}</span></Typography>
              <Typography variant="body1">Price: <span className={classes.stat}>${m.price}</span></Typography>
              <Typography variant="body1">Value Delta: <span className={classes.stat}>{m.valueDelta}%</span></Typography>
              <Typography variant="body2">{m.financialDescription}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Container>
  )
}))
