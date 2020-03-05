import React, { 
  useEffect, 
  useRef, 
  useState
 } from 'react'

import { 
  Button,
  ClickAwayListener, 
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@material-ui/core'

import {
  Share,
  Email,
  Facebook,
  Twitter,
} from '@material-ui/icons'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

import hashSum from 'hash-sum'

const ShareModal = ({ classes, shareUrl, message, emailToCredit }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])


  const referralURL = `${shareUrl}?ref=${hashSum(emailToCredit)}`

  return (
    <div style={{ display: 'inline-block' }}>
      <Button
        ref={anchorRef}
        variant='contained'
        size='small'
        className={classes.shareButton}
        startIcon={<ShareIcon />}
        onClick={handleToggle}
      >
        Share
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps}  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClose}>
                  <FacebookShareButton url={referralURL} quote={message}>
                    <Facebook />
                  </FacebookShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <TwitterShareButton url={referralURL} quote={message}>
                    <Twitter />
                  </TwitterShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <EmailShareButton url={referralURL} quote={message}>
                    <Email />
                  </EmailShareButton>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
      </Popper>
    </div>
  )
}

export default ShareModal
