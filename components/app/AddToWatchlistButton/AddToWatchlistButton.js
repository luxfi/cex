import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import React from 'react'

import styles from './addToWatchlistbutton.style'

const useStyles = makeStyles(styles)

const AddToWatchlist = (props) => {
  const {
    store: { userPortfolio, userStore, uiStore },
    className,
    movie,
  } = props
  const { watchlist } = userPortfolio
  const defaultClasses = useStyles()

  const obj = (watchlist.includes(movie.ticker)) ? {
    func: () => userPortfolio.removeFromWatchlist(movie.ticker),
    buttonText: 'Remove from watchlist',
  } : {
    func: () => userPortfolio.addToWatchlist(movie.ticker),
    buttonText: 'Add to watchlist',
  }
  const handleClick = () => {
    if (!userStore.loggedIn) {
      uiStore.openAuthModal()
      return false
    }

    obj.func()
  }

  return (
    <Button
      rel='noopener noreferrer'
      variant='contained'
      className={className || defaultClasses.addToWatchlistButton}
      onClick={handleClick}
    >
      {obj.buttonText}
    </Button>
  )
}

export default inject('store')(observer(AddToWatchlist))
