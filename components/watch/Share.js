
import {
  Button,
  ButtonBase,
  ClickAwayListener,
  Fade,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Snackbar,
} from '@material-ui/core'

import {
  Email,
  Facebook,
  Share,
  Twitter,
} from '@material-ui/icons'

import LinkIcon from '@material-ui/icons/Link'
import hashSum from 'hash-sum'
import React, {
  useEffect,
  useRef,
  useReducer,
} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

const ShareModal = ({
  classes, shareUrl, message, emailToCredit,
}) => {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    open: false,
    copyURL: false,
  })

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

  const onCopied = () => {
    setState({
      copyURL: true,
    })
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
    if (prevOpen.current && !state.open) {
      anchorRef.current.focus()
    }

    prevOpen.current = state.open
  }, [state.open])


  const referralURL = `${shareUrl}?ref=${hashSum(emailToCredit)}`

  return (
    <div style={{ display: 'inline-block' }}>
      <Button
        ref={anchorRef}
        variant='contained'
        size='small'
        className={classes.shareButton}
        startIcon={<Share />}
        onClick={handleToggle}
      >
        Share
      </Button>

      <Popper open={state.open} anchorEl={anchorRef.current} role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={state.open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClose}>
                  <FacebookShareButton url={referralURL} quote={message}>
                    <Facebook />
                  </FacebookShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <TwitterShareButton url={referralURL} title={message}>
                    <Twitter />
                  </TwitterShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <EmailShareButton url={referralURL} subject={message} title={message} body={`${message}\n${referralURL}`}>
                    <Email />
                  </EmailShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <CopyToClipboard text={referralURL} onCopy={onCopied}>
                    <ButtonBase className={classes.sidebarButton}>
                      <LinkIcon />
                    </ButtonBase>
                  </CopyToClipboard>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
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

export default ShareModal
