
import {
  Button,
  ClickAwayListener,
  Fade,
  Grow,
  Paper,
  Popper,
  Snackbar,
} from '@material-ui/core'

import { Share as ShareIcon } from '@material-ui/icons'
import { inject, observer } from 'mobx-react'
import React, {
  useEffect,
  useReducer,
  useRef,
} from 'react'


import ShareButtons from '../ShareButtons'

import useStyles from './ShareWidget.style'

const ShareWidget = (props) => {
  const [state, setState] = useReducer((initialState, newState) => ({ ...state, ...newState }), {
    open: false,
    copyURL: false,
  })
  const {
    store: { userStore }, className = '', shareUrl, message,
  } = props

  const classes = useStyles()

  const anchorRef = useRef(null)

  const handleToggle = () => {
    setState({
      open: !state.open,
    })
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setState({
      open: false,
    })
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(state.open)
  useEffect(() => {
    if (prevOpen.current && !state.open) {
      anchorRef.current.focus()
    }

    prevOpen.current = state.open
  }, [state.open])


  const referralURL = `${shareUrl}?ref=${userStore.referrerId}`

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        variant='contained'
        size='small'
        className={`${classes.shareButton} ${className}`}
        startIcon={<ShareIcon/>}
        onClick={handleToggle}
      >
        Share
      </Button>

      <Popper open={state.open} anchorEl={anchorRef.current} role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <ShareButtons
                show={['Facebook', 'Twitter', 'LinkedIn', 'Email']}
                shareURL={referralURL}
                message={message}
                iconSize='small'
                orientation='vertical'
                onClick={handleClose}
              />
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
      </Popper>
      <CopySnackbar
          open={state.copyURL}
          handleSnackbarClose={
            (evt, reason) => {
              if (reason === 'clickaway') {
                return
              }
              setState({
                copyURL: false,
              })
            }
          }
        />
    </div>
  )
}

const CopySnackbar = ({ open, handleSnackbarClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={1000}
    TransitionComponent={Fade}
    message={<span>Url copied</span>}
    onClose={handleSnackbarClose}
  />
)

export default inject('store')(observer(ShareWidget))
