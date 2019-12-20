import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import {
  AppBar,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'

import classNames from 'classnames'

  // TODO implement movies to pass as param to the widget! (currently hard coded in widget)
import { AutoCompleteSearch } from '../components/app'

import { googlePageView } from '../util/generic'

import styles from '../styles/pages/indexPage.style.js'
const useStyles = makeStyles(styles)

export default inject('store')(observer((props) => {

  let currentTab = 0
  if ('newReleases' in props) {
    currentTab = 1
  }
  else if ('recommended' in props) {
    currentTab = 2
  }

  const classes = useStyles()
  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const [tabIndex, setTabIndex] = useState(currentTab)

  useEffect(() => {
    props.store.movieStore.loadMovies() // safe call
    googlePageView()
  }, [])

  // https://material-ui.com/customization/components/
  const tabsClasses = {
    indicator: classes.tabIndicator,
  }

  const tabClasses = {
    root: classes.tabRoot,
    wrapper: classes.tabWrapper,
  }

  return (
    <Container maxWidth='xl'>
      <Toolbar className={classNames(
        classes.toolbar,
        trigger ? classes.solid : classes.transparent
      )}>
        <Tabs value={tabIndex} onChange={(ignore, i) => { setTabIndex(i) }} classes={tabsClasses}>
          <Tab label='Now Fundraising' disableFocusRipple key='fundraising' classes={tabClasses}/>
          <Tab label='New Releases' disableFocusRipple key='releases' classes={tabClasses}/>
          <Tab label='Your Recommended' disableFocusRipple key='recommended' classes={tabClasses}/>
        </Tabs>
        <AutoCompleteSearch placeholder='Search…' className={classes.search}/>
        <Facets classes={classes} className={classes.facetsOuter}/>
      </Toolbar>
      <Grid container spacing={3} className={classes.main}>
      {props.store.movieStore.movies.map((m) => (
        <Grid xs={12} sm={6} md={3} lg={2} item key={m.imdbid}>
          <Card className={classes.card} onClick={() => {Router.push(`/film/${m.movieSlug}`)}}>
            <CardMedia src={m.posterImg} className={classes.cardMedia} component='img'/>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">Ticker: <span className={classes.stat}>{m.ticker}</span></Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Container>
  )
}))
/*
    <Typography variant="body1">Price: <span className={classes.stat}>${m.price}</span></Typography>
    <Typography variant="body1">Value Delta: <span className={classes.stat}>{m.valueDelta}%</span></Typography>
    <Typography variant="body2">{m.financialDescription}</Typography>
*/

const Facets = (props) => (
  <div className={props.className}>
    <span className={props.classes.facetsLabel}>Filters</span>
    <Button className={props.classes.facetsButton} onClick={() => {console.log('test')}}>All Studios</Button>
    <Button className={props.classes.facetsButton} onClick={() => {console.log('test')}}>All Genres</Button>
  </div>
)