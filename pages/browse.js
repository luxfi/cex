import React from 'react'
import { inject, observer } from 'mobx-react'
import router from 'next/router'
import {
  Container,
  Grid,
  Tabs,
  Tab,
  Toolbar,
  withStyles,
} from '@material-ui/core'

import classNames from 'classnames'
import { googlePageView } from '../util/generic'

import { MovieCard } from '../components/app'
import { Facets } from '../components/browse'
import styles from '../styles/pages/browse.style.js'

import tradingStatus from '../settings/tradingStatus'
  // must use CommonJS style since that file is used in the build system
const facets = require('../settings/facets')

@inject('store')
@observer
class Browse extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollTrigger: false
    }
  }

  componentDidMount = () => {
    this.props.store.movieStore.loadMovies(router.query) // safe call
    window.addEventListener('scroll', this.handleScroll);
    googlePageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }  

  handleScroll = () => {
    this.setState({
      scrollTrigger: (window.pageYOffset > 0)
    })
  }

  tabSelected = (i) => {
    this.props.store.movieStore.setTradingStatusFilter(tradingStatus.byIndex(i))
  }

    // cannot use fat-arrow for render as it breaks mobx observing :)
  render() {
    const { classes, store } = this.props
    const movieStore = store.movieStore

      // https://material-ui.com/customization/components/
    const tabGroupClasses = {
      indicator: classes.tabIndicator,
      flexContainer: classes.tabsContainer
    }
    const tabClasses = {
      root: classes.tabRoot,
      wrapper: classes.tabWrapper,
      selected: classes.selected, // see reference comment in style file
    }
  
    return (
      <Container maxWidth='xl'>
        <Toolbar className={classNames(
          classes.toolbar,
          this.state.scrollTrigger ? classes.solid : classes.transparent
        )}>
          <Tabs value={movieStore.tradingStatusFilter.index} onChange={(ignore, i) => { this.tabSelected(i) }} classes={tabGroupClasses}>
          {tradingStatus.values.map((status, i) => 
            <Tab label={status.title} disableRipple key={status.key} classes={tabClasses}/>
          )}
          </Tabs>
          <Facets movieStore={movieStore} facets={facets} />
        </Toolbar>
        <Grid container spacing={3} className={classes.main} alignItems='stretch'>
        {movieStore.filteredMovies.map((m, i) => (
          <Grid xs={12} sm={6} md={3} lg={2} item key={m.imdbid + i} >
            <MovieCard 
              movie={m} 
              goToMovieDetail={(movie) => {router.push(`/film/${movie.movieSlug}`)}} 
              goToMovieOffering={(movie) => {router.push(`/offering/${movie.movieSlug}`)}} 
              goToMovieTrading={(movie) => {router.push(`/trade/${movie.movieSlug}`)}} 
              playMovieTrailer={(movie) => console.log("PLAY TRAILER for " + movie.name)}
            />
          </Grid>
        ))}
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Browse)
