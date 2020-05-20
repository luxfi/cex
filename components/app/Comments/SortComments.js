import React, { useRef, useEffect, useReducer } from 'react'
import { inject, observer } from 'mobx-react'


import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import SortIcon from '@material-ui/icons/Sort'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))

const SortComments = inject('store')(observer(({ store }) => {
  const classes = useStyles()
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    open: false,
    sortBy: 'recent',
  })
  const anchorRef = useRef(null)

  const { commentStore } = store

  const handleToggle = () => {
    setState({ open: !state.open })
  }

  const handleClose = (event) => {
    event.stopPropagation()
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setState({
      open: false,
    })
  }

  const handleSort = (event, sortBy) => {
    setState({ sortBy })
    handleClose(event)
    commentStore.sortComments(sortBy)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setState({
        open: false,
      })
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(state.open)
  useEffect(() => {
    if (prevOpen.current === true && state.open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = state.open
  }, [state.open])

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          onClick={handleToggle}
          variant='contained'
          size='small'
          className={classes.shareButton}
          startIcon={<SortIcon />}
          id='sortCommentButton'
        >
          {`Sort (${state.sortBy})`}
        </Button>


        <Popper open={state.open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener mouseEvent='onClick' onClickAway={handleClose}>
                  <MenuList autoFocusItem={state.open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                    <MenuItem className='sortCommentItem' selected={state.sortBy === 'recent'} onClick={(event) => handleSort(event, 'recent')}>Most recent</MenuItem>
                    <MenuItem className='sortCommentItem' selected={state.sortBy === 'top'} onClick={(event) => handleSort(event, 'top')}>Top comments</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}))

export default SortComments
