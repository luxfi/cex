import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core'

import { MovieCard, Loading } from '../app'
import FacetsToolbar from './FacetsToolbar'

import tradingStatus from '../../settings/tradingStatus'

import styles from './browseMovies.style'
  
@withRouter
@withStyles(styles)
@inject('store')
@observer
class BrowseMovies extends React.Component {
  componentDidMount() {
    const { store: { movieStore } } = this.props
    movieStore.loadMovies()
  }

  tabSelected = (i) => {
    const { store: { movieStore } } = this.props
    movieStore.setTradingStatusFilter(tradingStatus.byIndex(i))
  }

  render() {
    const { classes, store, router } = this.props
    const { movieStore } = store

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
          classes={{
            ...classes,
            tabClasses,
            tabGroupClasses,
          }}
        />
        <Loading loading={movieStore.loadingBrowseMovies}>
          <Grid container spacing={3} className={classes.resultsOuter} alignItems='stretch'>
          {
            movieStore.filteredMovies.length ? (
              movieStore.filteredMovies.map((m, i) => (
                <Grid xs={12} sm={6} md={4} lg={2} item key={m.imdbid + i} >
                  <MovieCard
                    movie={m}
                    goToMovieDetail={(movie) => { router.push(`/film/${movie.movieSlug}`) }}
                    goToMovieOffering={(movie) => { router.push(`/offering/${movie.movieSlug}`) }}
                    goToMovieTrading={(movie) => { router.push(`/trade/${movie.movieSlug}`) }}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" className={classes.noFilmMessage}>No film found</Typography>
            )
          }
          {!movieStore.movies.length && <Typography style={{ textAlign: 'center', width: '100%' }}>No movie found</Typography>}
          </Grid>
        </Loading>
      </div>
    )
  }
}

export default BrowseMovies
