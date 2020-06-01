import React from 'react'
import { useObserver } from 'mobx-react'
import { useRouter } from 'next/router'

import {
  Grid,
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core'

import { MovieCard } from '../app'

import { truncate  } from "../../util"

import Toolbar from './Toolbar'

import styles from './searchView.style.js'
const useStyles = makeStyles(styles)
  
const ALIGN = 'left'

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

  const renderGridView = () => (
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
  ) 

  const renderListView = () => (
    <Table className={s.tableView} padding='checkbox' aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>&nbsp;</TableCell>
          <TableCell align={ALIGN}>Title</TableCell>
          <TableCell align={ALIGN}>Director(s)</TableCell>
          <TableCell align={ALIGN}>Actor(s)</TableCell>
          <TableCell align={ALIGN}>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {stockStore.filteredResultSet.map((stock) => (
        <TableRow key={stock.name}>
          <TableCell align={ALIGN} >
            <img src={stock.heroImg} height='30' width='auto'/>
          </TableCell>
          <TableCell align={ALIGN}>{stock.name}</TableCell>
          <TableCell align={ALIGN}>{stock.director.join(', ')}</TableCell>
          <TableCell align={ALIGN}>{stock.actors.join(', ')}</TableCell>
          <TableCell align={ALIGN}>{truncate(stock.shortDescription, 6)}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  ) 

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
      {(stockStore.filteredResultSet.length > 0 ) && renderListView()}
    </div>
  ))
}
