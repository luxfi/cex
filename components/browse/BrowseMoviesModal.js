import React from 'react'
import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { MovieSearchWidget, Header } from '../app'

import HeaderLogo from '../app/Header/HeaderLogo'
import BrowseMovies from './BrowseMovies'

import styles from './browseMoviesModal.style'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
});

const BrowseMoviesModal = ({ store, open }) => {
  const classes = useStyles()
  const router = useRouter()
  const { uiStore, movieStore, userStore } = store

  const handleClose = () => {
    uiStore.closeBrowseMovieModal()
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
      <Header
        loggedIn={userStore.loggedIn}
        movies={movieStore.filteredMovies}
        openMobileMenu={() => {uiStore.setRightDrawerOpen(true)}}
        handleLogout={() => {userStore.logout()}}
        handleClose={handleClose}
      />
      <div className={classes.main}>
        <BrowseMovies />
      </div>
    </Dialog>
  )
}

export default inject('store')(observer(BrowseMoviesModal))
