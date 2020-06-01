import React from 'react'
import { useObserver } from 'mobx-react'
import { useRouter } from 'next/router'

import {
  Divider,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { MovieCard } from '../app'
import Toolbar from './Toolbar'

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
      <Toolbar
        stockStore={stockStore}
        classes={{
          ...s,
          tabClasses,
          tabGroupClasses,
        }}
      />
      {(!stockStore.filteredResultSet.length || !stockStore.stocks.length) &&
        <Typography style={{ textAlign: 'center', width: '100%', marginTop: '50px', opacity: 0.4 }}>None </Typography>
      }
      {(stockStore.filteredResultSet.length > 0 ) && (
        <Grid container spacing={3} className={s.resultsOuter} alignItems='stretch'>
        {stockStore.filteredResultSet.map((stock) => (
          <Grid xs={12} sm={6} md={4} lg={2} item key={stock.id} >
            <MovieCard
              movie={stock}
              goToMovieDetail={(stock) => { router.push(`/film/${stock.slug}`) }}
              goToMovieOffering={(stock) => { router.push(`/offering/${stock.slug}`) }}
              goToMovieTrading={(stock) => { router.push(`/trade/${stock.slug}`) }}
            />
          </Grid>
        ))}
        </Grid>
      )}
    </div>
  ))
}
