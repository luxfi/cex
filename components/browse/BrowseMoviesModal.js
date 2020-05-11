import React from 'react'
import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import { MovieSearchWidget, Footer } from '../app'

import HeaderLogo from '../app/Header/HeaderLogo'
import BrowseMovies from './BrowseMovies'

import styles from './browseMoviesModal.style'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
});

const BrowseMoviesModal = ({ store, open }) => {
  const classes = useStyles()
  const router = useRouter()
  const { uiStore, movieStore } = store

  const handleClose = () => {
    router.back();
    uiStore.closeBrowseMovieModal();
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.iconSection}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <KeyboardBackspaceIcon />
            </IconButton>
            <HeaderLogo className={classes.logo} />
          </div>
          <MovieSearchWidget movies={movieStore.filteredMovies} />
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <BrowseMovies />
      </div>
      <Footer />
    </Dialog>
  )
}

export default inject('store')(observer(BrowseMoviesModal))
