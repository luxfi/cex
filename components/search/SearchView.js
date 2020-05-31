import React from 'react'
import { useObserver } from 'mobx-react'
import { useRouter } from 'next/router'

import {
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { MovieCard } from '../app'
import FacetsToolbar from './FacetsToolbar'

import styles from './searchView.style.js'
const useStyles = makeStyles(styles)
  
export default ({ stockStore }) => {

  const s = useStyles()
  const router = useRouter()

  const tabGroupClasses = {
    indicator: s.tabIndicator,
    flexContainer: s.tabsContainer,
  }
  const tabClasses = {
    root: s.tabRoot,
    wrapper: s.tabWrapper,
    selected: s.selected, // see reference comment in style file
  }

  return useObserver(() => (
    <div className={s.main}>
      <FacetsToolbar
        stockStore={stockStore}
        classes={{
          ...s,
          tabClasses,
          tabGroupClasses,
        }}
      />
      {(!stockStore.filteredResultSet.length || !stockStore.movies.length) &&
        <Typography style={{ textAlign: 'center', width: '100%' }}>None found.</Typography>
      }
      {stockStore.filteredResultSet.length && 
        <Grid container spacing={3} className={s.resultsOuter} alignItems='stretch'>
        {stockStore.filteredResultSet.map((stock) => (
          <Grid xs={12} sm={6} md={4} lg={2} item key={m.id} >
            <MovieCard
              movie={stock}
              goToMovieDetail={(stock) => { router.push(`/film/${stock.movieSlug}`) }}
              goToMovieOffering={(stock) => { router.push(`/offering/${stock.movieSlug}`) }}
              goToMovieTrading={(stock) => { router.push(`/trade/${stock.movieSlug}`) }}
            />
          </Grid>
        ))}
        </Grid>
      }
    </div>
  ))
}
