import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import router from 'next/router'
import React from 'react'
import { MovieCard } from '../components/app'
import FacetsToolbar from '../components/browse'

import tradingStatus from '../settings/tradingStatus'
import styles from '../styles/pages/browse.style'
import { googlePageView } from '../util'


// must use CommonJS style since that file is used in the build system
@inject('store')
@observer
class Browse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollTrigger: false,
    }
  }

  componentDidMount = () => {
    const { store: { movieStore } } = this.props
    movieStore.loadMovies(router.query) // safe call
    window.addEventListener('scroll', this.handleScroll)
    googlePageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({
      scrollTrigger: (window.pageYOffset > 0),
    })
  }

  tabSelected = (i) => {
    const { store: { movieStore } } = this.props
    movieStore.setTradingStatusFilter(tradingStatus.byIndex(i))
  }

  // cannot use fat-arrow for render as it breaks mobx observing :)
  render() {
    const { classes, store } = this.props
    const { scrollTrigger } = this.state
    const { movieStore } = store

    // https://material-ui.com/customization/components/
    const tabGroupClasses = {
      indicator: classes.tabIndicator,
      flexContainer: classes.tabsContainer,
    }
    const tabClasses = {
      root: classes.tabRoot,
      wrapper: classes.tabWrapper,
      selected: classes.selected, // see reference comment in style file
    }

    return (
      <div className={classes.main}>
        <FacetsToolbar
          scrollTrigger={scrollTrigger}
          classes={{
            ...classes,
            tabClasses,
            tabGroupClasses,
          }}
        />

        <Grid container spacing={3} className={classes.resultsOuter} alignItems='stretch'>
        {
          movieStore.filteredMovies.length ? (
            movieStore.filteredMovies.map((m, i) => (
              <Grid xs={12} sm={6} md={3} lg={2} item key={m.imdbid + i} >
                <MovieCard
                  movie={m}
                  goToMovieDetail={(movie) => { router.push(`/film/${movie.movieSlug}`) }}
                  goToMovieOffering={(movie) => { router.push(`/offering/${movie.movieSlug}`) }}
                  goToMovieTrading={(movie) => { router.push(`/trade/${movie.movieSlug}`) }}
                />
              </Grid>
            ))
          ) : (
            <Typography className={classes.noFilmMessage}>No film found</Typography>
          )
        }
        {!movieStore.movies.length && <Typography style={{ textAlign: 'center', width: '100%' }}>No movie found</Typography>}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Browse)
