import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import {
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
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames'

  // TODO implement movies to pass as param to the widget! (currently hard coded in widget)
import { AutoCompleteSearch } from '../components/app'

import { googlePageView } from '../util/generic'

import styles from '../styles/pages/browse.style.js'

@inject('store')
@observer
class Browse extends React.Component {

  constructor(props) {
    super(props)
    let currentTab = 0
    if ('newReleases' in props) {
      currentTab = 1
    }
    else if ('recommended' in props) {
      currentTab = 2
    }
    this.state = {
      tabIndex: currentTab,
      scrollTrigger: false
    }
  }

  componentDidMount = () => {
    this.props.store.movieStore.loadMovies() // safe call
    window.addEventListener("scroll", this.handleScroll);
    googlePageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  }  

  handleScroll = () => {
    this.setState({
      scrollTrigger: (window.pageYOffset > 0)
    })
  }

  setTabIndex = (i) => {
    this.setState({tabIndex: i})
  }

  render = () => {
    const { classes } = this.props
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
          this.state.scrollTrigger ? classes.solid : classes.transparent
        )}>
          <Tabs value={this.state.tabIndex} onChange={(ignore, i) => { this.setTabIndex(i) }} classes={tabsClasses}>
            <Tab label='Now Fundraising' disableFocusRipple key='fundraising' classes={tabClasses}/>
            <Tab label='New Releases' disableFocusRipple key='releases' classes={tabClasses}/>
            <Tab label='Your Recommended' disableFocusRipple key='recommended' classes={tabClasses}/>
          </Tabs>
          <AutoCompleteSearch placeholder='Search…' className={classes.search}/>
          <Facets classes={classes} className={classes.facets}/>
        </Toolbar>
        <Grid container spacing={3} className={classes.main}>
        {this.props.store.movieStore.movies.map((m, i) => (
          <Grid xs={12} sm={6} md={3} lg={2} item key={m.imdbid + i}>
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
  }
  
}

export default withStyles(styles)(Browse)
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